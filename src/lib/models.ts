
export const allModels = [
    {
        id: "gemini",
        name: "Google: Gemini 1.5 Flash",
        description: "Google's latest, fastest and most cost-effective multimodal model.",
        context: "1M tokens",
        openRouterId: null
    },
    {
        id: "llama",
        name: "Meta: Llama 3 8B Instruct",
        description: "The 8B instruction-tuned version of Meta's Llama 3 model.",
        context: "8K tokens",
        openRouterId: "meta-llama/llama-3-8b-instruct"
    },
    {
        id: "mistral",
        name: "Mistral: Mistral 7B Instruct",
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
        id: "openai-gpt-oss-20b",
        name: "OpenAI: gpt-oss-20b (free)",
        description: "An open-source model by OpenAI.",
        context: "N/A",
        openRouterId: "openai/gpt-oss-20b"
    },
    {
        id: "z-ai-glm-4-5-air",
        name: "Z.AI: GLM 4.5 Air (free)",
        description: "A lightweight and efficient model from Zhipu AI.",
        context: "N/A",
        openRouterId: "z-ai/glm-4.5-air"
    },
    {
        id: "qwen-qwen3-coder",
        name: "Qwen: Qwen3 Coder (free)",
        description: "A code-specific model from Alibaba Cloud, great for code generation and fixing.",
        context: "N/A",
        openRouterId: "qwen/qwen3-coder"
    },
    {
        id: "moonshot-kimi-k2",
        name: "MoonshotAI: Kimi K2 (free)",
        description: "A model by Moonshot AI.",
        context: "N/A",
        openRouterId: "moonshot-ai/kimi-k2"
    },
    {
        id: "venice-uncensored",
        name: "Venice: Uncensored (free)",
        description: "An uncensored model for a wide range of conversational topics.",
        context: "N/A",
        openRouterId: "venice/uncensored"
    },
    {
        id: "google-gemma-3n-2b",
        name: "Google: Gemma 3n 2B (free)",
        description: "A 2-billion parameter model from Google's Gemma family.",
        context: "N/A",
        openRouterId: "google/gemma-3n-2b"
    },
    {
        id: "tencent-hunyuan-a13b-instruct",
        name: "Tencent: Hunyuan A13B Instruct (free)",
        description: "An instruction-following model from Tencent.",
        context: "N/A",
        openRouterId: "tencent/hunyuan-a13b-instruct"
    },
    {
        id: "tng-deepseek-r1t2-chimera",
        name: "TNG: DeepSeek R1T2 Chimera (free)",
        description: "A powerful model from TNG and DeepSeek.",
        context: "N/A",
        openRouterId: "tng/deepseek-r1t2-chimera"
    },
    {
        id: "mistral-small-3-2-24b",
        name: "Mistral: Mistral Small 3.2 24B (free)",
        description: "A 24-billion parameter model from Mistral AI.",
        context: "N/A",
        openRouterId: "mistral/mistral-small-3.2-24b"
    },
    {
        id: "moonshot-kimi-dev-72b",
        name: "MoonshotAI: Kimi Dev 72B (free)",
        description: "A large 72-billion parameter developer-focused model.",
        context: "N/A",
        openRouterId: "moonshot-ai/kimi-dev-72b"
    },
    {
        id: "deepseek-r1-0528-qwen3-8b",
        name: "DeepSeek: R1 0528 Qwen3 8B (free)",
        description: "A hybrid model from DeepSeek and Qwen.",
        context: "N/A",
        openRouterId: "deepseek/deepseek-r1-0528-qwen3-8b"
    },
    {
        id: "deepseek-r1-0528",
        name: "DeepSeek: R1 0528 (free)",
        description: "A recent model from DeepSeek.",
        context: "N/A",
        openRouterId: "deepseek/deepseek-r1-0528"
    },
    {
        id: "sarvam-ai-sarvam-m",
        name: "Sarvam AI: Sarvam-M (free)",
        description: "A model from the Indian AI company Sarvam AI.",
        context: "N/A",
        openRouterId: "sarvam-ai/sarvam-m"
    },
    {
        id: "mistral-devstral-small-2505",
        name: "Mistral: Devstral Small 2505 (free)",
        description: "A developer-focused model from Mistral AI.",
        context: "N/A",
        openRouterId: "mistral/devstral-small-2505"
    },
    {
        id: "qwen-qwen2-5-coder-32b-instruct",
        name: "Qwen: Qwen2.5 Coder 32B Instruct (free)",
        description: "The latest 32B parameter code-specific model from Qwen, great for code agents.",
        context: "33K context",
        openRouterId: "qwen/qwen2.5-coder-32b-instruct"
    },
    {
        id: "meta-llama-3-2-3b-instruct",
        name: "Meta: Llama 3.2 3B Instruct (free)",
        description: "A 3B parameter multilingual model for dialogue, reasoning, and summarization.",
        context: "131K context",
        openRouterId: "meta-llama/llama-3.2-3b-instruct"
    },
    {
        id: "meta-llama-3-2-11b-vision-instruct",
        name: "Meta: Llama 3.2 11B Vision Instruct (free)",
        description: "An 11B parameter multimodal model for combining visual and text data.",
        context: "131K context",
        openRouterId: "meta-llama/llama-3.2-11b-vision-instruct"
    },
    {
        id: "qwen-qwen2-5-72b-instruct",
        name: "Qwen: Qwen2.5 72B Instruct (free)",
        description: "The latest 72B parameter model from Qwen, with strong coding, math and long-context support.",
        context: "33K context",
        openRouterId: "qwen/qwen2.5-72b-instruct"
    },
    {
        id: "meta-llama-3-1-405b-instruct",
        name: "Meta: Llama 3.1 405B Instruct (free)",
        description: "The highly anticipated 405B parameter Llama 3.1 model, optimized for high-quality dialogue.",
        context: "66K context",
        openRouterId: "meta-llama/llama-3.1-405b-instruct"
    },
    {
        id: "mistral-mistral-nemo",
        name: "Mistral: Mistral Nemo (free)",
        description: "A 12B parameter model with a 128k token context length built by Mistral and NVIDIA.",
        context: "131K context",
        openRouterId: "mistralai/mistral-nemo"
    },
    {
        id: "google-gemma-2-9b",
        name: "Google: Gemma 2 9B (free)",
        description: "An advanced, open-source 9B parameter model from Google, setting new standards for its size class.",
        context: "8K context",
        openRouterId: "google/gemma-2-9b"
    }
];

    
