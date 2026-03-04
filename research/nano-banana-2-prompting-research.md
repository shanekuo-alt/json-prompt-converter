# Nano Banana 2 — Prompting Research Dossier

**Compiled:** Tuesday 03/03
**Sources:** Reddit (r/GeminiNanoBanana2, r/GeminiAI, r/Bard, r/automation, r/promptingmagic, r/generativeAI, r/openclaw, r/deepdream, r/ContentCreators), X/Twitter, Medium, Google Developer Blog, DeepDreamGenerator, ImagineArt, TechRadar, ZDNET, Lifehacker, Ars Technica, DataCamp, Milvus, Mashable
**Timeframe:** Feb 26–Mar 3, 2026 (launch week)

---

## TL;DR

Nano Banana 2 (Gemini 3.1 Flash Image) launched Feb 26, 2026. The community consensus after one week: **JSON prompting still works and is actively thriving** — but the prompt narrative itself should be written in full natural-language sentences, not comma-separated keyword tags. NB2 is fundamentally a language model that generates images, so it responds to creative-director-style briefs, not search-engine-style queries. The most viral and high-engagement content centers on structured JSON for parameter control combined with dense, sentence-based prompt fields.

---

## 1. Does JSON Prompting Still Work for NB2?

**Verdict: Yes — and it's arguably more popular than ever.**

### Evidence

| Source | Engagement | Key Detail |
|--------|-----------|------------|
| r/Bard — "I finally stopped ruining my AI generations. Here is the JSON workflow I use" | High engagement, top of sub | User describes JSON workflow as "completely solving" precise edits while keeping style locked in. Specifically for NB2. |
| r/GeminiNanoBanana2 — "Highly Customizable Subject with Fire Pose (JSON Prompt Below)" | Multi-image showcase, high engagement | Extremely detailed nested JSON prompt with granular face, body, camera, style, and negative_prompt fields. Getting great results on NB2. |
| r/automation — "I finally found the workflow to replicate ANY image style using Nano Banana Pro" | Viral post, cross-posted to r/GeminiAI | 3-step workflow: extract style as JSON → feed JSON into Nano Banana. "The biggest win is having the style/character DNA captured in JSON so I'm not rewriting the same description every time." |
| r/openclaw — "I built a skill that turns plain prompts into optimized JSON prompts" | Active discussion | Builds structured JSON with camera model, lens, film stock, render engine, material properties. Before/after comparison shows dramatic improvement. |
| r/ContentCreators — "How to create realistic long-form AI videos" | Active workflow thread | "Generate the image in Nano Banana Pro. Use structured JSON prompts. Explicitly control color grading." |
| r/promptingmagic — "The Ultimate Guide to Nano Banana 2" | Massively viral, 500+ prompts | Recommends structured prompting framework (Subject → Composition → Action → Location → Style → Editing). |

### Why JSON Still Works

1. **Parameter isolation** — JSON lets you lock individual visual elements (lighting, camera, color) while changing others, preventing "style drift" during iteration
2. **Reproducibility** — Same JSON = same character DNA across sessions
3. **Precision over natural language ambiguity** — "f/1.8" in a JSON field is unambiguous; embedded in a paragraph it might get deprioritized
4. **Style extraction workflow** — The viral workflow of extracting a reference image's visual DNA as JSON, then feeding it back, validates the format

### The Nuance: JSON Structure + Natural Language Prompts

The key insight from the highest-engagement posts: **use JSON for structured parameters (camera, lighting, scene metadata) but write the main `prompt` field as dense, natural-language sentences.** NB2's language model backbone processes full sentences dramatically better than comma-separated tags.

> "Write full sentences, not comma-separated keyword tags. Nano Banana 2 is a language model that generates images. Talk to it like a creative director briefing a photographer." — r/promptingmagic Ultimate Guide

---

## 2. The 10 Prompting Principles Getting the Most Engagement

These are the principles that surfaced repeatedly across multiple high-engagement sources. Ranked by frequency of mention and community validation.

### Principle 1: Write Full Sentences, Not Keyword Tags

**Engagement signal:** Mentioned in virtually every high-performing guide.

