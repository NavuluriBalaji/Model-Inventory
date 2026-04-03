
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { 
  Bot, 
  MessageSquare, 
  PlusCircle, 
  User, 
  Star, 
  Github, 
  Trash2, 
  LayoutGrid, 
  Layers, 
  Library, 
  Settings, 
  Plus,
  Search,
  ChevronRight,
  Menu,
  Sparkles
} from "lucide-react"
import { getModelResponses } from "@/ai/flows/get-model-responses"
import { useToast } from "@/hooks/use-toast"
import { ApiKeyManager } from "@/components/app/api-key-manager"
import { allModels } from "@/lib/models"
import { fetchAllOpenRouterModels } from "@/lib/openrouter-models"
import { CameraCaptureDialog } from "@/components/app/camera-capture"
import { cn } from "@/lib/utils"

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
  // Initialize with free models
  const [selectedModels, setSelectedModels] = React.useState<string[]>(
    allModels.filter(m => (m as any).isFree || m.id === "google/gemini-2.0-flash-exp").map(m => m.id)
  );
  const { toast } = useToast()
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const [isCameraOpen, setIsCameraOpen] = React.useState(false);
  const [deleteAlertOpen, setDeleteAlertOpen] = React.useState(false);
  const [chatToDelete, setChatToDelete] = React.useState<string | null>(null);
  const [allAvailableModels, setAllAvailableModels] = React.useState<any[]>(allModels);

  // Fetch dynamic models on mount to support marketplace selections
  React.useEffect(() => {
    fetchAllOpenRouterModels().then(models => {
        const mapped = models.map(m => ({
            id: m.id,
            name: m.name,
            description: m.description || "General purpose AI model on OpenRouter.",
            context: m.context_length ? `${Math.round(m.context_length / 1000)}K` : "Unknown",
            openRouterId: m.id,
            genkitId: null,
            useCases: ["Marketplace"]
        }));
        setAllAvailableModels(prev => {
            const curatedIds = new Set(prev.map(m => m.id));
            const filteredDynamic = mapped.filter(m => !curatedIds.has(m.id));
            if (filteredDynamic.length === 0) return prev;
            return [...prev, ...filteredDynamic];
        });
    }).catch(console.error);
  }, []);

  // Load chat history from localStorage on mount
  React.useEffect(() => {
    try {
        const storedHistory = localStorage.getItem(CHAT_HISTORY_STORAGE_KEY);
        if (storedHistory) {
            const parsedHistory = JSON.parse(storedHistory);
            if (Array.isArray(parsedHistory) && parsedHistory.length > 0) {
              setChatHistory(parsedHistory);
              // Only set current ID if we don't have one and we found a history
              setCurrentChatId(prev => prev || parsedHistory[0].id);
            }
        }
    } catch (error) {
        console.error("Failed to parse chat history from localStorage", error);
        localStorage.removeItem(CHAT_HISTORY_STORAGE_KEY);
    }
  }, []);

  // Save chat history to localStorage whenever it changes
  React.useEffect(() => {
    if (chatHistory.length > 0) {
      localStorage.setItem(CHAT_HISTORY_STORAGE_KEY, JSON.stringify(chatHistory));
    } else {
      localStorage.removeItem(CHAT_HISTORY_STORAGE_KEY);
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
    
    // Check for API keys (can be from settings or environment variables handled by server action)
    const keys = getApiKeys();
    
    setIsLoading(true)

    let activeChatId = currentChatId;
    let isNewChat = false;
    
    if (!activeChatId) {
        handleNewChat();
        isNewChat = true;
    } 
    
    const currentMessages = chatHistory.find(c => c.id === (activeChatId || (isNewChat ? chatHistory[0].id : null)))?.messages || [];
    
    const userMessage: Message = {
      id: new Date().toISOString() + '-user',
      role: 'user',
      content: prompt,
      file: file,
    };
    
    const modelsToQuery = allAvailableModels.filter(model => selectedModels.includes(model.id));
    const initialAssistantMessage: Message = {
      id: new Date().toISOString() + '-assistant',
      role: 'assistant',
      content: '', 
      responses: modelsToQuery.map(model => ({
        id: model.id,
        name: model.name,
        response: '...', 
        duration: 0,
      })),
    };

    setChatHistory(prev => prev.map(chat => 
        chat.id === (activeChatId || chat.id)
            ? { ...chat, messages: [...chat.messages, userMessage, initialAssistantMessage] }
            : chat
    ));

    try {
       const messagesForApi = [...currentMessages.map(m => ({...m, responses: undefined})), userMessage];

      const responses = await getModelResponses({ 
        messages: messagesForApi,
        models: modelsToQuery.map(m => ({ 
            id: m.id, 
            name: m.name, 
            genkitId: m.genkitId || null, 
            openRouterId: m.openRouterId || null 
        })),
        openRouterKey: keys?.openrouter, 
      })
      
      const newResponses: AIResponse[] = modelsToQuery
        .map(model => ({
          ...model,
          response: responses[model.id]?.response || "No response from model.",
          duration: responses[model.id]?.duration || 0,
      }));
      
      setChatHistory(prev => prev.map(chat => {
          const finalChatId = activeChatId || prev[0].id;
          if (chat.id === finalChatId) {
              const newMessages = [...chat.messages];
              const assistantMsgIndex = newMessages.findIndex(m => m.id === initialAssistantMessage.id);
              if (assistantMsgIndex !== -1) {
                  newMessages[assistantMsgIndex].responses = newResponses;
              }
              const updatedChat = { ...chat, messages: newMessages };
              if (isNewChat && chat.messages.length <= 2) { 
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
      const finalChatId = activeChatId || chatHistory[0]?.id;
      setChatHistory(prev => prev.map(chat => 
        chat.id === finalChatId
            ? { ...chat, messages: chat.messages.filter(m => m.id !== userMessage.id && m.id !== initialAssistantMessage.id) }
            : chat
      ));

    } finally {
      setIsLoading(false)
    }
  }
  
  const selectChat = (chatId: string) => {
    setCurrentChatId(chatId);
  }

  const handleDeleteChat = () => {
    if (!chatToDelete) return;
    
    const newHistory = chatHistory.filter(chat => chat.id !== chatToDelete);
    setChatHistory(newHistory);

    if (currentChatId === chatToDelete) {
        if (newHistory.length > 0) {
            setCurrentChatId(newHistory[0].id);
        } else {
            setCurrentChatId(null);
            handleNewChat();
        }
    }
    setChatToDelete(null);
    setDeleteAlertOpen(false);
  }
  
  const confirmDelete = (chatId: string) => {
    setChatToDelete(chatId);
    setDeleteAlertOpen(true);
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
  
  return (
    <SidebarProvider>
        <CameraCaptureDialog 
          isOpen={isCameraOpen} 
          setIsOpen={setIsCameraOpen} 
          setImage={handleSetImage}
        />
        <AlertDialog open={deleteAlertOpen} onOpenChange={setDeleteAlertOpen}>
            <AlertDialogContent className="bg-card border-border/20">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently delete this chat. This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="bg-secondary/50 border-border/20">Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteChat} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

      <div className="flex h-screen w-screen bg-background text-foreground overflow-hidden font-body">
        {/* Elysium Sidebar */}
        <Sidebar collapsible="icon" className="border-r border-border/10 bg-sidebar-background shadow-2xl">
          <SidebarHeader className="px-6 py-8">
            <div className="flex items-center gap-3 mb-8 group-data-[collapsible=icon]:mb-0 group-data-[collapsible=icon]:justify-center">
               <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/50 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                  <div className="h-4 w-4 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
               </div>
               <h2 className="text-xl font-bold tracking-tight bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent group-data-[collapsible=icon]:hidden">
                 Model Inventory
               </h2>
            </div>
            
            <Button 
                onClick={handleNewChat}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-2xl py-6 gap-2 shadow-[0_4px_20px_rgba(34,197,94,0.2)] group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:h-12 group-data-[collapsible=icon]:w-12"
            >
              <Plus className="h-5 w-5" />
              <span className="group-data-[collapsible=icon]:hidden">New Chat</span>
            </Button>
          </SidebarHeader>

          <SidebarContent className="px-3 gap-0">
            <div className="space-y-1 mb-8 group-data-[collapsible=icon]:hidden">
                <SidebarMenuButton className="py-6 px-4 rounded-xl hover:bg-white/5 transition-all text-muted-foreground hover:text-white">
                  <Search className="h-5 w-5 mr-3" />
                  <span className="font-medium">Explore</span>
                </SidebarMenuButton>
                <SidebarMenuButton className="py-6 px-4 rounded-xl hover:bg-white/5 transition-all text-muted-foreground hover:text-white">
                  <LayoutGrid className="h-5 w-5 mr-3" />
                  <span className="font-medium">Categories</span>
                </SidebarMenuButton>
                <SidebarMenuButton className="py-6 px-4 rounded-xl hover:bg-white/5 transition-all text-muted-foreground hover:text-white">
                  <Library className="h-5 w-5 mr-3" />
                  <span className="font-medium">Library</span>
                  <span className="ml-auto bg-primary/20 text-primary text-[10px] px-2 py-0.5 rounded-full border border-primary/30">141</span>
                </SidebarMenuButton>
                <SidebarMenuButton
                   onClick={() => setIsSettingsOpen(true)}
                   className="py-6 px-4 rounded-xl hover:bg-white/5 transition-all text-muted-foreground hover:text-white"
                >
                  <Settings className="h-5 w-5 mr-3" />
                  <span className="font-medium">Settings</span>
                </SidebarMenuButton>
            </div>

            <div className="px-4 py-2 group-data-[collapsible=icon]:hidden mt-6">
               <span className="text-[10px] font-bold text-primary uppercase tracking-widest px-2">System Operatives</span>
            </div>
            <div className="px-2 space-y-1 mb-6">
                <SidebarMenuButton 
                    onClick={() => setIsSettingsOpen(true)}
                    className="py-7 px-4 rounded-2xl bg-primary/5 hover:bg-primary/10 border border-primary/20 hover:border-primary/40 transition-all group/advisor"
                >
                    <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/20 group-hover/advisor:scale-110 transition-transform">
                        <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex flex-col items-start ml-3 group-data-[collapsible=icon]:hidden">
                        <span className="font-bold text-sm tracking-tight text-white">Intelligence Advisor</span>
                        <span className="text-[10px] text-primary/60 font-medium">READY FOR CONSULT</span>
                    </div>
                    <div className="ml-auto group-data-[collapsible=icon]:hidden">
                        <div className="h-2 w-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                    </div>
                </SidebarMenuButton>
            </div>

            <SidebarSeparator className="my-4 opacity-10 group-data-[collapsible=icon]:hidden" />
            
            <div className="px-4 py-2 group-data-[collapsible=icon]:hidden">
               <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-2">Recent Intelligence</span>
            </div>

            <SidebarMenu className="mt-2 space-y-1">
              {chatHistory.map((chat) => (
                <SidebarMenuItem key={chat.id}>
                  <div className="relative group/chat px-2">
                    <SidebarMenuButton 
                        onClick={() => selectChat(chat.id)}
                        isActive={currentChatId === chat.id}
                        className={cn(
                          "py-5 px-4 rounded-xl transition-all duration-200 border border-transparent",
                          currentChatId === chat.id 
                            ? "bg-white/5 text-white border-primary/20 shadow-[0_0_15px_rgba(0,0,0,0.2)]" 
                            : "text-muted-foreground hover:bg-white/[0.03] hover:text-white/80"
                        )}
                        tooltip={chat.title}
                    >
                      <MessageSquare className={cn("h-4 w-4 mr-2", currentChatId === chat.id && "text-primary")} />
                      <span className="truncate flex-1 group-data-[collapsible=icon]:hidden">{chat.title}</span>
                    </SidebarMenuButton>
                    <Button 
                        variant="ghost" 
                        size="icon"
                        className="absolute right-4 top-1/2 -translate-y-1/2 h-8 w-8 opacity-0 group-hover/chat:opacity-100 transition-opacity hover:bg-destructive/20 hover:text-destructive group-data-[collapsible=icon]:hidden"
                        onClick={(e) => {
                            e.stopPropagation();
                            confirmDelete(chat.id)
                        }}
                    >
                        <Trash2 className="h-3.5 w-3.5"/>
                    </Button>
                  </div>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="p-6">
             <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center p-[1px] shadow-lg">
                    <div className="h-full w-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                        <User className="h-6 w-6 text-foreground/80" />
                    </div>
                </div>
                <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
                    <p className="text-sm font-bold truncate">Balaji NB</p>
                    <p className="text-[10px] text-muted-foreground">Pro Member</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-data-[collapsible=icon]:hidden" />
             </div>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col h-full bg-black relative">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

          {/* Header area in main */}
          <div className="flex items-center justify-between px-8 py-6 h-20 border-b border-border/5">
             <div className="flex items-center gap-4">
                <Menu className="h-5 w-5 text-muted-foreground cursor-pointer hover:text-white transition-colors md:hidden" />
                <h1 className="text-lg font-semibold flex items-center gap-2">
                   {currentChat ? currentChat.title : "New Chat"}
                   <Layers className="h-4 w-4 text-primary opacity-50" />
                </h1>
             </div>
             <div className="flex items-center gap-4">
                 <ApiKeyManager 
                    isOpen={isSettingsOpen}
                    setIsOpen={setIsSettingsOpen}
                    selectedModels={selectedModels}
                    setSelectedModels={setSelectedModels}
                 />
                 <Button variant="outline" className="bg-white/5 border-border/10 rounded-xl px-6 hover:bg-white/10 transition-all font-medium">
                    Share
                 </Button>
                 <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center border border-border/10">
                    <Star className="h-4 w-4 text-muted-foreground" />
                 </div>
             </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto px-6 md:px-12 py-8 scrollbar-hide">
            <div className="max-w-6xl mx-auto space-y-12">
                {currentMessagesToDisplay.length === 0 && !isLoading && (
                   <div className="text-center py-32 animate-in fade-in slide-in-from-bottom-8 duration-700">
                      <div className="h-20 w-20 bg-primary/10 rounded-[30px] flex items-center justify-center mx-auto mb-8 border border-primary/20 relative overflow-hidden">
                         <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                         <Bot className="h-10 w-10 text-primary relative z-10" />
                      </div>
                      <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent tracking-tighter">
                         What can I help you <br /> with today?
                      </h2>
                      <p className="text-lg text-muted-foreground max-w-lg mx-auto">
                         compare responses from multiple elite models in one click. 
                         The future of AI is collaborative.
                      </p>
                      
                      <div className="mt-12 flex flex-wrap justify-center gap-3">
                         {['Explain stock market trends', 'Creative tagline for fitness app', 'Design feedback for portfolio'].map(suggestion => (
                            <Button 
                                key={suggestion}
                                variant="outline" 
                                className="bg-white/5 border-border/10 hover:bg-primary/10 hover:border-primary/30 transition-all rounded-2xl text-xs py-5"
                                onClick={() => {
                                    setPrompt(suggestion);
                                    // Optionally trigger submit
                                }}
                            >
                                {suggestion}
                            </Button>
                         ))}
                      </div>
                   </div>
                )}

                {currentMessagesToDisplay.map((message, idx) => (
                  <div key={message.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {message.role === 'user' && (
                      <div className="flex flex-col items-end mb-12">
                        <div className="max-w-[80%] bg-secondary/80 backdrop-blur-md px-6 py-4 rounded-3xl rounded-tr-none border border-white/5 shadow-xl">
                          {message.file && (
                              message.file.type.startsWith('image/') ? (
                                <img src={message.file.dataUri} alt={message.file.name} className="rounded-2xl max-w-sm mb-3 border border-white/10" />
                              ) : (
                                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 mb-3 flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                                       <Layers className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold">{message.file.name}</p>
                                        <p className="text-[10px] text-muted-foreground uppercase">{message.file.type.split('/')[1]}</p>
                                    </div>
                                </div>
                              )
                          )}
                          <p className="text-white/90 text-md leading-relaxed">{message.content}</p>
                        </div>
                      </div>
                    )}
                    
                    {message.role === 'assistant' && message.responses && (
                       <div className="space-y-6">
                          <div className="flex items-center gap-3 text-muted-foreground mb-4">
                             <div className="h-px flex-1 bg-border/5" />
                             <span className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                                <Bot className="h-3 w-3" /> Comparing {message.responses.length} Models
                             </span>
                             <div className="h-px flex-1 bg-border/5" />
                          </div>

                            <div className="flex-1 w-full flex flex-row gap-6 p-6 overflow-x-auto scrollbar-hide snap-x">
                                {message.responses.map((res, index) => (
                                    <div key={res.id} className="w-[400px] h-[600px] flex-shrink-0 snap-start animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                                 {res.response === '...' ? (
                                   <div className="h-[400px] p-6 rounded-[32px] bg-sidebar-background border border-white/5 animate-pulse flex flex-col gap-4">
                                      <div className="flex items-center justify-between">
                                         <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/5" />
                                            <div className="h-4 w-24 bg-white/5 rounded-full" />
                                         </div>
                                         <div className="h-6 w-16 bg-white/5 rounded-full" />
                                      </div>
                                      <div className="h-4 w-full bg-white/5 rounded-full" />
                                      <div className="h-4 w-[90%] bg-white/5 rounded-full" />
                                      <div className="h-4 w-[95%] bg-white/5 rounded-full" />
                                      <div className="h-4 w-[80%] bg-white/5 rounded-full" />
                                      <div className="mt-auto h-12 w-full bg-white/5 rounded-2xl" />
                                   </div>
                                 ) : (
                                   <ResponseCard 
                                      index={index + 1}
                                      modelName={res.name} 
                                      response={res.response} 
                                      duration={res.duration} 
                                   />
                                 )}
                               </div>
                            ))}
                          </div>
                       </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
          
          {/* Bottom Prompt Form UI */}
          <div className="sticky bottom-0 w-full py-8 bg-gradient-to-t from-black via-black/90 to-transparent">
             <div className="max-w-3xl mx-auto px-6">
                <div className="relative group/prompt">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-emerald-500/20 to-primary/20 rounded-[28px] blur opacity-0 group-focus-within/prompt:opacity-100 transition duration-500" />
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
                <p className="text-[10px] text-center text-muted-foreground mt-4 uppercase tracking-[0.2em]">
                   Elysium AI can make mistakes. Built by Balaji.
                </p>
             </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
