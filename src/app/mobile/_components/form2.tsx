"use client";
import { useState } from "react";
import StepLayout from "./StepLayout";

const languages = [
  { code: "en", label: "English" },
  { code: "fr", label: "French" },
  { code: "bn", label: "Bengali" },
];

export default function LanguageSelection({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  const [selectedLang, setSelectedLang] = useState<string | null>(null);

  return (
    <StepLayout
      currentStep={1}
      totalSteps={4}
      onBack={onBack}
      onNext={onNext}
      isNextDisabled={!selectedLang}
    >
      <h2 className="text-[20px]  text-black my-4 font-bold text-left">Select Language</h2>
      <div className="flex flex-col gap-3 mt-8">
        {languages.map((lang) => (
          <div
            key={lang.code}
           onClick={() =>
  setSelectedLang((prev) => (prev === lang.code ? null : lang.code))
}

            className={`flex items-center gap-3 p-3 rounded-lg my-0.5 text-sm cursor-pointer ${
              selectedLang === lang.code
                ? "bg-[#855AE921] border-[#855AE9] border"
                : "shadow-md border-t-[#e6e4e6] border-t"
            }`}
          >
            <div className="w-8 h-8 rounded-[8px] bg-[#855AE9] flex items-center justify-center text-[14px] font-bold text-white ">
              {lang.code}
            </div>
            <span>{lang.label}</span>
          </div>
        ))}
      </div>
    </StepLayout>
  );
}
