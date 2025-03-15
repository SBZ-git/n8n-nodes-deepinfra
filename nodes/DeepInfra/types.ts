// Simple type definitions for OpenAI module
declare module 'openai' {
  export default class OpenAI {
    constructor(options: { apiKey: string; baseURL?: string });
    
    chat: {
      completions: {
        create(params: {
          model: string;
          messages: Array<{ role: string; content: string }>;
          max_tokens?: number;
          temperature?: number;
          top_p?: number;
          stream?: boolean;
        }): Promise<any>;
      };
    };
    
    embeddings: {
      create(params: {
        model: string;
        input: string;
        encoding_format?: string;
        [key: string]: any;
      }): Promise<any>;
    };
    
    images: {
      generate(params: {
        model: string;
        prompt: string;
        n?: number;
        size?: string;
        response_format?: string;
        [key: string]: any;
      }): Promise<any>;
    };
  }
} 