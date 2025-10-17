"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Video, Play } from "lucide-react";

export function AiVideoPlayer() {
  return (
    <Card className="overflow-hidden shadow-lg">
      <CardContent className="p-0">
        <div className="aspect-video w-full bg-gradient-to-br from-primary/20 to-secondary/20 relative">
          <div className="flex h-full w-full flex-col items-center justify-center space-y-4 p-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Video className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">
              AI-Powered Demonstration
            </h3>
            <p className="text-muted-foreground max-w-md">
              Experience the future of dental insurance with our AI-powered platform. 
              Get personalized recommendations and chat with our intelligent advisor.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Play className="h-4 w-4" />
              <span>Coming Soon</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
