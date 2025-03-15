import type { INodeProperties } from 'n8n-workflow';

// Resource selection
export const resourceFields: INodeProperties[] = [
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Chat',
				value: 'chat',
			},
			{
				name: 'Embedding',
				value: 'embedding',
			},
			{
				name: 'Image',
				value: 'image',
			},
		],
		default: 'chat',
	},
];

// Operations for each resource
export const operationFields: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['chat'],
			},
		},
		options: [
			{
				name: 'Completion',
				value: 'completion',
				description: 'Generate a chat completion',
				action: 'Generate a chat completion',
			},
		],
		default: 'completion',
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['embedding'],
			},
		},
		options: [
			{
				name: 'Embed',
				value: 'embed',
				description: 'Create an embedding vector',
				action: 'Create an embedding vector',
			},
		],
		default: 'embed',
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['image'],
			},
		},
		options: [
			{
				name: 'Generate',
				value: 'generate',
				description: 'Generate an image',
				action: 'Generate an image',
			},
		],
		default: 'generate',
	},
];

// Chat Completion Models
export const chatCompletionModels: INodeProperties = {
	displayName: 'Model',
	name: 'model',
	type: 'options',
	required: true,
	displayOptions: {
		show: {
			resource: ['chat'],
			operation: ['completion'],
		},
	},
	options: [
		{
			name: 'Meta-Llama 3.3 70B Instruct',
			value: 'meta-llama/Llama-3.3-70B-Instruct',
		},
		{
			name: 'Meta-Llama 3.3 70B Instruct Turbo',
			value: 'meta-llama/Llama-3.3-70B-Instruct-Turbo',
		},
		{
			name: 'Meta-Llama 3.1 8B Instruct',
			value: 'meta-llama/Meta-Llama-3.1-8B-Instruct',
		},
		{
			name: 'Meta-Llama 3.1 70B Instruct',
			value: 'meta-llama/Meta-Llama-3.1-70B-Instruct',
		},
		{
			name: 'Meta-Llama 3.1 405B Instruct',
			value: 'meta-llama/Meta-Llama-3.1-405B-Instruct',
		},
		{
			name: 'Meta-Llama 3.1 8B Instruct Turbo',
			value: 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
		},
		{
			name: 'Meta-Llama 3.1 70B Instruct Turbo',
			value: 'meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo',
		},
		{
			name: 'DeepSeek R1 Turbo',
			value: 'deepseek-ai/DeepSeek-R1-Turbo',
		},
		{
			name: 'DeepSeek R1',
			value: 'deepseek-ai/DeepSeek-R1',
		},
		{
			name: 'DeepSeek R1 Distill Llama 70B',
			value: 'deepseek-ai/DeepSeek-R1-Distill-Llama-70B',
		},
		{
			name: 'DeepSeek V3',
			value: 'deepseek-ai/DeepSeek-V3',
		},
		{
			name: 'DeepSeek R1 Distill Qwen 32B',
			value: 'deepseek-ai/DeepSeek-R1-Distill-Qwen-32B',
		},
		{
			name: 'Mistral Small 24B Instruct 2501',
			value: 'mistralai/Mistral-Small-24B-Instruct-2501',
		},
		{
			name: 'Phi-4',
			value: 'microsoft/phi-4',
		},
		{
			name: 'Qwen 2.5 Coder 32B Instruct',
			value: 'Qwen/Qwen2.5-Coder-32B-Instruct',
		},
		{
			name: 'Qwen 2.5 72B Instruct',
			value: 'Qwen/Qwen2.5-72B-Instruct',
		},
		{
			name: 'Llama 3.1 Nemotron 70B Instruct',
			value: 'nvidia/Llama-3.1-Nemotron-70B-Instruct',
		},
	],
	default: 'meta-llama/Llama-3.3-70B-Instruct',
	description: 'The model to use for chat completion',
};

// Embedding Models
export const embeddingModels: INodeProperties = {
	displayName: 'Model',
	name: 'model',
	type: 'options',
	required: true,
	displayOptions: {
		show: {
			resource: ['embedding'],
			operation: ['embed'],
		},
	},
	options: [
		{
			name: 'Cohere Embed English',
			value: 'cohere/embed-english-v3.0',
		},
		{
			name: 'Cohere Embed Multilingual',
			value: 'cohere/embed-multilingual-v3.0',
		},
		{
			name: 'Jina Embeddings V2 Base EN',
			value: 'jina-ai/jina-embeddings-v2-base-en',
		},
		{
			name: 'Jina Embeddings V2 Small EN',
			value: 'jina-ai/jina-embeddings-v2-small-en',
		},
	],
	default: 'cohere/embed-english-v3.0',
	description: 'The model to use for embedding generation',
};