> "A golden retriever bounding through a sun-dappled autumn park, leaves scattering around its paws" vastly outperforms "golden retriever, park, autumn, 4k, realistic."
> — DeepDreamGenerator

**Current tool gap:** Our system prompt already instructs this for the `prompt` field. No change needed here — we're aligned.

### Principle 2: Name Real Camera Bodies and Film Stocks

**Engagement signal:** Consistently the #1 "pro tip" across Reddit, Medium, and Twitter.

> "Shot on Hasselblad X2D 135mm at f/5.6 gives radically different results than just saying portrait."
> — r/promptingmagic

> "Film stocks work too: 'Kodak Portra 400' or 'Fujifilm Velvia 50' each produce distinct, recognizable aesthetics."
> — DeepDreamGenerator

**Specific camera bodies that get best results (community-tested):**
- Hasselblad X2D (medium format detail + tonal range)
- Sony A7IV (general photorealistic)
- Phase One IQ4 (studio/product)
- Canon 5D Mark IV (portrait/commercial)

**Film stocks that trigger distinct aesthetics:**
- Kodak Portra 400 (warm, skin-flattering, editorial)
- Fujifilm Velvia 50 (saturated landscapes, vivid)
- Kodak Ektar 100 (fine grain, vivid, punchy)
- Ilford HP5 (black & white, grain, documentary)
- Cinestill 800T (tungsten-balanced, cinematic, neon halos)

**Current tool gap:** Our schema has `lens` and `aperture` but NOT camera body or film stock. These are the two highest-signal additions we could make.

### Principle 3: Lighting is the Single Most Powerful Variable

**Engagement signal:** Called out as #1 variable by DeepDreamGenerator, r/promptingmagic, ImagineArt, and the Google Developer Blog.

> "Specify direction, quality, AND color temperature. 'Soft key light from the upper left with a warm rim light separating the subject from a dark background' produces dramatically better results than 'good lighting.'"
> — DeepDreamGenerator

**Current tool gap:** Our schema has `lighting.type`, `lighting.direction`, and `lighting.quality` — but is missing `lighting.color_temperature`. Community testing shows color temperature is a major quality lever.

### Principle 4: Provide Context About Purpose/Intent

**Engagement signal:** Viral tip, mentioned in DeepDreamGenerator, r/promptingmagic, and Google Developer Blog.

> "Tell the model what the image is for. 'Create an image of a sandwich for a Brazilian high-end gourmet cookbook' helps it infer plating style, depth of field, and lighting without you specifying each one. Context is a shortcut to quality."
> — DeepDreamGenerator

> "Provide the why. Telling it the image is for a luxury perfume launch campaign changes the output mood and quality."
> — r/promptingmagic

**Current tool gap:** Our schema has NO `purpose` or `intent` field. This is a high-impact, low-effort addition. The model uses purpose to fill in dozens of implicit defaults.

### Principle 5: Use Specific Color Names, Not Generic Categories

**Engagement signal:** Mentioned across multiple guides.

> Instead of "warm tones," write "amber, terracotta, and burnt sienna tones." Instead of "cool blues," write "steel blue, cerulean, and slate gray."

**Current tool gap:** Our `style.color_palette` uses generic categories like `warm_earth_tones` and `cool_blues`. The system prompt does instruct Claude to use specific names in the `prompt` field — but the JSON field itself could be more specific. Consider making this a free-text field rather than an enum.

### Principle 6: Describe Light Behavior, Not Just Light Type

**Engagement signal:** Featured in our system prompt already, validated by community testing.

> Instead of "soft lighting," write "soft diffused window light casting long gentle shadows across the surface, with subtle specular highlights on reflective areas."

**Current tool status:** Already in our system prompt. Validated as correct approach.

### Principle 7: Be Spatially Explicit

**Engagement signal:** Mentioned in multiple guides.

> "positioned in the lower third of the frame," "slightly off-center to the left," "receding into soft bokeh in the background."

**Current tool status:** Already in our system prompt. Validated.

### Principle 8: Front-Load Quality Anchors

**Engagement signal:** Validated across all sources.

