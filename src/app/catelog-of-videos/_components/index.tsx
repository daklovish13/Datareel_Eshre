"use client";
import { Header } from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const Catalog = () => {
  const video = [
    "/videos/demo_video.mp4",
    "/videos/eshre_demo2.mp4",
    "/videos/demo_video3.mp4",
  ];
  const [selectedVideo, setSelectedVideo] = useState({
    video: video[0],
    index: 0,
  });
  return (
    <>
      <Header />
      <div className="bg-[#EEF2FE] p-6 sm:p-10">
        <div className="flex gap-1  md:mb-10 mb-14">
          <div className="mt-1.5">
            <Link href="/" className="cursor-pointer">
              <Image
                src="/back_arrow_desktop.png"
                width={30}
                height={30}
                alt="back-button"
              />
            </Link>
          </div>
          <h2 className="text-[27px] font-bold  fbg text-left">
            Catalogue of AI Videos
          </h2>
        </div>
        {/* Generate Button on top-right of the main image */}
        <div className="">
          <div className="md:block hidden absolute md:top-29 md:right-20  height-30">
            <Link href="/generate-videos">
              <Image
                src="/Group32.png"
                width={173}
                height={50}
                alt="generate-button"
                className="cursor-pointer"
              />
            </Link>
          </div>
          <div className="md:hidden block absolute  top-34  right-4 height-30">
            <Link href="/generate-videos">
              <Image
                src="/Group32.png"
                width={130}
                height={30}
                alt="generate-button"
                className="cursor-pointer"
              />
            </Link>
          </div>
        </div>

        {/* Main video with Generate Button */}
        <div className="relative rounded-lg overflow-hidden shadow-md mb-3">
          <video
            className="w-full md:h-[515px] h-44"
            src={selectedVideo?.video}
            controls
          ></video>
          {/* <img src="/Group.png" className="md:h-[515px] h-44 w-full" /> */}
        </div>

        <div className="text-left mb-8 relative">
          <div className="flex gap-2">
            <p className="text-[13px] font-bold text-[#6B63F4]">
              Report Explainer
            </p>
            <p className="text-[13px] font-bold text-[#747474]">
              |&nbsp; Endocrinologist
            </p>
          </div>
          <p className="text-[13px] font-medium text-[#373737]">
            Check out this example for Endocrinology. Just click on the marker
            to start focusing on it.
          </p>
          <p className="text-[13px] font-medium text-[#747474]">
            English | Initial Consultation | Tubal block
          </p>

          {/* <div className=" absolute right-0 -top-1 mb-2">
                   <Image
                     src="/download_button.png"
                     alt="Download"
                     width={25}
                     height={25}
                     className="hover:opacity-80 cursor-pointer md:block hidden"
                   />
                   <Image
                     src="/download_button.png"
                     alt="Download"
                     width={22}
                     height={22}
                     className="hover:opacity-80 cursor-pointer md:hidden block"
                   />
                 </div> */}

          <div className="absolute right-0 -top-1 mb-2">
            {/* Desktop download button */}
            <a
              href={selectedVideo.video}
              download={`video_${selectedVideo.index + 1}.mp4`}
            >
              <Image
                src="/download_button.png"
                alt="Download"
                width={25}
                height={25}
                className="hover:opacity-80 cursor-pointer md:block hidden"
              />
            </a>
            {/* Mobile download button */}
            <a
              href={selectedVideo.video}
              download={`video_${selectedVideo.index + 1}.mp4`}
            >
              <Image
                src="/download_button.png"
                alt="Download"
                width={22}
                height={22}
                className="hover:opacity-80 cursor-pointer md:hidden block"
              />
            </a>
          </div>
        </div>

        {/* Thumbnail grid */}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 relative mb-10 md:px-10">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              onClick={() => {
                setSelectedVideo({ video: video[i], index: i });
              }}
              className={`${
                selectedVideo?.index === i
                  ? "shadow-md p-2 border-2 rounded-lg border-[#6B63F4] cursor-pointer"
                  : "cursor-pointer"
              }`}
            >
              <div className="rounded-lg overflow-hidden shadow relative">
                {/* <video
                  className="w-full h-auto"
                  src="/videos/thumb.mp4"
                  controls
                ></video> */}
                <img
                  src="/Group9.png"
                  className="md:h-[140px] h-[100px] w-full "
                />
                <div
                  style={{
                    background: "url(/play_button.png)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "15% 25%",
                    backgroundColor: "#00000080",
                    backgroundPosition: "center",
                  }}
                  className=" absolute  top-0 left-0  right-0 bottom-0"
                ></div>
              </div>
              <div className="text-left mt-2 ml-1">
                <div className="md:flex block gap-2">
                  <p className="text-[13px] font-bold text-[#2C2C2C]">
                    Report Explainer
                  </p>
                  <p className="text-[13px] font-bold flex text-[#747474]">
                    <span className="md:block hidden">|&nbsp;</span>
                    Endocrinologist
                  </p>
                </div>
                <p className="text-[11px] font-medium text-[#747474]">
                  English | Initial Consultation | Tubal block
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center ">
          <button className="inline-flex gap-3 text-white text-[16px] font-medium px-6 py-3 justify-center rounded-[8px] shadow hover:opacity-90">
            Show More
          </button>
        </div>
      </div>
    </>
  );
};
