"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Sparkles, Code, Brain, Eye, Shield, Gift } from "lucide-react"
import { getModelsForTask, getImageGenerationModels, getCodeGenerationModels, getReasoningModels, getVisionLanguageModels, getUncensoredModels, getFreeModels } from "@/lib/model-helpers"

export function ModelSearch() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [searchResults, setSearchResults] = React.useState<{ models: any[], message: string } | null>(null)

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const results = getModelsForTask(searchQuery)
      setSearchResults(results)
    }
  }

  const handleQuickSearch = (category: string) => {
    const results = getModelsForTask(category)
    setSearchResults(results)
    setSearchQuery(category)
  }

  const quickSearchOptions = [
    { label: "Image Generation", query: "image generation", icon: Sparkles, count: getImageGenerationModels().length },
    { label: "Code Generation", query: "code generation", icon: Code, count: getCodeGenerationModels().length },
    { label: "Reasoning & Math", query: "reasoning", icon: Brain, count: getReasoningModels().length },
    { label: "Vision & Language", query: "vision", icon: Eye, count: getVisionLanguageModels().length },
    { label: "Uncensored", query: "uncensored", icon: Shield, count: getUncensoredModels().length },
    { label: "Free Models", query: "free", icon: Gift, count: getFreeModels().length },
  ]

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Input
          placeholder="Search for models by task (e.g., 'image generation', 'code help', 'reasoning')..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          className="flex-1"
        />
        <Button onClick={handleSearch} className="flex items-center gap-2">
          <Search className="h-4 w-4" />
          Search
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        {quickSearchOptions.map((option) => (
          <Button
            key={option.query}
            variant="outline"
            size="sm"
            onClick={() => handleQuickSearch(option.query)}
            className="flex flex-col items-center gap-1 h-auto py-3"
          >
            <option.icon className="h-4 w-4" />
            <span className="text-xs text-center">{option.label}</span>
            <Badge variant="secondary" className="text-xs">
              {option.count}
            </Badge>
          </Button>
        ))}
      </div>

      {searchResults && (
        <Card>
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
            <CardDescription>{searchResults.message}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {searchResults.models.length > 0 ? (
                searchResults.models.map((model) => (
                  <div key={model.id} className="border rounded-lg p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium">{model.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{model.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline">{model.context}</Badge>
                          {model.openRouterId && model.openRouterId.includes(':free') && (
                            <Badge variant="secondary">Free</Badge>
                          )}
                          {model.genkitId && (
                            <Badge variant="secondary">Genkit</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No models found. Try different search terms.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
