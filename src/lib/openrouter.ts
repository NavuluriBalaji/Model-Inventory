
"use server";
import { fileTypeFromBuffer } from 'file-type';

async function getMimeTypeFromDataUri(dataUri: string): Promise<string | undefined> {
  const match = dataUri.match(/^data:(.+?);base64,(.*)$/);
  if (match) {
    // If MIME type is present in the data URI, use it.
    if(match[1] && match[1] !== 'application/octet-stream') {
        return match[1];
    }
    // If it's generic, try to infer from buffer.
    const buffer = Buffer.from(match[2], 'base64');
    const type = await fileTypeFromBuffer(buffer);
    return type?.mime;
  }
  return undefined;
}


export async function callOpenRouter(model: string, prompt: string, apiKey?: string, fileDataUri?: string | null): Promise<string> {
  const finalApiKey = apiKey || process.env.OPENROUTER_API_KEY;

  if (!finalApiKey) {
    throw new Error('OpenRouter API key not found. Please set it in the settings.');
  }

  // Build messages array
  const messages: any[] = [{
    role: 'user',
    content: [] as any[]
  }];
  
  if (prompt) {
    messages[0].content.push({ type: 'text', text: prompt });
  }

  if (fileDataUri) {
     const mimeType = await getMimeTypeFromDataUri(fileDataUri);
     if (mimeType?.startsWith('image/')) {
        messages[0].content.unshift({
          type: 'image_url',
          image_url: {
            url: fileDataUri
          },
        });
     } else {
        // For non-image files, some models might still handle them if instructed.
        // We can add a generic text note about the file.
        const fileName = "uploaded_file"
        const fileInfo = `An '${mimeType}' file named '${fileName}' was uploaded.`;
        const updatedPrompt = `${prompt}\n\n[System Note: ${fileInfo}]`;
         messages[0].content = [{type: 'text', text: updatedPrompt }];
         console.warn(`Model ${model} may not support non-image file type: ${mimeType}`);
     }
  }

  // If content is just text, simplify the structure to a plain string
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
