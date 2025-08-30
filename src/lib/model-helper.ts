import { allModels } from './models';

// Helper functions for model filtering and search
export function searchModels(query: string) {
  const lowerQuery = query.toLowerCase();
  return allModels.filter(model => 
    model.name.toLowerCase().includes(lowerQuery) ||
    model.description.toLowerCase().includes(lowerQuery)
  );
}

export function getImageGenerationModels() {
  return allModels.filter(model => 
    model.name.toLowerCase().includes('image') || 
    model.description.toLowerCase().includes('image generation') ||
    model.name.toLowerCase().includes('preview')
  );
}

export function getCodeGenerationModels() {
  return allModels.filter(model => 
    model.name.toLowerCase().includes('code') || 
    model.name.toLowerCase().includes('coder') ||
    model.description.toLowerCase().includes('code') ||
    model.description.toLowerCase().includes('programming')
  );
}

export function getReasoningModels() {
  return allModels.filter(model => 
    model.name.toLowerCase().includes('reasoning') ||
    model.name.toLowerCase().includes('r1') ||
    model.name.toLowerCase().includes('qwq') ||
    model.description.toLowerCase().includes('reasoning') ||
    model.description.toLowerCase().includes('thinking')
  );
}

export function getVisionLanguageModels() {
  return allModels.filter(model => 
    model.name.toLowerCase().includes('vision') ||
    model.name.toLowerCase().includes('vl') ||
    model.name.toLowerCase().includes('multimodal') ||
    model.description.toLowerCase().includes('vision') ||
    model.description.toLowerCase().includes('multimodal')
  );
}

export function getUncensoredModels() {
  return allModels.filter(model => 
    model.name.toLowerCase().includes('uncensored') ||
    model.name.toLowerCase().includes('venice') ||
    model.name.toLowerCase().includes('dolphin') ||
    model.description.toLowerCase().includes('uncensored')
  );
}

export function getFreeModels() {
  return allModels.filter(model => 
    model.openRouterId && model.openRouterId.includes(':free')
  );
}

// Get models by task/use case with helpful messages
export function getModelsForTask(task: string): { models: any[], message: string } {
  const lowerTask = task.toLowerCase();
  let models: any[] = [];
  let message = '';
  
  if (lowerTask.includes('image') && lowerTask.includes('generat')) {
    models = getImageGenerationModels();
    message = `Found ${models.length} models specialized for image generation. These models can create images from text descriptions.`;
  } else if (lowerTask.includes('code') || lowerTask.includes('programming')) {
    models = getCodeGenerationModels();
    message = `Found ${models.length} models specialized for code generation. These models excel at writing, completing, and debugging code.`;
  } else if (lowerTask.includes('reason') || lowerTask.includes('math') || lowerTask.includes('logic')) {
    models = getReasoningModels();
    message = `Found ${models.length} models specialized for reasoning and mathematics. These models can solve complex problems step-by-step.`;
  } else if (lowerTask.includes('vision') || lowerTask.includes('image analys') || lowerTask.includes('describe image')) {
    models = getVisionLanguageModels();
    message = `Found ${models.length} vision-language models. These models can analyze and describe images, answer questions about visual content.`;
  } else if (lowerTask.includes('uncensor') || lowerTask.includes('unrestrict')) {
    models = getUncensoredModels();
    message = `Found ${models.length} uncensored models. These models have fewer content restrictions.`;
  } else if (lowerTask.includes('free')) {
    models = getFreeModels();
    message = `Found ${models.length} free models available through OpenRouter at no cost.`;
  } else {
    // Default search
    models = searchModels(task);
    message = models.length > 0 
      ? `Found ${models.length} models matching "${task}".`
      : `No models found matching "${task}". Try searching for: image generation, code generation, reasoning, vision, or chat.`;
  }
  
  return { models, message };
}
