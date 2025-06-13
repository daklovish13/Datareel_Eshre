"use client";
import { useState } from "react";
import StepLayout from "./StepLayout";

const diseases = [
  "Endometriosis",
  "Tubal Block",
  "Adenomyosis",
  "Polycystic Ovary Syndrome",
  "Hydrosalpinx",
  "PID",
  "Ovarian Cysts",
];

export default function DiseaseSelection({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  const [selectedDisease, setSelectedDisease] = useState<string | null>(null);

  return (
    <StepLayout
      currentStep={3}
      totalSteps={4}
      onBack={onBack}
      isLastStep={true}
      onNext={onNext}
      isNextDisabled={!selectedDisease}
    >
      <h2 className="text-[20px] font-bold text-black mb-4 mt-4 text-left">
        Select Disease
      </h2>

      <div className="flex flex-wrap gap-3 mt-6">
        {diseases.map((disease) => (
          <div
            key={disease}
          onClick={() =>
  setSelectedDisease((prev) => (prev === disease ? null : disease))
}

            className={`px-4 py-2 rounded-[12px]  my-1 font-medium transition-color !text-gray-700 duration-200 ${
              selectedDisease === disease
                 ? "bg-[#855AE921] border-[#855AE9] border"
                : "shadow-md border-t-[#e6e4e6] border-t"
            }`}
          >
            {disease}
          </div>
        ))}
      </div>
    </StepLayout>
  );
}
