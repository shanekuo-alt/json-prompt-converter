"use client";

import { ASPECT_RATIOS, RESOLUTIONS, THINKING_LEVELS, AspectRatio, Resolution, Preset, ThinkingLevel } from "@/lib/schema";
import PresetSelector from "./PresetSelector";

interface PromptInputProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  preset: Preset | null;
  onPresetChange: (preset: Preset | null) => void;
  aspectRatio: AspectRatio;
  onAspectRatioChange: (ratio: AspectRatio) => void;
  resolution: Resolution;
  onResolutionChange: (res: Resolution) => void;
  purpose: string;
  onPurposeChange: (value: string) => void;
  thinkingLevel: ThinkingLevel;
  onThinkingLevelChange: (level: ThinkingLevel) => void;
  textContent: string;
  onTextContentChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export default function PromptInput({
  prompt,
  onPromptChange,
  preset,
  onPresetChange,
  aspectRatio,
  onAspectRatioChange,
  resolution,
  onResolutionChange,
  purpose,
  onPurposeChange,
  thinkingLevel,
  onThinkingLevelChange,
  textContent,
  onTextContentChange,
  onSubmit,
  isLoading,
}: PromptInputProps) {
  return (
    <div className="flex flex-col gap-5">
      <PresetSelector selected={preset} onSelect={onPresetChange} />

      <div className="flex flex-col gap-2">
        <label htmlFor="prompt" className="text-sm font-medium text-zinc-400">
          Describe your image
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey) && !isLoading && prompt.trim()) {
              onSubmit();
            }
          }}
          placeholder="A red sports car on a mountain road at sunset..."
          rows={4}
          className="w-full resize-none rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-3 text-zinc-100 placeholder-zinc-500 outline-none transition-colors focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/25"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="purpose" className="text-sm font-medium text-zinc-400">
          What is this image for?
        </label>
        <input
          id="purpose"
          type="text"
          value={purpose}
          onChange={(e) => onPurposeChange(e.target.value)}
          placeholder="Instagram ad, pitch deck, product listing..."
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-2.5 text-zinc-100 placeholder-zinc-500 outline-none transition-colors focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/25"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="textContent" className="text-sm font-medium text-zinc-400">
          Text in image <span className="text-zinc-600">(optional)</span>
        </label>
        <input
          id="textContent"
          type="text"
          value={textContent}
          onChange={(e) => onTextContentChange(e.target.value)}
          placeholder="SUMMER SALE 50% OFF"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-2.5 text-zinc-100 placeholder-zinc-500 outline-none transition-colors focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/25"
        />
      </div>

      <div className="flex flex-wrap items-end gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-400">Aspect Ratio</label>
          <div className="flex flex-wrap gap-1.5">
            {ASPECT_RATIOS.map((ratio) => (
              <button
                key={ratio}
                type="button"
                onClick={() => onAspectRatioChange(ratio)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all cursor-pointer ${
                  aspectRatio === ratio
                    ? "bg-zinc-600 text-zinc-100"
                    : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-300"
                }`}
              >
                {ratio}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-400">Resolution</label>
          <div className="flex gap-1.5">
            {RESOLUTIONS.map((res) => (
              <button
                key={res}
                type="button"
                onClick={() => onResolutionChange(res)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all cursor-pointer ${
                  resolution === res
                    ? "bg-zinc-600 text-zinc-100"
                    : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-300"
                }`}
              >
                {res}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-zinc-400">Thinking</label>
          <div className="flex gap-1.5">
            {THINKING_LEVELS.map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => onThinkingLevelChange(level)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all cursor-pointer ${
                  thinkingLevel === level
                    ? "bg-zinc-600 text-zinc-100"
                    : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-300"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onSubmit}
        disabled={isLoading || !prompt.trim()}
        className="mt-1 w-full rounded-lg bg-amber-500 px-6 py-3 text-base font-semibold text-zinc-900 shadow-lg shadow-amber-500/20 transition-all hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none cursor-pointer"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Generating...
          </span>
        ) : (
          "Generate JSON Prompt"
        )}
      </button>
    </div>
  );
}
