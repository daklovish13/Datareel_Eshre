"use client";
import { useState } from "react";
import StepLayout from "./StepLayout";
import Image from "next/image";

const videoTypes = [
  {
    id: "report",
    label: "Report Explainer",
    icon: "/report_logo.svg", // Replace with actual icon path
  },
  {
    id: "consultation",
    label: "Initial Consultation",
    icon: "/Initial_Consultation.svg", // Replace with actual icon path
  },
  {
    id: "embryo",
    label: "Embryo Grading Explanation",
    icon: "/embryo.svg", // Replace with actual icon path
  },
];

export default function VideoTypeSelection({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  return (
    <StepLayout
      currentStep={2}
      totalSteps={4}
      onBack={onBack}
      onNext={onNext}
      isNextDisabled={selectedType === null}
    >
      <h2 className="text-[20px] font-bold text-weight-black my-4 text-left">
        Select Video Type
      </h2>

      <div className="flex flex-col gap-3 mt-4">
        {videoTypes.map((type) => (
          <div
            key={type.id}
            onClick={() => setSelectedType((prev) => (prev === type.id ? null : type.id))}
            className={`flex items-center gap-4 p-4 rounded-xl my-1 text-sm cursor-pointer transition-all ${
              selectedType === type.id
                ? "bg-[#855AE921] border-[#855AE9] border"
                : "shadow-md border-t-[#e6e4e6] border-t"
            }`}
          >
            <div className="w-10 h-10 relative">
              <Image
                src={type.icon}
                alt={type.label}
                fill
                className="object-contain"
              />
            </div>
            <span className="font-medium">{type.label}</span>
          </div>
        ))}
      </div>
    </StepLayout>
  );
}
