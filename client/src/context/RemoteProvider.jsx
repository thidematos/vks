import { createContext, useContext, useState } from "react";

const RemoteContext = createContext(null);

function RemoteProvider({ children }) {
  const [data, setData] = useState(null);

  function setRemoteState(remoteData) {
    setData(remoteData);

    localStorage.setItem("remote-data", JSON.stringify(remoteData));
  }

  function getRemoteState() {
    const data = localStorage.getItem("remote-data");

    return data;
  }

  console.log(data);

  return (
    <RemoteContext.Provider value={{ data, setRemoteState, getRemoteState }}>
      {children}
    </RemoteContext.Provider>
  );
}

function useRemote() {
  const data = useContext(RemoteContext);
  return data;
}

export { RemoteProvider, useRemote };
