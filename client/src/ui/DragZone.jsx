import { useRef } from "react";
import { useJsonUpload } from "../context/JsonUploadProvider";
import { useStepper } from "../context/StepperProvider";

function DragZone() {
  const { uploadJson } = useJsonUpload();
  const { stepper } = useStepper();

  function allowDropzone(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  const inputRef = useRef(null);

  const currentStep = stepper.steps[stepper.currentStep];

  if (stepper.isComplete) return null;

  return (
    <label
      htmlFor="input_json"
      className="flex h-[200px] w-[350px] cursor-pointer flex-col items-center justify-center rounded border border-dashed border-violet-700 bg-purple-200/50 shadow-xl"
      onDragEnter={allowDropzone}
      onDragOver={allowDropzone}
      onDrop={(e) => {
        allowDropzone(e);

        uploadJson(e.dataTransfer.files[0], currentStep?.id);
        inputRef.current.value = null;
      }}
    >
      <p className="font-montserrat text-xs text-slate-500 underline underline-offset-1">
        Drop or click to select a {currentStep?.id.toUpperCase()}
      </p>
      <input
        ref={inputRef}
        type="file"
        id="input_json"
        className="hidden"
        onChange={(e) => {
          uploadJson(e.target.files[0], currentStep?.id);
          inputRef.current.value = null;
        }}
      />
    </label>
  );
}

export default DragZone;
