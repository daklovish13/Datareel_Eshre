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
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import HubspotForm from "@/components/HubspotForm";
import Swal from "sweetalert2";
import { GeneratedVideoUI } from "@/app/generated-videos/_components";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const GenerateVideoUI = () => {
  const [show, setShow] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedVideoType, setSelectedVideoType] = useState<string | null>(
    null
  );
  const [diseaseList, setSelectDisease] = useState<string[]>([]);
  const [openCustom, setCustomModal] = useState(false);
  const [selectedDisease, setSelectedDisease] = useState<string | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [request, setRequest] = useState(false);
  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState<{ video_url: string; videoType?: string; diseaseType?: string; language?: string }>({ video_url: "" });
  const avatarArray = [
    { name: "Jonathan", path: "/British_Male_thumbnail.webp" },
    { name: "Sophia", path: "/US_Female_thumbnail.webp" },
    { name: "Keira", path: "/Asian_Female_thumbnail.webp" },
    { name: "", path: "custom" },
  ];

  const videoType = [
    {
      name: "Disease Explainer",
      child: ["Tubal Block", "PCOD", "Teratozoospermia"],
      icon: "/Initial_Consultation.svg",
    },
    {
      name: "Report Explainer",
      child: ["Tubal Block", "Teratozoospermia"],
      icon: "/report_logo.svg",
    },
    {
      name: "Educational Videos",
      child: ["Stimulation"],
      icon: "/embryo.svg",
    },
  ];

  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const generateVideo = async () => {
    setLoading(true);
    const params = {
      avatar_id: selectedAvatar ? selectedAvatar + 1 : 1,
      language: selectedLanguage,
      video_type: selectedVideoType,
      disease: selectedDisease,
    };

    fetch(`/api/videos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        if (result?.message) {
          // alert(result?.detail);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Currently, the video is not available. Please try again later or select a different option.!",
          });
        } else {
          setVideo({ ...result, ...result?.video_data });
          sessionStorage.setItem(
            "videoData",
            JSON.stringify({ ...result, ...result?.video_data })
          );
          window.scrollTo({
            top: 0,
            behavior: "smooth", // or 'auto' for instant scroll
          });
          setShow(true);

          // navigation.push("/generated-videos");
        }
      });
  };

  return (
    <>
      <Header />
      <div className={`${show ? "block" : "hidden"}`}>
        <GeneratedVideoUI setShow={setShow} video={video} />
      </div>
      <div
        className={`min-h-screen bg-[#f4f5ff] text-gray-700 z-50 relative ${
          show ? "hidden" : "block"
        }`}
      >
        {/* Custom Modal */}
        <Dialog
          open={openCustom}
          slots={{ transition: Transition }}
          keepMounted
          fullWidth
          className="rounded-xl"
          onClose={() => {
            setCustomModal(false);
            setRequest(false);
          }}
        >
          <DialogTitle align="left">
            {"Design Your Own Video Story"}
          </DialogTitle>
          <Divider />
          <DialogContent>
            <div className={`${request ? "block" : "hidden"}`}>
              <HubspotForm id="custom_form" />
            </div>
            <div className={`my-2 ${request ? "hidden" : "block"}`}>
              <span className="text-[22px] mb-4 font-medium text-center block mt-4">
                <b>Your Video, Your Way </b>
              </span>
              <span>
                <span className="text-[14px] font-medium">
                  Pick an Avatar, Language,Type and Category.
                </span>
                <br />
                <span className="text-[14px] font-medium mb-4">
                  To Get a Personalized or Custom Video
                </span>
              </span>
              <div className="flex justify-center my-4">
                <button
                  onClick={() => setRequest(true)}
                  className="mt-4 cursor-pointer flex md:mx-0 mx-auto !text-[16px] !font-medium !px-4 !py-2 !rounded-[8px]"
                >
                  Request a Custom Video Demo
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <div className="p-4  text-gray-700 z-50 relative">
          {/* Back Navigation */}
          <div className="flex gap-1  md:mb-10 mb-5">
            <div className="mt-1.5">
              <Link
                href="/catalogue-of-videos"
                className="cursor-pointer md:block hidden"
              >
                <Image
                  src="/back_arrow_desktop.png"
                  width={25}
                  height={25}
                  alt="back-button"
                />
              </Link>
              <Link
                href="/catalogue-of-videos"
                className="cursor-pointer md:hidden block"
              >
                <Image
                  src="/back_arrow_desktop.png"
                  width={22}
                  height={22}
                  alt="back-button"
                />
              </Link>
            </div>
            <div className="lg:text-[24px] text-[22px]  sm:text-[20px] font-bold  fbg text-left">
              Generate Video
            </div>
          </div>
          {/* Progress Indicator */}
          <div className="mb-4 bg-white p-2">
            <h2 className="font-medium text-[16px] text-black text-left mb-2">
              Progress
            </h2>
            {(() => {
              const totalSteps = 4;
              let completedSteps = 0.03;
              if (selectedAvatar !== null) completedSteps++;
              if (selectedLanguage) completedSteps++;
              if (selectedVideoType) completedSteps++;
              if (selectedDisease || selectedVideoType === "Educational Videos")
                completedSteps++;
              const progressPercent = (completedSteps / totalSteps) * 100;
              return (
                <div className="w-full h-2 bg-gray-200 rounded-full mb-1">
                  <div
                    className="h-full bg-cutom-color rounded-full transition-all duration-500 ease-in-out"
                    style={{ width: `${progressPercent - 0.5}%` }}
                  ></div>
                </div>
              );
            })()}
          </div>

          {/* Avatar Selection */}
          {/* ... [Same as before, no logic change] ... */}
          {/* Choose Avatar */}
          <div className="mb-8 bg-white p-5">
            <h2 className="font-medium text-[16px] text-black mb-2 flex items-center gap-2">
              <button className="w-6 h-6 flex items-center justify-center !rounded-full text-white text-left font-medium text-sm">
                1
              </button>
              Choose Avatar
            </h2>

            <div className="md:flex grid grid-cols-3 gap-6 md:gap-10 justify-center mt-5 mb-8">
              {avatarArray.map((item, index) => (
                <div
                  key={index}
                  onClick={() =>
                    index !== 3 &&
                    !loading &&
                    setSelectedAvatar((prev) => (prev === index ? null : index))
                  }
                  className={`relative md:w-[150px] md:h-[150px] h-[70px] w-[70px] rounded-full flex items-center justify-center cursor-pointer transition 
          ${
            selectedAvatar === index
              ? "border-2 border-[#2463e9]"
              : index !== 3
              ? "border-2 border-gray-300"
              : ""
          }`}
                >
                  <div>
                    <Image
                      src={
                        index === 3 ? "/create_own.png" : (item?.path as string)
                      }
                      alt={`Avatar ${index}`}
                      fill
                      onClick={() =>
                        index === 3 && !loading && setCustomModal(true)
                      }
                      className="object-cover rounded-full md:block hidden"
                    />
                    <Image
                      src={
                        index === 3 ? "/create_own.png" : (item?.path as string)
                      }
                      alt={`Avatar ${index}`}
                      fill
                      onClick={() =>
                        index === 3 && !loading && setCustomModal(true)
                      }
                      className={`object-cover rounded-full md:hidden block ${
                        index === 3 ? "mt-4" : ""
                      }`}
                    />
                    <div className="absolute -bottom-9 left-0 right-0 text-center">
                      {item.name}
                    </div>
                  </div>
                  {selectedAvatar === index && (
                    <div className="absolute top-[2rem] md:top-[3.5rem] right-[-1rem] w-6 h-6 bg-[#2463e9] rounded-full flex items-center justify-center">
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

          {/* Language Selection */}
          <div className="mb-4 bg-white p-5">
            <h2 className="font-medium text-[16px] text-black mb-2 flex items-center gap-2">
              <button className="w-6 h-6 flex items-center justify-center !rounded-full text-white text-sm font-medium">
                2
              </button>
              Select Language
            </h2>
            <div className="md:flex grid grid-cols-2 text-center gap-3 mt-5">
              {["English", "French", "Spanish"].map((lang) => (
                <div
                  key={lang}
                  onClick={() => {
                    if (!loading) {
                      setSelectedLanguage((prev) =>
                        prev === lang ? null : lang
                      );
                    }
                    // Reset disease list if video type is already selected
                    if (
                      (lang === "Spanish" || lang === "French") &&
                      (selectedVideoType === "Disease Explainer" ||
                        selectedVideoType === "Report Explainer")
                    ) {
                      setSelectDisease(["Tubal Block"]);
                    } else {
                      const selectedType = videoType.find(
                        (vt) => vt.name === selectedVideoType
                      );
                      setSelectDisease(selectedType?.child || []);
                    }
                    setSelectedDisease(null);
                  }}
                  className={`flex items-center gap-2 justify-center mx-auto md:w-auto w-full md:mx-0 md:px-13 py-2 text-[14px] text-center font-medium rounded-[12px] cursor-pointer ${
                    selectedLanguage === lang
                      ? "bg-[#2463e926] border text-black border-[#2463e9]"
                      : "shadow-md text-black bg-gray-50 border border-[#8080801c]"
                  }`}
                >
                  {lang}
                </div>
              ))}
              <img
                src="/custom.png"
                alt="custom"
                onClick={() => !loading && setCustomModal(true)}
                className="h-[45px] my-auto md:mx-0 mx-auto md:mt-0 mt-2"
              />
            </div>
          </div>

          {/* Video Type Selection (Updated here) */}
          <div className="mb-8 bg-white p-5">
            <h2 className="font-medium text-[16px] text-black mb-2 flex items-center gap-2">
              <button className="w-6 h-6 flex items-center justify-center border !rounded-full text-white text-sm font-medium">
                3
              </button>
              Select Video Type
            </h2>
            <div className="md:flex grid grid-cols-1 md:gap-5 gap-3 mt-5">
              {videoType.map(({ name, child, icon }) => (
                <div
                  key={name}
                  onClick={() => {
                    if (!loading) {
                      setSelectedVideoType((prev) =>
                        prev === name ? null : name
                      );
                    }
                    // Set disease list based on lang + video type
                    if (
                      (selectedLanguage === "Spanish" ||
                        selectedLanguage === "French") &&
                      (name === "Disease Explainer" ||
                        name === "Report Explainer")
                    ) {
                      setSelectDisease(["Tubal Block"]);
                    } else {
                      setSelectDisease(child && child.length > 0 ? child : []);
                    }
                    setSelectedDisease(null);
                  }}
                  className={`flex items-center gap-3   mx-auto md:w-auto w-full md:mx-0 px-4 py-2 justify-center rounded-[12px] cursor-pointer ${
                    selectedVideoType === name
                      ? "bg-[#2463e926] border text-black border-[#2463e9]"
                      : "shadow-md text-black bg-gray-50 border border-[#8080801c]"
                  }`}
                >
                  <div className="relative md:w-[35px] md:h-[35px] w-[30px] h-[30px]">
                    <Image
                      src={icon}
                      alt={name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-[14px] font-medium">{name}</span>
                </div>
              ))}
              <img
                src="/custom.png"
                alt="custom"
                onClick={() => !loading && setCustomModal(true)}
                className="h-[45px] md:mx-0 mx-auto -mb-[4px] mt-[10px]"
              />
            </div>
          </div>

          {/* Disease Selection */}
          {diseaseList.length > 0 && (
            <div className="mb-8 bg-white p-5">
              <h2 className="font-medium text-[16px] text-black mb-2 flex items-center gap-2">
                <button className="w-6 h-6 flex items-center justify-center border !rounded-full text-white text-sm font-medium">
                  4
                </button>
                Select Category
              </h2>
              <div className="md:flex grid grid-cols-1 md:gap-6 gap-5 mt-5">
                {diseaseList.map((disease) => (
                  <div
                    key={disease}
                    onClick={() => {
                      if (!loading) {
                        setSelectedDisease((prev) =>
                          prev === disease ? null : disease
                        );
                      }
                    }}
                    className={`px-6 py-2 justify-center text-center rounded-[12px] md:my-1 md:w-fit w-full flex cursor-pointer ${
                      selectedDisease === disease
                        ? "bg-[#2463e926] text-black border border-[#2463e9]"
                        : "shadow-md text-black bg-gray-50 border border-[#8080801c]"
                    }`}
                  >
                    <span className="text-[14px] font-medium">{disease}</span>
                  </div>
                ))}
                <img
                  src="/custom.png"
                  alt="custom"
                  onClick={() => !loading && setCustomModal(true)}
                  className="h-[45px] md:mx-0 mx-auto -mb-[4px]  md:mt-0"
                />
              </div>
            </div>
          )}

          {/* Generate Button */}
          <div className="flex items-center w-full">
            {selectedAvatar === null ||
            selectedVideoType === null ||
            selectedLanguage === null ||
            (selectedVideoType !== "Educational Videos" &&
              selectedDisease === null) ? (
              <Tooltip title="Please complete all selections: Avatar, Language, Video Type, and Disease.">
                <button className="flex cursor-pointer items-center gap-3 ml-auto text-white text-[13px] font-bold px-6 py-3 rounded-[8px] shadow hover:opacity-90">
                  {loading ? (
                    <CircularProgress size={22} style={{ color: "white" }} />
                  ) : (
                    "Generate"
                  )}
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
                <button className="flex items-center gap-3 text-white text-[13px] font-bold px-6 py-3 rounded-[8px] shadow hover:opacity-90">
                  {loading ? (
                    <CircularProgress size={22} style={{ color: "white" }} />
                  ) : (
                    "Generate"
                  )}
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
        </div>

        {/* Book a Demo Dialog */}
        <Dialog
          open={open}
          slots={{ transition: Transition }}
          keepMounted
          fullWidth
          onClose={handleClose}
          className="rounded-xl"
        >
          <DialogTitle align="left">{"Book a demo"}</DialogTitle>
          <Divider />
          <DialogContent>
            <HubspotForm id="request_a_demo" />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};
