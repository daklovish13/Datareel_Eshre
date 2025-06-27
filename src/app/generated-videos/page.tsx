"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { GeneratedVideoUI } from "./_components";

function GeneratedVideoContent() {
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

export default function GeneratedVideos() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GeneratedVideoContent />
    </Suspense>
  );
}
