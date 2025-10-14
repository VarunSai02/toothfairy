"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { createHomepageVideo } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader, Sparkles, Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const initialState = {
  data: undefined,
  error: undefined,
};

function GenerateButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      size="lg"
      disabled={pending}
      className="bg-accent hover:bg-accent/90"
    >
      {pending ? (
        <>
          <Loader className="mr-2 h-5 w-5 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-5 w-5" />
          Generate Demo Video
        </>
      )}
    </Button>
  );
}

export function AiVideoPlayer() {
  const [state, formAction] = useFormState(createHomepageVideo, initialState);
  const [showVideo, setShowVideo] = useState(false);
  const { toast } = useToast();

  if (state.error && !toast) {
    toast({
        variant: "destructive",
        title: "Video Generation Failed",
        description: state.error,
    })
  }
  
  const videoDataUri = state.data?.videoDataUri;

  return (
    <Card className="overflow-hidden shadow-lg">
      <CardContent className="p-0">
        <div className="aspect-video w-full bg-secondary">
          {videoDataUri && (
            <video
              src={videoDataUri}
              controls
              autoPlay
              className="h-full w-full object-cover"
            />
          )}
          {!videoDataUri && (
            <div className="flex h-full w-full flex-col items-center justify-center space-y-4 p-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-background">
                <Video className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold">
                AI-Powered Demonstration
              </h3>
              <p className="text-muted-foreground max-w-md">
                Click the button below to generate a professional video demonstrating the power of Tooth Fairy. The process may take a minute.
              </p>
              <form action={formAction}>
                <GenerateButton />
              </form>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