// Image Generation Models
export const imageGenerationModels: INodeProperties = {
	displayName: 'Model',
	name: 'model',
	type: 'options',
	required: true,
	displayOptions: {
		show: {
			resource: ['image'],
			operation: ['generate'],
		},
	},
	options: [
		{
			name: 'Stable Diffusion XL',
			value: 'stabilityai/stable-diffusion-xl-base-1.0',
		},
		{
			name: 'Stable Diffusion 3',
			value: 'stabilityai/stable-diffusion-3-medium',
		},
		{
			name: 'Playground v2',
			value: 'playgroundai/playground-v2.5',
		},
		{
			name: 'Midjourney',
			value: 'midjourney/midjourney-v5',
		},
	],
	default: 'stabilityai/stable-diffusion-xl-base-1.0',
	description: 'The model to use for image generation',
};

// Chat Completion Parameters
export const chatCompletionOperations: INodeProperties[] = [
	{
		displayName: 'Messages',
		name: 'messages',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
			sortable: true,
		},
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['completion'],
			},
		},
		default: {
			messages: [
				{
					role: 'user',
					content: '',
				},
			],
		},
		options: [
			{
				name: 'messages',
				displayName: 'Messages',
				values: [
					{
						displayName: 'Role',
						name: 'role',
						type: 'options',
						options: [
							{
								name: 'System',
								value: 'system',
							},
							{
								name: 'User',
								value: 'user',
							},
							{
								name: 'Assistant',
								value: 'assistant',
							},
						],
						default: 'user',
						description: 'The role of the message sender',
					},
					{
						displayName: 'Content',
						name: 'content',
						type: 'string',
						default: '',
						typeOptions: {
							rows: 4,
						},
						description: 'The content of the message',
					},
				],
			},
		],
		description: 'The messages to send to the model',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['completion'],
			},
		},
		options: [
			{
				displayName: 'Maximum Tokens',
				name: 'max_tokens',
				type: 'number',
				default: 1024,
				description: 'The maximum number of tokens to generate',
			},
			{
				displayName: 'Temperature',
				name: 'temperature',
				type: 'number',
				default: 0.7,
				typeOptions: {
					minValue: 0,
					maxValue: 2,
				},
				description: 'Controls randomness: Lowering results in less random completions',
			},
			{
				displayName: 'Top P',
				name: 'top_p',
				type: 'number',
				default: 1,
				typeOptions: {
					minValue: 0,
					maxValue: 1,
				},
				description: 'Controls diversity via nucleus sampling',
			},
			{
				displayName: 'Stream',
				name: 'stream',
				type: 'boolean',
				default: false,
				description: 'Whether to stream back partial progress',
			},
		],
	},
];

// Embedding Parameters
export const embeddingOperations: INodeProperties[] = [
	{
		displayName: 'Text',
		name: 'text',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['embedding'],
				operation: ['embed'],
			},
		},
		default: '',
		description: 'The text to embed',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['embedding'],
				operation: ['embed'],
			},
		},
		options: [
			{
				displayName: 'Truncate',
				name: 'truncate',
				type: 'options',
				options: [
					{
						name: 'None',
						value: 'none',
					},
					{
						name: 'Start',
						value: 'start',
					},
					{
						name: 'End',
						value: 'end',
					},
				],
				default: 'none',
				description: 'How to handle texts longer than the maximum token length',
			},
		],
	},
];

// Image Generation Parameters
export const imageGenerationOperations: INodeProperties[] = [
	{
		displayName: 'Prompt',
		name: 'prompt',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['image'],
				operation: ['generate'],
			},
		},
		default: '',
		description: 'The prompt to generate images from',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['image'],
				operation: ['generate'],
			},
		},
		options: [
			{
				displayName: 'Number of Images',
				name: 'n',
				type: 'number',
				default: 1,
				description: 'The number of images to generate',
			},
			{
				displayName: 'Size',
				name: 'size',
				type: 'options',
				options: [
					{
						name: '512x512',
						value: '512x512',
					},
					{
						name: '768x768',
						value: '768x768',
					},
					{
						name: '1024x1024',
						value: '1024x1024',
					},
				],
				default: '1024x1024',
				description: 'The size of the generated images',
			},
			{
				displayName: 'Negative Prompt',
				name: 'negative_prompt',
				type: 'string',
				default: '',
				description: 'The prompt not to guide the image generation',
			},
			{
				displayName: 'Steps',
				name: 'steps',
				type: 'number',
				default: 30,
				description: 'Number of diffusion steps to run',
			},
		],
	},
]; 