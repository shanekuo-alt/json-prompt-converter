# NB2 Pain Points Research Dossier

**Compiled:** Wednesday 03/04
**Sources:** Reddit (r/GeminiAI, r/Bard, r/GeminiNanoBanana2, r/generativeAI, r/midjourney, r/comfyui, r/singularity, r/EnhancerAI, r/GoogleGeminiAI, r/HiggsfieldAI), X/Twitter, Hacker News, Google AI Developer Forum, Google Help Community, Medium, Decrypt, Lifehacker, ZDNET, TechRadar, APIYI, Dzine AI, DeepDreamGenerator, DataCamp, Higgsfield, Midlibrary, AI Tools SME, Delante, Max Woolf (minimaxir), YouTube
**Timeframe:** Feb 26 -- Mar 4, 2026 (NB2 launch week)
**Companion:** See `nano-banana-2-prompting-research.md` for best practices and what works. This dossier covers the inverse: what doesn't work, what frustrates users, and where our tool can compensate.

---

## TL;DR

NB2's launch week reception was overwhelmingly negative from the active creative community. The backlash clusters into three macro-categories: **(1) quality regression vs NB Pro** -- the core "Pro quality at Flash speed" promise isn't being met; **(2) tightened censorship without communication** -- legitimate creative and commercial workflows are blocked; **(3) platform decisions** -- forced model switch, slashed quotas, and mobile download bugs compounded the quality issues into a workflow-breaking experience.

For our prompt generator, the most actionable findings are: NB2's tendency toward flat/generic output can be countered with aggressive lighting, style, and imperfection directives; text rendering needs strict guardrails (short copy, progressive addition); and prompt hallucinations need explicit "nothing else" fencing in our system prompt.

---

## Confidence Tags

- **[WIDESPREAD]** — 5+ independent sources across multiple platforms. Community consensus.
- **[RECURRING]** — 2-4 independent sources. Confirmed pattern but not universal.
- **[ISOLATED]** — 1-2 reports. May be edge case or user error.

---

## Bucket Definitions

| Bucket | Definition |
|--------|-----------|
| **1. Prompt Generator Fixable** | Our tool can address this through system prompt changes, schema additions, or smarter direction generation |
| **2. Workflow/Guidance Fixable** | Addressable through user guidance, post-processing suggestions, or multi-step workflow recommendations |
| **3. Hard Model Limitation** | Fundamental NB2 limitation — document and set expectations |

---

## 1. Output Quality Failures

### 1a. Overall Quality Regression vs NB Pro

**[WIDESPREAD] | Bucket 3**

NB2 output is widely described as "flat," "plastic," "awkward," and less refined than Nano Banana Pro. This is the single most reported complaint — at least 8 independent Reddit threads in r/GeminiAI alone within the first week, plus X/Twitter, Google Support threads, and tech review confirmations.

Specific quality gaps (community-tested):
- Lighting and shadows: Pro 5/5, NB2 4/5
- Texture details: Pro 5/5, NB2 4/5
- Complex scene stability: Pro 5/5, NB2 4/5
- Consistency across batches: Pro 5/5, NB2 4/5

> "The photos generated now look flat or awkward compared to before. The aesthetic quality has dropped. Faces and details look less refined." — r/GeminiAI

> "Pro is like the peak of AI generation quality in realism, you can't beat it." — r/GeminiAI

> "Your new Nano Banana 2 model is a downgrade. The output looks plastic, unrealistic, and noticeably weaker compared to Nano Banana Pro." — r/GeminiAI

**Recommended action:** Hard model limitation — cannot be fixed through prompting. Document as expectation-setting: NB2 is a speed/cost tier, not a quality replacement for NB Pro. Our system prompt should lean harder into the specific levers that close the gap (lighting specificity, camera body, film stock, controlled imperfection).

---

### 1b. Face & Detail Rendering Degradation

**[WIDESPREAD] | Bucket 3**

Faces appear less refined, sometimes distorted — "bloated," "puffy," with identity drift across iterations. A Decrypt head-to-head review confirmed: "By the end of the iterations, the woman was no longer the original. The man was replaced almost entirely — different age range, different build, different facial structure."

> "The face always looks distorted. They look weirdly bloated." — APIYI face consistency guide

> "The subjects themselves were effectively recast." — Decrypt comparative review

**Recommended action:** Hard model limitation for severe cases. Our system prompt can partially mitigate by emphasizing detailed face/subject descriptions and explicit identity anchors when generating portrait-oriented directions.

---

### 1c. Iterative Quality Degradation (Multi-Edit Sessions)

**[WIDESPREAD] | Bucket 2**

Image quality degrades significantly after 2-3 rounds of editing the same image. Output becomes progressively pixelated, faces distort, JPEG artifacts accumulate, and the image shifts from photorealistic to an "oil painting" look.

> "The first photo looks indeed photorealistic, but when I try to make minor adjustments there are increasingly more JPEG artefacts and distorted faces, and with each iteration the photo looks more and more like an oil painting." — r/GeminiAI

> "Every single edit slightly degrades the image." — TikTok @ai.for.real.life

**Recommended action:** Workflow guidance. Our tool should note: "Generate fresh rather than iterating. If the result is close but not right, use a refinement prompt (provided) as a new generation, not as an edit of the existing image." This is why our refinement prompts being self-contained and copy-paste ready is critical — they enable fresh regeneration rather than degrading edits.

---

### 1d. Anime / Illustration Style Regression

