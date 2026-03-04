"use client";

import { PRESETS, Preset } from "@/lib/schema";

const PRESET_DESCRIPTIONS: Record<Preset, string> = {
  "Ad Creative": "Clean backgrounds, product-focused, commercial lighting",
  "Social Post": "Vibrant, lifestyle, eye-catching, scroll-stopping",
  "Client Deliverable": "Polished, professional, neutral palette, studio quality",
};

interface PresetSelectorProps {
  selected: Preset | null;
  onSelect: (preset: Preset | null) => void;
}

export default function PresetSelector({ selected, onSelect }: PresetSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-zinc-400">Preset</label>
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => onSelect(selected === preset ? null : preset)}
            title={PRESET_DESCRIPTIONS[preset]}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all cursor-pointer ${
              selected === preset
                ? "bg-amber-500 text-zinc-900 shadow-md shadow-amber-500/20"
                : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100"
            }`}
          >
            {preset}
          </button>
        ))}
      </div>
    </div>
  );
}
