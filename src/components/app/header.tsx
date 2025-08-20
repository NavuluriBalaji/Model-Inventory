import * as React from "react";
import { Bot } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function AppHeader({ children }: { children: React.ReactNode }) {
  return (
    <header className="border-b border-border/20 sticky top-0 bg-background/50 backdrop-blur-lg z-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="md:hidden" />
            <Bot className="h-6 w-6 text-purple-400"/>
            <h1 className="text-xl font-bold tracking-tight text-foreground">Model-Inventory</h1>
          </div>
          <div className="flex items-center gap-2">
              {children}
          </div>
        </div>
      </div>
    </header>
  );
}

    
