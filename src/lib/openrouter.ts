
"use server";

import { headers } from "next/headers";

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export async function callOpenRouter(model: string, prompt: string, apiKey?: string): Promise<string> {
  const finalApiKey = apiKey || process.env.OPENROUTER_API_KEY;

  if (!finalApiKey) {
    throw new Error('OpenRouter API key not found. Please set it in the settings.');
  }

  const response = await fetch(OPENROUTER_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${finalApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error(`OpenRouter API error for model ${model}:`, errorBody);
    throw new Error(`OpenRouter API error for model ${model}: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content ?? "";
}
