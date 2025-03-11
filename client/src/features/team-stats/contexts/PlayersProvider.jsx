import { createContext, useCallback, useContext, useReducer } from "react";
import toast from "react-hot-toast";
import CustomToast from "../../../ui/CustomToast";
import { add } from "date-fns";

const SelectedPlayerContext = createContext();

const nullLanes = {
  top: null,
  jungle: null,
  mid: null,
  adc: null,
  supp: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "set/selectedBuffer":
      return {
        ...state,
        selectedBuffer: {
          ...state.selectedBuffer,
          ...action.payload,
        },
      };

    case "unset/selectedBuffer":
      return {
        ...state,
        selectedBuffer: {
          ...state.selectedBuffer,
          ...action.payload,
        },
      };

    case "save/selectedBuffer":
      return {
        ...state,
        selectedPlayers: state.selectedBuffer,
        selectedBuffer: nullLanes,
      };
  }
}

function SelectedPlayersProvider({ children }) {
  const getPlayersInitialState = useCallback(() => {
    const cookies = document.cookie;

    if (cookies.length === 0) return nullLanes;

    const splittedCookies = cookies.split(";").map((cookie) => cookie.trim());

    console.log(splittedCookies);

    const lanes = ["top", "jungle", "mid", "adc", "supp"];

    const selectedPlayers = {};

    lanes.forEach((lane) => {
      selectedPlayers[lane] = splittedCookies
        .find((cookie) => cookie.startsWith(lane))
        .split("=")
        .at(1);
    });

    return selectedPlayers;
  }, []);

  const [players, dispatch] = useReducer(reducer, {
    selectedPlayers: getPlayersInitialState(),
    selectedBuffer: nullLanes,
  });

  const selectLanePlayer = (player) => {
    dispatch({
      type: "set/selectedBuffer",
      payload: player,
    });
  };

  const unselectLanePlayer = (lane) => {
    dispatch({
      type: "unset/selectedBuffer",
      payload: lane,
    });
  };

  const saveSelectedPlayers = () => {
    const sevenMonthsAhead = add(new Date(), { months: 7 });
    const lanes = ["top", "jungle", "mid", "adc", "supp"];

    lanes.forEach((lane) => {
      document.cookie = `${lane}=${players.selectedBuffer[lane]}; expires=${sevenMonthsAhead}`;
    });

    dispatch({
      type: "save/selectedBuffer",
    });
    toast.custom((t) => (
      <CustomToast type={"success"} t={t} text={"Reference saved!"} />
    ));
  };

  return (
    <SelectedPlayerContext.Provider
      value={{
        players,
        selectLanePlayer,
        unselectLanePlayer,
        saveSelectedPlayers,
      }}
    >
      {children}
    </SelectedPlayerContext.Provider>
  );
}

function useSelectedPlayers() {
  const data = useContext(SelectedPlayerContext);

  return data;
}

export { SelectedPlayersProvider, useSelectedPlayers };
