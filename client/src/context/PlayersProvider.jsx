import { createContext, useCallback, useContext, useReducer } from "react";

const PlayerContext = createContext();

const initialState = {
  query: "",
  unlanedPlayers: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "query/change":
      return {
        ...state,
        query: action.payload,
      };

    case "unlaned/define":
      return {
        ...state,
        unlanedPlayers: action.payload,
      };
  }
}

function PlayersProvider({ children }) {
  const [{ query, unlanedPlayers }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  function changeQuery(input) {
    dispatch({ type: "query/change", payload: input });
  }

  const defineUnlanedPlayers = useCallback(
    (players) => dispatch({ type: "unlaned/define", payload: players }),
    [],
  );

  console.log(unlanedPlayers);

  return (
    <PlayerContext.Provider
      value={{ query, changeQuery, defineUnlanedPlayers, unlanedPlayers }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

function usePlayers() {
  const data = useContext(PlayerContext);

  return data;
}
export { PlayersProvider, usePlayers };
