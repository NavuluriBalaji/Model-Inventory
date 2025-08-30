import type {Metadata} from 'next';
import './globals.css';
import './background.css';
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: {
    default: "Model-Inventory: Compare AI Models",
    template: "%s | Model-Inventory",
  },
  description: 'Compare outputs from multiple AI models side-by-side. Send one prompt to Gemini, GPT-4, Llama, Claude and more. Supports image and text analysis.',
  keywords: ["AI", "Model Comparison", "LLM", "Large Language Models", "Gemini", "GPT-4", "Claude", "Llama", "OpenAI", "Google", "Anthropic", "Meta"],
  authors: [{ name: 'Navuluri Balaji', url: 'https://github.com/NavuluriBalaji' }],
  openGraph: {
    title: 'Model-Inventory: AI Model Showdown',
    description: 'Compare outputs from multiple AI models side-by-side in a clean, modern interface.',
    url: 'https://model-inventory.com', // Replace with your actual domain
    siteName: 'Model-Inventory',
    images: [
      {
        url: 'https://placehold.co/1200x630.png?text=Model-Inventory', // Replace with your actual OG image
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Model-Inventory: AI Model Showdown',
    description: 'Compare outputs from multiple AI models side-by-side. Send one prompt to Gemini, GPT-4, Llama, Claude and more.',
    // creator: '@your_twitter_handle', // Replace with your Twitter handle
    images: ['https://placehold.co/1200x630.png?text=Model-Inventory'], // Replace with your actual Twitter image
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=pub-7588559034223859
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className="antialiased">
        <div className="background-animation" />
        <main className="relative z-10">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
