import { useJsonUpload } from "../../context/JsonUploadProvider";

function Label() {
  const { json } = useJsonUpload();

  return (
    <h2 className="font-vks text-2xl font-bold tracking-widest text-purple-700 drop-shadow-sm">
      {json ? "Is that the right file? " : "Start adding a match's json!"}
    </h2>
  );
}

export default Label;
