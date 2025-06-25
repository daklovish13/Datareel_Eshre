// File: src/app/api/videos/route.js (or route.ts if using TypeScript)

import data from './data.json';

export async function POST(request:any) {
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

  } catch (error:any) {
    return new Response(
      JSON.stringify({ message: "Internal server error", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
