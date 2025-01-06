import { useState } from "react";
import Title from "./../../ui/Title";
import { useJsonUpload } from "../../context/JsonUploadProvider";
import UploadedCard from "./UploadedCard";

function UploadsList() {
  const { json, jsonl } = useJsonUpload();

  return (
    <div
      className={`flex w-[450px] flex-col items-center justify-start gap-6 border-l-2 border-purple-700 px-10 py-16 duration-300`}
    >
      <Title text={"Upload List"} variation="secondary" />
      {jsonl && <UploadedCard type={"jsonl"} />}
      {json && <UploadedCard type={"json"} />}
    </div>
  );
}

export default UploadsList;
