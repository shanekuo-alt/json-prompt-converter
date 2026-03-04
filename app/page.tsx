"use client";

import { useState } from "react";
import { GenerateResponse, AspectRatio, Resolution, DirectionMode } from "@/lib/schema";
import PromptInput from "@/components/PromptInput";
import DirectionsOutput from "@/components/DirectionsOutput";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState<DirectionMode>("balanced");
  const [includeRefinements, setIncludeRefinements] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("16:9");
  const [resolution, setResolution] = useState<Resolution>("2K");
  const [purpose, setPurpose] = useState("");
  const [textContent, setTextContent] = useState("");
  const [result, setResult] = useState<GenerateResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: prompt.trim(),
          mode,
          includeRefinements,
          aspectRatio,
          resolution,
          purpose: purpose.trim() || undefined,
          text: textContent.trim() ? { content: textContent.trim() } : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      setResult(data as GenerateResponse);
    } catch {
      setError("Failed to connect to the server. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-start justify-center bg-zinc-950 px-4 py-12 font-sans sm:py-16">
      <main className="w-full max-w-5xl">
        <header className="mb-8">
          <div className="mx-auto max-w-2xl">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-amber-500 text-sm font-bold text-zinc-900">
                A
              </div>
              <div>
                <h1 className="text-lg font-semibold text-zinc-100">
                  Creative Direction Generator
                </h1>
                <p className="text-sm text-zinc-500">
                  10 divergent visual directions for Nano Banana 2
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-2xl">
          <div className="flex flex-col gap-8 rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl sm:p-8">
            <PromptInput
              prompt={prompt}
              onPromptChange={setPrompt}
              mode={mode}
              onModeChange={setMode}
              includeRefinements={includeRefinements}
              onIncludeRefinementsChange={setIncludeRefinements}
              aspectRatio={aspectRatio}
              onAspectRatioChange={setAspectRatio}
              resolution={resolution}
              onResolutionChange={setResolution}
              purpose={purpose}
              onPurposeChange={setPurpose}
              textContent={textContent}
              onTextContentChange={setTextContent}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>
        </div>

        {(isLoading || result || error) && (
          <div className="mt-8">
            <DirectionsOutput data={result} error={error} isLoading={isLoading} hasTextContent={textContent.trim().length > 0} />
          </div>
        )}

        <footer className="mt-6 text-center text-xs text-zinc-600">
          Ad101 Internal Tool &middot; Powered by Claude Sonnet
        </footer>
      </main>
    </div>
  );
}
