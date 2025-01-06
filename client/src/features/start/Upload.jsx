import { useJsonUpload } from "../../context/JsonUploadProvider";
import { useStepper } from "../../context/StepperProvider";
import Button from "../../ui/Button";
import DragZone from "../../ui/DragZone";
import Stepper from "../../ui/Stepper";
import Label from "./Label";

function Upload() {
  const { stepper } = useStepper();
  const { analyze } = useJsonUpload();

  console.log(stepper);

  return (
    <div className="relative flex w-full grow flex-col items-center justify-center gap-8">
      <Stepper />

      {!stepper.isComplete && stepper.steps[stepper.currentStep]?.component}

      {stepper.isComplete && <Label text={"All done! Now, just hit analyze"} />}

      <DragZone />

      {stepper.isComplete && <img src="/helmet-logo.png" className="w-[15%]" />}

      {stepper.isComplete && (
        <Button onClick={() => analyze()}>
          <p className="text-xl">Analyze</p>
        </Button>
      )}
    </div>
  );
}

export default Upload;
