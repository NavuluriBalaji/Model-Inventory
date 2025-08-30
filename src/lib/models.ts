
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
        name: "Google: Gemini 2.0 flash",
        description: "The original Pro-grade Gemini model, balanced for performance and cost.",
        context: "32K tokens",
        openRouterId: null,
        genkitId: 'googleai/gemini-2.0-flash',
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
    },
    // Additional free OpenRouter models
    {
        id: "google-gemini-2-5-flash-image-preview-free",
        name: "Google: Gemini 2.5 Flash Image Preview (free)",
        description: "Gemini 2.5 Flash Image Preview is a state of the art image generation model with contextual understanding. It is capable of image generation, edits, and multi-turn conversations.",
        context: "32K tokens",
        openRouterId: "google/gemini-2.5-flash-image-preview:free"
    },
    {
        id: "deepseek-deepseek-chat-v3-1-free",
        name: "DeepSeek: DeepSeek V3.1 (free)",
        description: "DeepSeek-V3.1 is a large hybrid reasoning model (671B parameters, 37B active) that supports both thinking and non-thinking modes via prompt templates. It extends the DeepSeek-V3 base with a two-phase ...",
        context: "64K tokens",
        openRouterId: "deepseek/deepseek-chat-v3.1:free"
    },
    {
        id: "openai-gpt-oss-120b-free",
        name: "OpenAI: gpt-oss-120b (free)",
        description: "gpt-oss-120b is an open-weight, 117B-parameter Mixture-of-Experts (MoE) language model from OpenAI designed for high-reasoning, agentic, and general-purpose production use cases. It activates 5.1B par...",
        context: "32K tokens",
        openRouterId: "openai/gpt-oss-120b:free"
    },
    {
        id: "openai-gpt-oss-20b-free",
        name: "OpenAI: gpt-oss-20b (free)",
        description: "gpt-oss-20b is an open-weight 21B parameter model released by OpenAI under the Apache 2.0 license. It uses a Mixture-of-Experts (MoE) architecture with 3.6B active parameters per forward pass, optimiz...",
        context: "131K tokens",
        openRouterId: "openai/gpt-oss-20b:free"
    },
    {
        id: "z-ai-glm-4-5-air-free",
        name: "Z.AI: GLM 4.5 Air (free)",
        description: "GLM-4.5-Air is the lightweight variant of our latest flagship model family, also purpose-built for agent-centric applications. Like GLM-4.5, it adopts the Mixture-of-Experts (MoE) architecture but wit...",
        context: "131K tokens",
        openRouterId: "z-ai/glm-4.5-air:free"
    },
    {
        id: "qwen-qwen3-coder-free",
        name: "Qwen: Qwen3 Coder 480B A35B (free)",
        description: "Qwen3-Coder-480B-A35B-Instruct is a Mixture-of-Experts (MoE) code generation model developed by the Qwen team. It is optimized for agentic coding tasks such as function calling, tool use, and long-con...",
        context: "262K tokens",
        openRouterId: "qwen/qwen3-coder:free"
    },
    {
        id: "moonshotai-kimi-k2-free",
        name: "MoonshotAI: Kimi K2 (free)",
        description: "Kimi K2 Instruct is a large-scale Mixture-of-Experts (MoE) language model developed by Moonshot AI, featuring 1 trillion total parameters with 32 billion active per forward pass. It is optimized for a...",
        context: "32K tokens",
        openRouterId: "moonshotai/kimi-k2:free"
    },
    {
        id: "cognitivecomputations-dolphin-mistral-24b-venice-edition-free",
        name: "Venice: Uncensored (free)",
        description: "Venice Uncensored Dolphin Mistral 24B Venice Edition is a fine-tuned variant of Mistral-Small-24B-Instruct-2501, developed by dphn.ai in collaboration with Venice.ai. This model is designed as an âu...",
        context: "32K tokens",
        openRouterId: "cognitivecomputations/dolphin-mistral-24b-venice-edition:free"
    },
    {
        id: "google-gemma-3n-e2b-it-free",
        name: "Google: Gemma 3n 2B (free)",
        description: "Gemma 3n E2B IT is a multimodal, instruction-tuned model developed by Google DeepMind, designed to operate efficiently at an effective parameter size of 2B while leveraging a 6B architecture. Based on...",
        context: "8K tokens",
        openRouterId: "google/gemma-3n-e2b-it:free"
    },
    {
        id: "tencent-hunyuan-a13b-instruct-free",
        name: "Tencent: Hunyuan A13B Instruct (free)",
        description: "Hunyuan-A13B is a 13B active parameter Mixture-of-Experts (MoE) language model developed by Tencent, with a total parameter count of 80B and support for reasoning via Chain-of-Thought. It offers compe...",
        context: "32K tokens",
        openRouterId: "tencent/hunyuan-a13b-instruct:free"
    },
    {
        id: "tngtech-deepseek-r1t2-chimera-free",
        name: "TNG: DeepSeek R1T2 Chimera (free)",
        description: "DeepSeek-TNG-R1T2-Chimera is the second-generation Chimera model from TNG Tech. It is a 671 B-parameter mixture-of-experts text-generation model assembled from DeepSeek-AIâs R1-0528, R1, and V3-0324...",
        context: "163K tokens",
        openRouterId: "tngtech/deepseek-r1t2-chimera:free"
    },
    {
        id: "mistralai-mistral-small-3-2-24b-instruct-free",
        name: "Mistral: Mistral Small 3.2 24B (free)",
        description: "Mistral-Small-3.2-24B-Instruct-2506 is an updated 24B parameter model from Mistral optimized for instruction following, repetition reduction, and improved function calling. Compared to the 3.1 release...",
        context: "131K tokens",
        openRouterId: "mistralai/mistral-small-3.2-24b-instruct:free"
    },
    {
        id: "moonshotai-kimi-dev-72b-free",
        name: "MoonshotAI: Kimi Dev 72B (free)",
        description: "Kimi-Dev-72B is an open-source large language model fine-tuned for software engineering and issue resolution tasks. Based on Qwen2.5-72B, it is optimized using large-scale reinforcement learning that ...",
        context: "131K tokens",
        openRouterId: "moonshotai/kimi-dev-72b:free"
    },
    {
        id: "deepseek-deepseek-r1-0528-qwen3-8b-free",
        name: "DeepSeek: Deepseek R1 0528 Qwen3 8B (free)",
        description: "DeepSeek-R1-0528 is a lightly upgraded release of DeepSeek R1 that taps more compute and smarter post-training tricks, pushing its reasoning and inference to the brink of flagship models like O3 and G...",
        context: "131K tokens",
        openRouterId: "deepseek/deepseek-r1-0528-qwen3-8b:free"
    },
    {
        id: "deepseek-deepseek-r1-0528-free",
        name: "DeepSeek: R1 0528 (free)",
        description: "May 28th update to the [original DeepSeek R1](/deepseek/deepseek-r1) Performance on par with [OpenAI o1](/openai/o1), but open-sourced and with fully open reasoning tokens. It's 671B parameters in siz...",
        context: "163K tokens",
        openRouterId: "deepseek/deepseek-r1-0528:free"
    },
    {
        id: "sarvamai-sarvam-m-free",
        name: "Sarvam AI: Sarvam-M (free)",
        description: "Sarvam-M is a 24 B-parameter, instruction-tuned derivative of Mistral-Small-3.1-24B-Base-2503, post-trained on English plus eleven major Indic languages (bn, hi, kn, gu, mr, ml, or, pa, ta, te). The m...",
        context: "32K tokens",
        openRouterId: "sarvamai/sarvam-m:free"
    },
    {
        id: "mistralai-devstral-small-2505-free",
        name: "Mistral: Devstral Small 2505 (free)",
        description: "Devstral-Small-2505 is a 24B parameter agentic LLM fine-tuned from Mistral-Small-3.1, jointly developed by Mistral AI and All Hands AI for advanced software engineering tasks. It is optimized for code...",
        context: "32K tokens",
        openRouterId: "mistralai/devstral-small-2505:free"
    },
    {
        id: "google-gemma-3n-e4b-it-free",
        name: "Google: Gemma 3n 4B (free)",
        description: "Gemma 3n E4B-it is optimized for efficient execution on mobile and low-resource devices, such as phones, laptops, and tablets. It supports multimodal inputsâincluding text, visual data, and audioâ...",
        context: "8K tokens",
        openRouterId: "google/gemma-3n-e4b-it:free"
    },
    {
        id: "meta-llama-llama-3-3-8b-instruct-free",
        name: "Meta: Llama 3.3 8B Instruct (free)",
        description: "A lightweight and ultra-fast variant of Llama 3.3 70B, for use when quick response times are needed most.",
        context: "128K tokens",
        openRouterId: "meta-llama/llama-3.3-8b-instruct:free"
    },
    {
        id: "qwen-qwen3-4b-free",
        name: "Qwen: Qwen3 4B (free)",
        description: "Qwen3-4B is a 4 billion parameter dense language model from the Qwen3 series, designed to support both general-purpose and reasoning-intensive tasks. It introduces a dual-mode architectureâthinking ...",
        context: "40K tokens",
        openRouterId: "qwen/qwen3-4b:free"
    },
    {
        id: "qwen-qwen3-30b-a3b-free",
        name: "Qwen: Qwen3 30B A3B (free)",
        description: "Qwen3, the latest generation in the Qwen large language model series, features both dense and mixture-of-experts (MoE) architectures to excel in reasoning, multilingual support, and advanced agent tas...",
        context: "40K tokens",
        openRouterId: "qwen/qwen3-30b-a3b:free"
    },
    {
        id: "qwen-qwen3-8b-free",
        name: "Qwen: Qwen3 8B (free)",
        description: "Qwen3-8B is a dense 8.2B parameter causal language model from the Qwen3 series, designed for both reasoning-heavy tasks and efficient dialogue. It supports seamless switching between \"thinking\" mode...",
        context: "40K tokens",
        openRouterId: "qwen/qwen3-8b:free"
    },
    {
        id: "qwen-qwen3-14b-free",
        name: "Qwen: Qwen3 14B (free)",
        description: "Qwen3-14B is a dense 14.8B parameter causal language model from the Qwen3 series, designed for both complex reasoning and efficient dialogue. It supports seamless switching between a \"thinking\" mode...",
        context: "40K tokens",
        openRouterId: "qwen/qwen3-14b:free"
    },
    {
        id: "qwen-qwen3-235b-a22b-free",
        name: "Qwen: Qwen3 235B A22B (free)",
        description: "Qwen3-235B-A22B is a 235B parameter mixture-of-experts (MoE) model developed by Qwen, activating 22B parameters per forward pass. It supports seamless switching between a \"thinking\" mode for complex...",
        context: "131K tokens",
        openRouterId: "qwen/qwen3-235b-a22b:free"
    },
    {
        id: "tngtech-deepseek-r1t-chimera-free",
        name: "TNG: DeepSeek R1T Chimera (free)",
        description: "DeepSeek-R1T-Chimera is created by merging DeepSeek-R1 and DeepSeek-V3 (0324), combining the reasoning capabilities of R1 with the token efficiency improvements of V3. It is based on a DeepSeek-MoE Tr...",
        context: "163K tokens",
        openRouterId: "tngtech/deepseek-r1t-chimera:free"
    },
    {
        id: "microsoft-mai-ds-r1-free",
        name: "Microsoft: MAI DS R1 (free)",
        description: "MAI-DS-R1 is a post-trained variant of DeepSeek-R1 developed by the Microsoft AI team to improve the modelâs responsiveness on previously blocked topics while enhancing its safety profile. Built on ...",
        context: "163K tokens",
        openRouterId: "microsoft/mai-ds-r1:free"
    },
    {
        id: "shisa-ai-shisa-v2-llama3-3-70b-free",
        name: "Shisa AI: Shisa V2 Llama 3.3 70B  (free)",
        description: "Shisa V2 Llama 3.3 70B is a bilingual Japanese-English chat model fine-tuned by Shisa.AI on Metaâs Llama-3.3-70B-Instruct base. It prioritizes Japanese language performance while retaining strong En...",
        context: "32K tokens",
        openRouterId: "shisa-ai/shisa-v2-llama3.3-70b:free"
    },
    {
        id: "arliai-qwq-32b-arliai-rpr-v1-free",
        name: "ArliAI: QwQ 32B RpR v1 (free)",
        description: "QwQ-32B-ArliAI-RpR-v1 is a 32B parameter model fine-tuned from Qwen/QwQ-32B using a curated creative writing and roleplay dataset originally developed for the RPMax series. It is designed to maintain ...",
        context: "32K tokens",
        openRouterId: "arliai/qwq-32b-arliai-rpr-v1:free"
    },
    {
        id: "agentica-org-deepcoder-14b-preview-free",
        name: "Agentica: Deepcoder 14B Preview (free)",
        description: "DeepCoder-14B-Preview is a 14B parameter code generation model fine-tuned from DeepSeek-R1-Distill-Qwen-14B using reinforcement learning with GRPO+ and iterative context lengthening. It is optimized f...",
        context: "96K tokens",
        openRouterId: "agentica-org/deepcoder-14b-preview:free"
    },
    {
        id: "moonshotai-kimi-vl-a3b-thinking-free",
        name: "MoonshotAI: Kimi VL A3B Thinking (free)",
        description: "Kimi-VL is a lightweight Mixture-of-Experts vision-language model that activates only 2.8B parameters per step while delivering strong performance on multimodal reasoning and long-context tasks. The K...",
        context: "131K tokens",
        openRouterId: "moonshotai/kimi-vl-a3b-thinking:free"
    },
    {
        id: "nvidia-llama-3-1-nemotron-ultra-253b-v1-free",
        name: "NVIDIA: Llama 3.1 Nemotron Ultra 253B v1 (free)",
        description: "Llama-3.1-Nemotron-Ultra-253B-v1 is a large language model (LLM) optimized for advanced reasoning, human-interactive chat, retrieval-augmented generation (RAG), and tool-calling tasks. Derived from Me...",
        context: "131K tokens",
        openRouterId: "nvidia/llama-3.1-nemotron-ultra-253b-v1:free"
    },
    {
        id: "meta-llama-llama-4-maverick-free",
        name: "Meta: Llama 4 Maverick (free)",
        description: "Llama 4 Maverick 17B Instruct (128E) is a high-capacity multimodal language model from Meta, built on a mixture-of-experts (MoE) architecture with 128 experts and 17 billion active parameters per forw...",
        context: "128K tokens",
        openRouterId: "meta-llama/llama-4-maverick:free"
    },
    {
        id: "meta-llama-llama-4-scout-free",
        name: "Meta: Llama 4 Scout (free)",
        description: "Llama 4 Scout 17B Instruct (16E) is a mixture-of-experts (MoE) language model developed by Meta, activating 17 billion parameters out of a total of 109B. It supports native multimodal input (text and ...",
        context: "128K tokens",
        openRouterId: "meta-llama/llama-4-scout:free"
    },
    {
        id: "google-gemini-2-5-pro-exp-03-25",
        name: "Google: Gemini 2.5 Pro Experimental",
        description: "This model has been deprecated by Google in favor of the (paid Preview model)[google/gemini-2.5-pro-preview] Â  Gemini 2.5 Pro is Googleâs state-of-the-art AI model designed for advanced reasoning, ...",
        context: "1M tokens",
        openRouterId: "google/gemini-2.5-pro-exp-03-25"
    },
    {
        id: "qwen-qwen2-5-vl-32b-instruct-free",
        name: "Qwen: Qwen2.5 VL 32B Instruct (free)",
        description: "Qwen2.5-VL-32B is a multimodal vision-language model fine-tuned through reinforcement learning for enhanced mathematical reasoning, structured outputs, and visual problem-solving capabilities. It exce...",
        context: "8K tokens",
        openRouterId: "qwen/qwen2.5-vl-32b-instruct:free"
    },
    {
        id: "deepseek-deepseek-chat-v3-0324-free",
        name: "DeepSeek: DeepSeek V3 0324 (free)",
        description: "DeepSeek V3, a 685B-parameter, mixture-of-experts model, is the latest iteration of the flagship chat model family from the DeepSeek team.  It succeeds the [DeepSeek V3](/deepseek/deepseek-chat-v3) mo...",
        context: "163K tokens",
        openRouterId: "deepseek/deepseek-chat-v3-0324:free"
    },
    {
        id: "mistralai-mistral-small-3-1-24b-instruct-free",
        name: "Mistral: Mistral Small 3.1 24B (free)",
        description: "Mistral Small 3.1 24B Instruct is an upgraded variant of Mistral Small 3 (2501), featuring 24 billion parameters with advanced multimodal capabilities. It provides state-of-the-art performance in text...",
        context: "128K tokens",
        openRouterId: "mistralai/mistral-small-3.1-24b-instruct:free"
    },
    {
        id: "google-gemma-3-4b-it-free",
        name: "Google: Gemma 3 4B (free)",
        description: "Gemma 3 introduces multimodality, supporting vision-language input and text outputs. It handles context windows up to 128k tokens, understands over 140 languages, and offers improved math, reasoning, ...",
        context: "32K tokens",
        openRouterId: "google/gemma-3-4b-it:free"
    },
    {
        id: "google-gemma-3-12b-it-free",
        name: "Google: Gemma 3 12B (free)",
        description: "Gemma 3 introduces multimodality, supporting vision-language input and text outputs. It handles context windows up to 128k tokens, understands over 140 languages, and offers improved math, reasoning, ...",
        context: "32K tokens",
        openRouterId: "google/gemma-3-12b-it:free"
    },
    {
        id: "rekaai-reka-flash-3-free",
        name: "Reka: Flash 3 (free)",
        description: "Reka Flash 3 is a general-purpose, instruction-tuned large language model with 21 billion parameters, developed by Reka. It excels at general chat, coding tasks, instruction-following, and function ca...",
        context: "32K tokens",
        openRouterId: "rekaai/reka-flash-3:free"
    },
    {
        id: "google-gemma-3-27b-it-free",
        name: "Google: Gemma 3 27B (free)",
        description: "Gemma 3 introduces multimodality, supporting vision-language input and text outputs. It handles context windows up to 128k tokens, understands over 140 languages, and offers improved math, reasoning, ...",
        context: "96K tokens",
        openRouterId: "google/gemma-3-27b-it:free"
    },
    {
        id: "qwen-qwq-32b-free",
        name: "Qwen: QwQ 32B (free)",
        description: "QwQ is the reasoning model of the Qwen series. Compared with conventional instruction-tuned models, QwQ, which is capable of thinking and reasoning, can achieve significantly enhanced performance in d...",
        context: "32K tokens",
        openRouterId: "qwen/qwq-32b:free"
    },
    {
        id: "nousresearch-deephermes-3-llama-3-8b-preview-free",
        name: "Nous: DeepHermes 3 Llama 3 8B Preview (free)",
        description: "DeepHermes 3 Preview is the latest version of our flagship Hermes series of LLMs by Nous Research, and one of the first models in the world to unify Reasoning (long chains of thought that improve answ...",
        context: "131K tokens",
        openRouterId: "nousresearch/deephermes-3-llama-3-8b-preview:free"
    },
    {
        id: "cognitivecomputations-dolphin3-0-r1-mistral-24b-free",
        name: "Dolphin3.0 R1 Mistral 24B (free)",
        description: "Dolphin 3.0 R1 is the next generation of the Dolphin series of instruct-tuned models.  Designed to be the ultimate general purpose local model, enabling coding, math, agentic, function calling, and ge...",
        context: "32K tokens",
        openRouterId: "cognitivecomputations/dolphin3.0-r1-mistral-24b:free"
    },
    {
        id: "cognitivecomputations-dolphin3-0-mistral-24b-free",
        name: "Dolphin3.0 Mistral 24B (free)",
        description: "Dolphin 3.0 is the next generation of the Dolphin series of instruct-tuned models.  Designed to be the ultimate general purpose local model, enabling coding, math, agentic, function calling, and gener...",
        context: "32K tokens",
        openRouterId: "cognitivecomputations/dolphin3.0-mistral-24b:free"
    },
    {
        id: "qwen-qwen2-5-vl-72b-instruct-free",
        name: "Qwen: Qwen2.5 VL 72B Instruct (free)",
        description: "Qwen2.5-VL is proficient in recognizing common objects such as flowers, birds, fish, and insects. It is also highly capable of analyzing texts, charts, icons, graphics, and layouts within images.",
        context: "32K tokens",
        openRouterId: "qwen/qwen2.5-vl-72b-instruct:free"
    },
    {
        id: "mistralai-mistral-small-24b-instruct-2501-free",
        name: "Mistral: Mistral Small 3 (free)",
        description: "Mistral Small 3 is a 24B-parameter language model optimized for low-latency performance across common AI tasks. Released under the Apache 2.0 license, it features both pre-trained and instruction-tune...",
        context: "32K tokens",
        openRouterId: "mistralai/mistral-small-24b-instruct-2501:free"
    },
    {
        id: "deepseek-deepseek-r1-distill-qwen-14b-free",
        name: "DeepSeek: R1 Distill Qwen 14B (free)",
        description: "DeepSeek R1 Distill Qwen 14B is a distilled large language model based on [Qwen 2.5 14B](https://huggingface.co/deepseek-ai/DeepSeek-R1-Distill-Qwen-14B), using outputs from [DeepSeek R1](/deepseek/de...",
        context: "64K tokens",
        openRouterId: "deepseek/deepseek-r1-distill-qwen-14b:free"
    },
    {
        id: "deepseek-deepseek-r1-distill-llama-70b-free",
        name: "DeepSeek: R1 Distill Llama 70B (free)",
        description: "DeepSeek R1 Distill Llama 70B is a distilled large language model based on [Llama-3.3-70B-Instruct](/meta-llama/llama-3.3-70b-instruct), using outputs from [DeepSeek R1](/deepseek/deepseek-r1). The mo...",
        context: "8K tokens",
        openRouterId: "deepseek/deepseek-r1-distill-llama-70b:free"
    },
    {
        id: "deepseek-deepseek-r1-free",
        name: "DeepSeek: R1 (free)",
        description: "DeepSeek R1 is here: Performance on par with [OpenAI o1](/openai/o1), but open-sourced and with fully open reasoning tokens. It's 671B parameters in size, with 37B active in an inference pass.  Fully ...",
        context: "163K tokens",
        openRouterId: "deepseek/deepseek-r1:free"
    },
    {
        id: "google-gemini-2-0-flash-exp-free",
        name: "Google: Gemini 2.0 Flash Experimental (free)",
        description: "Gemini Flash 2.0 offers a significantly faster time to first token (TTFT) compared to [Gemini Flash 1.5](/google/gemini-flash-1.5), while maintaining quality on par with larger models like [Gemini Pro...",
        context: "1M tokens",
        openRouterId: "google/gemini-2.0-flash-exp:free"
    },
    {
        id: "meta-llama-llama-3-3-70b-instruct-free",
        name: "Meta: Llama 3.3 70B Instruct (free)",
        description: "The Meta Llama 3.3 multilingual large language model (LLM) is a pretrained and instruction tuned generative model in 70B (text in/text out). The Llama 3.3 instruction tuned text only model is optimize...",
        context: "65K tokens",
        openRouterId: "meta-llama/llama-3.3-70b-instruct:free"
    },
    {
        id: "qwen-qwen-2-5-coder-32b-instruct-free",
        name: "Qwen2.5 Coder 32B Instruct (free)",
        description: "Qwen2.5-Coder is the latest series of Code-Specific Qwen large language models (formerly known as CodeQwen). Qwen2.5-Coder brings the following improvements upon CodeQwen1.5:  - Significantly improvem...",
        context: "32K tokens",
        openRouterId: "qwen/qwen-2.5-coder-32b-instruct:free"
    },
    {
        id: "meta-llama-llama-3-2-3b-instruct-free",
        name: "Meta: Llama 3.2 3B Instruct (free)",
        description: "Llama 3.2 3B is a 3-billion-parameter multilingual large language model, optimized for advanced natural language processing tasks like dialogue generation, reasoning, and summarization. Designed with ...",
        context: "131K tokens",
        openRouterId: "meta-llama/llama-3.2-3b-instruct:free"
    },
    {
        id: "qwen-qwen-2-5-72b-instruct-free",
        name: "Qwen2.5 72B Instruct (free)",
        description: "Qwen2.5 72B is the latest series of Qwen large language models. Qwen2.5 brings the following improvements upon Qwen2:  - Significantly more knowledge and has greatly improved capabilities in coding an...",
        context: "32K tokens",
        openRouterId: "qwen/qwen-2.5-72b-instruct:free"
    }
];
