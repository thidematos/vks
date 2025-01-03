import { createContext, useContext, useReducer } from "react";

const SidebarContext = createContext(null);

const initialState = {
  isOpen: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "toggle/sidebar":
      return {
        ...state,
        isOpen: !state.isOpen,
      };
  }
}

function SidebarProvider({ children }) {
  const [{ isOpen }, dispatch] = useReducer(reducer, initialState);

  function toggleSidebar() {
    dispatch({
      type: "toggle/sidebar",
    });
  }

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

function useSidebar() {
  const data = useContext(SidebarContext);

  if (!data) return console.error("Wrong use of Context!");

  return data;
}

export { SidebarProvider, useSidebar };
