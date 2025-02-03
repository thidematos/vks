import { createContext, useContext, useReducer } from "react";

const MatchDetailsContext = createContext(null);

const initialState = {
  selectedMetric: "level",
  teamOne: {
    id: 100,
    activePlayer: 0,
  },
  teamTwo: {
    id: 200,
    activePlayer: 0,
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
  const [{ teamOne, teamTwo, selectedMetric }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  function changeActivePlayer(teamID, index) {
    dispatch({
      type: "change/activePlayer",
      payload: {
        teamID,
        toBeActivePlayer: index,
      },
    });
  }

  return (
    <MatchDetailsContext.Provider
      value={{ teamOne, teamTwo, changeActivePlayer }}
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
