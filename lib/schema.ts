export interface Refinement {
  label: string;
  prompt: string;
}

export interface Direction {
  label: string;
  category: "standard" | "outside-the-box" | "wild-card";
  description: string;
  prompt: string;
  refinements: Refinement[];
}

export interface GenerateResponse {
  directions: Direction[];
}

export const ASPECT_RATIOS = ["16:9", "4:3", "1:1", "9:16", "3:2", "2:3", "3:4", "4:5", "5:4", "21:9"] as const;
export type AspectRatio = (typeof ASPECT_RATIOS)[number];

export const RESOLUTIONS = ["1K", "2K", "4K"] as const;
export type Resolution = (typeof RESOLUTIONS)[number];

export const DIRECTION_MODES = {
  "full-standard": { label: "Full Standard", description: "All conventional approaches", standard: 8, otb: 0, wildCard: 0, total: 8 },
  "full-creative": { label: "Full Creative", description: "All outside-the-box", standard: 0, otb: 8, wildCard: 0, total: 8 },
  "full-wild-card": { label: "Full Wild Card", description: "All wild cards", standard: 0, otb: 0, wildCard: 6, total: 6 },
  "balanced": { label: "A Little of Everything", description: "Balanced mix", standard: 4, otb: 4, wildCard: 2, total: 10 },
  "money-saver": { label: "Money Saver", description: "Minimal cost, still diverse", standard: 3, otb: 2, wildCard: 1, total: 6 },
} as const;

export type DirectionMode = keyof typeof DIRECTION_MODES;

export interface GenerateRequest {
  prompt: string;
  mode?: DirectionMode;
  includeRefinements?: boolean;
  aspectRatio?: AspectRatio;
  resolution?: Resolution;
  purpose?: string;
  text?: {
    content: string;
    font_style?: string;
    placement?: string;
    color?: string;
  };
}
