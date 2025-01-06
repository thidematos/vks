import { useEffect, useState } from "react";
import { useStepper } from "../context/StepperProvider";
import Button from "./Button";
import { useJsonUpload } from "../context/JsonUploadProvider";

function Stepper() {
  const { stepper, onNextStep } = useStepper();

  return (
    <div className="absolute bottom-[10%] flex w-[60%] flex-row items-center justify-start">
      {stepper.steps?.map((step, ind) => (
        <StepperLine key={ind} ind={ind} />
      ))}
    </div>
  );
}

function StepperLine({ ind }) {
  const { stepper } = useStepper();

  const { isFulfilled, helper } = stepper.steps[ind];

  const width = 100 / stepper.numSteps;

  return (
    <div
      style={{
        width: `${width}%`,
        height: "5px",
      }}
      className={`relative ${isFulfilled ? "bg-purple-600" : "bg-gray-400"}`}
    >
      <StepperHelper isFulfilled={isFulfilled} helper={helper} />
      <StepperIcon isFulfilled={isFulfilled} />
    </div>
  );
}

function StepperHelper({ isFulfilled, helper }) {
  return (
    <span
      className={`${isFulfilled ? "text-purple-700" : "text-slate-600"} centerX absolute bottom-[200%] font-vks text-sm tracking-wider`}
    >
      {helper}
    </span>
  );
}

function StepperIcon({ isFulfilled }) {
  return (
    <div
      className={`${isFulfilled ? `bg-purple-700` : "bg-gray-400"} absolute -left-2 -top-2 size-[20px] origin-left rounded-full transition-colors`}
    ></div>
  );
}

export default Stepper;
