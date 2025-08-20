"use client"

import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import AppHeader from "@/components/app/header"
import { PromptForm } from "@/components/app/prompt-form"
import { ResponseCard } from "@/components/app/response-card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Bot, MessageSquare, PlusCircle, User, Star, Github } from "lucide-react"
import { getModelResponses } from "@/ai/flows/get-model-responses"
import { useToast } from "@/hooks/use-toast"
import { ApiKeyManager } from "@/components/app/api-key-manager"
import { ModelSelection } from "@/components/app/model-selection"

interface AIResponse {
  id: string
  name: string
  response: string
  duration: number
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  responses?: AIResponse[];
}

interface Chat {
  id:string;
  title: string;
  messages: Message[];
}

const allModels = [
    { id: "gemini", name: "Gemini 1.5 Flash" },
    { id: "deepseek", name: "DeepSeek Chat" },
    { id: "llama", name: "Llama 3 8B Instruct" },
    { id: "mistral", name: "Mistral 7B Instruct" },
];

export default function Home() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [currentChat, setCurrentChat] = React.useState<Chat | null>(null);
  const [chatHistory, setChatHistory] = React.useState<Chat[]>([]);
  const [prompt, setPrompt] = React.useState<string>("")
  const [selectedModels, setSelectedModels] = React.useState<string[]>(allModels.map(m => m.id));
  const { toast } = useToast()

  const handleNewChat = () => {
    setCurrentChat(null);
    setPrompt("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!prompt || isLoading) return

    setIsLoading(true)
    
    const userMessage: Message = {
      id: new Date().toISOString() + '-user',
      role: 'user',
      content: prompt,
    };
    
    let currentMessages = currentChat ? [...currentChat.messages, userMessage] : [userMessage];
    let title = currentChat ? currentChat.title : prompt.substring(0, 30) + (prompt.length > 30 ? "..." : "");

    if (currentChat) {
      setCurrentChat(prev => ({...prev!, messages: [...prev!.messages, userMessage]}));
    } else {
      const newChatStub: Chat = {
        id: new Date().toISOString(),
        title,
        messages: [userMessage],
      };
      setCurrentChat(newChatStub);
    }

    try {
      const modelResponses = await getModelResponses({ prompt })
      
      const newResponses: AIResponse[] = allModels
        .filter(model => selectedModels.includes(model.id))
        .map(model => ({
          ...model,
          response: modelResponses[model.id]?.response || "No response from model.",
          duration: modelResponses[model.id]?.duration || 0,
      }))
      
      const assistantMessage: Message = {
        id: new Date().toISOString() + '-assistant',
        role: 'assistant',
        content: '',
        responses: newResponses,
      };

      currentMessages = [...currentMessages, assistantMessage];

      if (currentChat) {
        const updatedChat: Chat = {
          ...currentChat,
          messages: currentMessages,
        };
        setCurrentChat(updatedChat);
        setChatHistory(prev => prev.map(chat => chat.id === updatedChat.id ? updatedChat : chat));
      } else {
        const newChat: Chat = {
          id: new Date().toISOString(),
          title,
          messages: currentMessages,
        };
        setCurrentChat(newChat);
        setChatHistory(prev => [newChat, ...prev]);
      }
      setPrompt("");

    } catch (error) {
      console.error(error)
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: `Could not fetch responses. ${errorMessage}`,
      })
      setCurrentChat(prev => prev ? {...prev, messages: prev.messages.slice(0, -1)} : null);

    } finally {
      setIsLoading(false)
    }
  }
  
  const selectChat = (chat: Chat) => {
    setCurrentChat(chat);
  }

  const currentMessagesToDisplay = currentChat ? currentChat.messages : [];
  const modelsToDisplay = allModels.filter(m => selectedModels.includes(m.id));

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen flex-col bg-transparent overflow-hidden">
        <AppHeader>
           <div className="flex items-center gap-2">
              <ModelSelection 
                allModels={allModels}
                selectedModels={selectedModels}
                setSelectedModels={setSelectedModels}
              />
              <ApiKeyManager />
              <a href="https://github.com/NavuluriBalaji/Model-Inventory" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2">
                    <Star className="h-4 w-4"/>
                    Star
                </Button>
              </a>
           </div>
        </AppHeader>
        <div className="flex flex-1 overflow-hidden">
          <Sidebar collapsible="icon" className="border-r border-border/20 bg-card/50 backdrop-blur-lg">
            <SidebarHeader>
              <Button variant="ghost" className="justify-start w-full" onClick={handleNewChat}>
                <PlusCircle />
                <span className="group-data-[collapsible=icon]:hidden">New Chat</span>
              </Button>
            </SidebarHeader>
            <SidebarContent className="p-2">
              <SidebarMenu>
                {chatHistory.map((chat) => (
                  <SidebarMenuItem key={chat.id}>
                    <SidebarMenuButton 
                      onClick={() => selectChat(chat)}
                      isActive={currentChat?.id === chat.id}
                      tooltip={chat.title}
                      className="justify-start"
                    >
                      <MessageSquare />
                      <span className="truncate">{chat.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
            <SidebarSeparator />
            <SidebarFooter className="p-2">
               <div className="text-center text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">
                <p>Built by Navuluri Balaji</p>
                <a href="https://github.com/NavuluriBalaji" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
                  View on GitHub
                </a>
              </div>
               <div className="text-center group-data-[collapsible=expanded]:hidden">
                <a href="https://github.com/NavuluriBalaji" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                  <Github className="h-5 w-5 mx-auto" />
                </a>
              </div>
            </SidebarFooter>
          </Sidebar>

          <main className="flex-1 flex flex-col h-full overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 md:p-8">
              <div className="max-w-7xl mx-auto space-y-8">
                  {currentMessagesToDisplay.length === 0 && !isLoading && (
                     <div className="text-center text-muted-foreground py-24">
                        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                           Model-Inventory
                        </h1>
                        <p className="text-lg">Enter a prompt below to start comparing models.</p>
                     </div>
                  )}

                  {currentMessagesToDisplay.map((message) => (
                    <div key={message.id} className="space-y-6">
                      {message.role === 'user' && (
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                              <User className="h-5 w-5 text-primary-foreground" />
                          </div>
                          <p className="text-foreground/80 prose prose-sm max-w-none pt-1">{message.content}</p>
                        </div>
                      )}
                      {message.role === 'assistant' && message.responses && (
                         <div className="overflow-x-auto pb-4">
                            <div className="flex space-x-6">
                              {message.responses.map(res => (
                                 <div key={res.id} className="w-[400px] flex-shrink-0">
                                   <ResponseCard modelName={res.name} response={res.response} duration={res.duration} />
                                 </div>
                              ))}
                            </div>
                         </div>
                      )}
                    </div>
                  ))}

                  {isLoading && currentMessagesToDisplay[currentMessagesToDisplay.length - 1]?.role === 'user' && (
                    <div className="overflow-x-auto pb-4">
                      <div className="flex space-x-6">
                        {modelsToDisplay.map(model => (
                          <div key={model.id} className="flex flex-col space-y-3 p-4 border border-border/20 rounded-lg bg-card min-w-[400px]">
                             <div className="flex items-center gap-3">
                               <Skeleton className="h-6 w-32" />
                             </div>
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-[90%]" />
                            <Skeleton className="h-4 w-[95%]" />
                             <Skeleton className="h-4 w-[80%]" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>
            
            <div className="sticky bottom-0 w-full py-4 bg-background/10 backdrop-blur-sm">
               <div className="max-w-2xl mx-auto px-4">
                  <PromptForm
                    prompt={prompt}
                    setPrompt={setPrompt}
                    isLoading={isLoading}
                    onSubmit={handleSubmit}
                  />
               </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
