import { JsonUploadProvider } from "../context/JsonUploadProvider";
import Label from "../features/start/Label";
import LoadJson from "../features/start/LoadJson";
import UploadedCard from "../features/start/UploadedCard";
import DragZone from "../ui/DragZone";

function Start() {
  return (
    <JsonUploadProvider>
      <main className="markup flex w-full grow flex-col items-center justify-center gap-8">
        <Label />
        <DragZone />
        <UploadedCard />
        <LoadJson />
      </main>
    </JsonUploadProvider>
  );
}

export default Start;
