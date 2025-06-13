"use client";
import * as React from "react";

import MultiStepForm from "@/app/mobile/_components/multiform"


const steps = [
  "Select campaign settings",
  "Create an ad group",
  "Create an ad",
];

export default function HorizontalLinearStepper() {
  return (
    <MultiStepForm/>

   
  );
}
