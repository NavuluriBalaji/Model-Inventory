// Summarizes a list of use cases to help developers prioritize them.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeUseCasesInputSchema = z.object({
  useCases: z.string().describe('A list of use cases to summarize.'),
});

export type SummarizeUseCasesInput = z.infer<typeof SummarizeUseCasesInputSchema>;

const SummarizeUseCasesOutputSchema = z.object({
  summary: z.string().describe('A summary of the use cases.'),
});

export type SummarizeUseCasesOutput = z.infer<typeof SummarizeUseCasesOutputSchema>;

export async function summarizeUseCases(input: SummarizeUseCasesInput): Promise<SummarizeUseCasesOutput> {
  return summarizeUseCasesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeUseCasesPrompt',
  input: {schema: SummarizeUseCasesInputSchema},
  output: {schema: SummarizeUseCasesOutputSchema},
  prompt: `You are an expert product manager. Summarize the following use cases and suggest which ones we should focus on. Be concise.\n\nUse Cases:\n{{{useCases}}}`,
});

const summarizeUseCasesFlow = ai.defineFlow(
  {
    name: 'summarizeUseCasesFlow',
    inputSchema: SummarizeUseCasesInputSchema,
    outputSchema: SummarizeUseCasesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
