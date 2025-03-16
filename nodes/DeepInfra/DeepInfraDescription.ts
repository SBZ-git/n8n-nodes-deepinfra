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
			{
				name: 'Speech Recognition',
				value: 'speechRecognition',
			},
			{
				name: 'Text to Speech',
				value: 'textToSpeech',
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
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['textToSpeech'],
			},
		},
		options: [
			{
				name: 'Generate',
				value: 'generate',
				description: 'Generate speech from text',
				action: 'Generate speech from text',
			},
		],
		default: 'generate',
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['speechRecognition'],
			},
		},
		options: [
			{
				name: 'Transcribe',
				value: 'transcribe',
				description: 'Transcribe speech to text',
				action: 'Transcribe speech to text',
			},
			{
				name: 'Translate',
				value: 'translate',
				description: 'Translate speech to English text',
				action: 'Translate speech to english text',
			},
		],
		default: 'transcribe',
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
			name: 'DeepSeek R1',
			value: 'deepseek-ai/DeepSeek-R1',
		},
		{
			name: 'DeepSeek R1 Distill Llama 70B',
			value: 'deepseek-ai/DeepSeek-R1-Distill-Llama-70B',
		},
		{
			name: 'DeepSeek R1 Distill Qwen 32B',
			value: 'deepseek-ai/DeepSeek-R1-Distill-Qwen-32B',
		},
		{
			name: 'DeepSeek R1 Turbo',
			value: 'deepseek-ai/DeepSeek-R1-Turbo',
		},
		{
			name: 'DeepSeek V3',
			value: 'deepseek-ai/DeepSeek-V3',
		},
		{
			name: 'Google Gemini 1.5 Flash 8B',
			value: 'google/gemini-1.5-flash-8b',
		},
		{
			name: 'Google Gemini 2.0 Flash 001',
			value: 'google/gemini-2.0-flash-001',
		},
		{
			name: 'Google Gemma 2 27B IT',
			value: 'google/gemma-2-27b-it',
		},
		{
			name: 'Google Gemma 2 9B IT',
			value: 'google/gemma-2-9b-it',
		},
		{
			name: 'Meta-Llama 3 70B Instruct',
			value: 'meta-llama/Meta-Llama-3-70B-Instruct',
		},
		{
			name: 'Meta-Llama 3 8B Instruct',
			value: 'meta-llama/Meta-Llama-3-8B-Instruct',
		},
		{
			name: 'Meta-Llama 3.1 405B Instruct',
			value: 'meta-llama/Meta-Llama-3.1-405B-Instruct',
		},
		{
			name: 'Meta-Llama 3.1 70B Instruct',
			value: 'meta-llama/Meta-Llama-3.1-70B-Instruct',
		},
		{
			name: 'Meta-Llama 3.1 70B Instruct Turbo',
			value: 'meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo',
		},
		{
			name: 'Meta-Llama 3.1 8B Instruct',
			value: 'meta-llama/Meta-Llama-3.1-8B-Instruct',
		},
		{
			name: 'Meta-Llama 3.1 8B Instruct Turbo',
			value: 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
		},
		{
			name: 'Meta-Llama 3.2 1B Instruct',
			value: 'meta-llama/Llama-3.2-1B-Instruct',
		},
		{
			name: 'Meta-Llama 3.2 3B Instruct',
			value: 'meta-llama/Llama-3.2-3B-Instruct',
		},
		{
			name: 'Meta-Llama 3.3 70B Instruct',
			value: 'meta-llama/Llama-3.3-70B-Instruct',
		},
		{
			name: 'Meta-Llama 3.3 70B Instruct Turbo',
			value: 'meta-llama/Llama-3.3-70B-Instruct-Turbo',
		},
		{
			name: 'Mistral 7B Instruct V0.3',
			value: 'mistralai/Mistral-7B-Instruct-v0.3',
		},
		{
			name: 'Mistral Nemo Instruct 2407',
			value: 'mistralai/Mistral-Nemo-Instruct-2407',
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
			name: 'BAAI Bge-Base-En-V1.5',
			value: 'BAAI/bge-base-en-v1.5',
		},
		{
			name: 'BAAI Bge-En-Icl',
			value: 'BAAI/bge-en-icl',
		},
		{
			name: 'BAAI Bge-Large-En-V1.5',
			value: 'BAAI/bge-large-en-v1.5',
		},
		{
			name: 'BAAI Bge-M3',
			value: 'BAAI/bge-m3',
		},
		{
			name: 'Intfloat E5-Large-V2',
			value: 'intfloat/e5-large-v2',
		},
		{
			name: 'Intfloat Multilingual-E5-Large',
			value: 'intfloat/multilingual-e5-large',
		},
		{
			name: 'Sentence-Transformers All-MiniLM-L12-V2',
			value: 'sentence-transformers/all-MiniLM-L12-v2',
		},
		{
			name: 'Sentence-Transformers All-MiniLM-L6-V2',
			value: 'sentence-transformers/all-MiniLM-L6-v2',
		},
		{
			name: 'Sentence-Transformers All-Mpnet-Base-V2',
			value: 'sentence-transformers/all-mpnet-base-v2',
		},
		{
			name: 'Sentence-Transformers Clip-ViT-B-32',
			value: 'sentence-transformers/clip-ViT-B-32',
		},
		{
			name: 'Sentence-Transformers Clip-ViT-B-32-Multilingual-V1',
			value: 'sentence-transformers/clip-ViT-B-32-multilingual-v1',
		},
		{
			name: 'Sentence-Transformers Paraphrase-MiniLM-L6-V2',
			value: 'sentence-transformers/paraphrase-MiniLM-L6-v2',
		},
		{
			name: 'Shibing624 Text2vec-Base-Chinese',
			value: 'shibing624/text2vec-base-chinese',
		},
		{
			name: 'Thenlper Gte-Base',
			value: 'thenlper/gte-base',
		},
	],
	default: 'BAAI/bge-base-en-v1.5',
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
            name: 'Black-Forest-Labs FLUX-1-Dev',
            value: 'black-forest-labs/FLUX-1-dev',
        },
        {
            name: 'Black-Forest-Labs FLUX-1-Redux-Dev',
            value: 'black-forest-labs/FLUX-1-Redux-dev',
        },
        {
            name: 'Black-Forest-Labs FLUX-1-Schnell',
            value: 'black-forest-labs/FLUX-1-schnell',
        },
        {
            name: 'Black-Forest-Labs FLUX-1.1-Pro',
            value: 'black-forest-labs/FLUX-1.1-pro',
        },
        {
            name: 'Black-Forest-Labs FLUX-Pro',
            value: 'black-forest-labs/FLUX-pro',
        },
        {
            name: 'CompVis Stable-Diffusion-V1-4',
            value: 'CompVis/stable-diffusion-v1-4',
        },
        {
            name: 'Deepseek-Ai Janus-Pro-1B',
            value: 'deepseek-ai/Janus-Pro-1B',
        },
        {
            name: 'Deepseek-Ai Janus-Pro-7B',
            value: 'deepseek-ai/Janus-Pro-7B',
        },
        {
            name: 'Runwayml Stable-Diffusion-V1-5',
            value: 'runwayml/stable-diffusion-v1-5',
        },
        {
            name: 'Stabilityai Sd3.5',
            value: 'stabilityai/sd3.5',
        },
        {
            name: 'Stabilityai Sd3.5-Medium',
            value: 'stabilityai/sd3.5-medium',
        },
        {
            name: 'Stabilityai Sdxl-Turbo',
            value: 'stabilityai/sdxl-turbo',
        },
        {
            name: 'Stabilityai Stable-Diffusion-2-1',
            value: 'stabilityai/stable-diffusion-2-1',
        },
        {
            name: 'Stabilityai Stable-Diffusion-Xl-Base-1.0',
            value: 'stabilityai/stable-diffusion-xl-base-1.0',
        },
        {
            name: 'Stabilityai Stable-Diffusion-Xl-Refiner-1.0',
            value: 'stabilityai/stable-diffusion-xl-refiner-1.0',
        },
        {
            name: 'XpucT Deliberate',
            value: 'XpucT/Deliberate',
        },
	],
	default: 'stabilityai/stable-diffusion-xl-base-1.0',
	description: 'The model to use for image generation',
};

