// File: src/app/api/videos/route.js (or route.ts if using TypeScript)

import data from './data.json';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { avatar_id, language, video_type, disease } = body;

    const matched = data.find(video =>
      video.avatar_id === avatar_id &&
      video.language === language &&
      video.video_type === video_type &&
      (video_type === "Stimulation" || video.disease === disease)
    );

    if (!matched) {
      return new Response(
        JSON.stringify({ message: "No matching video found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify(matched), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error: unknown) {
    let errorMessage = "Unknown error";
    if (error && typeof error === "object" && "message" in error) {
      errorMessage = (error as { message: string }).message;
    }
    return new Response(
      JSON.stringify({ message: "Internal server error", error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
