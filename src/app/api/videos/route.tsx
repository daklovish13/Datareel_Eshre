// File: src/app/api/videos/route.tsx

import { NextRequest } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Video path mapping utility (same as frontend)
const createVideoPath = (
  avatar: string,
  language: string,
  videoType: string,
  disease?: string
): string => {
  const avatarFolderMap: { [key: string]: string } = {
    "Jonathan": "Sophia",
    "Sophia": "Sophia", 
    "Keira": "Sophia",
  };

  const videoTypeFolderMap: { [key: string]: string } = {
    "Disease Explainer": "Disease",
    "Report Explainer": "Report",
    "Educational Videos": "Educational"
  };

  const diseaseFolderMap: { [key: string]: string } = {
    "Tubal Block": "Tubal Block",
    "PCOD": "PCOD", 
    "Teratozoospermia": "Teratoozoospermia", // Note: folder has extra 'o'
    "Stimulation": "Stimulation"
  };

  const avatarFolder = avatarFolderMap[avatar] || "Sophia";
  const typeFolder = videoTypeFolderMap[videoType];
  const diseaseFile = disease ? diseaseFolderMap[disease] : "Stimulation";

  return `/Assets/${avatarFolder}/${language}/${typeFolder}/${diseaseFile}.mp4`;
};

// Check if video file exists
const checkVideoExists = async (videoPath: string): Promise<boolean> => {
  try {
    const publicPath = path.join(process.cwd(), 'public', videoPath);
    await fs.access(publicPath);
    return true;
  } catch {
    return false;
  }
};

// Enhanced video availability mapping
const getAvailableVideos = () => ({
  "Disease Explainer": {
    English: ["Tubal Block", "PCOD", "Teratozoospermia"],
    French: ["Tubal Block"],
    Spanish: ["Tubal Block"]
  },
  "Report Explainer": {
    English: ["Tubal Block", "Teratozoospermia"],
    French: ["Tubal Block"],
    Spanish: ["Tubal Block"]
  },
  "Educational Videos": {
    English: ["Stimulation"],
    French: ["Stimulation"],
    Spanish: ["Stimulation"]
  }
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Received video request:', body);

    const { 
      avatar_id, 
      avatar_name, 
      language, 
      video_type, 
      disease, 
      video_path: providedVideoPath,
      selections 
    } = body;

    // Validate required fields
    if (!language || !video_type) {
      return new Response(
        JSON.stringify({ 
          message: "Missing required fields: language and video_type are required" 
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // For Educational Videos, disease is optional (defaults to Stimulation)
    const finalDisease = video_type === "Educational Videos" ? "Stimulation" : disease;
    
    if (video_type !== "Educational Videos" && !finalDisease) {
      return new Response(
        JSON.stringify({ 
          message: "Disease is required for Disease Explainer and Report Explainer videos" 
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check availability
    const availableVideos = getAvailableVideos();
    const availableForType = availableVideos[video_type as keyof typeof availableVideos];
    
    if (!availableForType) {
      return new Response(
        JSON.stringify({ 
          message: `Video type "${video_type}" is not available` 
        }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const availableForLanguage = availableForType[language as keyof typeof availableForType];
    
    if (!availableForLanguage) {
      return new Response(
        JSON.stringify({ 
          message: `Videos in ${language} are not available for ${video_type}` 
        }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!availableForLanguage.includes(finalDisease)) {
      return new Response(
        JSON.stringify({ 
          message: `Video for "${finalDisease}" is not available in ${language} for ${video_type}. Available options: ${availableForLanguage.join(', ')}` 
        }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Create video path
    const avatarName = avatar_name || "Sophia";
    const videoPath = providedVideoPath || createVideoPath(avatarName, language, video_type, finalDisease);
    
    console.log('Generated video path:', videoPath);

    // Check if video file exists
    const videoExists = await checkVideoExists(videoPath);
    
    if (!videoExists) {
      console.log('Video file not found at:', videoPath);
      return new Response(
        JSON.stringify({ 
          message: `Video file not found: ${videoPath}. The video may not be available yet.` 
        }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Return successful response with video data
    const responseData = {
      success: true,
      video_url: videoPath,
      metadata: {
        avatar_id,
        avatar_name: avatarName,
        language,
        video_type,
        disease: finalDisease,
        generated_at: new Date().toISOString(),
        file_path: videoPath
      },
      selections: selections || {
        avatar: avatarName,
        language,
        videoType: video_type,
        disease: finalDisease
      }
    };

    console.log('Returning video data:', responseData);
    
    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error: unknown) {
    console.error('Video API error:', error);
    
    let errorMessage = "Unknown error occurred";
    if (error && typeof error === "object" && "message" in error) {
      errorMessage = (error as { message: string }).message;
    }
    
    return new Response(
      JSON.stringify({ 
        message: "Internal server error", 
        error: errorMessage,
        timestamp: new Date().toISOString()
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// Optional: Add GET endpoint for getting available videos
export async function GET() {
  try {
    const availableVideos = getAvailableVideos();
    
    return new Response(JSON.stringify({
      success: true,
      available_videos: availableVideos,
      avatars: ["Jonathan", "Sophia", "Keira"],
      languages: ["English", "French", "Spanish"]
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Failed to get available videos" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
