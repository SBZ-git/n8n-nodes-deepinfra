import {
	NodeConnectionType,
	type IExecuteFunctions,
	type INodeExecutionData,
	type INodeType,
	type INodeTypeDescription,
	type IDataObject,
} from 'n8n-workflow';

import OpenAI from 'openai';

import {
	resourceFields,
	operationFields,
	chatCompletionModels,
	embeddingModels,
	imageGenerationModels,
	chatCompletionOperations,
	embeddingOperations,
	imageGenerationOperations,
} from './MessageDescription';

export class DeepInfra implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'DeepInfra',
		name: 'deepInfra',
		icon: 'file:deepinfra.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
		description: 'Use DeepInfra API for AI operations',
		defaults: {
			name: 'DeepInfra',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'deepinfraApi',
				required: true,
			},
		],
		properties: [
			...resourceFields,
			...operationFields,
			chatCompletionModels,
			embeddingModels,
			imageGenerationModels,
			...chatCompletionOperations,
			...embeddingOperations,
			...imageGenerationOperations,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;
		
		const credentials = await this.getCredentials('deepinfraApi');
		const apiKey = credentials.apiKey as string;

		// Initialize OpenAI client with DeepInfra base URL
		const openai = new OpenAI({
			apiKey: apiKey as string,
			baseURL: 'https://api.deepinfra.com/v1/openai',
		});

		for (let i = 0; i < items.length; i++) {
			try {
				if (resource === 'chat' && operation === 'completion') {
					// Handle Chat Completion
					const model = this.getNodeParameter('model', i) as string;
					const messagesCollection = this.getNodeParameter('messages.messages', i, []) as Array<{
						role: string;
						content: string;
					}>;
					const options = this.getNodeParameter('options', i, {}) as {
						max_tokens?: number;
						temperature?: number;
						top_p?: number;
						stream?: boolean;
					};

					const response = await openai.chat.completions.create({
						model,
						messages: messagesCollection,
						max_tokens: options.max_tokens,
						temperature: options.temperature,
						top_p: options.top_p,
						stream: options.stream,
					});

					returnData.push({
						json: response,
					});
				} else if (resource === 'embedding' && operation === 'embed') {
					// Handle Embedding
					const model = this.getNodeParameter('model', i) as string;
					const text = this.getNodeParameter('text', i) as string;
					const options = this.getNodeParameter('options', i, {}) as {
						truncate?: string;
					};

					const response = await openai.embeddings.create({
						model,
						input: text,
						encoding_format: 'float',
						...options,
					});

					returnData.push({
						json: response,
					});
				} else if (resource === 'image' && operation === 'generate') {
					// Handle Image Generation
					const model = this.getNodeParameter('model', i) as string;
					const prompt = this.getNodeParameter('prompt', i) as string;
					const options = this.getNodeParameter('options', i, {}) as {
						n?: number;
						size?: string;
						negative_prompt?: string;
						steps?: number;
					};

					const response = await openai.images.generate({
						model,
						prompt,
						n: options.n,
						size: options.size,
						// Add DeepInfra specific parameters
						response_format: 'url',
						// @ts-ignore - DeepInfra specific parameters
						negative_prompt: options.negative_prompt,
						// @ts-ignore - DeepInfra specific parameters
						steps: options.steps,
					});

					returnData.push({
						json: response,
					});
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: error.message,
						},
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
