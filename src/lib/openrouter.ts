
"use server";

export async function callOpenRouter(model: string, prompt: string, apiKey?: string, imageDataUri?: string | null): Promise<string> {
  const finalApiKey = apiKey || process.env.OPENROUTER_API_KEY;

  if (!finalApiKey) {
    throw new Error('OpenRouter API key not found. Please set it in the settings.');
  }

  // Build messages array
  const messages: any[] = [{
    role: 'user',
    content: []
  }];
  
  if (prompt) {
    messages[0].content.push({ type: 'text', text: prompt });
  }

  if (imageDataUri) {
    // some models like Llama 3.2 Vision require image first
    messages[0].content.unshift({
      type: 'image_url',
      image_url: {
        url: imageDataUri
      },
    });
  }

  // If content is just text, simplify the structure
  if (messages[0].content.length === 1 && messages[0].content[0].type === 'text') {
    messages[0].content = messages[0].content[0].text;
  }
  
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${finalApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error(`OpenRouter API error for model ${model}:`, errorBody);
    throw new Error(`OpenRouter API error for model ${model}: ${response.statusText} - ${errorBody}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content ?? "";
}
