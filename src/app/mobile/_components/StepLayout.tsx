
import { ReactNode } from "react";
import Image from "next/image";

interface StepLayoutProps {
  currentStep: number;
  totalSteps: number;
  onBack?: () => void;
  onNext?: () => void;
  isNextDisabled?: boolean;
  children: ReactNode;
  isLastStep?: boolean;
}

export default function StepLayout({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  isNextDisabled,
  children,
  isLastStep = false,
}: StepLayoutProps) {
  return (
    <div
      className="flex items-center justify-center h-svh"
      style={{ background: "rgba(240, 242, 255, 1)" }}
    >
      {/* Card container */}
      <div className="w-svw">
        {/* Header section - light purple */}
        <div
          style={{ backgroundColor: "rgba(240, 242, 255, 1)" }}
          className="relative h-svh"
        >
          <div className="absolute top-0 px-2  left-0 right-0">
            <h1 className="text-[24px] mt-1  font-bold  mb-2 text-left">
              Generate Video
            </h1>
            <div className="flex w-full ">
              {/* Stepper Progress UI */}
              <div className="flex items-center justify-between mx-auto px-2 w-fit  ">
                {Array.from({ length: totalSteps }).map((_, index) => (
                  <div key={index} className="flex items-center w-full">
                    {/* Step Circle */}
                    {index < currentStep ? (
                      <div
                        className="w-4 h-4 rounded-full flex items-center justify-center text-xs font-semibold z-10"
                        style={{
                          backgroundColor: "rgba(104, 100, 244, 1)",
                          color: "white",
                        }}
                      >
                        ✓
                      </div>
                    ) : (
                      <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center text-xs font-semibold z-10 bg-custom-light text-white"></div>
                    )}

                    {/* Connector Line (hide after last step) */}
                    {index !== totalSteps - 1 && (
                      <div className="w-20 h-1 bg-custom-light"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="p-4 absolute top-18 right-0  left-0 bottom-0  flex flex-col rounded-t-[30px] border bg-white border-gray-200  justify-between ">
            <div className="">{children}</div>
          </div>
          <div className=" flex w-full justify-between items-center absolute bottom-0 left-0 right-0 p-4 ">
            {onBack && currentStep !== 0 && (
              <button
                onClick={onBack}
                style={{ background: "transparent" }}
                className="!w-[100px] !flex !bg-white !items-center !justify-center !rounded-full !text-[20px] !text-[#3A3A3A] !font-bold !gap-3 hover:underline"
              >
                <span className="text-lg"><Image src="/back-arrow.png"  alt="back_arrow" width={6} height={12} className="w-[6px] h-[12px]" /></span> Back
              </button>
            )}

          <button
            style={{background:"#6864F4"}}
              onClick={onNext}
              disabled={isNextDisabled}
              className={`${
                onBack && isLastStep  ?"w-[200px]":onBack&&currentStep!==0? "w-[125px]" : "w-full"
              } !flex  !items-center !justify-center !gap-2 !px-6 !py-2 !text-[20px] !font-bold !text-medium !rounded-[26px] !bg-[#6864F4] !text-white hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isLastStep? "Generate" : "Next"}
              <span className="text-[24px]"><Image src="/next_arrow.png" alt="next_arrow" width={6} height={12} className="w-[6px] h-[12px] mt-0.5" /></span>
            </button>
          </div>
        </div>

       
      </div>
    </div>
  );
}
