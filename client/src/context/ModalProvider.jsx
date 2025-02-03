import { act, createContext, useCallback, useContext, useReducer } from "react";

const ModalContext = createContext(null);

const initialState = {
  isOpen: false,
  component: null,
  canClosee: true,
};

function reducer(state, action) {
  switch (action.type) {
    case "status/open":
      return {
        ...state,
        isOpen: true,
        component: action.payload.component,
        canClose: action.payload.canClose,
      };

    case "status/close":
      return {
        ...state,
        isOpen: false,
        component: null,
        canClose: true,
      };
  }
}

function ModalProvider({ children }) {
  const [{ isOpen, component, canClose }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const openModal = useCallback(
    ({ component, canClose }) =>
      dispatch({ type: "status/open", payload: { canClose, component } }),
    [],
  );

  const closeModal = useCallback(() => {
    dispatch({
      type: "status/close",
    });
  }, []);

  return (
    <ModalContext.Provider
      value={{ isOpen, component, openModal, closeModal, canClose }}
    >
      {children}
    </ModalContext.Provider>
  );
}

function useModal() {
  const data = useContext(ModalContext);

  return data;
}

export { ModalProvider, useModal };
