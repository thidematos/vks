import { createContext, useContext, useState } from "react";

const LoaderContext = createContext();

function LoaderProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  function toggleLoader(state) {
    setIsLoading(state);
  }

  return (
    <LoaderContext.Provider value={{ isLoading, toggleLoader }}>
      {children}
    </LoaderContext.Provider>
  );
}

function useLoader() {
  const data = useContext(LoaderContext);
  return data;
}

export { LoaderProvider, useLoader };
