import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { ASPECT_RATIOS, RESOLUTIONS, PRESETS, ConvertRequest } from "@/lib/schema";
import { buildSystemPrompt } from "@/lib/system-prompt";

const anthropic = new Anthropic();

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ConvertRequest;

    if (!body.prompt || body.prompt.trim().length === 0) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    if (
      body.aspectRatio &&
      !ASPECT_RATIOS.includes(body.aspectRatio as (typeof ASPECT_RATIOS)[number])
    ) {
      return NextResponse.json(
        { error: `Invalid aspect ratio. Must be one of: ${ASPECT_RATIOS.join(", ")}` },
        { status: 400 }
      );
    }

    if (
      body.resolution &&
      !RESOLUTIONS.includes(body.resolution as (typeof RESOLUTIONS)[number])
    ) {
      return NextResponse.json(
        { error: `Invalid resolution. Must be one of: ${RESOLUTIONS.join(", ")}` },
        { status: 400 }
      );
    }

    if (
      body.preset &&
      !PRESETS.includes(body.preset as (typeof PRESETS)[number])
    ) {
      return NextResponse.json(
        { error: `Invalid preset. Must be one of: ${PRESETS.join(", ")}` },
        { status: 400 }
      );
    }

    const systemPrompt = buildSystemPrompt(body.preset);

    let userMessage = body.prompt.trim();
    if (body.aspectRatio) {
      userMessage += `\n\nAspect ratio: ${body.aspectRatio}`;
    }
    if (body.resolution) {
      userMessage += `\nResolution: ${body.resolution}`;
    }
    if (body.purpose) {
      userMessage += `\nPurpose: ${body.purpose}`;
    }
    if (body.text?.content) {
      userMessage += `\nText to include in image: "${body.text.content}"`;
      if (body.text.font_style) userMessage += `\nFont style: ${body.text.font_style}`;
      if (body.text.placement) userMessage += `\nText placement: ${body.text.placement}`;
      if (body.text.color) userMessage += `\nText color: ${body.text.color}`;
    }

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 16000,
      thinking: {
        type: "enabled",
        budget_tokens: 10000,
      },
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    });

    const textBlock = message.content.find((block) => block.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      return NextResponse.json(
        { error: "No response from model" },
        { status: 500 }
      );
    }

    let rawText = textBlock.text.trim();

    // Strip markdown code fences
    rawText = rawText.replace(/^```(?:json)?\s*\n?/, "").replace(/\n?\s*```$/, "");

    // If the model added text before/after the JSON, extract the JSON object
    const jsonStart = rawText.indexOf("{");
    const jsonEnd = rawText.lastIndexOf("}");
    if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
      rawText = rawText.slice(jsonStart, jsonEnd + 1);
    }

    let jsonResponse;
    try {
      jsonResponse = JSON.parse(rawText);
    } catch {
      console.error("Failed to parse model response. Raw text:", textBlock.text);
      return NextResponse.json(
        { error: "Failed to parse model response as JSON. Check server logs." },
        { status: 500 }
      );
    }

    return NextResponse.json(jsonResponse);
  } catch (error) {

    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to generate prompt. Please try again." },
      { status: 500 }
    );
  }
}
