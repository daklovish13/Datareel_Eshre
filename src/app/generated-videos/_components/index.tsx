"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle, Divider, CircularProgress, Tooltip } from "@mui/material";
import { ShareSocial } from "react-share-social";

type GeneratedVideoUIProps = {
  setShow: (show: boolean) => void;
  video: {
    video_url: string;
    videoType?: string;
    diseaseType?: string;
    language?: string;
  };
};

// Video Player Component with optimized sizing
const OptimizedVideoPlayer = ({ src, className = "" }: { src: string; className?: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [videoDimensions, setVideoDimensions] = useState({ width: 0, height: 0 });
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setVideoLoaded(true);
      setVideoDimensions({
        width: video.videoWidth,
        height: video.videoHeight
      });
    };

    const handleError = () => {
      setVideoError(true);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('error', handleError);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('error', handleError);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [src]);

  if (videoError) {
    return (
      <div className="flex items-center justify-center bg-gray-100 min-h-[300px]">
        <div className="text-center p-6">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Video Unavailable</h3>
          <p className="text-gray-600">Unable to load the video. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative bg-black ${className}`}>
      {!videoLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <CircularProgress size={40} style={{ color: "#2463e9" }} />
            <p className="text-sm text-gray-600 mt-2">Loading video...</p>
          </div>
        </div>
      )}
      
      <video
        ref={videoRef}
        className={`w-full h-auto max-w-full ${!videoLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        src={src}
        controls
        preload="metadata"
        style={{
          aspectRatio: videoDimensions.width && videoDimensions.height 
            ? `${videoDimensions.width}/${videoDimensions.height}` 
            : '16/9'
        }}
      />
      
      {videoLoaded && (
        <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm px-2 py-1 text-xs text-white">
          {videoDimensions.width}×{videoDimensions.height}
        </div>
      )}
    </div>
  );
};

// Action Button Component
const ActionButton = ({ 
  onClick, 
  icon, 
  label, 
  variant = "secondary" 
}: { 
  onClick: () => void; 
  icon: React.ReactNode; 
  label: string; 
  variant?: "primary" | "secondary";
}) => (
  <Tooltip title={label}>
    <button
      onClick={onClick}
      className={`p-2 sm:p-3 rounded-xl transition-colors flex items-center justify-center ${
        variant === "primary" 
          ? "bg-[#2463e9] hover:bg-[#1952d4] text-white" 
          : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200"
      }`}
    >
      {icon}
    </button>
  </Tooltip>
);

export const GeneratedVideoUI = ({ setShow, video }: GeneratedVideoUIProps) => {
  const [open, setOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);
  
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const handleDownload = async () => {
    if (!video?.video_url) return;
    
    setDownloading(true);
    try {
      const response = await fetch(video.video_url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${video.videoType || 'video'}-${video.diseaseType || 'generated'}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      {/* Share Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle className="text-center font-medium">Share Video</DialogTitle>
        <Divider />
        <DialogContent className="p-6">
          <ShareSocial
            url={video?.video_url || ''}
            socialTypes={["telegram", "facebook", "twitter", "whatsapp", "linkedin"]}
          />
        </DialogContent>
      </Dialog>

      <div className="min-h-screen bg-gray-50 pt-16 sm:pt-20">
        <div className="max-w-6xl mx-auto p-4 sm:p-6">
          {/* Header */}
          <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <button
              onClick={() => setShow(false)}
              className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-xl transition-colors group"
            >
              <Image
                src="/back_arrow_desktop.png"
                width={18}
                height={18}
                alt="back"
                className="sm:w-5 sm:h-5 transition-transform group-hover:-translate-x-0.5"
              />
            </button>
            <div>
              <h1 className="text-lg sm:text-xl lg:text-2xl font-medium text-gray-900">Generated Video</h1>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">Your personalized medical video is ready</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8">
            {/* Video Section - Smaller */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
                {video?.video_url ? (
                  <OptimizedVideoPlayer 
                    src={video.video_url} 
                    className="w-full max-w-2xl mx-auto"
                  />
                ) : (
                  <div className="flex items-center justify-center bg-gray-100 h-48 sm:h-64 rounded-xl">
                    <div className="text-center">
                      <svg className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-2 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <p className="text-gray-600 text-sm sm:text-base">No video available</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Video Info */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4 sm:gap-0">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                      <span className="px-2 sm:px-3 py-1 bg-blue-50 text-blue-600 text-xs sm:text-sm font-medium rounded-full">
                        {video?.videoType || "Disease Explainer"}
                      </span>
                      <span className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-700 text-xs sm:text-sm font-medium rounded-full">
                        {video?.diseaseType || "Tubal Block"}
                      </span>
                    </div>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      Language: {video?.language || "English"}
                    </p>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2 sm:gap-3">
                    <ActionButton
                      onClick={handleOpen}
                      label="Share video"
                      icon={
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                        </svg>
                      }
                    />
                    <ActionButton
                      onClick={handleDownload}
                      label={downloading ? "Downloading..." : "Download video"}
                      variant="primary"
                      icon={
                        downloading ? (
                          <CircularProgress size={16} style={{ color: "white" }} className="sm:w-5 sm:h-5" />
                        ) : (
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Expanded Sidebar */}
            <div className="lg:col-span-2">
              {/* Performance Metrics */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Performance Metrics</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 sm:gap-6">
                  <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                    <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">78%</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">Engagement Increase</div>
                  </div>
                  <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                    <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">90%</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">Cost Reduction</div>
                  </div>
                  <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl">
                    <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1">$0.50</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">Video Cost Starting From</div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setShow(false)}
                    className="w-full flex items-center gap-3 p-3 sm:p-4 text-left hover:bg-blue-50 transition-colors rounded-xl border border-gray-200 hover:border-blue-200"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-semibold text-gray-900">Generate Another Video</div>
                      <div className="text-xs text-gray-500">Create a new personalized video</div>
                    </div>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 sm:p-4 text-left hover:bg-gray-50 transition-colors rounded-xl border border-gray-200">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-semibold text-gray-900">View All Videos</div>
                      <div className="text-xs text-gray-500">Browse video library</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Program Features */}
          <div className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 mt-6 sm:mt-8">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-medium text-gray-900 mb-2">Program Features</h2>
              <p className="text-gray-600 text-sm sm:text-base">Enterprise healthcare video capabilities</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  title: "Advanced Analytics",
                  icon: "/graph-svgrepo-com1.png",
                  desc: "Real-time engagement metrics, completion rates, and patient interaction insights",
                },
                {
                  title: "Engagement Tracking",
                  icon: "/graph-svgrepo-com2.png",
                  desc: "Monitor video effectiveness and patient comprehension levels across all touchpoints",
                },
                {
                  title: "Approval Workflow",
                  icon: "/graph-svgrepo-com3.png",
                  desc: "Multi-tier medical content review and compliance validation system",
                },
                {
                  title: "Smart Callbacks",
                  icon: "/graph-svgrepo-com4.png",
                  desc: "Automated follow-up scheduling based on patient engagement and care protocols",
                },
                {
                  title: "Feedback Collection",
                  icon: "/graph-svgrepo-com6.png",
                  desc: "Integrated patient satisfaction surveys and clinical outcome tracking",
                },
                {
                  title: "Enterprise Security",
                  icon: "/graph-svgrepo-com5.png",
                  desc: "Zero-trust architecture and healthcare data protection",
                },
              ].map((feature, i) => (
                <div key={i} className="p-4 sm:p-6 bg-gray-50 hover:bg-gray-100 transition-colors rounded-xl">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                      <Image
                        src={feature.icon}
                        alt={feature.title}
                        width={20}
                        height={20}
                        className="sm:w-6 sm:h-6"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
