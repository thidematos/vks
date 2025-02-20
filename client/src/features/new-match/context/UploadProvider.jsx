import { createContext, useContext, useReducer } from "react";
import toast from "react-hot-toast";
import CustomToast from "../../../ui/CustomToast";
import { useCreateMatch } from "../useCreateMatch";

const UploadContext = createContext(null);

const UPLOAD_LIMIT = 5;

const initialState = {
  files: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "files/upload":
      console.log("files upload");
      return {
        ...state,
        files: [...state.files, ...action.payload],
      };

    case "files/delete":
      return {
        ...state,
        files: state.files.filter((file, ind) => ind !== action.payload),
      };
  }
}

function UploadProvider({ children }) {
  const [{ files }, dispatch] = useReducer(reducer, initialState);
  const { createMatch } = useCreateMatch();

  function attachJsonlFiles(toUploadFiles) {
    if (toUploadFiles.length > UPLOAD_LIMIT)
      return toast.custom((t) => (
        <CustomToast t={t} text={"Too many files, bro. Try five at time."} />
      ));

    const toDispatchFiles = [];

    for (let ind = 0; ind < toUploadFiles.length; ind++) {
      const isValidType = toUploadFiles[ind].name.endsWith("jsonl");
      const isValidName = toUploadFiles[ind].name.startsWith("events");

      const errorMsg = !isValidType
        ? `That's not a JSONL file, bro`
        : !isValidName
          ? `That's not an Events file, bro`
          : "";

      if (!isValidType || !isValidName)
        return toast.custom((t) => <CustomToast t={t} text={errorMsg} />);

      toDispatchFiles.push({
        file: toUploadFiles[ind],
        name: toUploadFiles[ind].name,
      });
    }

    //Verifies if is Already Uploaded

    const filteredDispatchFiles = toDispatchFiles.filter((fileData) => {
      let canBeAdded = true;

      files.forEach((file) => {
        if (file.name === fileData.name) canBeAdded = false;
      });

      if (!canBeAdded)
        toast.custom((t) => (
          <CustomToast t={t} text={`${fileData.name} already attached!`} />
        ));

      return canBeAdded;
    });

    dispatch({
      type: `files/upload`,
      payload: filteredDispatchFiles,
    });
  }

  function deleteFile(ind) {
    dispatch({
      type: "files/delete",
      payload: ind,
    });
  }

  function analyze() {
    if (files.length === 0)
      return toast.custom((t) => (
        <CustomToast
          t={t}
          type={"error"}
          text={"There's nothing to analyze, bro"}
        />
      ));

    const form = new FormData();

    for (let ind = 0; ind < files.length; ind++) {
      form.append("jsonl", files[ind].file);
    }

    createMatch(form);
  }

  return (
    <UploadContext.Provider
      value={{
        files,
        attachJsonlFiles,
        deleteFile,
        analyze,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
}

function useUpload() {
  const data = useContext(UploadContext);

  return data;
}

export { UploadProvider, useUpload };
