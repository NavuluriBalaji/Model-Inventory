
"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check, Bot, Clock } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"

interface ResponseCardProps {
  modelName: string
  response: string
  duration: number
}

export function ResponseCard({
  modelName,
  response,
  duration
}: ResponseCardProps) {
  const [copied, setCopied] = useState(false)
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
      // Attempt to parse the text as JSON
      const jsonData = JSON.parse(text);
      // If successful, pretty-print it
      return <pre className="whitespace-pre-wrap">{JSON.stringify(jsonData, null, 2)}</pre>;
    } catch (e) {
        // If it's not JSON, render it as plain text, preserving whitespace
        return <p className="whitespace-pre-wrap">{text}</p>;
    }
  }

  const formatDuration = (ms: number) => {
    if (ms < 1000) {
        return `${ms}ms`;
    }
    return `${(ms / 1000).toFixed(2)}s`;
  }


  return (
    <Card className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card/50 backdrop-blur-sm border-border/20 h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2 text-foreground">
               <Bot className="h-5 w-5 text-green-400" /> {modelName}
            </CardTitle>
            {duration > 0 && (
                <Badge variant="outline" className="gap-1.5 py-0.5 px-1.5 border-amber-400/30 text-amber-400">
                    <Clock className="h-3 w-3" />
                    <span className="text-xs">{formatDuration(duration)}</span>
                </Badge>
            )}
        </div>
        <Button variant="ghost" size="icon" onClick={handleCopy}>
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4 text-muted-foreground" />
          )}
          <span className="sr-only">Copy response</span>
        </Button>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto">
        <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap text-sm text-foreground/80">
            {renderResponse(response)}
        </div>
      </CardContent>
    </Card>
  )
}