// Text to Speech Models
export const textToSpeechModels: INodeProperties = {
	displayName: 'Model',
	name: 'model',
	type: 'options',
	required: true,
	displayOptions: {
		show: {
			resource: ['textToSpeech'],
			operation: ['generate'],
		},
	},
	options: [
		{
			name: 'Hexgrad Kokoro-82M',
			value: 'hexgrad/Kokoro-82M',
		},
		{
			name: 'Zyphra Zonos-V0.1-Hybrid',
			value: 'Zyphra/Zonos-v0.1-hybrid',
		},
		{
			name: 'Zyphra Zonos-V0.1-Transformer',
			value: 'Zyphra/Zonos-v0.1-transformer',
		},
	],
	default: 'hexgrad/Kokoro-82M',
	description: 'The model to use for text to speech generation',
};

// Speech Recognition Models
export const speechRecognitionModels: INodeProperties = {
	displayName: 'Model',
	name: 'model',
	type: 'options',
	required: true,
	displayOptions: {
		show: {
			resource: ['speechRecognition'],
		},
	},
	options: [
		{
			name: 'Openai Whisper-Large-V3',
			value: 'openai/whisper-large-v3',
		},
		{
			name: 'Openai Whisper-Large-V3-Turbo',
			value: 'openai/whisper-large-v3-turbo',
		},
	],
	default: 'openai/whisper-large-v3',
	description: 'The model to use for speech recognition',
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

// Text to Speech Parameters
export const textToSpeechOperations: INodeProperties[] = [
	{
		displayName: 'Text',
		name: 'text',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['textToSpeech'],
				operation: ['generate'],
			},
		},
		default: '',
		description: 'The text to convert to speech',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['textToSpeech'],
				operation: ['generate'],
			},
		},
		options: [
			{
				displayName: 'Voices',
				name: 'voice',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
					sortable: true,
				},
				default: {
					values: [
						{
							voice: 'af_bella',
						},
					],
				},
				options: [
					{
						name: 'values',
						displayName: 'Voice',
						values: [
							{
								displayName: 'Voice Identifier',
								name: 'voice',
								type: 'string',
								default: '',
								description: 'Voice identifier for speech generation (e.g., af_bella, default)',
							},
						],
					},
				],
				description: 'The voices to use for speech generation (model-specific)',
			},
			{
				displayName: 'Speed',
				name: 'speed',
				type: 'number',
				default: 1,
				typeOptions: {
					minValue: 0.5,
					maxValue: 2,
				},
				description: 'The speed of the generated speech',
			},
		],
	},
];

