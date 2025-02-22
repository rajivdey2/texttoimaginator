
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { RunwareService, GenerateImageParams } from "@/lib/runware-service";

interface ImageGeneratorProps {
  apiKey: string;
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({ apiKey }) => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const { toast } = useToast();
  const runwareService = new RunwareService(apiKey);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Please enter a prompt",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedImage(null); // Clear previous image
    
    try {
      const params: GenerateImageParams = {
        positivePrompt: prompt,
        numberResults: 1,
        CFGScale: 7,
        outputFormat: "WEBP",
      };

      const result = await runwareService.generateImage(params);
      console.log("Generated image result:", result); // Debug log
      
      // Pre-load the image
      setIsImageLoading(true);
      const img = new Image();
      img.onload = () => {
        setGeneratedImage(result.imageURL);
        setIsImageLoading(false);
        toast({
          title: "Image generated successfully",
          description: "Your image is ready to view",
        });
      };
      img.onerror = () => {
        setIsImageLoading(false);
        setGeneratedImage(null);
        toast({
          title: "Error loading image",
          description: "The image could not be loaded",
          variant: "destructive",
        });
      };
      img.src = result.imageURL;
      
    } catch (error) {
      toast({
        title: "Error generating image",
        description: error.message,
        variant: "destructive",
      });
      setGeneratedImage(null);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      <div className="glass-panel rounded-2xl p-6 space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-medium tracking-tight">Create Image</h2>
          <p className="text-sm text-muted-foreground">
            Enter a detailed description of the image you want to generate.
          </p>
        </div>
        
        <div className="flex gap-2">
          <Input
            placeholder="A serene landscape with mountains..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1"
            disabled={isGenerating}
          />
          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="min-w-[100px]"
          >
            {isGenerating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Generate"
            )}
          </Button>
        </div>
      </div>

      {(isGenerating || isImageLoading || generatedImage) && (
        <div className="glass-panel rounded-2xl p-6 space-y-4">
          <h3 className="text-lg font-medium">Result</h3>
          <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-secondary/30">
            {(isGenerating || isImageLoading) ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="relative w-16 h-16">
                  <Loader2 className="absolute inset-0 h-full w-full animate-spin text-primary/30" />
                  <Loader2 className="absolute inset-0 h-full w-full animate-spin text-primary/20" style={{ animationDelay: "0.1s" }} />
                  <Loader2 className="absolute inset-0 h-full w-full animate-spin text-primary/10" style={{ animationDelay: "0.2s" }} />
                </div>
                <div className="text-sm text-muted-foreground animate-pulse">
                  {isGenerating ? "Generating your masterpiece..." : "Loading image..."}
                </div>
              </div>
            ) : generatedImage ? (
              <img
                src={generatedImage}
                alt="Generated image"
                className="w-full h-full object-cover"
                onError={() => {
                  setGeneratedImage(null);
                  toast({
                    title: "Error loading image",
                    description: "The image could not be loaded",
                    variant: "destructive",
                  });
                }}
              />
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGenerator;
