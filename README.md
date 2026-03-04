# JSON Prompt Converter

Internal Ad101 tool for converting plain English image descriptions into structured JSON prompts optimized for Google Imagen (Nano Banana 2).

## Setup

1. Clone the repo and install dependencies:

```bash
npm install
```

2. Create `.env.local` with your Anthropic API key:

```
ANTHROPIC_API_KEY=sk-ant-...
```

3. Run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## How It Works

1. Type a plain English image description
2. Optionally select a preset (Ad Creative, Social Post, Client Deliverable)
3. Choose aspect ratio and resolution
4. Click "Generate JSON Prompt"
5. Copy the full JSON or just the prompt field to paste into Google AI Studio

## Presets

| Preset | Best For |
|---|---|
| **Ad Creative** | Product shots, clean backgrounds, commercial lighting |
| **Social Post** | Lifestyle content, vibrant colors, scroll-stopping visuals |
| **Client Deliverable** | Polished professional imagery, neutral tones, studio quality |

## Deployment

Deploy to Vercel and set `ANTHROPIC_API_KEY` in the environment variables.
