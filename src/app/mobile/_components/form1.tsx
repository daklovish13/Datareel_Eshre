"use client";

import { useState } from "react";
import Image from "next/image";


import StepLayout from "./StepLayout";

export default function AvatarSelection({ onNext }: { onNext: () => void }) {
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  // const [CurrentStep, setCurrentStep] = useState<number>(0);
  const avatars = ["/avatar1.svg", "/avatar3.svg", "/avatar1.svg"];

  return (
    <StepLayout
      currentStep={0}
      totalSteps={4}
      onNext={onNext}
      isNextDisabled={selectedAvatar === null}
    >
      <h2 className="text-[20px] font-bold mt-4 text-left">Select Avatar</h2>

      <div className="flex flex-col absolute top-12  bottom-16 right-0 left-0 justify-evenly  items-center  ">
       {avatars.map((src, index) => (
  <div
    key={index}
    className={`relative border custom-heightWidth rounded-full ${
      selectedAvatar === index ? "border-[#6864F4]" : "border-gray-100"
    } cursor-pointer transition-all`}
    onClick={() =>
      setSelectedAvatar((prev) => (prev === index ? null : index))
    }
  >
    <Image
      src={src}
      alt={`Avatar ${index}`}
      fill
      className="rounded-full object-cover border h-auto w-auto"
    />
    {selectedAvatar === index && (
      <div className="absolute top-[3px] right-[18px] w-6 h-6 bg-[#6864F4] text-white rounded-full flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
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
    </StepLayout>
  );
}