> Every prompt should front-load a quality/style anchor: "Award-winning commercial product photograph," "National Geographic-style landscape," "Editorial lifestyle photograph shot on Hasselblad."

**Current tool status:** Already in our system prompt examples. Validated.

### Principle 9: Specify Resolution and Aspect Ratio at the End of the Prompt

**Engagement signal:** r/promptingmagic, Eachlabs, Google Developer Blog.

> "Say '4K output, 16:9 aspect ratio' at the end of your prompt."

**Current tool gap:** We pass aspect ratio and resolution as separate parameters but don't embed them in the prompt narrative itself. NB2 reportedly responds better when they're also stated explicitly within the prompt text.

### Principle 10: Controlled Imperfection for Realism

**Engagement signal:** Multiple Reddit posts specifically about this.

> "Keeping natural skin micro-texture (no over-smoothing). Matching catchlight direction to a logical light source. Adding slight depth falloff instead of edge-to-edge sharpness. Introducing small asymmetries in face and posture. Allowing minor imperfections."
> — r/GeminiNanoBanana2 influencer testing thread

**Current tool gap:** Our negative prompts tell the model what to AVOID but we don't have guidance for intentional imperfection. This is critical for photorealistic output.

---

## 3. NB2-Specific Features to Leverage

### 3a. Google Search Grounding (NB2 Exclusive)

NB2 can query Google Search during generation. No other image model can do this.

> "Name real landmarks, real brands, real people, or current events and the model will pull actual reference imagery. 'The Sagrada Familia at golden hour with scaffolding removed' works because the model looks it up."
> — DeepDreamGenerator

**Implication:** Our tool should tell users they can reference real-world locations, products, and landmarks by name. The model will look them up.

### 3b. Configurable Thinking Levels

NB2 supports thinking levels: Minimal, Low, Medium, High, Dynamic.

- **Minimal/Low:** Fast iterations, simple compositions
- **High:** Complex multi-element scenes, precise instruction following
- **Dynamic:** Model decides based on prompt complexity

**Implication:** Could be a useful parameter in our schema or as an API setting.

### 3c. Expanded Aspect Ratio Support

NB2 natively supports: **1:1, 3:2, 2:3, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9**

We currently only support: 16:9, 4:3, 1:1, 9:16

**Missing:** 3:2, 2:3, 3:4, 4:5, 5:4, 21:9

### 3d. Text Rendering

NB2 has significantly improved text rendering. Community best practices:

- Put exact text in **double quotes**: `"SUMMER SALE"`
- Specify font style explicitly: `"bold sans-serif font, Helvetica style"`
- Specify placement: `"centered at top third of frame"`
- Keep text short (under 8 words for best accuracy)
- Split long text into multiple lines in the prompt

### 3e. Character Consistency

NB2 maintains consistency for up to 5 characters and 14 objects across generations. For our tool, this means:
- Detailed character descriptions should be structured and reusable
- The JSON format is ideal for this — "style/character DNA captured in JSON"

### 3f. Iterative Editing ("Edit, Don't Re-roll")

> "If the image is 80% right, don't regenerate from scratch. Say: 'That's great, but change the lighting to sunset and make the text blue.' NB2 excels at conversational refinement."

**Implication:** Our tool currently generates once. A future iteration could support "refine this output" as a second pass.

---

## 4. New Schema Fields the Community is Using

Based on the highest-engagement JSON prompts being shared, these fields appear in community prompts but NOT in our current schema:

### 4a. Camera Body / Sensor

```json
"camera": {
  "body": "Hasselblad X2D",        // NEW
  "lens": "85mm",
  "aperture": "f/1.8",
  "film_stock": "Kodak Portra 400", // NEW
  ...
}
```

**Why:** Camera body and film stock are the two most consistently recommended additions. They trigger fundamentally different rendering characteristics.

### 4b. Purpose / Context

```json
"meta": {
  "purpose": "luxury perfume launch campaign", // NEW
  ...
}
```

**Why:** "Provide the why" is a top-5 principle. The model uses purpose to infer dozens of implicit defaults (plating style, depth of field, lighting, mood).

