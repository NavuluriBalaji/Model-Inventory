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
import { Settings } from "lucide-react"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

const API_KEY_STORAGE_KEY = "ai_api_keys"

interface ApiKeys {
  gemini: string;
  openrouter: string;
}

export function ApiKeyManager() {
  const [open, setOpen] = useState(false)
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (typeof window !== "undefined") {
      localStorage.setItem(API_KEY_STORAGE_KEY, JSON.stringify(keys))
      
      // A trick to notify other components/server actions about the key update.
      // In a real app, this might be handled by a state management library.
      window.dispatchEvent(new Event('storage'))
      
      toast({
        title: "Success!",
        description: "API keys have been saved successfully.",
      })
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
          <span className="sr-only">API Key Management</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>API Key Management</DialogTitle>
            <DialogDescription>
              Your API keys are stored securely in your browser's local storage and are never sent to our servers.
            </DialogDescription>
          </DialogHeader>
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
          </div>
          <DialogFooter>
            <Button type="submit">Save keys</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
