"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send, Loader2, Paperclip, Search } from "lucide-react"

interface PromptFormProps {
  prompt: string
  setPrompt: (prompt: string) => void
  isLoading: boolean
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export function PromptForm({
  prompt,
  setPrompt,
  isLoading,
  onSubmit,
}: PromptFormProps) {
  return (
    <form onSubmit={onSubmit} className="relative">
      <Paperclip className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input
        placeholder="Search the web..."
        className="pl-10 pr-20 h-12 rounded-full bg-card border-border/30"
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        disabled={isLoading}
      />
      <Button
        type="submit"
        size="icon"
        className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full h-9 w-9 bg-primary/80 hover:bg-primary"
        disabled={isLoading || !prompt}
        aria-label="Submit prompt"
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Send className="h-5 w-5" />
        )}
      </Button>
    </form>
  )
}
