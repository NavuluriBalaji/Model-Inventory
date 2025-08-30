
"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send, Loader2, Paperclip, Camera, X, File as FileIcon } from "lucide-react"
import Image from "next/image"

interface PromptFormProps {
  prompt: string
  setPrompt: (prompt: string) => void
  isLoading: boolean
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  file: { dataUri: string; name: string; type: string } | null;
  setFile: (file: { dataUri: string; name: string; type: string } | null) => void;
  onCameraClick: () => void
}

export function PromptForm({
  prompt,
  setPrompt,
  isLoading,
  onSubmit,
  file,
  setFile,
  onCameraClick,
}: PromptFormProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFile({
            dataUri: reader.result as string,
            name: selectedFile.name,
            type: selectedFile.type
        })
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleFileClick = () => {
    fileInputRef.current?.click()
  }
  
  const renderFilePreview = () => {
    if (!file) return null;

    if (file.type.startsWith('image/')) {
        return (
            <div className="relative mb-2 w-24 h-24 rounded-lg overflow-hidden border border-border/30">
                <Image src={file.dataUri} alt="Selected image" layout="fill" objectFit="cover" />
                <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-0 right-0 h-6 w-6 rounded-full bg-black/50 hover:bg-black/70"
                    onClick={() => setFile(null)}
                >
                    <X className="h-4 w-4 text-white" />
                </Button>
            </div>
        )
    }

    return (
        <div className="relative mb-2 p-3 rounded-lg bg-muted border border-border/20 flex items-center gap-3 max-w-xs">
            <FileIcon className="h-6 w-6 text-muted-foreground" />
            <div className="flex-1">
                <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">{file.type}</p>
            </div>
             <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6 rounded-full"
                onClick={() => setFile(null)}
            >
                <X className="h-4 w-4" />
            </Button>
        </div>
    )
  }

  return (
    <div className="relative">
       {renderFilePreview()}
      <form onSubmit={onSubmit} className="relative">
        <Input
          placeholder="Ask a question about your file or just send a prompt..."
          className="pl-4 pr-32 h-12 rounded-lg bg-card border-border/30"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          disabled={isLoading}
        />
        <div className="absolute top-1/2 right-2 -translate-y-1/2 flex items-center gap-1">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="rounded-full h-9 w-9"
            onClick={handleFileClick}
            disabled={isLoading}
            aria-label="Attach file"
          >
            <Paperclip className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="rounded-full h-9 w-9"
            onClick={onCameraClick}
            disabled={isLoading}
            aria-label="Use camera"
          >
            <Camera className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button
            type="submit"
            size="icon"
            className="rounded-full h-9 w-9 bg-primary/80 hover:bg-primary"
            disabled={isLoading || (!prompt && !file)}
            aria-label="Submit prompt"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
