import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useJsonUpload } from "../../context/JsonUploadProvider";
import Card from "../../ui/Card";
import {
  faFileImport,
  faFileLines,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

function UploadedCard() {
  const { json, deleteJson } = useJsonUpload();

  if (!json) return null;

  return (
    <Card>
      <div className="flex flex-row items-center gap-4 text-slate-700">
        <FontAwesomeIcon icon={faFileLines} className="" />
        <p className="cursor-default text-xs">{json.name}</p>
        <FontAwesomeIcon
          icon={faTrash}
          className="cursor-pointer text-red-700 shadow-xl"
          onClick={deleteJson}
        />
      </div>
    </Card>
  );
}

export default UploadedCard;