### 4c. Color Temperature (Lighting)

```json
"lighting": {
  "type": "natural_sunlight",
  "direction": "side_lit",
  "quality": "soft",
  "color_temperature": "warm golden (3500K)" // NEW
}
```

**Why:** Color temperature is consistently called out as a major quality lever that's separate from light type/direction/quality.

### 4d. Text Rendering (NEW Section)

```json
"text": {
  "content": "SUMMER SALE 50% OFF",
  "font_style": "bold sans-serif, Helvetica style",
  "placement": "centered at top third of frame",
  "color": "white with black drop shadow"
}
```

**Why:** Text rendering is one of NB2's breakthrough features and a major use case for ad creatives specifically. Our tool currently has no support for it.

### 4e. Negative Prompt as Array

The most detailed community JSON prompts use arrays instead of strings:

```json
"negative_prompt": [
  "portrait mode",
  "background blur",
  "cinematic lighting",
  "over-smoothing skin",
  "beauty filters",
  "airbrushed look",
  "HDR exaggeration"
]
```

**Why:** Easier to customize per subject type, more readable, and some API implementations accept arrays.

### 4f. Realism Controls

```json
"realism": {
  "skin_texture": "natural with visible pores",
  "imperfections": "slight asymmetry, minor skin marks",
  "depth_falloff": "gradual, not edge-to-edge sharp"
}
```

**Why:** The "controlled imperfection" thread was one of the highest-engagement NB2 posts. Overcorrected perfection is the #1 tell of AI-generated images.

---

## 5. Most Viral Prompt Formats

These specific formats went viral during NB2 launch week:

### 5a. The Collectible Action Figure Box
Prompt structure that makes the subject look like a packaged toy. Extremely high engagement on Twitter/X and Reddit.

### 5b. The Photorealistic Split-Light Portrait
> "Shot on Hasselblad X2D 100C, 135mm f/2.8 at ISO 200. Dramatic split lighting dividing the face perfectly in half — one side in warm tungsten key light, the other in complete shadow. No background, no color. Black and white."

### 5c. The "Purpose-Driven" Product Shot
> "Create an image of [product] for a [specific context]. Shot on [camera body] with [lens]."

The context/purpose approach was the most consistently recommended technique for commercial imagery.

### 5d. The Style Transfer Workflow
Upload reference image → Extract as JSON → Modify subject → Feed back into NB2. This was the single most-shared workflow on Reddit.

---

## 6. NB2 vs. NB Pro — Community Consensus

| Dimension | NB2 | NB Pro |
|-----------|-----|--------|
| Speed | ~2-5x faster | Slower |
| Cost | ~50% cheaper ($0.035/image) | ~$0.07/image |
| Quality | Near-Pro, slightly less refined | Gold standard |
| Text rendering | Excellent (Pro-like) | Best in class |
| Character consistency | Up to 5 chars/14 objects | Same |
| Aspect ratios | 10 native ratios incl. 21:9 | Fewer |
| Google Search grounding | Yes | Yes |
| Best for | High-volume, iteration, production | Maximum fidelity, hero shots |

**Community sentiment:** Most creators are switching to NB2 as their default and only using Pro for final "hero" shots where maximum fidelity matters. For Ad101's use case (generating prompts for team members to paste into Google AI Studio), NB2 is the right target.

> "Google is forcing the inferior Nano Banana 2 as the default image mode in Pro. You can still invoke Pro mode once you create the image."
> — r/GeminiAI (PSA post, some pushback on quality difference)

> "Overall, it does feel as though Pro still has the edge in terms of quality and subtle touches, but in certain cases I preferred what Nano Banana 2 served up."
> — Lifehacker

---

## 7. Gaps in Our Current Implementation

Based on this research, here are the specific gaps between what the community is doing and what our tool currently generates:

### High Priority (Direct impact on output quality)

