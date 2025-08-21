
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
import { Settings, ExternalLink } from "lucide-react"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { allModels } from "@/lib/models"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

const API_KEY_STORAGE_KEY = "ai_api_keys"

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
  const { toast } = useToast()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedKeys = localStorage.getItem(API_KEY_STORAGE_KEY)
      if (storedKeys) {
        setKeys(JSON.parse(storedKeys))
      }
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setKeys(prev => ({ ...prev, [id]: value }))
  }

  const handleModelToggle = (modelId: string) => {
    setSelectedModels(prev =>
      prev.includes(modelId)
        ? prev.filter(id => id !== modelId)
        : [...prev, modelId]
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (typeof window !== "undefined") {
      localStorage.setItem(API_KEY_STORAGE_KEY, JSON.stringify(keys))
      
      window.dispatchEvent(new Event('storage'))
      
      toast({
        title: "Success!",
        description: "Your settings have been saved.",
      })
      setIsOpen(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Manage your API keys and select the models you want to compare.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
          <ScrollArea className="flex-1 pr-6 -mr-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">API Keys</h3>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="gemini" className="text-right">
                      Gemini
                    </Label>
                    <Input 
                      id="gemini" 
                      type="password" 
                      placeholder="AIzaSy..." 
                      className="col-span-3"
                      value={keys.gemini}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="openrouter" className="text-right">
                      OpenRouter
                    </Label>
                    <Input 
                      id="openrouter" 
                      type="password" 
                      placeholder="sk-or-..." 
                      className="col-span-3"
                      value={keys.openrouter}
                      onChange={handleInputChange}
                    />
                  </div>
                   <p className="text-xs text-muted-foreground col-span-4">
                      Your keys are stored in your browser's local storage. Get your keys from:
                      <a href="https://ai.google.dev/" target="_blank" rel="noopener noreferrer" className="underline text-primary/80 hover:text-primary"> Google AI Studio </a>
                       and 
                      <a href="https://openrouter.ai/" target="_blank" rel="noopener noreferrer" className="underline text-primary/80 hover:text-primary"> OpenRouter.ai</a>.
                   </p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-2">Model Selection</h3>
                <div className="text-sm text-muted-foreground mb-4">
                  <p>
                    Select the AI models you want to include in the comparison. For more details on all available models in the market, 
                    visit the <a href="https://ai-inventory-blond.vercel.app/" target="_blank" rel="noopener noreferrer" className="underline text-primary/80 hover:text-primary">AI Model Inventory</a>, developed by Navuluri Balaji.
                    <ExternalLink className="inline-block h-3 w-3 ml-1" />
                  </p>
                </div>
                <div className="space-y-4">
                  {allModels.map(model => (
                    <div key={model.id} className="flex items-start gap-4 p-3 rounded-lg border border-border/20">
                      <Checkbox
                        id={`model-${model.id}`}
                        checked={selectedModels.includes(model.id)}
                        onCheckedChange={() => handleModelToggle(model.id)}
                        className="mt-1"
                      />
                      <div className="grid gap-1.5">
                        <Label htmlFor={`model-${model.id}`} className="font-semibold cursor-pointer">
                          {model.name}
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          {model.description}
                        </p>
                         {model.context && (
                            <p className="text-xs text-amber-400/80">Context: {model.context}</p>
                         )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
          
          <DialogFooter className="pt-6 mt-auto border-t border-border/20">
            <Button type="submit">Save Settings</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

    
