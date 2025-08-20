"use server";

import { headers } from "next/headers";

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

function getApiKey(): string | undefined {
  if (typeof process !== 'undefined' && process.env.OPENROUTER_API_KEY) {
    return process.env.OPENROUTER_API_KEY;
  }

  // Fallback for client-side usage if needed, though server-side is recommended.
  // This part is tricky as we can't directly access localStorage on the server.
  // A common pattern is to pass keys from client to server action.
  // For this implementation, we will rely on process.env for server actions.
  // The API Key manager on the client will store keys in local storage,
  // but server actions need them in the environment.
  // In a real production SaaS, you'd have a database that stores user keys encrypted.
  
  // This flow assumes keys are set in the environment for server-side execution.
  return undefined;
}


export async function callOpenRouter(model: string, prompt: string): Promise<string> {
  // In a real app, you would fetch the user-specific key from a secure store
  // or have the client pass it. For this example, we'll check env variables.
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    // Check for header if passed from a client component that has access to localStorage
    const authHeader = headers().get('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
       // This won't work out of the box without client changes, placeholder for a real implementation
    }
  }

  if (!apiKey) {
    throw new Error('OpenRouter API key not found. Please set it in the settings.');
  }

  const response = await fetch(OPENROUTER_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`OpenRouter API error for model ${model}: ${response.status} ${response.statusText} - ${errorBody}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}
