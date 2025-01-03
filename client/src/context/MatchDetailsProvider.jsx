import { createContext, useCallback, useContext, useReducer } from "react";

const MatchDetailsContext = createContext(null);

const initialState = {
  slider: {
    framesLength: 0,
    actualRange: 0,
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "timestamp/change":
      return {
        ...state,
        slider: {
          ...state.slider,
          actualRange: action.payload.actualRange,
        },
      };

    case "timestamp/set":
      return {
        ...state,
        slider: {
          ...state.slider,
          framesLength: action.payload,
        },
      };
  }
}

function MatchDetailsProvider({ children }) {
  const [{ slider }, dispatch] = useReducer(reducer, initialState);

  function changeTimestamp({ actualRange }) {
    dispatch({
      type: "timestamp/change",
      payload: {
        actualRange,
      },
    });
  }

  const setTimestampRange = useCallback((length) => {
    dispatch({
      type: "timestamp/set",
      payload: length,
    });
  }, []);

  return (
    <MatchDetailsContext.Provider
      value={{ slider, changeTimestamp, setTimestampRange }}
    >
      {children}
    </MatchDetailsContext.Provider>
  );
}

function useMatchDetails() {
  const data = useContext(MatchDetailsContext);
  return data;
}

export { MatchDetailsProvider, useMatchDetails };