**[RECURRING] | Bucket 3**

NB2 produces noticeably worse anime and illustration-style images compared to NB1. Output is described as "generic, ugly, modern soulless cartoon" with wrong proportions, bland character designs, and inability to match specific substyles.

> "It doesn't even look like 'anime'. It's just generic, ugly, modern soulless cartoon! Anime girls in nano banana 1 looked a lot better." — r/GeminiAI

> NB2 "is competitive in anime style, despite being more prone to image breakdown due to its lightweight nature." — GitHub (awesome-nano-banana-pro-prompts)

**Recommended action:** Hard model limitation for anime/illustration. If a user requests anime or illustrated style, our tool should note that NB Pro or Midjourney may produce better results for this specific style. For our prompt generator, avoid anime/illustration directions unless explicitly requested.

---

### 1e. Composition & Proportion Errors

**[RECURRING] | Bucket 1**

Unnatural proportions, poor scale relationships, unrealistic physics, and weird spatial arrangements — especially in complex multi-element scenes.

> "Unnatural proportions or scale, poor lighting harmony between elements, unrealistic physics or positioning." — usenanobanana.com troubleshooting guide

> "The physics of images are occasionally wonky." — Lifehacker

**Recommended action:** Our system prompt already instructs spatial explicitness (Principle 7 in existing dossier). Reinforce this: every direction prompt should include explicit subject placement ("positioned in the lower third," "off-center left") and scale relationships ("product fills 60% of frame," "figure at mid-distance").

---

### 1f. "Too Polished" / Lack of Creative Range

**[RECURRING] | Bucket 1**

NB2 defaults hard toward a polished, commercial, "stock photo" aesthetic. Users wanting rougher, more artistic, or experimental outputs find the model resistant to deviating from this default.

> "There's something odd feeling about many of the latest AI image models — they feel almost too polished, calculated, and rigid." — Hacker News

> "They aren't nearly as creative either. They seem to be very good at creating stock photos and not much else." — Hacker News

> "It tends to push prompts toward realism — an understandable RLHF target for the median user prompt, but it can cause issues with prompts that are inherently surreal." — Max Woolf

**Recommended action:** Our system prompt should counteract this directly. For "outside-the-box" and "wild-card" directions: include explicit aesthetic breaks — "raw grain," "intentional lens flare," "unprocessed look," "editorial imperfection." The existing dossier's Principle 10 (Controlled Imperfection) addresses this, but our prompt generator doesn't yet implement it aggressively enough in OTB/wild-card categories.

---

## 2. Text Rendering Issues

### 2a. Text Misspelling & Garbling

**[WIDESPREAD] | Bucket 1 + Bucket 2**

Despite Google's marketing of improved text rendering, NB2 still misspells, blurs, or garbles text — especially on longer copy, product labels, and multi-word compositions. Short text (1-4 words) performs reasonably; longer strings break.

> "I tried making some product photos of shoes and no matter how much better of a prompt I input the text on the shoes is always off." — r/GeminiAI

> "Usually just edit it manually in whatever design tool I'm using, way faster than regenerating 50 times." — LinkedIn

