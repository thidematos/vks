import { useJsonUpload } from "../context/JsonUploadProvider";

function DragZone() {
  const { uploadJson, json } = useJsonUpload();

  function allowDropzone(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  if (json) return null;

  return (
    <label
      htmlFor="input_json"
      className="flex h-[200px] w-[350px] cursor-pointer flex-col items-center justify-center rounded border border-dashed border-violet-700 bg-purple-200/50 shadow-xl"
      onDragEnter={allowDropzone}
      onDragOver={allowDropzone}
      onDrop={(e) => {
        allowDropzone(e);

        uploadJson(e.dataTransfer.files[0]);
      }}
    >
      <p className="font-montserrat text-xs text-slate-500 underline underline-offset-1">
        Drop or click to select a JSON
      </p>
      <input
        type="file"
        id="input_json"
        className="hidden"
        onChange={(e) => {
          uploadJson(e.target.files[0]);
        }}
      />
    </label>
  );
}

export default DragZone;
