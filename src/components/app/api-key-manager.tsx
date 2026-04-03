
"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Settings, ExternalLink, MessageSquare, Code, Feather, Image as ImageIcon, Zap, ShieldCheck, Cpu, Search, Loader2, Globe } from "lucide-react"
import { useState, useEffect, useMemo } from "react"
import { useToast } from "@/hooks/use-toast"
import { allModels } from "@/lib/models"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { fetchAllOpenRouterModels, OpenRouterModel } from "@/lib/openrouter-models"

const API_KEY_STORAGE_KEY = "ai_api_keys"

type UseCase = "All" | "Dialogue" | "Coding" | "Creative Writing" | "Image Analysis" | "Marketplace";

const AllIcon = () => <span className="text-[10px] font-bold">ALL</span>;

const useCases: { name: UseCase, icon: React.FC<any> }[] = [
    { name: "All", icon: AllIcon },
    { name: "Dialogue", icon: MessageSquare },
    { name: "Coding", icon: Code },
    { name: "Creative Writing", icon: Feather },
    { name: "Image Analysis", icon: ImageIcon },
    { name: "Marketplace", icon: Globe },
];

interface ApiKeys {
  gemini: string;
  openrouter: string;
}

interface ApiKeyManagerProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedModels: string[];
  setSelectedModels: React.Dispatch<React.SetStateAction<string[]>>;
}

