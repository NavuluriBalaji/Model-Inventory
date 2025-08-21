
export const allModels = [
    {
        id: "gemini-1.5-flash",
        name: "Google: Gemini 1.5 Flash",
        description: "Google's fastest and most cost-effective multimodal model.",
        context: "1M tokens",
        openRouterId: null,
        genkitId: 'googleai/gemini-1.5-flash-latest',
    },
    {
        id: "gemini-1.5-pro",
        name: "Google: Gemini 1.5 Pro",
        description: "Google's flagship model, with a massive context window and advanced multimodal reasoning.",
        context: "1M tokens",
        openRouterId: null,
        genkitId: 'googleai/gemini-1.5-pro-latest',
    },
    {
        id: "gemini-1.0-pro",
        name: "Google: Gemini 1.0 Pro",
        description: "The original Pro-grade Gemini model, balanced for performance and cost.",
        context: "32K tokens",
        openRouterId: null,
        genkitId: 'googleai/gemini-1.0-pro',
    },
    {
        id: "llama",
        name: "Meta: Llama 3 8B Instruct",
        description: "The 8B instruction-tuned version of Meta's Llama 3 model.",
        context: "8K tokens",
        openRouterId: "meta-llama/llama-3-8b-instruct"
    },
    {
        id: "mistral-7b",
        name: "Mistral: Mistral 7B Instruct (free)",
        description: "The 7B instruction-tuned model from Mistral AI.",
        context: "32K tokens",
        openRouterId: "mistralai/mistral-7b-instruct"
    },
    {
        id: "deepseek-chat",
        name: "DeepSeek: DeepSeek Chat",
        description: "A chat model from DeepSeek AI, specializing in conversation.",
        context: "32K tokens",
        openRouterId: "deepseek/deepseek-chat"
    },
    {
        id: "mistral-small",
        name: "Mistral: Mistral Small (free)",
        description: "A small, efficient model from Mistral AI, great for simple tasks.",
        context: "32K tokens",
        openRouterId: "mistralai/mistral-small"
    },
    {
        id: "qwen-qwen2-72b-instruct",
        name: "Qwen: Qwen2 72B Instruct (free)",
        description: "The 72B parameter model from Qwen, with strong coding, math and long-context support.",
        context: "128K context",
        openRouterId: "qwen/qwen2-72b-instruct"
    },
    {
        id: "meta-llama-3-1-405b-instruct",
        name: "Meta: Llama 3.1 405B Instruct (free)",
        description: "The highly anticipated 405B parameter Llama 3.1 model, optimized for high-quality dialogue.",
        context: "128K context",
        openRouterId: "meta-llama/llama-3.1-405b-instruct"
    },
    {
        id: "mistral-nemo",
        name: "Mistral: Mistral Nemo (free)",
        description: "A 12B parameter model with a 128k token context length built by Mistral and NVIDIA.",
        context: "128K context",
        openRouterId: "mistralai/mistral-nemo"
    },
    {
        id: "google-gemma-2-9b",
        name: "Google: Gemma 2 9B (free)",
        description: "An advanced, open-source 9B parameter model from Google, setting new standards for its size class.",
        context: "8K context",
        openRouterId: "google/gemma-2-9b-instruct"
    },
    {
        id: "nvidia-nemotron-4-340b-instruct",
        name: "Nvidia: Nemotron-4 340B Instruct",
        description: "NVIDIA's powerful Nemotron-4 340B model, adapted for instruction-following.",
        context: "4K context",
        openRouterId: "nvidia/nemotron-4-340b-instruct"
    }
];
