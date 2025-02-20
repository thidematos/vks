import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Card from "../../ui/Card";
import {
  faFileImport,
  faFileLines,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useUpload } from "./context/UploadProvider";

function UploadedCard({ file, index }) {
  const { deleteFile } = useUpload();

  return (
    <Card>
      <div className="flex flex-row items-center gap-4 text-slate-700">
        <FontAwesomeIcon icon={faFileLines} className="" />
        <p className="cursor-default text-xs">{file.name}</p>
        <FontAwesomeIcon
          icon={faTrash}
          className="cursor-pointer text-red-700 shadow-xl"
          onClick={() => deleteFile(index)}
        />
      </div>
    </Card>
  );
}

export default UploadedCard;