| Gap | Current State | Recommended Change |
|-----|--------------|-------------------|
| No camera body | `lens: "85mm"` | Add `camera.body` field (e.g., "Hasselblad X2D", "Sony A7IV") |
| No film stock | Not present | Add `camera.film_stock` field (e.g., "Kodak Portra 400") |
| No purpose/context | Not present | Add `meta.purpose` field |
| No text rendering support | Not present | Add `text` section for ad copy in image |
| Missing aspect ratios | 4 ratios | Add 3:2, 2:3, 3:4, 4:5, 5:4, 21:9 |
| No color temperature | Not present | Add `lighting.color_temperature` |
| Resolution not in prompt text | Passed as metadata only | Embed "4K output" in the prompt narrative |

### Medium Priority (Polish and differentiation)

| Gap | Current State | Recommended Change |
|-----|--------------|-------------------|
| Generic color palette enums | `warm_earth_tones`, `cool_blues` | Make free-text or add specific-colors sub-field |
| No realism controls | Not present | Add controlled-imperfection guidance for photorealistic subjects |
| Negative prompt is string | Single string | Consider array format for easier customization |
| No thinking level | Not present | Add as optional parameter |
| No style-specific templates | Photography only | Add 3D/Pixar, Anime, Watercolor, Illustration templates |

### Low Priority (Future iteration)

| Gap | Current State | Recommended Change |
|-----|--------------|-------------------|
| No iterative editing support | Generate once | Add "refine" mode |
| No reference image support | Text-only input | Add image upload for style extraction |
| No character consistency tracking | Not present | Store character descriptions for reuse |

---

## 8. Recommended Implementation Order

Based on effort-to-impact ratio:

1. **Add `camera.body` and `camera.film_stock` to schema** — Highest signal-to-noise tip across all sources. Low effort, high impact.
2. **Add `meta.purpose` field** — "Provide the why" is a top-5 principle. Claude can infer this from user input.
3. **Embed resolution/aspect ratio in the prompt narrative** — Community consensus that NB2 responds better when these are stated inside the prompt text.
4. **Expand aspect ratio options** — Add 3:2, 2:3, 3:4, 4:5, 5:4, 21:9.
5. **Add `lighting.color_temperature`** — Separate from light type/quality.
6. **Add `text` section** — Critical for ad creative use case specifically.
7. **Update system prompt with NB2-specific guidance** — Reference Google Search grounding, thinking levels, controlled imperfection.
8. **Make `style.color_palette` more specific** — Free-text or add named-colors sub-field.

---

## Sources

