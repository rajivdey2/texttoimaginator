
import { useState } from "react";
import ImageGenerator from "@/components/ImageGenerator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Index = () => {
  // Pre-fill the API key and set isKeySet to true
  const [apiKey] = useState("2EZSWr0HL8hNEJs0oMqFNfA9feygUJYD");
  const [isKeySet] = useState(true);

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
