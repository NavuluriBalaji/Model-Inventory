
"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send, Loader2, Paperclip, Camera, X, File as FileIcon, Sparkles, Wand2 } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

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
            <div className="relative mb-4 w-32 h-32 rounded-2xl overflow-hidden border border-white/10 shadow-2xl animate-in zoom-in-50 duration-300">
                <Image src={file.dataUri} alt="Selected image" layout="fill" objectFit="cover" />
                <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-1 right-1 h-6 w-6 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md"
                    onClick={() => setFile(null)}
                >
                    <X className="h-4 w-4 text-white" />
                </Button>
            </div>
        )
    }

    return (
        <div className="relative mb-4 p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4 max-w-xs animate-in slide-in-from-left-4 duration-300">
            <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <FileIcon className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">{file.name}</p>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">{file.type.split('/')[1]}</p>
            </div>
             <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-full hover:bg-white/10"
                onClick={() => setFile(null)}
            >
                <X className="h-4 w-4" />
            </Button>
        </div>
    )
  }

  return (
    <div className="relative w-full max-w-3xl mx-auto">
       <div className="flex flex-col items-center">
          {renderFilePreview()}
       </div>
       
      <form onSubmit={onSubmit} className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-emerald-500/30 rounded-[32px] blur-lg opacity-0 group-focus-within:opacity-100 transition duration-500" />
        
        <div className="relative flex items-center bg-sidebar-background/60 backdrop-blur-2xl border border-white/10 rounded-[28px] p-2 transition-all duration-300 group-focus-within:border-primary/40 group-focus-within:bg-sidebar-background/80 shadow-2xl">
            <Button
                type="button"
                size="icon"
                variant="ghost"
                className="rounded-full h-12 w-12 hover:bg-white/5 transition-all text-muted-foreground hover:text-primary"
                onClick={handleFileClick}
                disabled={isLoading}
            >
                <Paperclip className="h-5 w-5" />
            </Button>
            
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
            />

            <input
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder="Ask anything..."
                disabled={isLoading}
                className="flex-1 bg-transparent border-none outline-none focus:ring-0 px-4 py-3 text-white placeholder:text-muted-foreground/60 text-sm md:text-base font-medium"
            />

            <div className="flex items-center gap-1 pr-1">
                <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="rounded-full h-10 w-10 hover:bg-white/5 text-muted-foreground hidden md:flex"
                    onClick={onCameraClick}
                >
                    <Camera className="h-5 w-5" />
                </Button>
                
                <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="rounded-full h-10 w-10 hover:bg-white/5 text-muted-foreground hidden md:flex"
                >
                    <Wand2 className="h-5 w-5" />
                </Button>

                <Button
                    type="submit"
                    size="icon"
                    className={cn(
                        "rounded-2xl h-11 w-11 transition-all duration-300 group-focus-within:scale-105",
                        prompt || file 
                            ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(34,197,94,0.4)]" 
                            : "bg-white/5 text-white/20"
                    )}
                    disabled={isLoading || (!prompt && !file)}
                >
                    {isLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                        <Send className="h-5 w-5" />
                    )}
                </Button>
            </div>
        </div>
        
        {/* Quick actions row */}
        <div className="flex items-center justify-center gap-2 mt-4 opacity-40 hover:opacity-100 transition-opacity">
            {['Code', 'Science', 'Writing', 'Math'].map(tag => (
                <button 
                    key={tag}
                    type="button"
                    className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white/10 hover:bg-white/5 transition-all text-white/60"
                >
                    {tag}
                </button>
            ))}
        </div>
      </form>
    </div>
  )
}