NB2 text rendering accuracy: ~87% (vs NB Pro's ~94%).

**Recommended action:**

*Bucket 1 (System prompt):* When our tool generates a direction that includes text (from the user's `text.content` input), enforce strict guardrails in the prompt:
- Maximum 4-5 words per text element
- Double-quote exact text: `"SUMMER SALE"`
- Specify font explicitly: "bold sans-serif, Helvetica-style"
- Specify placement: "centered at top third of frame"
- If user text exceeds 5 words, our system prompt should split it across multiple lines automatically

*Bucket 2 (Workflow guidance):* For text-heavy ad creatives, recommend the hybrid approach: "Use NB2 for the visual composition with placeholder text positioning, then overlay final copy in your design tool (Figma, Canva) for guaranteed accuracy."

---

### 2b. Long Copy / Multi-Word Failure

**[RECURRING] | Bucket 1**

Multi-line text, small print, and text-heavy compositions fail consistently. The model struggles with more than one text element and frequently renders the second or third text block incorrectly.

> "The real issue shows up when you're doing volume. Attempting to generate illustrations with a lot of copy." — LinkedIn (Ray Villalobos)

**Recommended action:** Our system prompt should include an explicit rule: "If the user provides text content exceeding 5 words, split into two visual lines: a primary headline (3-4 words, large) and a secondary line (remaining words, smaller). Never attempt to render more than 8 words total in a single image."

---

## 3. Prompting Frustrations

### 3a. Prompt Ignoring / Instruction Following Failures

**[WIDESPREAD] | Bucket 1**

NB2 frequently ignores specific instructions. Users provide detailed composition, pose, or styling directions and receive something entirely different. In editing workflows, the model sometimes returns the original unedited image or regenerates a completely new layout.

> "I ask for specific things and it gives me an image completely different from what I asked for." — r/GeminiAI

> "It sometimes completely ignores the prompts and regenerates the exact same reference picture." — Google Support

> "The model over-interprets the request, resulting in a sloppy rendering." — X/Twitter (@The_Sycomore)

**Recommended action:** Our system prompt should compensate by front-loading the most important instruction. Current approach (purpose-first narrative) is correct, but we should add a principle: "Place the single most differentiating visual instruction in the first 10 words of the prompt." NB2's attention mechanism appears to deprioritize instructions further into the prompt. Also: keep prompts under 50 words — longer prompts correlate with more ignored instructions.

---

### 3b. Style Hallucinations / Unwanted Additions

**[WIDESPREAD] | Bucket 1**

NB2 aggressively "interprets" prompts and adds unsolicited elements — objects, backgrounds, and scene elements never requested. It takes creative liberties that override explicit instructions.

> "It seems to lack basic common sense and is doing hallucinations, adding extra things I didn't ask for." — r/GeminiAI

> "NB2 takes that creative freedom and runs way too far with it. The output is over the top, adding all kinds of details I never asked for. Why are they suddenly on a spaceship? I didn't request that." — AI Tools SME

**Recommended action:** Our system prompt should add a constraint to every generated prompt: include a closing clause like "Nothing else in the scene" or "Clean, minimal composition — only the described elements." This is an explicit anti-hallucination fence. Additionally, shorter prompts with fewer scene elements tend to hallucinate less — our ~40 word target is well-calibrated.

---

### 3c. No Formal Negative Prompt Support

**[RECURRING] | Bucket 1**

There is no negative prompt field in the Gemini/NB2 interface or API. NB2 has "poor understanding of negative instructions (such as 'Don't drive')" — positive descriptions must be used instead.

> "There's no separate field or option in the web UI. Is it possible to enter negative prompts?" — r/Bard

> "Poor understanding of negative instructions; positive descriptions should be used instead." — Dzine AI documentation

**Recommended action:** Our system prompt already frames avoidances positively (Principle 5 in existing dossier: "only specify what NB2 differentiates on"). Reinforce this: never use "no," "don't," or "without" in generated prompts. Instead of "no beauty filters," write "natural skin texture with visible pores." Our existing negative prompt schema field should be repurposed as positive-description alternatives in the prompt narrative.

---

### 3d. Aspect Ratio Control Broken (API)

**[WIDESPREAD] | Bucket 1 + Bucket 3**

NB2's API frequently ignores `ImageConfig(aspect_ratio=...)` settings, defaulting to square 1:1 regardless of the specified ratio. A workaround video has 62K views. The only reliable workaround is uploading a blank image of the desired ratio as a reference.

> "This is not a problem with your prompt, but rather a known limitation that Google has been working on." — Google Support (official response)

**Recommended action:**

*Bucket 1:* Our system prompt already instructs embedding aspect ratio in the prompt narrative (Principle 9 from existing dossier). This is now validated as essential — the API parameter alone is unreliable. Every generated prompt must end with explicit aspect ratio and resolution: "...in 16:9 widescreen at 4K resolution."

*Bucket 3:* The API bug itself is a Google platform issue. Document for team awareness.

---

## 4. Safety & Content Restrictions

### 4a. Over-Censorship / Aggressive Content Filtering

**[WIDESPREAD] | Bucket 2 + Bucket 3**

NB2 launched with significantly tighter safety filters. The Feb 27 launch tightened 8 categories: celebrities, financial information modification, outfit/face swapping, implicit suggestive content, anime-style (more aggressively filtered than realistic), and more. Even clearly SFW prompts trigger refusals. Google acknowledged filters became "way more cautious than we intended."

> "My prompts would be 'draw an anime girl in a swimming costume' — the old nano banana did it without complaining, but they're all blocked now!" — r/GeminiAI

> "Impossible to work due to continuous automatic filtering and blocking." — Google Support

> "Anime-style images are blocked more aggressively than realistic styles. For the same cat image prompt, the anime version might be intercepted while the realistic version passes." — APIYI content safety guide

**Recommended action:**

*Bucket 2:* Our tool should include prompt-engineering guidance for safety-sensitive use cases:
- Use "editorial fashion photography" framing instead of casual clothing descriptions
- Add art-world context ("in the style of a Renaissance portrait") to push away from triggers
- Prefer realistic photography style over anime/illustration for subjects involving people
- If a prompt gets blocked, try rephrasing the subject generically (describe features rather than naming celebrities or specific styles)

*Bucket 3:* The filter policy itself is a Google decision. Some categories (celebrity generation, outfit swapping) are permanently restricted.

---

### 4b. Person/Identity Editing Consistently Refused

**[WIDESPREAD] | Bucket 2**

Attempts to edit photos of people — moving them to new environments, changing backgrounds, maintaining identity across generations — are systematically refused or produce degraded results.

> "Sorry, I can't use this man because it breaks the rules about real people. I can add another man instead." — NB2 error message

> "I have spent the entire day trying to create a photo of a person in a new environment. All I get back is the original portrait with no changes or the person literally cut and pasted into the environment, like it was done in MS Paint." — r/GeminiAI

**Recommended action:** Workflow guidance. For ad creatives requiring people: generate the person and environment together in a single prompt (not as a composite edit). Our prompt generator already does this correctly — it generates complete scene prompts rather than edit instructions. Document that NB2 is not suitable for photo manipulation workflows.

---

## 5. Platform & Infrastructure Issues

### 5a. Low Resolution Downloads (Mobile)

**[WIDESPREAD] | Bucket 2**

Images downloaded from the Gemini mobile app are delivered at 768x1376 when they should be 1536x2752. Desktop browser downloads are fine.

> "How you gonna make us go around to the browser just to download the full resolution every time when this was never a problem until now?" — r/GeminiAI

**Recommended action:** Workflow guidance note: "Always download generated images from the desktop browser or via API. The mobile app delivers compressed thumbnails."

---

### 5b. Forced Model Switch / No Rollback Option

**[WIDESPREAD] | Bucket 3**

NB2 was forced as the default with no option to revert. Users must generate with NB2 first, then "Redo with Pro" — consuming two generation credits. Every negative thread mentions the inability to opt out.

> "The experience of having to chew up and swallow an image that 'Nano Banana 2' excreted as 'poo' and reprocess it with 'Nano Banana Pro' is simply the worst." — r/GeminiAI

**Recommended action:** Hard model limitation. Our tool generates prompts, not images — users choose where to paste them. Note in guidance: "For maximum fidelity on hero shots, paste the generated prompt into NB Pro via the 'Redo with Pro' option or use the API with the Pro model endpoint."

---

### 5c. Daily Quota Reduction

**[WIDESPREAD] | Bucket 3**

Pro subscribers went from ~1,000 images/day to as few as 10-100 with NB2's launch. No warning, no announcement.

> "Before the NB2 update, AI pro subscribers had 1000 daily image limit. Now it's 100." — r/GeminiAI

> "I just got hit at 13 generations. Last night it was 9... This is a classic bait and switch." — Google AI Studio Forum

**Recommended action:** Hard model limitation. Our tool can partially mitigate by generating high-quality prompts that require fewer re-rolls. Document: "Google AI Studio free tier offers ~1,500 API requests/day — significantly more than the consumer app."

---

### 5d. Transparency / Alpha Channel Bug

**[ISOLATED] | Bucket 3**

Transparent background requests return PNG with solid white backgrounds. Alpha channel is missing or incorrectly applied.

**Recommended action:** Document limitation. Suggest: "For transparent backgrounds, generate on a solid color background and use Photoshop's Remove Background or remove.bg as a post-processing step."

---

## 6. Competitive Shortcomings

### 6a. Artistic Style Gap vs Midjourney

**[WIDESPREAD] | Bucket 3**

Near-universal consensus: NB2 cannot match Midjourney's artistic expression, cinematic feel, emotional depth, or visual storytelling. NB2 output looks "functional" where Midjourney looks "creative."

> "When it comes to style, mood and artistic coherence, most models still fall behind MidJourney... That's the main reason I keep coming back." — r/midjourney

> "Midjourney is way more cinematic. With Nano Banana, it looks really well done, but I can see that it kind of has more of an AI image creation look." — YouTube comparison

**Recommended action:** Hard model limitation. For campaigns requiring high artistic expression (brand storytelling, editorial, mood-driven creative), recommend Midjourney. NB2 excels at commercial product photography, structured compositions, and speed — lean into these strengths. Our "outside-the-box" and "wild-card" directions should compensate by pushing creative boundaries harder through concept rather than relying on the model's aesthetic rendering.

---

### 6b. Cinematic / Atmospheric Quality Gap vs Flux 2

**[RECURRING] | Bucket 3**

Flux 2 produces more cinematic, atmospheric images with better color grading and dramatic lighting. NB2 wins on logical coherence but loses on visual "mood."

> "Flux 2 winning on cinematic feel... beautiful, cinematic images, strong color harmony, atmospheric richness and artistic depth." — Higgsfield comparison

**Recommended action:** Hard model limitation. For atmospheric/cinematic work, Flux 2 may produce better results. Our prompt generator can partially compensate by including more explicit atmosphere and mood directives — "haze diffusing through the scene," "volumetric light rays," "moody color grade."

---

### 6c. Prompt Adherence Gap vs Flux / DALL-E 3

**[RECURRING] | Bucket 1**

Flux 2 and DALL-E 3 follow complex prompts more reliably. NB2 takes creative liberties. Complex technical prompts produce nonsensical results.

> "Waste pipes going completely random places... p trap for tub placed ABOVE the floor... hot and cold lines connected together." — r/singularity benchmark test

**Recommended action:** Our system prompt should counteract by keeping prompts focused and concise. The ~40 word limit is validated here. For complex scenes, instruct: "Describe only the 3-4 most important visual elements. Let NB2 infer the rest rather than overloading the prompt."

---

## 7. Three-Bucket Summary

### Bucket 1: Prompt Generator Fixable

| Pain Point | Frequency | Fix Area | What the Change Would Do |
|-----------|-----------|----------|-------------------------|
| Flat/generic lighting | [WIDESPREAD] | System prompt | Enforce color temperature + light behavior description in every direction |
| "Too polished" / stock photo default | [RECURRING] | System prompt | Add controlled imperfection directives to OTB/wild-card directions |
| Composition & proportion errors | [RECURRING] | System prompt | Mandate explicit spatial placement in every prompt |
| Prompt ignoring (instruction deprioritization) | [WIDESPREAD] | System prompt | Front-load key instruction in first 10 words; enforce <50 word limit |
| Style hallucinations / unwanted additions | [WIDESPREAD] | System prompt | Add anti-hallucination closing fence ("nothing else in scene") |
| No negative prompt support | [RECURRING] | System prompt | Reframe all avoidances as positive descriptions |
| Text rendering failures | [WIDESPREAD] | System prompt + Schema | Enforce max 5 words per text element; auto-split long copy |
| Aspect ratio ignored by API | [WIDESPREAD] | System prompt | Embed ratio + resolution in prompt narrative (not just metadata) |
| Prompt adherence gap vs competitors | [RECURRING] | System prompt | Keep prompts focused; max 3-4 visual elements per scene |

### Bucket 2: Workflow/Guidance Fixable

| Pain Point | Frequency | Guidance |
|-----------|-----------|----------|
| Iterative quality degradation | [WIDESPREAD] | "Generate fresh with a refinement prompt rather than editing existing images" |
| Text accuracy for ad copy | [WIDESPREAD] | "Use NB2 for visual composition; overlay final text in Figma/Canva" |
| Safety filter false positives | [WIDESPREAD] | Rephrasing strategies: editorial framing, generic descriptions, avoid anime for people |
| Person/identity editing refused | [WIDESPREAD] | "Generate person + environment in a single prompt, not as composite edits" |
| Low-res mobile downloads | [WIDESPREAD] | "Download from desktop browser or API, not mobile app" |
| Character consistency drift | [RECURRING] | Reference sheet + CHARACTER LOCK technique; fresh generation over iteration |

### Bucket 3: Hard Model Limitation

| Pain Point | Frequency | Alternative Recommendation |
|-----------|-----------|---------------------------|
| Overall quality regression vs NB Pro | [WIDESPREAD] | Use "Redo with Pro" for hero shots; use NB Pro API for final assets |
| Face rendering degradation | [WIDESPREAD] | NB Pro for portrait-critical work |
| Anime/illustration regression | [RECURRING] | Midjourney for anime; NB Pro for illustration |
| Over-censorship policy | [WIDESPREAD] | No workaround for blocked categories; some prompt engineering helps borderline cases |
| Forced model switch | [WIDESPREAD] | API users can specify model directly; consumer app users stuck |
| Quota reduction | [WIDESPREAD] | Google AI Studio free tier (~1,500/day) or third-party API proxies |
| Artistic style gap vs Midjourney | [WIDESPREAD] | Midjourney for artistic/editorial; NB2 for commercial/product |
| Cinematic gap vs Flux 2 | [RECURRING] | Flux 2 for atmospheric/cinematic work |
| Transparency bug | [ISOLATED] | Post-process with remove.bg or Photoshop |
| Aspect ratio API bug | [WIDESPREAD] | Embed ratio in prompt text; Google acknowledges and is working on fix |

---

## 8. Prompt Generator Improvement Recommendations

Prioritized by **frequency-of-pain x estimated effort-to-fix**. Recommendations only — no code.

### Bucket 1: System Prompt & Schema Changes

**Priority 1: Anti-Hallucination Fence (System Prompt)**
- **Pain point:** Style hallucinations / unwanted additions [WIDESPREAD]
- **Area:** `buildSystemPrompt()` in `lib/system-prompt.ts` — Prompt Writing Rules section
- **Change:** Add a rule: "End every generated prompt with a scene-limiting clause: 'Clean composition — only the described elements' or 'Nothing else in the scene.' This prevents NB2 from adding unsolicited objects, backgrounds, or effects."
- **Why first:** Highest-frequency complaint that's directly fixable. Zero schema changes needed — pure system prompt edit.

**Priority 2: Front-Load Key Visual Instruction (System Prompt)**
- **Pain point:** Prompt ignoring / instruction deprioritization [WIDESPREAD]
- **Area:** `buildSystemPrompt()` — Prompt Writing Rules section
- **Change:** Amend Rule 1 (purpose opens every prompt) to: "The single most differentiating visual element must appear in the first 10 words. Purpose can frame it, but the key visual instruction cannot be buried mid-sentence." Update the few-shot example to demonstrate this.
- **Rationale:** NB2's attention mechanism demonstrably deprioritizes instructions later in the prompt. Front-loading is the highest-leverage structural fix.

**Priority 3: Controlled Imperfection for OTB/Wild-Card Directions (System Prompt)**
- **Pain point:** "Too polished" / stock photo default [RECURRING]
- **Area:** `buildDiversityRules()` in `lib/system-prompt.ts` — OTB and wild-card diversity guidance
- **Change:** For outside-the-box and wild-card directions, add an explicit aesthetic diversity rule: "At least one direction must break the polished default — include directives like 'raw film grain,' 'intentional motion blur,' 'unprocessed editorial look,' 'imperfect framing,' or 'analog texture.'" This counters NB2's RLHF bias toward commercial polish.
- **Why high priority:** Directly addresses the #1 creative limitation and differentiates our tool's output from generic NB2 prompting.

**Priority 4: Text Rendering Guardrails (System Prompt + Schema Validation)**
- **Pain point:** Text misspelling and long copy failure [WIDESPREAD]
- **Area:** `buildSystemPrompt()` — Rule 7 (text rendering) + `app/api/convert/route.ts` — user message construction
- **Change:**
  - System prompt: Add rule — "When text content is provided, enforce: (a) double-quote exact text, (b) specify font as 'bold sans-serif' unless user specifies otherwise, (c) specify placement relative to frame, (d) maximum 5 words per text line. If user provides more than 5 words, split into primary headline (3-4 words, large) and secondary line (remaining, smaller)."
  - API route: When `text.content` exceeds 5 words, automatically split into multi-line format before appending to the user message.
- **Rationale:** Text rendering is a key use case for ad creatives. Current implementation passes text through without guardrails. This makes the difference between 87% accuracy and ~95%+ (per APIYI testing of multi-line splitting technique).

**Priority 5: Explicit Spatial Composition (System Prompt)**
- **Pain point:** Composition & proportion errors [RECURRING]
- **Area:** `buildSystemPrompt()` — Prompt Writing Rules
- **Change:** Add rule: "Every direction prompt must include at least one spatial placement instruction ('positioned in the lower third,' 'filling the left two-thirds of frame,' 'centered with negative space on right for copy'). Never let the model decide composition entirely on its own."
- **Rationale:** NB2's default composition is mediocre. Explicit spatial direction produces dramatically better results per community testing.

**Priority 6: Positive-Description Reframing (System Prompt)**
- **Pain point:** No negative prompt support [RECURRING]
- **Area:** `buildSystemPrompt()` — Prompt Writing Rules
- **Change:** Add rule: "Never use 'no,' 'don't,' 'without,' or 'avoid' in generated prompts. NB2 has poor understanding of negative instructions. Instead: 'no beauty filters' becomes 'natural skin texture with visible pores and micro-imperfections.' 'No background blur' becomes 'sharp focus from foreground to background, deep depth of field.'"
- **Rationale:** The existing system prompt partially addresses this but doesn't explicitly ban negative phrasing. Making it a hard rule prevents a common failure mode.

**Priority 7: Atmosphere & Mood Directives (System Prompt)**
- **Pain point:** Cinematic/atmospheric gap vs competitors [RECURRING]
- **Area:** `buildSystemPrompt()` — Diversity rules for standard directions
- **Change:** Add to standard direction diversity: "At least one direction should emphasize atmospheric rendering — 'volumetric haze,' 'diffused golden-hour backlight,' 'rain-slicked reflections,' 'fog rolling between elements.' These explicit atmosphere cues help NB2 break out of its flat-lighting default."
- **Rationale:** NB2's biggest visual weakness vs Flux and Midjourney is atmosphere. Our prompts can partially compensate by being aggressively specific about atmospheric effects.

**Priority 8: Prompt Length Enforcement (System Prompt)**
- **Pain point:** Prompt ignoring with longer prompts [WIDESPREAD]
- **Area:** `buildSystemPrompt()` — existing "~40 words" guideline
- **Change:** Tighten from "~40 words" to "30-45 words, never exceeding 50. For complex scenes, describe only the 3-4 most important visual elements and let NB2 infer the rest." Update the few-shot example prompts to strictly comply.
- **Rationale:** Community testing consistently shows prompt-following degrades past ~50 words. Our current "~40 words" guideline is correct but loosely enforced.

### Bucket 2: Workflow & Guidance Recommendations

These are not code changes — they're guidance that should be surfaced to users, either in the UI, in a help section, or as tooltips.

**Guidance 1: Iterative Editing Warning**
- When displaying refinement prompts, add a note: "For best results, paste each refinement as a new generation in Gemini/AI Studio — don't use the 'edit this image' mode, which degrades quality after 2-3 rounds."

**Guidance 2: Text Overlay Hybrid Workflow**
- When a user provides text content, add a note below the generated directions: "Tip: NB2 text rendering is ~87% accurate. For guaranteed text accuracy in final assets, generate the image with approximate text positioning, then overlay final copy in Figma or Canva."

**Guidance 3: Download Resolution**
- Add a general note: "Download images from the desktop browser or API. The Gemini mobile app delivers compressed thumbnails at lower resolution."

**Guidance 4: Model Selection Guide**
- Add a note: "For maximum fidelity hero shots, use these prompts with NB Pro (click 'Redo with Pro' after NB2 generates). For iteration and exploration, NB2 is faster and cheaper."

**Guidance 5: Safety Filter Tips**
- If applicable, note: "If a prompt gets blocked, try: (a) switching from anime/illustration style to realistic photography, (b) framing as 'editorial fashion photography' instead of casual clothing descriptions, (c) describing distinctive features generically rather than naming public figures."

**Guidance 6: Character Consistency**
- For prompts involving people/characters: "For consistent characters across multiple images, generate a reference sheet first (front/side/3-quarter views on plain background), then use the reference image with each subsequent prompt."

### Bucket 3: Hard Limitations to Document

These cannot be fixed by our tool. Document for team awareness so they don't waste time:

| Limitation | What to Tell the Team |
|-----------|----------------------|
| NB2 < NB Pro quality | NB2 is a speed/cost tier. Use Pro for final hero shots. API users can specify model directly. |
| Face degradation over iterations | Generate portraits fresh each time. Never iterate more than twice on face-critical images. |
| Anime/illustration weakness | Use Midjourney for anime. NB2's strength is photorealistic commercial imagery. |
| Celebrity generation blocked | Permanent policy. Describe features generically instead. |
| Daily quota caps | Use AI Studio free tier (1,500/day) or third-party API proxies (APIYI, OpenRouter). |
| Aspect ratio API bug | Always embed ratio in prompt text as backup. Google has acknowledged and is working on fix. |
| Transparency not supported | Generate on solid color, then use remove.bg or Photoshop for transparent backgrounds. |

---

## 9. Cross-Reference with Existing Dossier

Items in the existing `nano-banana-2-prompting-research.md` that are **validated and reinforced** by pain point findings:

| Existing Recommendation | Pain Point Validation |
|------------------------|----------------------|
| Add `camera.body` and `film_stock` to schema | Users getting flat/generic output confirms these are high-leverage additions |
| Add `meta.purpose` field | Purpose-driven prompts consistently produce better results; its absence correlates with generic output |
| Embed resolution/aspect ratio in prompt narrative | API aspect ratio bug makes this essential, not optional |
| Full sentences, not keyword tags | Keyword-style prompts are a top cause of prompt-ignoring failures |
| Lighting is the most powerful variable | Flat lighting is the most common quality complaint; validates adding `color_temperature` |
| Text rendering section in schema | Text failures validate the need for structured text control with guardrails |
| Controlled imperfection for realism | "Too polished" complaint validates this as critical, not nice-to-have |

Items that **conflict or need nuance**:

| Existing Finding | Pain Point Nuance |
|-----------------|-------------------|
| "Iterative editing is a strength" (Section 3f) | True for 1-2 edits, but quality degrades sharply after 2-3 rounds. Our tool should recommend fresh generation with refinement prompts, not iterative editing. |
| "10 native aspect ratios" (Section 3c) | The API frequently ignores aspect ratio settings. Having 10 ratios in our schema is correct, but embedding the ratio in the prompt text is now essential as a workaround. |
| "NB2 is the right target for Ad101" (Section 6) | Still true for iteration and volume work, but team should know that hero shots should go through NB Pro, and artistic/editorial campaigns may be better served by Midjourney. |

---

## 10. Community Workarounds Reference

Key workarounds the community developed during launch week, for team awareness:

| Workaround | Problem Solved | Source |
|-----------|---------------|--------|
| "Redo with Pro" fallback | Quality gap | Reddit r/GeminiAI — burns 2 quota slots |
| Staged resolution (512px draft → 4K final) | Cost/quota | Milvus tutorial — 512px at $0.045 vs 4K at $0.151 |
| 20-image batch + cherry pick | Stochastic output | GlobalGPT — test compositions for under $1 |
| Multi-line text splitting | Text rendering | APIYI — split into 3-4 word lines, add progressively |
| Reference sheet + CHARACTER LOCK | Character drift | Facebook community, ZDNET — canonical reference images |
| Safety filter rephrasing | Over-censorship | APIYI — editorial framing, style switching, abstraction |
| Google AI Studio free tier | Quota limits | Dev Forum — ~1,500/day vs 100/day on consumer app |
| Desktop browser downloads | Low-res mobile bug | Reddit — mobile app serves compressed thumbnails |
| Hybrid AI + design tool | Text accuracy | LinkedIn — NB2 for visuals, Figma/Canva for text overlay |

---

## Sources

### Reddit
- [r/GeminiAI — "HATE NANO BANANA 2!!"](https://www.reddit.com/r/GeminiAI/comments/1rhtx6n/)
- [r/GeminiAI — "Nano Banana 2 is utter shit"](https://www.reddit.com/r/GeminiAI/comments/1rfqsms/)
- [r/GeminiAI — "Nano Banana 2 is a downgrade from Pro"](https://www.reddit.com/r/GeminiAI/comments/1rflxt2/)
- [r/GeminiAI — "This new Nano Banana 2 update in Gemini is TERRIBLE"](https://www.reddit.com/r/GeminiAI/comments/1rj2vfp/)
- [r/GeminiAI — "Who the hell even asked for this overly censored downgraded garbage"](https://www.reddit.com/r/GeminiAI/comments/1rhnkkj/)
- [r/GeminiAI — "Nano Banana 2 WTF. Downgrade and Download Quality Problems"](https://www.reddit.com/r/GeminiAI/comments/1rgw3pr/)
- [r/GeminiAI — "No. Nano Banana 2 is not better than pro"](https://www.reddit.com/r/GeminiAI/comments/1rg703f/)
- [r/GeminiAI — "Why am I forced to use 'Nano Banana 2'?"](https://www.reddit.com/r/GeminiAI/comments/1rg23c3/)
- [r/GeminiAI — "PSA: Google is forcing NB2 as default"](https://www.reddit.com/r/GeminiAI/comments/1rfh9ps/)
- [r/GeminiAI — "Nano Banana Pro or Banana 2: Which one do you prefer?"](https://www.reddit.com/r/GeminiAI/comments/1rfxoqs/)
- [r/GeminiAI — "Why Are Pro Users Forced to Use Nano Banana 2?"](https://www.reddit.com/r/GeminiAI/comments/1rj4pvd/)
- [r/GeminiAI — "Petition To Bring Back Nano Banana Pro as the Default"](https://www.reddit.com/r/GeminiAI/comments/1rfgus2/)
- [r/GeminiAI — "Nano Banana 2 is terrible!!"](https://www.reddit.com/r/GeminiAI/comments/1ri6r2f/)
- [r/GeminiAI — "Ran out of image generations after only 10"](https://www.reddit.com/r/GeminiAI/comments/1rg8wov/)
- [r/GeminiAI — "Nano Banana Pro: Photo quality gets worse with each iteration"](https://www.reddit.com/r/GeminiAI/comments/1pb7k13/)
- [r/Bard — "Nano banana 2 is not good in styles, hallucination"](https://www.reddit.com/r/Bard/comments/1rfgf13/)
- [r/Bard — "Nano Banana 2 it's very... Horrible"](https://www.reddit.com/r/Bard/comments/1rhj0dc/)
- [r/Bard — "How to enter negative prompt in google AI studio Imagen?"](https://www.reddit.com/r/Bard/comments/1mp1tuu/)
- [r/GoogleGeminiAI — "Problem with image generation: Ignores prompts and acts weird"](https://www.reddit.com/r/GoogleGeminiAI/comments/1lr20s1/)
- [r/GoogleGeminiAI — "Suddenly ignores aspect ratio commands"](https://www.reddit.com/r/GoogleGeminiAI/comments/1ndyldy/)
- [r/comfyui — "Image generated with Nano Banana degrade after a few iterations"](https://www.reddit.com/r/comfyui/comments/1nf2pix/)
- [r/singularity — NB2 plumbing benchmark test](https://www.reddit.com/r/singularity/comments/1rghdlh/)
- [r/midjourney — "Most models still fall behind MidJourney"](https://www.reddit.com/r/midjourney/comments/1pllbbn/)
- [r/HiggsfieldAI — "Image quality degrades after multiple edits"](https://www.reddit.com/r/HiggsfieldAI/comments/1qby6od/)
- [r/EnhancerAI — "Use this Gemini prompt to create infographic with nano banana"](https://www.reddit.com/r/EnhancerAI/comments/1rhrgi3/)

### X/Twitter
- [@The_Sycomore — "My Nano Banana 2 tests are all disappointing"](https://x.com/The_Sycomore/status/2027432326309757170)

### Developer Forums & Support
- [Google AI Dev Forum — "Gemini 3.1 Flash Image ignores aspect ratio"](https://discuss.ai.google.dev/t/gemini-3-1-flash-image-preview-ignores-imageconfig-aspect-ratio-and-reshuffles-layout-on-background-edit/128031)
- [Google AI Dev Forum — "Block after block with a simple prompt"](https://discuss.ai.google.dev/t/block-after-block-with-a-simple-prompt-in-nanobanana/109871)
- [Google AI Dev Forum — "Nano banana daily limit dropped significantly"](https://discuss.ai.google.dev/t/nano-banana-daily-limit-dropped-significantly/120674)
- [Google AI Dev Forum — "Transparency issue in image generation"](https://discuss.ai.google.dev/t/transparency-issue-in-image-generation-ui-gemini-2-0-flash-experimental-api/74170)
- [Google Support — "Fails to maintain 100% consistency with original photo"](https://support.google.com/gemini/thread/395344000)
- [Google Support — "Not listening to prompts as it did before"](https://support.google.com/gemini/thread/394015664/)
- [Google Help Community — "NB2 is horrible even compared to NB1"](https://support.google.com/gemini/thread/413240302)

### Articles, Guides & Reviews
- [APIYI — "NB2 Content Safety Mechanism Guide"](https://help.apiyi.com/en/nano-banana-2-content-safety-image-generation-failure-guide-en.html)
- [APIYI — "NB2 vs NB Pro Comparison"](https://help.apiyi.com/en/nano-banana-2-vs-nano-banana-pro-comparison-guide-en.html)
- [APIYI — "NB2 Speed Test"](https://help.apiyi.com/en/nano-banana-2-speed-test-2k-4k-image-generation-guide-en.html)
- [APIYI — "6 Tips for Text Rendering Accuracy"](https://help.apiyi.com/en/nano-banana-text-rendering-consistency-guide-en.html)
- [APIYI — "Face Consistency Guide"](https://help.apiyi.com/en/nano-banana-pro-face-consistency-guide-en.html)
- [Decrypt — "Image AI Leap: Google & ByteDance's Latest Models"](https://decrypt.co/359700/image-ai-leap-google-bytedances-latest-models)
- [Lifehacker — "Everything You Can Do With Google's Nano Banana 2"](https://lifehacker.com/tech/testing-google-gemini-nano-banana-2)
- [Hacker News discussion thread](https://news.ycombinator.com/item?id=47175334)
- [Max Woolf / minimaxir — "Nano Banana Pro"](https://minimaxir.com/2025/12/nano-banana-pro/)
- [AI Tools SME — "NB Pro vs NB2 Comparison"](https://www.aitoolssme.com/blogs/nano-banana-pro-vs-nano-banana-2)
- [Dzine AI — "Fix Nano Banana Pro Issues"](https://www.dzine.ai/blog/fix-nano-banana-pro-issues/)
- [usenanobanana.com — "5 Common Mistakes Troubleshooting"](https://usenanobanana.com/blog/5-common-mistakes-troubleshooting)
- [Midlibrary — "Midjourney vs Nano Banana"](https://midlibrary.io/midguide/midjourney-vs-nano-banana)
- [imini.com — "Nano Banana vs Midjourney"](https://imini.com/blogs/nano-banana-vs-midjourney)
- [Higgsfield — "Flux 2 vs NB Pro Comparison"](https://higgsfield.ai/blog/Flux-2-vs-Nano-Banana-Pro-Comparison)
- [Delante — "Nano Banana 2 Review"](https://delante.co/nano-banana-2/)
- [DataCamp — "Nano Banana 2 Full Guide with Python"](https://www.datacamp.com/tutorial/nano-banana-2)
- [Milvus — "NB2 + Milvus E-Commerce Pipeline"](https://milvus.io/blog/build-a-bestseller-to-image-pipeline-for-e-commerce-with-nano-banana-2-milvus-qwen-35.md)
- [GitHub — awesome-nano-banana-pro-prompts](https://github.com/YouMind-OpenLab/awesome-nano-banana-pro-prompts)
- [ALM Corp — "NB2 Complete Guide"](https://almcorp.com/blog/google-nano-banana-2-gemini-31-flash-image-complete-guide/)
- [mcplato.com — "NB2 Deep Dive"](https://mcplato.com/en/blog/nano-banana-2-deep-dive/)

### Video
- [YouTube — "How to INSTANTLY Fix Gemini Nano Banana Aspect Ratio Problems" (62K views)](https://www.youtube.com/watch?v=1ttvmsGSR_Y)
- [TikTok @ai.for.real.life — "Every single edit slightly degrades the image"](https://www.tiktok.com/@ai.for.real.life/video/7606747072712248589)
