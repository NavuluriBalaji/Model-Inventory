'use server';

/**
 * @fileOverview A flow for generating example API requests based on a description of the API.
 *
 * - generateExampleRequests - A function that handles the generation of example API requests.
 * - GenerateExampleRequestsInput - The input type for the generateExampleRequests function.
 * - GenerateExampleRequestsOutput - The return type for the generateExampleRequests function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateExampleRequestsInputSchema = z.object({
  apiDescription: z.string().describe('The description of the API.'),
  modelNames: z.array(z.string()).describe('The names of the AI models to generate requests for.'),
});
export type GenerateExampleRequestsInput = z.infer<typeof GenerateExampleRequestsInputSchema>;

const GenerateExampleRequestsOutputSchema = z.record(z.string(), z.string()).describe('A map of AI model names to example API requests.');
export type GenerateExampleRequestsOutput = z.infer<typeof GenerateExampleRequestsOutputSchema>;

export async function generateExampleRequests(input: GenerateExampleRequestsInput): Promise<GenerateExampleRequestsOutput> {
  return generateExampleRequestsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateExampleRequestsPrompt',
  input: {schema: GenerateExampleRequestsInputSchema},
  output: {schema: GenerateExampleRequestsOutputSchema},
  prompt: `You are an expert software engineer specializing in generating example API requests for different AI models.

You will receive a description of an API and a list of AI model names. Your task is to generate an example API request for each AI model based on the API description.

API Description: {{{apiDescription}}}

AI Models: {{#each modelNames}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Format the output as a JSON object where the keys are the AI model names and the values are the corresponding example API requests.

Example Output:
{
  "ChatGPT": "{\"model\": \"gpt-3.5-turbo\", \"messages\": [{\"role\": \"user\", \"content\": \"Example request\"}]}",
  "Gemini": "{\"model\": \"gemini-1.5-pro\", \"prompt\": \"Example request\"}"
}
`,
});

const generateExampleRequestsFlow = ai.defineFlow(
  {
    name: 'generateExampleRequestsFlow',
    inputSchema: GenerateExampleRequestsInputSchema,
    outputSchema: GenerateExampleRequestsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
