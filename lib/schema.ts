export interface JsonPrompt {
  user_intent: string;
  meta: {
    aspect_ratio: string;
    resolution: string;
    style: string;
    purpose: string;
  };
  prompt: string;
  negative_prompt: string[];
  subject: {
    type: string;
    details: string;
  };
  scene: {
    environment: string;
    time_of_day: string;
    background: string;
  };
  lighting: {
    type: string;
    direction: string;
    quality: string;
    color_temperature: string;
  };
  camera: {
    body: string;
    lens: string;
    aperture: string;
    film_stock: string;
    angle: string;
    composition: string;
  };
  style: {
    aesthetic: string;
    color_palette: string;
    mood: string;
  };
  post_processing: {
    sharpness: string;
    contrast: string;
    saturation: string;
  };
  text?: {
    content: string;
    font_style: string;
    placement: string;
    color: string;
  };
  realism?: {
    skin_texture: string;
    imperfections: string;
    depth_falloff: string;
  };
}

export const ASPECT_RATIOS = ["16:9", "4:3", "1:1", "9:16", "3:2", "2:3", "3:4", "4:5", "5:4", "21:9"] as const;
export type AspectRatio = (typeof ASPECT_RATIOS)[number];

export const RESOLUTIONS = ["1K", "2K", "4K"] as const;
export type Resolution = (typeof RESOLUTIONS)[number];

export const PRESETS = ["Ad Creative", "Social Post", "Client Deliverable"] as const;
export type Preset = (typeof PRESETS)[number];

export interface ConvertRequest {
  prompt: string;
  preset?: Preset;
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
