
"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check, Bot, Clock, Zap, Star, Share2, MoreHorizontal, RotateCcw } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface ResponseCardProps {
  index: number
  modelName: string
  response: string
  duration: number
}

export function ResponseCard({
  index,
  modelName,
  response,
  duration
}: ResponseCardProps) {
  const [copied, setCopied] = useState(false)
  const [isDeepDiveOpen, setIsDeepDiveOpen] = useState(false)
  const { toast } = useToast()

  const handleCopy = () => {
    navigator.clipboard.writeText(response).then(() => {
      setCopied(true)
      toast({
        title: `Copied ${modelName} response!`,
        description: "The response has been copied to your clipboard.",
      })
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const renderResponse = (text: string) => {
    try {
      const jsonData = JSON.parse(text);
      return <pre className="whitespace-pre-wrap font-mono text-[13px] bg-black/30 p-4 rounded-2xl border border-white/5">{JSON.stringify(jsonData, null, 2)}</pre>;
    } catch (e) {
        return <p className="whitespace-pre-wrap leading-relaxed">{text}</p>;
    }
  }

  const formatDuration = (ms: number) => {
    if (ms < 1000) {
        return `${ms}ms`;
    }
    return `${(ms / 1000).toFixed(2)}s`;
  }

  return (
    <Card className="group flex flex-col shadow-2xl bg-sidebar-background/80 backdrop-blur-xl border-white/5 rounded-[32px] overflow-hidden transition-all duration-500 hover:border-primary/20 hover:shadow-primary/5 h-[600px] w-full flex-shrink-0">
      <CardHeader className="flex flex-row items-center justify-between p-5 space-y-0 border-b border-white/5 bg-white/[0.02] flex-shrink-0">
        <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-bold text-white/50 border border-white/5">
                {index}
            </div>
            <div className="flex flex-col">
                <CardTitle className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
                   {modelName}
                   {duration < 2000 && <Zap className="h-3 w-3 text-yellow-400 fill-yellow-400" />}
                </CardTitle>
                <div className="flex items-center gap-2 mt-1">
                   <div className="flex items-center gap-1 text-[10px] text-primary font-bold">
                       <Star className="h-3 w-3 fill-primary" /> 8.7
                   </div>
                   <span className="text-[10px] text-muted-foreground">•</span>
                   <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">{formatDuration(duration)}</span>
                </div>
            </div>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-white/5" onClick={handleCopy}>
              {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-white/5">
              <Share2 className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-white/5">
              <MoreHorizontal className="h-3.5 w-3.5" />
            </Button>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-hide">
        {/* Placeholder "Image" like in the reference if response is short or as an aesthetic touch */}
        {response.length < 200 && (
            <div className="w-full aspect-video rounded-2xl bg-gradient-to-br from-primary/10 to-emerald-600/10 mb-6 border border-white/5 flex items-center justify-center relative overflow-hidden group/img">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                <Bot className="h-12 w-12 text-primary/40 relative z-10 animate-bounce" />
            </div>
        )}
        
        <div className="prose prose-sm dark:prose-invert max-w-none text-white/80 relative">
            <div className={cn("overflow-hidden transition-all duration-500", !isDeepDiveOpen && "max-h-[300px] mask-fade-bottom")}>
                {renderResponse(response)}
            </div>
            
            {!isDeepDiveOpen && response.length > 500 && (
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-sidebar-background/90 to-transparent flex items-end justify-center pb-2">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="bg-primary/10 text-primary hover:bg-primary/20 rounded-full font-bold text-[10px] uppercase tracking-widest gap-2">
                                <Zap className="h-3 w-3" /> Show More
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-sidebar-background/95 backdrop-blur-2xl border-white/10 rounded-[32px] p-12 scrollbar-active">
                             <DialogHeader className="mb-8">
                                <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/20">
                                        {index}
                                    </div>
                                    {modelName} - Deep Dive
                                </DialogTitle>
                             </DialogHeader>
                             <div className="prose prose-lg dark:prose-invert max-w-none text-white/90 leading-relaxed">
                                {renderResponse(response)}
                             </div>
                             <div className="mt-12 flex justify-end">
                                <Button onClick={handleCopy} className="bg-primary text-black font-bold rounded-xl px-8">
                                    Copy Comprehensive Report
                                </Button>
                             </div>
                        </DialogContent>
                    </Dialog>
                </div>
            )}
        </div>
      </CardContent>

      <div className="p-6 pt-0 border-t border-white/5 bg-white/[0.01]">
         <div className="flex items-center justify-between mt-4">
            <div className="flex gap-2">
                <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-white/5 border-white/5 rounded-xl gap-2 text-xs font-semibold hover:bg-white/10"
                    onClick={handleCopy}
                >
                    <Copy className="h-3.5 w-3.5" /> {copied ? "Copied" : "Copy"}
                </Button>
                <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-white/5 border-white/5 rounded-xl gap-2 text-xs font-semibold hover:bg-white/10"
                >
                    <RotateCcw className="h-3.5 w-3.5" /> Try again
                </Button>
            </div>
         </div>
      </div>
    </Card>
  )
}
