import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import toast from "react-hot-toast";
import CustomToast from "../ui/CustomToast";
import { useLoader } from "./LoaderProvider";
import { usePostMatch } from "../features/start/usePostMatch";

const JsonUploadContext = createContext(null);

const initialState = {
  json: null,
  sqlMatch: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "json/upload":
      return {
        ...state,
        json: action.payload,
      };

    case "json/delete":
      return {
        ...state,
        json: null,
      };
  }
}

function JsonUploadProvider({ children }) {
  const { toggleLoader } = useLoader();
  const [{ json }, dispatch] = useReducer(reducer, initialState);
  const { createMatch, isCreatingMatch } = usePostMatch();

  useEffect(() => {
    if (isCreatingMatch) toggleLoader(true);
    else toggleLoader(false);
  }, [isCreatingMatch, toggleLoader]);

  function uploadJson(json) {
    if (!json.type.includes("json"))
      return toast.custom((t) => (
        <CustomToast t={t} text={"That's not a JSON file, bro"} />
      ));

    dispatch({
      type: "json/upload",
      payload: json,
    });
  }

  function deleteJson() {
    dispatch({
      type: "json/delete",
    });
  }

  async function analyze() {
    if (!json)
      return toast.custom((t) => (
        <CustomToast
          t={t}
          type={"error"}
          text={"There's nothing to analyze, bro"}
        />
      ));
    const blob = new Blob([json]);

    const stringData = await blob.text(json);

    createMatch(stringData);
  }

  return (
    <JsonUploadContext.Provider
      value={{ json, uploadJson, deleteJson, analyze }}
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
