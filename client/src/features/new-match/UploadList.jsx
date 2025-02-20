import { useState } from "react";
import Title from "../../ui/Title";
import UploadedCard from "./UploadedCard";
import { useUpload } from "./context/UploadProvider";

function UploadList() {
  const { files } = useUpload();

  return (
    <div
      className={`flex w-[450px] flex-col items-center justify-start gap-6 border-l-2 border-purple-700 px-10 py-16 duration-300`}
    >
      <Title variation="secondary">Upload List</Title>
      {files.map((file, ind) => (
        <UploadedCard key={file.name} file={file} index={ind} />
      ))}
    </div>
  );
}

export default UploadList;
