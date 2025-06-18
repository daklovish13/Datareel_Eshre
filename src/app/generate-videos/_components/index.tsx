"use client";

import Image from "next/image";
import { Header } from "@/components/Header";

import Link from "next/link";
import React, { useState } from "react";
import {
 
  CircularProgress,
  Dialog,
 
  DialogContent,
 
  DialogTitle,
  Divider,

  Slide,
  
  Tooltip,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import HubspotForm from "@/components/HubspotForm";
import { useRouter } from "next/navigation";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const GenerateVideoUI = () => {
  const navigation = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedVideoType, setSelectedVideoType] = useState<string | null>(
    null
  );
  const [openCustom, setCustomModal] = useState(false);
  const [selectedDisease, setSelectedDisease] = useState<string | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [request,setRequest]=useState(false)
  const [loading,setLoading] = useState(false);

  const generateVideo = async () => {
    setLoading(true);
    const params = {
      avatar_id: selectedAvatar ? selectedAvatar + 1 : 1,
      language: selectedLanguage,
      video_type: selectedVideoType,
      disease: selectedDisease,
    };
     const url="https://datareel-eshre-backend-89ex.onrender.com";
    // const url = "http://127.0.0.1:8000";
    fetch(`${url}/get-video-id`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((result) => {
        setLoading(false)
        console.log(result)
        if(result?.detail){
          alert(result?.detail)
        }
        else{
        sessionStorage.setItem("videoData",result.video_url)
        navigation.push("/generated-videos");
        }
      });
  };

  return (
    <div className="min-h-screen bg-[#f4f5ff] text-gray-700">
      <Dialog
        open={openCustom}
        slots={{
          transition: Transition,
        }}
        keepMounted
        className="rounded-xl"
        fullWidth
        onClose={() => {setCustomModal(false);setRequest(false)}}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle align="left">{"Custom"}</DialogTitle>
        <Divider />
        <DialogContent>
          {request?<HubspotForm id="custom_form" />:
          <div className="my-2">
            <Typography> To Create your own custom avatar request a demo.</Typography>
            <div className="flex justify-center my-4">
               <button
                onClick={()=>setRequest(true)}
                className="mt-4 cursor-pointer  flex md:mx-0 mx-auto !text-[16px] !font-bold !px-4 !py-2 !rounded-[8px] !transition hover:!bg-gray-100"
              >
               Request a Demo
              </button>
            </div>
          </div>
          }
        </DialogContent>
      </Dialog>
      <Header />

      <div className="p-4 text-gray-700">
        <div className="flex gap-1 mb-4">
          <div className="mt-1.5">
            <Link href="/catelog-of-videos" className="cursor-pointer">
              <Image
                src="/back_arrow_desktop.png"
                width={30}
                height={30}
                alt="back-button"
              />
            </Link>
          </div>
          <h2 className="text-[27px] font-bold  fbg text-left">
            Generate Video
          </h2>
        </div>

        <div className="mb-4 bg-white p-2">
          <h2 className="font-medium text-[16px] text-black text-left mb-2">
            Configuration Progress
          </h2>

          {/* Calculate progress based on how many are selected */}
          {(() => {
            const totalSteps = 4;
            let completedSteps = 0;

            if (selectedAvatar !== null) completedSteps++;
            if (selectedLanguage) completedSteps++;
            if (selectedVideoType) completedSteps++;
            if (selectedDisease) completedSteps++;

            const progressPercent = (completedSteps / totalSteps) * 100;

            return (
              <div className="w-full h-2 bg-gray-200 rounded-full mb-1">
                <div
                  className="h-full bg-cutom-color rounded-full transition-all duration-500 ease-in-out"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            );
          })()}
        </div>

        {/* Choose Avatar */}
        <div className="mb-8 bg-white p-5">
          <h2 className="font-medium text-[16px] text-black mb-2 flex items-center gap-2">
            <button className="w-6 h-6 flex items-center justify-center !rounded-full text-white text-left font-semibold">
              1
            </button>
            Choose Avatar
          </h2>

          <div className="md:flex grid grid-cols-3 gap-4 justify-center mt-5 mb-8">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <div
                key={index}
                onClick={() =>
                  index !== 4 &&
                  setSelectedAvatar((prev) => (prev === index ? null : index))
                }
                // Handle click selection
                className={`relative md:w-[150px] md:h-[150px] h-[80px] w-[80px] rounded-full flex items-center justify-center  cursor-pointer transition 
        ${
          selectedAvatar === index
            ? "  border-2 border-[#6864F4]"
            : index !== 4
            ? "border-2 border-gray-300"
            : ""
        }`}
              >
                <Image
                  src={
                    index === 2
                      ? "/avatar3.svg"
                      : index == 4
                      ? "/custom_avatar.png"
                      : "avatar1.svg"
                  }
                  alt={`Avatar ${index}`}
                  fill
                  onClick={() => index == 4 && setCustomModal(true)}
                  className="object-contain rounded-full md:block hidden"
                />
                <Image
                  src={
                    index === 2
                      ? "/avatar3.svg"
                      : index == 4
                      ? "/custom_avatar.png"
                      : "avatar1.svg"
                  }
                  alt={`Avatar ${index}`}
                  height={120}
                  width={120}
                  onClick={() => index == 4 && setCustomModal(true)}
                  className=" rounded-full md:hidden block"
                />
                {/* Tick Icon */}
                {selectedAvatar === index && (
                  <div className="absolute -top- -right-2 w-6 h-6 bg-[#6864F4] rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Select Language */}
        <div className="mb-4 bg-white p-5">
          <h2 className="font-medium text-[16px] text-black mb-2 flex items-center gap-2">
            <button className="w-6 h-6 flex items-center justify-center !rounded-full  text-white text-sm font-semibold">
              2
            </button>
            Select Language
          </h2>
          <div className="md:flex grid grid-cols-2 text-center  gap-3  mt-5">
            {["English", "French", "Spanish"].map((lang) => (
              <div
                key={lang}
                onClick={() =>
                  setSelectedLanguage((prev) => (prev === lang ? null : lang))
                }
                className={` flex items-center md:mx-0   md:w-fit w-full gap-2 px-13 py-2 text-[14px] font-medium  rounded-[12px]  cursor-pointer ${
                  selectedLanguage === lang
                    ? "bg-[#855AE921] border text-black border-[#855AE9]"
                    : "shadow-md text-black"
                }`}
              >
                {lang}
              </div>
            ))}
            <img
              src="/custom_plus.png"
              alt="custom"
              onClick={() => setCustomModal(true)}
              className="h-[45px] flex items-center  my-auto md:mx-0 mx-auto md:-mb-[4px] md:mt-0 mt-2"
            />
          </div>
        </div>

        {/* Select Video Type */}
        <div className="mb-8 bg-white p-5">
          <h2 className="font-medium text-[16px] text-black mb-2 flex items-center gap-2">
            <button className="w-6 h-6 flex items-center justify-center border !rounded-full  text-white text-sm font-semibold">
              3
            </button>
            Select Video Type
          </h2>
          <div className="md:flex grid grid-cols-2 gap-5 mt-5">
            {[
              { label: "Report Explainer", icon: "/report_logo.svg" },
              {
                label: "Initial Consultation",
                icon: "/Initial_Consultation.svg",
              },
              { label: "Embryo Grading Explaination", icon: "/embryo.svg" },
            ].map(({ label, icon }) => (
              <div
                key={label}
                onClick={() =>
                  setSelectedVideoType((prev) =>
                    prev === label ? null : label
                  )
                }
                className={`flex flex-1 items-center md:w-fit w-full gap-3 mx-auto md:my-0 my-1 px-4 py-2 justify-center  rounded-[12px]  cursor-pointer ${
                  selectedVideoType === label
                    ? "bg-[#855AE921] border  text-black border-[#855AE9]"
                    : "shadow-md text-black"
                }`}
              >
                <div className="relative w-[35px] h-[35px]">
                  <Image
                    src={icon}
                    alt={label}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="md:text-[14px] text-[12px] text-black text-left font-medium ">
                  {label}
                </span>
              </div>
            ))}
            <img
              src="/custom_plus.png"
              alt="custom"
              onClick={() => setCustomModal(true)}
              className="h-[45px] flex mx-auto -mb-[4px] mt-[10px]"
            />
          </div>
        </div>

        {/* Select Disease */}
        <div className="mb-8 bg-white p-5">
          <h2 className="font-medium text-[16px] text-black mb-2 flex items-center gap-2">
            <button className="w-6 h-6 flex items-center justify-center !rounded-full bg-purple-600 text-white text-sm font-semibold">
              4
            </button>
            Select Disease
          </h2>
          <div className="md:flex md:flex-wrap grid grid-cols-2 gap-3 mt-5">
            {[
              "Endometriosis",
              "Tubal Block",
              "Hydrosalpinx",
              "Ovarian Cysts",
              "PID",
              "Adenomyosis",
              "Polycystic Ovary Syndrome",
            ].map((disease) => (
              <div
                key={disease}
                onClick={() =>
                  setSelectedDisease((prev) =>
                    prev === disease ? null : disease
                  )
                }
                className={`px-6 py-2 rounded-[12px] my-1 md:w-fit w-full flex mx-auto cursor-pointer ${
                  selectedDisease === disease
                    ? "bg-[#855AE921]  text-black border border-[#855AE9]"
                    : "shadow-md text-black "
                }`}
              >
                <span className="text-[14px] font-medium">{disease}</span>
              </div>
            ))}
            <img
              src="/custom_plus.png"
              alt="custom"
              onClick={() => setCustomModal(true)}
              className="h-[45px] flex mx-auto -mb-[4px] mt-4 md:mt-0"
            />
          </div>
        </div>

        {/* Generate Buttons */}
        <div className="flex  items-center w-full">
          {/* Right Button */}
          {selectedAvatar === null &&
          selectedDisease === null &&
          selectedVideoType === null &&
          selectedLanguage === null ? (
            <Tooltip title="Please complete all selections: Avatar, Language, Video Type, and Disease.">
              <button className="flex items-center gap-3 ml-auto text-white text-[13px] font-bold px-6 py-3 rounded-[8px] shadow hover:opacity-90">
                {loading?<CircularProgress size={22} color="info"/>:"Generate"}
                <span>
                  <img
                    src="right_use.png"
                    alt="arrow"
                    className="h-[15px] w-[15px] mt-0.5"
                  />
                </span>
              </button>
            </Tooltip>
          ) : (
            <div onClick={generateVideo} className="flex ml-auto">
              <button  className="flex items-center gap-3 ml-auto text-white text-[13px] font-bold px-6 py-3 rounded-[8px] shadow hover:opacity-90">
                {loading?<CircularProgress size={22} color="info"/>:"Generate"}
                <span>
                  <img
                    src="right_use.png"
                    alt="arrow"
                    className="h-[15px] w-[15px] mt-0.5"
                  />
                </span>
              </button>
            </div>
          )}
        </div>

        <div className="relative w-full md:px-0 px-4 pb-6">
          <div className="bg-[#6C63FF] px-8 md:py-0 py-4 mt-10 text-white rounded-xl  md:flex block  items-center md:gap-6 gap-2  w-full">
            {/* Left Side Illustration */}
            <div className=" flex justify-center">
              <Image
                src="/generate_quote.png"
                alt="Quote Illustration"
                width={250}
                height={250}
              />
            </div>

            {/* Right Side Text and Button */}
            <div className="w-full md:w-2/3 md:text-left text-center">
              <div>
                <p className="md:text-[20px] text-[16px] font-medium">
                  Request a Demo Featuring your Custom
                  <br className="md:block hidden" /> Avatar and Voice
                </p>
              </div>
              <button
                style={{ background: "white" }}
                onClick={handleOpen}
                className="mt-4 !text-[#6864F4] flex md:mx-0 mx-auto !text-[16px] !font-bold !px-4 !py-2 !rounded-[8px] !transition hover:!bg-gray-100"
              >
                Request a demo
              </button>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        slots={{
          transition: Transition,
        }}
        keepMounted
        className="rounded-xl"
        fullWidth
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle align="left">{"Book a Demo"}</DialogTitle>
        <Divider />
        <DialogContent>
          <HubspotForm id="request_a_demo" />
        </DialogContent>
      </Dialog>
    </div>
  );
};
