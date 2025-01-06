import { createContext, useContext, useState } from "react";

const RemoteContext = createContext(null);

function RemoteProvider({ children }) {
  const [data, setData] = useState(null);

  function setRemoteState(remoteData) {
    setData(remoteData);

    localStorage.setItem("remote-data", JSON.stringify(remoteData));
  }

  console.log(data);

  return (
    <RemoteContext.Provider value={{ data, setRemoteState }}>
      {children}
    </RemoteContext.Provider>
  );
}

function useRemote() {
  const data = useContext(RemoteContext);
  return data;
}

export { RemoteProvider, useRemote };
