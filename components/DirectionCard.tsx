"use client";

import { useState } from "react";
import { Direction } from "@/lib/schema";
import CopyButton from "./CopyButton";

const CATEGORY_STYLES = {
  standard: "bg-zinc-700 text-zinc-300",
  "outside-the-box": "bg-amber-500/15 text-amber-400",
  "wild-card": "bg-violet-500/15 text-violet-400",
};

const CATEGORY_LABELS = {
  standard: "Standard",
  "outside-the-box": "Outside the Box",
  "wild-card": "Wild Card",
};

interface DirectionCardProps {
  direction: Direction;
}

export default function DirectionCard({ direction }: DirectionCardProps) {
  const [showRefinements, setShowRefinements] = useState(false);

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-zinc-800 bg-zinc-900 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${CATEGORY_STYLES[direction.category]}`}
            >
              {CATEGORY_LABELS[direction.category]}
            </span>
            <h3 className="text-sm font-semibold text-zinc-100">{direction.label}</h3>
          </div>
          <p className="text-sm text-zinc-400">{direction.description}</p>
        </div>
      </div>

      <div className="rounded-md border border-zinc-700/50 bg-zinc-800/50 p-3">
        <p className="text-sm leading-relaxed text-zinc-300">{direction.prompt}</p>
      </div>

      <div className="flex items-center justify-between">
        <CopyButton text={direction.prompt} label="Copy Prompt" />
        {direction.refinements.length > 0 && (
          <button
            type="button"
            onClick={() => setShowRefinements(!showRefinements)}
            className="text-sm text-zinc-500 transition-colors hover:text-zinc-300 cursor-pointer"
          >
            {showRefinements ? "Hide" : "Show"} Refinements ({direction.refinements.length})
          </button>
        )}
      </div>

      {showRefinements && direction.refinements.length > 0 && (
        <div className="flex flex-col gap-3 border-t border-zinc-800 pt-3">
          <p className="text-xs text-zinc-600">
            Paste as a new generation for best results — editing an existing image degrades quality after 2-3 rounds.
          </p>
          {direction.refinements.map((refinement, idx) => (
            <div key={idx} className="flex flex-col gap-2 rounded-md border border-zinc-700/30 bg-zinc-800/30 p-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-medium text-zinc-400">{refinement.label}</span>
                <CopyButton text={refinement.prompt} label="Copy" />
              </div>
              <p className="text-sm leading-relaxed text-zinc-400">{refinement.prompt}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
