import { createContext, useCallback, useContext, useReducer } from "react";
import GraphicXP from "../components/graphics/GraphicXP";

const MatchDetailsContext = createContext(null);

const initialState = {
  selectedMetric: "xp",
  metrics: {
    xp: <GraphicXP />,
  },
  teamOne: {
    id: 100,
    activePlayer: null,
  },
  teamTwo: {
    id: 200,
    activePlayer: null,
  },
};

function reducer(state, action) {
  const respectiveTeam = action.payload.teamID === 100 ? "teamOne" : "teamTwo";

  switch (action.type) {
    case "change/activePlayer":
      return {
        ...state,
        [`${respectiveTeam}`]: {
          ...state[respectiveTeam],
          activePlayer: action.payload.toBeActivePlayer,
        },
      };
  }
}

function MatchDetailsProvider({ children }) {
  const [{ teamOne, teamTwo, selectedMetric, metrics }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const changeActivePlayer = useCallback((teamID, puuid) => {
    dispatch({
      type: "change/activePlayer",
      payload: {
        teamID,
        toBeActivePlayer: puuid,
      },
    });
  }, []);

  return (
    <MatchDetailsContext.Provider
      value={{ teamOne, teamTwo, changeActivePlayer, selectedMetric, metrics }}
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
