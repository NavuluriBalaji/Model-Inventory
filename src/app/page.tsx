
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
import { allModels } from "@/lib/models"
import { CameraCaptureDialog } from "@/components/app/camera-capture"

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
  file?: {
    dataUri: string;
    name: string;
    type: string;
  } | null;
  responses?: AIResponse[];
}

interface Chat {
  id:string;
  title: string;
  messages: Message[];
}

const CHAT_HISTORY_STORAGE_KEY = "chat_history";

export default function Home() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [currentChatId, setCurrentChatId] = React.useState<string | null>(null);
  const [chatHistory, setChatHistory] = React.useState<Chat[]>([]);
  const [prompt, setPrompt] = React.useState<string>("")
  const [file, setFile] = React.useState<{dataUri: string, name: string, type: string} | null>(null);
  const [selectedModels, setSelectedModels] = React.useState<string[]>(['gemini-1.5-flash', 'llama', 'mistral-7b']);
  const { toast } = useToast()
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const [isCameraOpen, setIsCameraOpen] = React.useState(false);

  // Load chat history from localStorage on mount
  React.useEffect(() => {
    const storedHistory = localStorage.getItem(CHAT_HISTORY_STORAGE_KEY);
    if (storedHistory) {
      try {
        const parsedHistory = JSON.parse(storedHistory);
        setChatHistory(parsedHistory);
        if (parsedHistory.length > 0 && !currentChatId) {
            setCurrentChatId(parsedHistory[0].id);
        }
      } catch (error) {
        console.error("Failed to parse chat history from localStorage", error);
      }
    }
  }, []);

  // Save chat history to localStorage whenever it changes
  React.useEffect(() => {
    if (chatHistory.length > 0) {
      localStorage.setItem(CHAT_HISTORY_STORAGE_KEY, JSON.stringify(chatHistory));
    }
  }, [chatHistory]);


  const handleNewChat = () => {
    const newChat: Chat = {
        id: new Date().toISOString(),
        title: "New Chat",
        messages: [],
    };
    setChatHistory(prev => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
    setPrompt("");
    setFile(null);
  };
  
  const getApiKeys = () => {
    if (typeof window === "undefined") return null;
    const storedKeys = localStorage.getItem("ai_api_keys");
    if (!storedKeys) return null;
    try {
      return JSON.parse(storedKeys);
    } catch (e) {
      return null;
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if ((!prompt && !file) || isLoading) return
    
    const keys = getApiKeys();
    const openRouterModelsSelected = selectedModels.some(id => allModels.find(m => m.id === id)?.openRouterId);
    const geminiModelsSelected = selectedModels.some(id => allModels.find(m => m.id === id)?.genkitId);

    if (!keys || (openRouterModelsSelected && !keys.openrouter) || (geminiModelsSelected && !keys.gemini)) {
      setIsSettingsOpen(true);
      toast({
        variant: "destructive",
        title: "API Keys Required",
        description: "Please enter your API keys in the settings to continue.",
      })
      return;
    }

    setIsLoading(true)

    let activeChatId = currentChatId;
    let isNewChat = false;

    if (!activeChatId) {
        const newChat: Chat = {
            id: new Date().toISOString(),
            title: (prompt || "File Query").substring(0, 30) + "...",
            messages: [],
        };
        setChatHistory(prev => [newChat, ...prev]);
        setCurrentChatId(newChat.id);
        activeChatId = newChat.id;
        isNewChat = true;
    }
    
    const userMessage: Message = {
      id: new Date().toISOString() + '-user',
      role: 'user',
      content: prompt,
      file: file,
    };
    
    setChatHistory(prev => prev.map(chat => 
        chat.id === activeChatId 
            ? { ...chat, messages: [...chat.messages, userMessage] }
            : chat
    ));


    try {
      const modelsToQuery = allModels.filter(model => selectedModels.includes(model.id));

      const modelResponses = await getModelResponses({ 
        prompt, 
        fileDataUri: file?.dataUri || null,
        models: modelsToQuery.map(m => ({ 
            id: m.id, 
            name: m.name, 
            genkitId: m.genkitId || null, 
            openRouterId: m.openRouterId || null 
        })),
        openRouterKey: keys.openrouter,
      })
      
      const newResponses: AIResponse[] = modelsToQuery
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

      setChatHistory(prev => prev.map(chat => {
        if (chat.id === activeChatId) {
            const updatedChat = { ...chat, messages: [...chat.messages, assistantMessage] };
            if (isNewChat && chat.messages.length === 1) { // It was a new chat, first user message just added
                updatedChat.title = (prompt || "File Query").substring(0, 30) + "...";
            }
            return updatedChat;
        }
        return chat;
      }));

      setPrompt("");
      setFile(null);

    } catch (error) {
      console.error(error)
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: `Could not fetch responses. ${errorMessage}`,
      })
      
      // Rollback user message on error
      setChatHistory(prev => prev.map(chat => 
        chat.id === activeChatId 
            ? { ...chat, messages: chat.messages.filter(m => m.id !== userMessage.id) }
            : chat
      ));

    } finally {
      setIsLoading(false)
    }
  }
  
  const selectChat = (chatId: string) => {
    setCurrentChatId(chatId);
  }

  const handleSetImage = (dataUri: string | null) => {
    if (dataUri) {
      setFile({ dataUri, name: "camera_capture.png", type: "image/png" });
    } else {
      setFile(null);
    }
  };

  const currentChat = chatHistory.find(c => c.id === currentChatId);
  const currentMessagesToDisplay = currentChat ? currentChat.messages : [];
  const modelsToDisplay = allModels.filter(m => selectedModels.includes(m.id));

  return (
    <SidebarProvider>
       <CameraCaptureDialog 
          isOpen={isCameraOpen} 
          setIsOpen={setIsCameraOpen} 
          setImage={handleSetImage}
        />
      <div className="flex h-screen w-screen flex-col bg-transparent overflow-hidden">
        <AppHeader>
           <div className="flex items-center gap-2">
              <ApiKeyManager 
                isOpen={isSettingsOpen}
                setIsOpen={setIsSettingsOpen}
                selectedModels={selectedModels}
                setSelectedModels={setSelectedModels}
              />
              <a href="https://github.com/NavuluriBalaji/Model-Inventory" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2">
                    <Star className="h-4 w-4"/>
                    <span className="hidden md:inline">Star</span>
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
                      onClick={() => selectChat(chat.id)}
                      isActive={currentChatId === chat.id}
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
                     <div className="text-center text-muted-foreground py-12 md:py-24">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                           Model-Inventory
                        </h1>
                        <p className="text-md md:text-lg">Enter a prompt below to start comparing models.</p>
                     </div>
                  )}

                  {currentMessagesToDisplay.map((message) => (
                    <div key={message.id} className="space-y-6">
                      {message.role === 'user' && (
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                              <User className="h-5 w-5 text-primary-foreground" />
                          </div>
                          <div className="flex-1">
                            {message.file && (
                                message.file.type.startsWith('image/') ? (
                                  <img src={message.file.dataUri} alt={message.file.name} className="rounded-lg max-w-xs mb-2 border border-border/20" />
                                ) : (
                                  <div className="p-3 rounded-lg bg-muted border border-border/20 mb-2 max-w-xs">
                                      <p className="text-sm font-medium text-foreground">{message.file.name}</p>
                                      <p className="text-xs text-muted-foreground">{message.file.type}</p>
                                  </div>
                                )
                            )}
                            <p className="text-foreground/80 prose prose-sm max-w-none pt-1">{message.content}</p>
                          </div>
                        </div>
                      )}
                      {message.role === 'assistant' && message.responses && (
                         <div className="overflow-x-auto pb-4">
                            <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
                              {message.responses.map(res => (
                                 <div key={res.id} className="w-full md:w-[400px] flex-shrink-0">
                                   <ResponseCard modelName={res.name} response={res.response} duration={res.duration} />
                                 </div>
                              ))}
                            </div>
                         </div>
                      )}
                    </div>
                  ))}

                  {isLoading && currentMessagesToDisplay.length > 0 && currentMessagesToDisplay[currentMessagesToDisplay.length - 1]?.role === 'user' && (
                    <div className="overflow-x-auto pb-4">
                      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
                        {modelsToDisplay.map(model => (
                          <div key={model.id} className="flex flex-col space-y-3 p-4 border border-border/20 rounded-lg bg-card w-full md:min-w-[400px]">
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
                    file={file}
                    setFile={setFile}
                    onCameraClick={() => setIsCameraOpen(true)}
                  />
               </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

    
