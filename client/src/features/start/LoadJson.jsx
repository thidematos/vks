import { useJsonUpload } from "../../context/JsonUploadProvider";
import Button from "../../ui/Button";

function LoadJson() {
  const { json, analyze } = useJsonUpload();

  if (!json) return null;

  return (
    <Button onClick={() => analyze()}>
      <p className="text-2xl uppercase tracking-wider drop-shadow">Analyze</p>
    </Button>
  );
}

export default LoadJson;