### Reddit (Highest Engagement)
- [r/promptingmagic — "The Ultimate Guide to Nano Banana 2: 160 Use Cases, 500 Prompts"](https://www.reddit.com/r/promptingmagic/comments/1rjt2r9/)
- [r/Bard — "I finally stopped ruining my AI generations. Here is the JSON workflow"](https://www.reddit.com/r/Bard/comments/1rjz9i4/)
- [r/GeminiNanoBanana2 — "Highly Customizable Subject with Fire Pose (JSON Prompt Below)"](https://www.reddit.com/r/GeminiNanoBanana2/comments/1riqdr1/)
- [r/automation — "I finally found the workflow to replicate ANY image style"](https://www.reddit.com/r/automation/comments/1qwpzmb/)
- [r/openclaw — "I built a skill that turns plain prompts into optimized JSON prompts"](https://www.reddit.com/r/openclaw/comments/1ratxi3/)
- [r/GoogleGeminiAI — "Nano Banana 2 Highlights and Some Useful Tips"](https://www.reddit.com/r/GoogleGeminiAI/comments/1rhgvjb/)
- [r/GeminiNanoBanana2 — "Realistic AI Influencer Test On Nano Banana 2"](https://www.reddit.com/r/GeminiNanoBanana2/comments/1rg8idm/)
- [r/GeminiAI — "PSA: Google is forcing NB2 as default"](https://www.reddit.com/r/GeminiAI/comments/1rfh9ps/)
- [r/generativeAI — "Nano Banana 2 vs Nano Banana Pro Comparison"](https://www.reddit.com/r/generativeAI/comments/1rgnpt1/)
- [r/Bard — "Nano Banana 2 dropped — working API example inside"](https://www.reddit.com/r/Bard/comments/1rfcjd5/)

### Twitter/X
- [@rubenhassid — "How to prompt Nano Banana 2" testing thread](https://x.com/rubenhassid/status/2028466511191392362)
- [@freepik — "Google just dropped Nano Banana 2 — tested prompts and results"](https://x.com/freepik/status/2027390202474303861)
- [@icreatelife — "Community highlight of the best Nano Banana 2 prompts"](https://x.com/icreatelife/status/2027785694987329665)
- [@SebJefferies — "Designers, you might want to sit down. NB2 Styles feature is wild"](https://x.com/SebJefferies/status/2028483300092785019)
- [@maxescu — "The Ultimate Nano Banana 2 Guide" + real-time data prompts](https://x.com/maxescu/status/2028226075998683622)
- [@hedra_labs — "Nano Banana Pro 2 is live in Hedra" + prompt guide](https://x.com/hedra_labs/status/2027149049359487299)
- [@invideoOfficial — "Detailed prompt guide for NB2"](https://x.com/invideoOfficial/status/2028559230220083258)

### Articles & Guides
- [DeepDreamGenerator — "Nano Banana 2: The Best Prompts, Techniques, and What Makes It Revolutionary"](https://deepdreamgenerator.com/blog/nano-banana-2-best-prompts)
- [Travis Nicholson / Medium — "Nano Banana 2 Is Here: 6 Tips for Better Results"](https://travisnicholson.medium.com/nano-banana-2-is-here-6-tips-for-better-results-2d6bd67fac86)
- [Google Developer Blog — "How to prompt Gemini 2.5 Flash Image Generation"](https://developers.googleblog.com/how-to-prompt-gemini-2-5-flash-image-generation-for-the-best-results/)
- [Google Blog — "Build with Nano Banana 2" (developer announcement)](https://blog.google/innovation-and-ai/technology/developers-tools/build-with-nano-banana-2/)
- [Google Blog — "Nano Banana 2: Combining Pro capabilities with lightning-fast speed"](https://blog.google/innovation-and-ai/technology/ai/nano-banana-2/)
- [ImagineArt — "Nano Banana 2 Prompt Guide" (50 prompts)](https://www.imagine.art/blogs/nano-banana-2-prompt-guide)
- [TechRadar — "5 prompts that show how powerful Nano Banana 2 is"](https://www.techradar.com/ai-platforms-assistants/gemini/5-prompts-that-show-how-powerful-nano-banana-2-is)
- [ZDNET — "7 ways Nano Banana 2 just got better and faster"](https://www.zdnet.com/article/google-nano-banana-2-image-generation/)
- [Ars Technica — "Google reveals Nano Banana 2 AI image model"](https://arstechnica.com/ai/2026/02/google-releases-nano-banana-2-ai-image-generator-promises-pro-results-with-flash-speed/)
- [DataCamp — "Nano Banana 2: A Full Guide With Python"](https://www.datacamp.com/tutorial/nano-banana-2)
- [Milvus — "Nano Banana 2 + Milvus: E-Commerce AI Image Generation"](https://milvus.io/blog/build-a-bestseller-to-image-pipeline-for-e-commerce-with-nano-banana-2-milvus-qwen-35.md)
- [Lifehacker — "Everything You Can Do With Google's Nano Banana 2"](https://lifehacker.com/tech/testing-google-gemini-nano-banana-2)
- [Eachlabs — "Nano Banana 2 Text to Image"](https://www.eachlabs.ai/google/nano-banana-2/nano-banana-2-text-to-image)
- [GitHub Gist — "Nano Banana Prompt Generator" (Claude Code skill)](https://gist.github.com/kousen/f7c66a70cefe90b12c8b5285688a0016)
- [APIYI — "6 Tips for Improving Nano Banana Text Rendering"](https://help.apiyi.com/en/nano-banana-text-rendering-consistency-guide-en.html)
- [GenAIntel — "Google Nano Banana 2: Key Features and Prompt Examples"](https://www.genaintel.com/guides/google-nano-banana-2-release-guide)
- [ProMNest — "Nano Banana 2 Prompting Guide"](https://promnest.com/blog/nano-banana-2-the-ultimate-guide-to-prompting-googles-most-efficient-multimodal-ai/)
