"use client";

import { DIRECTION_MODES, DirectionMode } from "@/lib/schema";

interface ModeSelectorProps {
  selected: DirectionMode;
  onSelect: (mode: DirectionMode) => void;
}

const MODE_KEYS = Object.keys(DIRECTION_MODES) as DirectionMode[];

export default function ModeSelector({ selected, onSelect }: ModeSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-zinc-400">Direction Mode</label>
      <div className="flex flex-wrap gap-2">
        {MODE_KEYS.map((key) => {
          const mode = DIRECTION_MODES[key];
          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelect(key)}
              title={`${mode.description} (${mode.total} directions)`}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all cursor-pointer ${
                selected === key
                  ? "bg-amber-500 text-zinc-900 shadow-md shadow-amber-500/20"
                  : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100"
              }`}
            >
              {mode.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
