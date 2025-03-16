import {
	type IExecuteFunctions,
	type INodeExecutionData,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';

import OpenAI from 'openai';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

import {
	resourceFields,
	operationFields,
	chatCompletionModels,
	embeddingModels,
	imageGenerationModels,
	textToSpeechModels,
	speechRecognitionModels,
	chatCompletionOperations,
	embeddingOperations,
	imageGenerationOperations,
	textToSpeechOperations,
	speechRecognitionOperations,
} from './DeepInfraDescription';

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
				name: 'deepInfraApi',
				required: true,
			},
		],
		properties: [
			...resourceFields,
			...operationFields,
			chatCompletionModels,
			embeddingModels,
			imageGenerationModels,
			textToSpeechModels,
			speechRecognitionModels,
			...chatCompletionOperations,
			...embeddingOperations,
			...imageGenerationOperations,
			...textToSpeechOperations,
			...speechRecognitionOperations,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		// Get credentials
		const credentials = await this.getCredentials('deepInfraApi');

		// Initialize OpenAI client with DeepInfra base URL
		const openai = new OpenAI({
			apiKey: credentials.apiKey as string,
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
						// // Add DeepInfra specific parameters
						// response_format: 'url',
						// // @ts-ignore - DeepInfra specific parameters
						// negative_prompt: options.negative_prompt,
						// // @ts-ignore - DeepInfra specific parameters
						// steps: options.steps,
					});

					returnData.push({
						json: response,
					});
				} else if (resource === 'textToSpeech' && operation === 'generate') {
					// Handle Text to Speech
					const model = this.getNodeParameter('model', i) as string;
					const text = this.getNodeParameter('text', i) as string;
					const options = this.getNodeParameter('options', i, {}) as {
						voice?: { values: { voice: string }[] };
						speed?: number;
					};

					// For text-to-speech, we need to use a direct API call
					// as it's not part of the OpenAI-compatible endpoints
					const apiKey = credentials.apiKey as string;
					const response = await axios({
						method: 'POST',
						url: `https://api.deepinfra.com/v1/inference/${model}`,
						headers: {
							Authorization: `bearer ${apiKey}`,
							'Content-Type': 'application/json',
						},
						data: {
							text,
							preset_voice: options.voice && options.voice.values && options.voice.values.length > 0
								? options.voice.values.map((item: { voice: string }) => item.voice)
								: ['af_bella'],
							speed: options.speed,
							output_format: 'mp3',
						},
					});

					// Check if the response contains audio data
					if (response.data && response.data.audio) {
						// Extract the base64 data from the data URL
						// Format is typically: data:audio/mp3;base64,BASE64_DATA
						const base64Data = response.data.audio.split(',')[1];

						// Convert base64 to binary buffer
						const binaryData = Buffer.from(base64Data, 'base64');

						returnData.push({
							json: { success: true, model },
							binary: {
								audio: {
									data: binaryData.toString('base64'),
									mimeType: 'audio/mp3',
								},
							},
						});
					} else {
						returnData.push({
							json: {
								success: false,
								error: 'No audio data returned from the API'
							},
						});
					}
				} else if (resource === 'speechRecognition') {
					// Handle Speech Recognition
					const model = this.getNodeParameter('model', i) as string;
					const inputType = this.getNodeParameter('inputType', i) as string;
					const options = this.getNodeParameter('options', i, {}) as {
						language?: string;
						prompt?: string;
						temperature?: number;
						formBinaryData?: boolean;
					};

					let audioFilePath = '';

					// Handle different input types
					if (inputType === 'url') {
						const audioFile = this.getNodeParameter('audioFile', i) as string;
						// It's a URL, download the file
						const response = await axios({
							method: 'GET',
							url: audioFile,
							responseType: 'arraybuffer',
						});

						// Create a temporary file
						const tempDir = os.tmpdir();
						audioFilePath = path.join(tempDir, `audio-${Date.now()}.mp3`);
						fs.writeFileSync(audioFilePath, Buffer.from(response.data));
					} else if (inputType === 'binaryData') {
						// It's binary data from the workflow
						const binaryPropertyName = this.getNodeParameter('binaryPropertyName', i) as string;

						// First, make sure the binary data exists
						const itemBinaryData = this.helpers.assertBinaryData(i, binaryPropertyName);

						const binaryData = Buffer.from(itemBinaryData.data, 'base64');

						// Create a temporary file
						const tempDir = os.tmpdir();
						audioFilePath = path.join(tempDir, `audio-${Date.now()}.mp3`);
						fs.writeFileSync(audioFilePath, binaryData);
					}

					if (operation === 'transcribe') {
						// Use OpenAI client for transcription
						// @ts-ignore - DeepInfra's OpenAI client supports audio transcription
						const response = await openai.audio.transcriptions.create({
							model,
							file: fs.createReadStream(audioFilePath),
							language: options.language,
							prompt: options.prompt,
							temperature: options.temperature,
						});

						// Clean up the temporary file
						try {
							if (audioFilePath) {
								fs.unlinkSync(audioFilePath);
							}
						} catch (error) {
							// Ignore errors when deleting temporary files
						}

						returnData.push({
							json: response,
						});
					} else if (operation === 'translate') {
						// Use OpenAI client for translation
						// @ts-ignore - DeepInfra's OpenAI client supports audio translation
						const response = await openai.audio.translations.create({
							model,
							file: fs.createReadStream(audioFilePath),
							prompt: options.prompt,
							temperature: options.temperature,
						});

						// Clean up the temporary file
						try {
							if (audioFilePath) {
								fs.unlinkSync(audioFilePath);
							}
						} catch (error) {
							// Ignore errors when deleting temporary files
						}

						returnData.push({
							json: response,
						});
					}
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
