import { JsonUploadProvider } from "../context/JsonUploadProvider";
import Label from "../features/start/Label";
import LoadJson from "../features/start/LoadJson";
import Stepper from "../ui/Stepper";
import UploadedCard from "../features/start/UploadedCard";
import DragZone from "../ui/DragZone";
import { StepperProvider } from "../context/StepperProvider";
import Upload from "../features/start/Upload";
import UploadsList from "../features/start/UploadsList";

function Start() {
  return (
    <StepperProvider>
      <JsonUploadProvider>
        <main className="flex w-full grow flex-row justify-center">
          <Upload />

          <UploadsList />
        </main>
      </JsonUploadProvider>
    </StepperProvider>
  );
}

export default Start;
