import Button from "../../ui/Button";
import DragZone from "./DragZone";
import Title from "../../ui/Title";
import { useUpload } from "./context/UploadProvider";

function Upload() {
  const { files, analyze } = useUpload();

  console.log(files);

  return (
    <div className="relative flex w-full grow flex-col items-center justify-center gap-8">
      <Title>{"Start adding a match's events JSONL file"} </Title>

      {files.length === 5 ? (
        <img src="/helmet-logo.png" className="w-[15%]" />
      ) : (
        <DragZone />
      )}

      {files.length > 0 && (
        <Button onClick={() => analyze()}>
          <p className="text-xl">Analyze</p>
        </Button>
      )}
    </div>
  );
}

export default Upload;
