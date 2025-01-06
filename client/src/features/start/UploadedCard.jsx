import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useJsonUpload } from "../../context/JsonUploadProvider";
import Card from "../../ui/Card";
import {
  faFileImport,
  faFileLines,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

function UploadedCard({ type }) {
  const { json, jsonl, deleteJson, deleteJsonl } = useJsonUpload();

  const files = {
    json: json,
    jsonl: jsonl,
  };

  return (
    <Card>
      <div className="flex flex-row items-center gap-4 text-slate-700">
        <FontAwesomeIcon icon={faFileLines} className="" />
        <p className="cursor-default text-xs">{files[type]?.name}</p>
        <FontAwesomeIcon
          icon={faTrash}
          className="cursor-pointer text-red-700 shadow-xl"
          onClick={type === "jsonl" ? deleteJsonl : deleteJson}
        />
      </div>
    </Card>
  );
}

export default UploadedCard;
