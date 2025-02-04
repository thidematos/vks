import { createContext, useCallback, useContext, useState } from "react";

const UIContext = createContext(null);

function UIProvider({ children }) {
  const [isGraphicsExpanded, setIsGraphicsExpanded] = useState(false);

  const toggleExpandedGraphic = useCallback(
    () => setIsGraphicsExpanded((state) => !state),
    [],
  );

  return (
    <UIContext.Provider value={{ isGraphicsExpanded, toggleExpandedGraphic }}>
      {children}
    </UIContext.Provider>
  );
}

function useUI() {
  const data = useContext(UIContext);

  return data;
}

export { UIProvider, useUI };
