"use client";
import { useSearchParams } from "next/navigation";
import { GeneratedVideoUI } from "./_components";

export default function GeneratedVideos() {
  const searchParams = useSearchParams();
  const videoUrl = searchParams.get("video_url");
  const videoType = searchParams.get("videoType") || undefined;
  const diseaseType = searchParams.get("diseaseType") || undefined;
  const language = searchParams.get("language") || undefined;

  return (
    <GeneratedVideoUI
      setShow={() => {}}
      video={{
        video_url: videoUrl || "",
        videoType,
        diseaseType,
        language,
      }}
    />
  );
}
