"use client";
import React from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle, Divider } from "@mui/material";
import { ShareSocial } from "react-share-social";
type VideoData = {
  video_url: string;
  videoType: string;
  diseaseType: string;
  language: string;
};
type GeneratedVideoUIProps = {
  setShow: (show: boolean) => void;
};

export const GeneratedVideoUI = ({ setShow }: GeneratedVideoUIProps) => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [video, setVideo] = React.useState<VideoData>({
    video_url: "",
    videoType: "",
    diseaseType: "",
    language: "",
  });

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const videoData = sessionStorage.getItem("videoData");
      const storedVideo = videoData ? JSON.parse(videoData) : "";
      setVideo(storedVideo);
      console.log(storedVideo);
    }
  }, []);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle align="left">Share Video</DialogTitle>
        <Divider className="relative z-50" />
        <DialogContent className="-mt-[2rem] ">
          <ShareSocial
            style={{ backgroundColor: "blue" }}
            url={video?.video_url}
            socialTypes={[
              "telegram",
              "facebook",
              "twitter",
              "whatsapp",
              "linkedin",
            ]}
          />
        </DialogContent>
      </Dialog>
      <div className="bg-[#EEF2FE] p-6 sm:p-10 relative z-50">
        <div className="flex gap-1 mb-4">
          <div className="mt-1.5">
            <div
              onClick={() => {
                setShow(false);
              }}
              className="cursor-pointer"
            >
              <Image
                src="/back_arrow_desktop.png"
                width={25}
                height={25}
                alt="back-button"
              />
            </div>
          </div>
          <h2 className="md:text-[24px] text-[24px] font-bold  fbg text-left">
            Generated Video
          </h2>
        </div>

        {/* Main video and button below it */}
        <div className="rounded-lg overflow-hidden shadow-md mb-1">
          <video
            className="w-full md:h-[515px] h-44"
            src={video?.video_url}
            controls
          ></video>
        </div>

        <div className="flex mt-4 justify-between relative">
          <div className=" text-left mb-8">
            <div className="flex gap-2">
              <p className="text-[13px] md:text-[14px] font-bold text-[#2463e9]">
                {video?.videoType || "Disease Explainer"}
              </p>
              <p className="text-[13px] md:text-[14px] font-bold text-[#747474]">
                {" "}
                |&nbsp; {video?.diseaseType || "Tubal Block"}
              </p>
            </div>
            <p className="text-[13px] md:text-[14px] font-medium text-[#747474]">
              {video?.language || "English"}
            </p>
          </div>
          {/* <div>
            <button
              onClick={handleOpen}
              className="px-2 cursor-pointer flex gap-1 py-1 text-sm font-medium"
            >
              Share
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="remixicon size-5 transition-transform group-hover:translate-x-1"
              >
                <path d="M13 14H11C7.54202 14 4.53953 15.9502 3.03239 18.8107C3.01093 18.5433 3 18.2729 3 18C3 12.4772 7.47715 8 13 8V3L23 11L13 19V14Z"></path>
              </svg>
            </button>
          </div> */}
          {/* <div className=" absolute right-0 -top-1 mb-2">
            <a href={video?.video_url} target="_blank" download={`video.mp4`}>
              <Image
                src="/download_button.png"
                alt="Download"
                width={25}
                height={25}
                className="hover:opacity-80 cursor-pointer md:block hidden"
              />
            </a>
            
            <a href={video?.video_url} download={`video.mp4`}>
              <Image
                src="/download_button.png"
                alt="Download"
                width={22}
                height={22}
                className="hover:opacity-80 cursor-pointer md:hidden block"
              />
            </a>
          </div> */}
        </div>

        {/* Program Features */}
        <div className="bg-white pb-8 rounded-lg shadow-lg  md:px-8 px-4">
          <div className="py-6">
            <p className="text-[26px] font-bold fbg  text-center">
              Program Features
            </p>
            <p className="text-[15px] font-medium text-center text-[#747474] fbg ">
              Enterprise healthcare video capabilities
            </p>
          </div>

          {/* Performance Metrics */}
          <div className="bg-[#F7F7FF] mb-6 rounded-[8px] px-10">
            <div className="text-[16px] font-bold py-3 fbg">
              Performance Metrics
            </div>
            <div className="flex flex-col sm:flex-row   pt-1 pb-4 md:justify-around items-center text-center w-full">
              <div className="md:pb-0 pb-2">
                <p className="bg-clip-text text-[#2463e9] font-bold text-[30px]">
                  78%
                </p>
                <p className="text-[14px] font-medium fbg">
                  Engagement Increase
                </p>
              </div>
              <hr className="w-full text-gray-400 my-2 md:hidden block" />
              <div className="md:border-r-2 md:border-l-2  md:py-0 py-3  px-32 border-[#CCCCCC]">
                <p className="bg-clip-text text-[#2463e9] font-bold text-[30px]">
                  90%
                </p>
                <p className="text-[14px] font-medium fbg">Cost Reduction</p>
              </div>
              <hr className="w-full text-gray-400 my-2 md:hidden block" />
              <div className="md:pt-0 pt-2">
                <p className="bg-clip-text text-[#2463e9] font-bold text-[30px]">
                  $0.50
                </p>
                <p className="text-[14px] font-medium fbg">
                  Video Cost Starting From
                </p>
              </div>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 md:px-4 ">
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
                title: "Enterprises Security",
                icon: "/graph-svgrepo-com5.png",
                desc: "zero-trust architecture and healthcare data protection",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-4 bg-[#F8F8F8] flex gap-4 md:px-6 px-1 items-center rounded-md text-left"
              >
                <div className="md:block hidden">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={40}
                    height={40}
                  />
                </div>
                <div className="md:hidden block">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={70}
                    height={70}
                  />
                </div>
                <div>
                  <p className="text-[14px] font-medium fbg mb-1">
                    {feature.title}
                  </p>
                  <p className="text-[13px] font-medium text-[#747474] fbg">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