export function ApiKeyManager({ isOpen, setIsOpen, selectedModels, setSelectedModels }: ApiKeyManagerProps) {
  const [keys, setKeys] = useState<ApiKeys>({ gemini: "", openrouter: "" })
  const [activeUseCase, setActiveUseCase] = useState<UseCase>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [dynamicModels, setDynamicModels] = useState<any[]>([]);
  const [isFetchingModels, setIsFetchingModels] = useState(false);
  const { toast } = useToast()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedKeys = localStorage.getItem(API_KEY_STORAGE_KEY)
      if (storedKeys) {
        setKeys(JSON.parse(storedKeys))
      }
    }
  }, [])

  // Dynamic model fetching
  useEffect(() => {
    if (isOpen) {
        setIsFetchingModels(true);
        fetchAllOpenRouterModels().then(models => {
            const mapped = models.map(m => {
                const curated = allModels.find(cm => cm.openRouterId === m.id);
                return {
                    id: m.id,
                    name: m.name,
                    description: m.description || "General purpose AI model on OpenRouter.",
                    context: m.context_length ? `${Math.round(m.context_length / 1000)}K` : "Unknown",
                    openRouterId: m.id,
                    genkitId: null,
                    useCases: ["Marketplace"],
                    isFree: (curated as any)?.isFree || m.id.includes(':free')
                };
            });
            if (mapped.length > 0) {
                setDynamicModels(mapped);
            }
            setIsFetchingModels(false);
        }).catch(() => {
            setIsFetchingModels(false);
        });
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setKeys(prev => ({ ...prev, [id]: value }))
  }

  const handleModelToggle = (modelId: string, modelName: string) => {
    setSelectedModels(prev => {
      const exists = prev.includes(modelId);
      if (exists) {
        return prev.filter(id => id !== modelId);
      } else {
        // If not curated, it will stay in local list if selected
        return [...prev, modelId];
      }
    });
  };

  const handleClearSelection = () => {
    setSelectedModels([]);
    toast({
        title: "Operatives Stand Down",
        description: "All selections have been cleared.",
    });
  }

  const [advisoryInput, setAdvisoryInput] = useState("");
  const handleAdvisoryMatch = () => {
    if (!advisoryInput) return;
    
    const input = advisoryInput.toLowerCase();
    let targetUseCase: UseCase = "Dialogue";
    
    if (input.includes("code") || input.includes("program") || input.includes("dev") || input.includes("script")) {
        targetUseCase = "Coding";
    } else if (input.includes("write") || input.includes("story") || input.includes("creative") || input.includes("poem")) {
        targetUseCase = "Creative Writing";
    } else if (input.includes("image") || input.includes("see") || input.includes("photo") || input.includes("visual")) {
        targetUseCase = "Image Analysis";
    }

    const recommended = mergedModels
        .filter(m => m.useCases?.includes(targetUseCase))
        .slice(0, 3)
        .map(m => m.id);
    
    if (recommended.length > 0) {
        setSelectedModels(recommended);
        toast({
            title: "Operatives Assigned",
            description: `Intelligence Advisory matched ${recommended.length} operatives for ${targetUseCase} task.`,
        });
        setAdvisoryInput("");
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (typeof window !== "undefined") {
      localStorage.setItem(API_KEY_STORAGE_KEY, JSON.stringify(keys))
      window.dispatchEvent(new Event('storage'))
      toast({
        title: "System Synced",
        description: "Your AI operatives are ready for deployment.",
      })
      setIsOpen(false)
    }
  }

  const mergedModels = useMemo(() => {
      const curatedIds = new Set(allModels.map(m => m.id));
      const filteredDynamic = dynamicModels.filter(m => !curatedIds.has(m.id));
      return [...allModels, ...filteredDynamic];
  }, [dynamicModels]);

  const filteredModels = useMemo(() => {
      let models = activeUseCase === "All" 
        ? mergedModels 
        : mergedModels.filter(model => model.useCases?.includes(activeUseCase));
      
      if (searchQuery) {
          models = models.filter(m => 
            m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            m.description.toLowerCase().includes(searchQuery.toLowerCase())
          );
      }
      return models;
  }, [activeUseCase, searchQuery, mergedModels]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all group">
          <Settings className="h-5 w-5 text-muted-foreground group-hover:text-white transition-colors" />
          <span className="sr-only">Settings</span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-[85vh] flex flex-col bg-sidebar-background/95 backdrop-blur-2xl border-white/5 rounded-[40px] shadow-[0_0_50px_rgba(0,0,0,0.5)] p-0 overflow-hidden">
        <div className="flex-1 flex flex-col p-8 md:p-12 overflow-hidden">
            <DialogHeader className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                 <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/20">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                 </div>
                 <DialogTitle className="text-3xl font-bold tracking-tight text-white">System Config</DialogTitle>
              </div>
              <DialogDescription className="text-muted-foreground/60 text-base">
                Provision your AI intelligence core and select from {mergedModels.length} active operatives.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
              <ScrollArea className="flex-1 pr-6 -mr-6 scrollbar-hide">
                <div className="space-y-12">
                  <section>
                    <div className="flex items-center gap-2 mb-6">
                        <Zap className="h-4 w-4 text-yellow-400" />
                        <h3 className="text-sm font-bold uppercase tracking-widest text-white/40">Access Protocol (API Keys)</h3>
                    </div>
                    
                    <div className="grid gap-6">
                      <div className="relative group/input">
                        <Label htmlFor="gemini" className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2 block ml-1">Google Gemini</Label>
                        <Input 
                          id="gemini" 
                          type="password" 
                          placeholder="AIzaSy..." 
                          className="bg-white/5 border-white/5 rounded-2xl h-14 px-6 focus:border-primary/50 focus:ring-0 transition-all font-mono text-sm"
                          value={keys.gemini ?? ""}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="relative group/input">
                        <Label htmlFor="openrouter" className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2 block ml-1">OpenRouter (Default)</Label>
                        <Input 
                          id="openrouter" 
                          type="password" 
                          placeholder="sk-or-..." 
                          className="bg-white/5 border-white/5 rounded-2xl h-14 px-6 focus:border-primary/50 focus:ring-0 transition-all font-mono text-sm"
                          value={keys.openrouter ?? ""}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </section>

                  <Separator className="bg-white/5" />

                  <section>
                    <div className="flex items-center justify-between gap-2 mb-6">
                        <div className="flex items-center gap-2">
                             <Cpu className="h-4 w-4 text-primary" />
                             <h3 className="text-sm font-bold uppercase tracking-widest text-white/40">Model Marketplace</h3>
                             {isFetchingModels && <Loader2 className="h-3 w-3 animate-spin text-primary ml-2" />}
                        </div>
                        <div className="flex items-center gap-3">
                            <Button 
                                type="button" 
                                variant="ghost" 
                                size="sm" 
                                onClick={handleClearSelection}
                                className="h-8 text-[10px] font-bold uppercase tracking-widest text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-full"
                            >
                                Purge Selection
                            </Button>
                            <div className="relative group/search max-w-[200px]">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground group-focus-within/search:text-white" />
                                <Input 
                                    placeholder="Find operative..." 
                                    className="h-9 pl-9 bg-white/5 border-white/5 rounded-full text-xs"
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mb-8 p-6 rounded-[24px] bg-primary/5 border border-primary/20 relative overflow-hidden group/advisory">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Zap className="h-12 w-12 text-primary" />
                        </div>
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-primary mb-3 block">Intelligence Advisory (Auto-Select)</Label>
                        <div className="flex gap-3">
                            <Input 
                                placeholder="Describe your mission scenario (e.g., 'Help me debug a React hook' or 'Write a sci-fi story')..." 
                                className="bg-black/20 border-white/5 rounded-xl h-11 text-xs"
                                value={advisoryInput}
                                onChange={e => setAdvisoryInput(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAdvisoryMatch())}
                            />
                            <Button 
                                type="button"
                                onClick={handleAdvisoryMatch}
                                disabled={!advisoryInput}
                                className="bg-primary text-black font-bold rounded-xl px-6 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all"
                            >
                                Match
                            </Button>
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-8">
                      {useCases.map(uc => (
                        <button 
                          key={uc.name} 
                          type="button"
                          onClick={() => setActiveUseCase(uc.name)}
                          className={cn(
                            "flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold transition-all border",
                            activeUseCase === uc.name 
                                ? "bg-primary text-black border-transparent shadow-[0_0_20px_rgba(34,197,94,0.3)] scale-105" 
                                : "bg-white/5 text-muted-foreground border-white/5 hover:bg-white/10 hover:text-white"
                          )}
                        >
                          <uc.icon className="h-4 w-4" />
                          {uc.name}
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredModels.slice(0, 50).map(model => (
                        <div 
                           key={model.id} 
                           onClick={() => handleModelToggle(model.id, model.name)}
                           className={cn(
                                "flex items-start gap-4 p-5 rounded-[24px] border cursor-pointer transition-all duration-300",
                                selectedModels.includes(model.id)
                                    ? "bg-primary/5 border-primary/30 shadow-[inset_0_0_20px_rgba(34,197,94,0.05)]"
                                    : "bg-white/[0.02] border-white/5 hover:border-white/10"
                           )}
                        >
                          <Checkbox
                            id={`model-${model.id}`}
                            checked={selectedModels.includes(model.id)}
                            onCheckedChange={() => handleModelToggle(model.id, model.name)}
                            className="mt-1 border-white/20 data-[state=checked]:bg-primary data-[state=checked]:border-transparent"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <div className="grid gap-1">
                            <Label className="text-sm font-bold cursor-pointer">
                              {model.name}
                            </Label>
                            <p className="text-[11px] text-muted-foreground/60 line-clamp-2 leading-relaxed">
                              {model.description}
                            </p>
                             {model.context && (
                                <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[10px] text-white/40 font-mono">
                                   CTX: {model.context}
                                </div>
                             )}
                          </div>
                        </div>
                      ))}
                      {filteredModels.length > 50 && (
                          <p className="col-span-full text-center text-xs text-muted-foreground py-4">
                            Showing top 50 models. Use search for more.
                          </p>
                      )}
                    </div>
                  </section>
                </div>
              </ScrollArea>
              
              <div className="mt-auto pt-8 flex items-center justify-end gap-3 border-t border-white/5">
                <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={() => setIsOpen(false)}
                    className="text-muted-foreground hover:text-white hover:bg-white/5 rounded-xl px-6"
                >
                    Cancel
                </Button>
                <Button 
                    type="submit"
                    className="bg-primary hover:bg-primary/90 text-black font-bold rounded-xl px-10 shadow-[0_0_20px_rgba(34,197,94,0.2)]"
                >
                    Save Prototype
                </Button>
              </div>
            </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
