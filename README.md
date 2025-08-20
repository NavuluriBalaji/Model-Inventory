# Model-Inventory: AI Model Showdown

Model-Inventory is a sleek, modern web application built with Next.js that allows you to send a single prompt to multiple open-source and proprietary AI models simultaneously and compare their responses in a clean, side-by-side interface.

![Model-Inventory Screenshot](https://res.cloudinary.com/dj4ppo7xm/image/upload/v1755707769/Screenshot_2025-08-20_220459_enoxrc.png)

---

## ✨ Key Features

- **Side-by-Side Model Comparison**: Enter a prompt once and get responses from multiple AI models displayed in a horizontally scrollable view.
- **Multiple Free & Paid Models**: Integrated with a variety of free-to-use models via OpenRouter (like Llama 3, DeepSeek, and Mistral) and Google's Gemini.
- **Performance Metrics**: Each response card displays how long the model took to generate the output, so you can compare speed.
- **Persistent Chat History**: Your conversations are saved in the collapsible sidebar, allowing you to revisit and continue them at any time.
- **Secure API Key Management**: API keys are stored securely in your browser's local storage and are never exposed to a server.
- **Dynamic & Interactive UI**:
    - A beautiful dark theme with a subtle animated gradient background.
    - A collapsible sidebar for managing chat history.
    - A clean, modern design inspired by leading AI chat applications.
- **Intelligent Response Formatting**: Automatically detects and pretty-prints JSON or table-formatted responses for better readability.
- **Responsive Design**: A great experience on both desktop and mobile devices.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **AI Integration**: [Genkit by Firebase](https://firebase.google.com/docs/genkit)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## 🚀 Getting Started

Follow these steps to get a local copy up and running.

### Prerequisites

- Node.js (v18 or newer)
- npm or yarn

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/NavuluriBalaji/Model-Inventory.git
    cd Model-Inventory
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up API Keys:**
    - Get your API keys from:
        - [Google AI Studio](https://ai.google.dev/) for the Gemini API Key.
        - [OpenRouter.ai](https://openrouter.ai/) for the OpenRouter API Key.
    - You can either set them in the in-app settings UI or create a `.env.local` file in the root of your project and add your keys there:
        ```.env.local
        GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
        OPENROUTER_API_KEY="YOUR_OPENROUTER_API_KEY"
        ```

4.  **Run the development server:**
    ```sh
    npm run dev
    ```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## 👤 Author

**Navuluri Balaji**

- **GitHub**: [@NavuluriBalaji](https://github.com/NavuluriBalaji)

---

Feel free to contribute to this project by submitting issues or pull requests. If you find it useful, please consider giving it a ⭐ on GitHub!
