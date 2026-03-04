"use client";

import { useState } from "react";
import { GenerateResponse } from "@/lib/schema";
import DirectionCard from "./DirectionCard";

interface DirectionsOutputProps {
  data: GenerateResponse | null;
  error: string | null;
  isLoading: boolean;
  hasTextContent?: boolean;
}

function SkeletonCard() {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
      <div className="animate-pulse space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-5 w-16 rounded-full bg-zinc-700" />
          <div className="h-5 w-32 rounded bg-zinc-700" />
        </div>
        <div className="h-4 w-full rounded bg-zinc-700/50" />
        <div className="space-y-2 rounded-md border border-zinc-700/30 bg-zinc-800/30 p-3">
          <div className="h-4 w-5/6 rounded bg-zinc-700/50" />
          <div className="h-4 w-2/3 rounded bg-zinc-700/50" />
        </div>
        <div className="h-7 w-24 rounded bg-zinc-700/50" />
      </div>
    </div>
  );
}

function TipsBanner({ hasTextContent }: { hasTextContent: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-800/50 px-4 py-3">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center gap-2 text-left cursor-pointer"
      >
        <svg
          className="h-3.5 w-3.5 shrink-0 text-zinc-500"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
          />
        </svg>
        <span className="text-xs font-medium text-zinc-400">Tips</span>
        <svg
          className={`ml-auto h-3 w-3 text-zinc-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {isOpen && (
        <ul className="mt-2 flex flex-col gap-1.5 border-t border-zinc-700/50 pt-2">
          <li className="text-xs text-zinc-500">
            For maximum fidelity hero shots, paste these prompts into Imagen Pro via &ldquo;Redo with Pro.&rdquo;
          </li>
          <li className="text-xs text-zinc-500">
            Paste each refinement as a new generation — editing an existing image degrades quality after 2-3 rounds.
          </li>
          {hasTextContent && (
            <li className="text-xs text-zinc-500">
              NB2 text rendering is ~87% accurate. For guaranteed accuracy on final assets, overlay text in Figma or Canva after generation.
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

export default function DirectionsOutput({ data, error, isLoading, hasTextContent }: DirectionsOutputProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="h-5 w-40 animate-pulse rounded bg-zinc-700" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-800/50 bg-red-950/30 p-4 text-sm text-red-400">
        {error}
      </div>
    );
  }

  if (!data) return null;

  const standard = data.directions.filter((d) => d.category === "standard");
  const otb = data.directions.filter((d) => d.category === "outside-the-box");
  const wildCard = data.directions.filter((d) => d.category === "wild-card");

  return (
    <div className="flex flex-col gap-8">
      <TipsBanner hasTextContent={hasTextContent ?? false} />

      {standard.length > 0 && (
        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
            Standard Directions
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {standard.map((direction, i) => (
              <DirectionCard key={i} direction={direction} />
            ))}
          </div>
        </section>
      )}

      {otb.length > 0 && (
        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-amber-400">
            Outside the Box
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {otb.map((direction, i) => (
              <DirectionCard key={i} direction={direction} />
            ))}
          </div>
        </section>
      )}

      {wildCard.length > 0 && (
        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-violet-400">
            Wild Card
          </h2>
          <div className="flex flex-col gap-4">
            {wildCard.map((direction, i) => (
              <DirectionCard key={i} direction={direction} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
