"use client";
import { useState } from "react";
import AvatarSelection from "@/app/mobile/_components/form1";
import LanguageSelection from "@/app/mobile/_components/form2";
import VideoTypeSelection from "@/app/mobile/_components/form3";
import DiseaseSelection from "@/app/mobile/_components/form4";


export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => setCurrentStep((step) => step + 1);
  const handleBack = () => setCurrentStep((step) => step - 1);

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <AvatarSelection onNext={handleNext} />;
      case 1:
        return <LanguageSelection onNext={handleNext} onBack={handleBack} />;
      case 2:
        return <VideoTypeSelection onNext={handleNext} onBack={handleBack} />;
       case 3:
         return <DiseaseSelection onNext={handleNext} onBack={handleBack} />;
      default:
        return null;
    }
  };

  return <div>{renderStep()}</div>;
}
