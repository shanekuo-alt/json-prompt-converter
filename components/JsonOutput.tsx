"use client";

import { useState } from "react";
import { JsonPrompt } from "@/lib/schema";

interface JsonOutputProps {
  data: JsonPrompt | null;
  error: string | null;
  isLoading: boolean;
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="rounded-md bg-zinc-700 px-3 py-1.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-600 hover:text-zinc-100 cursor-pointer"
    >
      {copied ? "Copied!" : label}
    </button>
  );
}

export default function JsonOutput({ data, error, isLoading }: JsonOutputProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-zinc-400">JSON Output</h2>
        </div>
        <div className="rounded-lg border border-zinc-700 bg-zinc-800/50 p-6">
          <div className="animate-pulse space-y-3">
            <div className="h-4 w-3/4 rounded bg-zinc-700" />
            <div className="h-4 w-1/2 rounded bg-zinc-700" />
            <div className="h-4 w-5/6 rounded bg-zinc-700" />
            <div className="h-4 w-2/3 rounded bg-zinc-700" />
            <div className="h-4 w-3/4 rounded bg-zinc-700" />
            <div className="h-4 w-1/3 rounded bg-zinc-700" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-medium text-zinc-400">JSON Output</h2>
        <div className="rounded-lg border border-red-800/50 bg-red-950/30 p-4 text-sm text-red-400">
          {error}
        </div>
      </div>
    );
  }

  if (!data) return null;

  const fullJson = JSON.stringify(data, null, 2);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-zinc-400">JSON Output</h2>
        <CopyButton text={fullJson} label="Copy" />
      </div>

      <div className="overflow-x-auto rounded-lg border border-zinc-700 bg-zinc-800/50">
        <pre className="p-4 text-sm leading-relaxed text-zinc-300">
          <code>{fullJson}</code>
        </pre>
      </div>

      <div className="flex flex-wrap gap-2">
        <CopyButton text={fullJson} label="Copy Full JSON" />
        <CopyButton text={data.prompt} label="Copy Prompt Only" />
        <CopyButton
          text={Array.isArray(data.negative_prompt) ? data.negative_prompt.join(", ") : data.negative_prompt}
          label="Copy Negative Prompt"
        />
      </div>
    </div>
  );
}
