import { createContext, useContext, useEffect, useReducer } from "react";
import toast from "react-hot-toast";
import CustomToast from "../ui/CustomToast";
import { useLoader } from "./LoaderProvider";
import { usePostMatch } from "../features/start/usePostMatch";
import { useStepper } from "./StepperProvider";

const JsonUploadContext = createContext(null);

const initialState = {
  json: null,
  jsonl: null,
  sqlMatch: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "json/upload":
      console.log("json upload");
      return {
        ...state,
        json: action.payload,
      };

    case "jsonl/upload":
      console.log("jsonl upload");
      return {
        ...state,
        jsonl: action.payload,
      };

    case "json/delete":
      return {
        ...state,
        json: null,
      };

    case "jsonl/delete":
      return {
        ...state,
        jsonl: null,
      };
  }
}

function JsonUploadProvider({ children }) {
  const { toggleLoader } = useLoader();
  const [{ json, jsonl }, dispatch] = useReducer(reducer, initialState);
  const { createMatch, isCreatingMatch } = usePostMatch();
  const { onNextStep, onPrevStep, stepsNotComplete } = useStepper();

  useEffect(() => {
    if (isCreatingMatch) toggleLoader(true);
    else toggleLoader(false);
  }, [isCreatingMatch, toggleLoader]);

  function uploadJson(file, type) {
    const isValidType = file.name.endsWith(type);
    const isValidName = file.name.startsWith(
      type === "jsonl" ? "events" : "end_state",
    );

    const errorMsg = !isValidType
      ? `That's not a ${type.toUpperCase()} file, bro`
      : !isValidName
        ? `That's not an Events file, bro`
        : "";

    if (!isValidType || !isValidName)
      return toast.custom((t) => <CustomToast t={t} text={errorMsg} />);

    dispatch({
      type: `${type}/upload`,
      payload: file,
    });

    onNextStep();
  }

  function deleteJson() {
    dispatch({
      type: "json/delete",
    });
    onPrevStep();
    stepsNotComplete();
  }

  function deleteJsonl() {
    dispatch({
      type: "jsonl/delete",
    });
    onPrevStep();
    stepsNotComplete();
  }

  async function analyze() {
    if (!json || !jsonl)
      return toast.custom((t) => (
        <CustomToast
          t={t}
          type={"error"}
          text={"There's nothing to analyze, bro"}
        />
      ));

    const blobJson = new Blob([json]);

    const blobJsonl = new Blob([jsonl]);

    const stringJson = await blobJson.text(json);
    const stringJsonl = await blobJsonl.text(jsonl);

    createMatch({ stringJson, stringJsonl });
  }

  return (
    <JsonUploadContext.Provider
      value={{ json, jsonl, uploadJson, deleteJson, deleteJsonl, analyze }}
    >
      {children}
    </JsonUploadContext.Provider>
  );
}

function useJsonUpload() {
  const data = useContext(JsonUploadContext);

  return data;
}

export { JsonUploadProvider, useJsonUpload };
