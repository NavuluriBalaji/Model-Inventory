"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Bot } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Model {
    id: string;
    name: string;
}

interface ModelSelectionProps {
    allModels: Model[];
    selectedModels: string[];
    setSelectedModels: React.Dispatch<React.SetStateAction<string[]>>;
}

export function ModelSelection({ allModels, selectedModels, setSelectedModels }: ModelSelectionProps) {
  const handleModelToggle = (modelId: string) => {
    setSelectedModels(prev =>
      prev.includes(modelId)
        ? prev.filter(id => id !== modelId)
        : [...prev, modelId]
    );
  };
  
  const selectedModelDetails = allModels.filter(m => selectedModels.includes(m.id));

  return (
    <div className="flex items-center gap-2">
       {selectedModelDetails.slice(0, 2).map(model => (
         <Badge key={model.id} variant="secondary" className="gap-2 rounded-md py-1 px-2 hidden lg:flex">
            <Bot className="h-4 w-4 text-green-400" />
            <span className="font-normal">{model.name}</span>
         </Badge>
       ))}
       {selectedModels.length > 2 && (
          <Badge variant="secondary" className="gap-2 rounded-md py-1 px-2 hidden lg:flex">
            <span className="font-normal">+{selectedModels.length - 2} more</span>
         </Badge>
       )}


      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            Change models
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Available Models</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {allModels.map(model => (
            <DropdownMenuCheckboxItem
              key={model.id}
              checked={selectedModels.includes(model.id)}
              onCheckedChange={() => handleModelToggle(model.id)}
              onSelect={(e) => e.preventDefault()}
            >
              {model.name}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
