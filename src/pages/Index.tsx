
import { useState } from "react";
import ImageGenerator from "@/components/ImageGenerator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [apiKey, setApiKey] = useState("");
  const [isKeySet, setIsKeySet] = useState(false);

  const handleSubmitKey = () => {
    if (apiKey.trim()) {
      setIsKeySet(true);
    }
  };

  if (!isKeySet) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/20">
        <div className="w-full max-w-md p-6">
          <div className="glass-panel rounded-2xl p-6 space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-medium tracking-tight">Welcome</h1>
              <p className="text-sm text-muted-foreground">
                Please enter your Runware API key to get started
              </p>
            </div>
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="Enter your API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <Button
                className="w-full"
                onClick={handleSubmitKey}
                disabled={!apiKey.trim()}
              >
                Continue
              </Button>
            </div>
            <p className="text-xs text-center text-muted-foreground">
              Don't have an API key?{" "}
              <a
                href="https://runware.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary transition-colors"
              >
                Get one here
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-12">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-medium tracking-tight">Text to Image</h1>
          <p className="text-muted-foreground">
            Transform your words into stunning images
          </p>
        </div>
        <ImageGenerator apiKey={apiKey} />
      </div>
    </div>
  );
};

export default Index;
