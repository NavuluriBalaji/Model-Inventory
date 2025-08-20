'use server';

/**
 * @fileOverview A flow for getting responses from multiple AI models for a given prompt.
 *
 * - getModelResponses - A function that takes a prompt and returns responses from various AI models.
 * - GetModelResponsesInput - The input type for the getModelResponses function.
 * - GetModelResponsesOutput - The return type for the getModelResponses function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { callOpenRouter } from '@/lib/openrouter';

const GetModelResponsesInputSchema = z.object({
  prompt: z.string().describe('The prompt to send to the AI models.'),
});
export type GetModelResponsesInput = z.infer<typeof GetModelResponsesInputSchema>;

const ModelResponseSchema = z.object({
  response: z.string(),
  duration: z.number().describe('The time taken in milliseconds to get the response.'),
});

const GetModelResponsesOutputSchema = z.record(z.string(), ModelResponseSchema).describe('A map of AI model names to their responses and duration.');
export type GetModelResponsesOutput = z.infer<typeof GetModelResponsesOutputSchema>;

export async function getModelResponses(input: GetModelResponsesInput): Promise<GetModelResponsesOutput> {
  return getModelResponsesFlow(input);
}

const getModelResponsesFlow = ai.defineFlow(
  {
    name: 'getModelResponsesFlow',
    inputSchema: GetModelResponsesInputSchema,
    outputSchema: GetModelResponsesOutputSchema,
  },
  async ({ prompt }) => {
    const openRouterModels = [
      { id: 'deepseek', name: 'deepseek/deepseek-chat' },
      { id: 'llama', name: 'meta-llama/llama-3-8b-instruct' },
      { id: 'mistral', name: 'mistralai/mistral-7b-instruct' },
    ];

    const promises = [];

    const timeRequest = async (id: string, promise: Promise<string>) => {
      const startTime = performance.now();
      try {
        const response = await promise;
        const endTime = performance.now();
        return { id, response, duration: Math.round(endTime - startTime) };
      } catch (error) {
        const endTime = performance.now();
        const errorMessage = error instanceof Error ? `Error: ${error.message}` : 'An unknown error occurred';
        return { id, response: errorMessage, duration: Math.round(endTime - startTime) };
      }
    };
    
    // Gemini call
    const geminiPromise = ai.generate({
        prompt,
        model: 'googleai/gemini-1.5-flash-latest'
      })
      .then(response => response.text);
    promises.push(timeRequest('gemini', geminiPromise));


    // OpenRouter calls
    for (const model of openRouterModels) {
      const openRouterPromise = callOpenRouter(model.name, prompt);
      promises.push(timeRequest(model.id, openRouterPromise));
    }
    
    const results = await Promise.all(promises);

    const responses: Record<string, { response: string, duration: number }> = {};
    for (const result of results) {
      responses[result.id] = { response: result.response, duration: result.duration };
    }
    
    return responses;
  }
);