// Speech Recognition Parameters
export const speechRecognitionOperations: INodeProperties[] = [
	{
		displayName: 'Input Type',
		name: 'inputType',
		type: 'options',
		options: [
			{
				name: 'URL',
				value: 'url',
			},
			{
				name: 'Binary Data',
				value: 'binaryData',
			},
		],
		default: 'url',
		description: 'Whether to use a URL or binary data as input',
		displayOptions: {
			show: {
				resource: ['speechRecognition'],
			},
		},
	},
	{
		displayName: 'Audio URL',
		name: 'audioFile',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['speechRecognition'],
				inputType: ['url'],
			},
		},
		default: '',
		description: 'The URL of the audio file to transcribe or translate',
	},
	{
		displayName: 'Binary Property',
		name: 'binaryPropertyName',
		type: 'string',
		required: true,
		default: 'data',
		displayOptions: {
			show: {
				resource: ['speechRecognition'],
				inputType: ['binaryData'],
			},
		},
		description: 'Name of the binary property containing the audio file data',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['speechRecognition'],
			},
		},
		options: [
			{
				displayName: 'Language',
				name: 'language',
				type: 'string',
				default: '',
				description: 'The language of the audio (ISO-639-1 format)',
			},
			{
				displayName: 'Prompt',
				name: 'prompt',
				type: 'string',
				default: '',
				description: 'Optional text to guide the model\'s style or continue a previous audio segment',
			},
			{
				displayName: 'Temperature',
				name: 'temperature',
				type: 'number',
				default: 0,
				typeOptions: {
					minValue: 0,
					maxValue: 1,
				},
				description: 'The sampling temperature for transcription',
			}
		],
	},
];
