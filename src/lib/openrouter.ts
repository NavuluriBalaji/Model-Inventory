
"use server";
import { fileTypeFromBuffer } from 'file-type';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    file?: {
      dataUri: string;
      name: string;
      type: string;
    } | null;
}

async function getMimeTypeFromDataUri(dataUri: string): Promise<string | undefined> {
  const match = dataUri.match(/^data:(.+?);base64,(.*)$/);
  if (match) {
    if(match[1] && match[1] !== 'application/octet-stream') {
        return match[1];
    }
    const buffer = Buffer.from(match[2], 'base64');
    const type = await fileTypeFromBuffer(buffer);
    return type?.mime;
  }
  return undefined;
}


export async function callOpenRouter(model: string, messages: Message[], apiKey?: string): Promise<string> {
  const finalApiKey = apiKey || process.env.OPENROUTER_API_KEY;

  if (!finalApiKey) {
    throw new Error('OpenRouter API key not found. Please set it in the settings.');
  }

  // Convert our message format to what OpenRouter expects
  const openRouterMessages = await Promise.all(messages.map(async (msg) => {
    if (msg.role === 'assistant') {
      return {
        role: 'assistant',
        content: msg.content,
      };
    }

    // User message
    const contentParts: any[] = [];
    if (msg.content) {
      contentParts.push({ type: 'text', text: msg.content });
    }

    if (msg.file?.dataUri) {
      const mimeType = await getMimeTypeFromDataUri(msg.file.dataUri);
      if (mimeType?.startsWith('image/')) {
        contentParts.push({
          type: 'image_url',
          image_url: { url: msg.file.dataUri },
        });
      } else {
        console.warn(`Model ${model} may not support non-image file type: ${mimeType}`);
      }
    }
    
    // OpenRouter expects `content` to be a string if there's no image,
    // or an array of parts if there is an image.
    return {
      role: 'user',
      content: contentParts.length === 1 && contentParts[0].type === 'text'
        ? contentParts[0].text
        : contentParts,
    };
  }));

  // Filter out any empty messages
  const validMessages = openRouterMessages.filter(m => m.content && (Array.isArray(m.content) ? m.content.length > 0 : true));
  
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${finalApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: validMessages,
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
