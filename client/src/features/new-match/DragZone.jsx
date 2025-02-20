import { useRef } from "react";
import { useUpload } from "./context/UploadProvider";

function DragZone() {
  const { attachJsonlFiles } = useUpload();

  function allowDropzone(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  const inputRef = useRef(null);

  return (
    <label
      htmlFor="input_json"
      className="flex h-[200px] w-[350px] cursor-pointer flex-col items-center justify-center rounded border border-dashed border-violet-700 bg-purple-200/50 shadow-xl"
      onDragEnter={allowDropzone}
      onDragOver={allowDropzone}
      onDrop={(e) => {
        allowDropzone(e);
        console.log(e.dataTransfer.files);
        attachJsonlFiles(e.dataTransfer.files);
        inputRef.current.value = null;
      }}
    >
      <p className="font-montserrat text-xs text-slate-500 underline underline-offset-1">
        Drop or click to select a JSONL file
      </p>
      <input
        ref={inputRef}
        type="file"
        multiple={true}
        id="input_json"
        className="hidden"
        onChange={(e) => {
          console.log(e.target.files);
          attachJsonlFiles(e.target.files);
          inputRef.current.value = null;
        }}
      />
    </label>
  );
}

export default DragZone;
