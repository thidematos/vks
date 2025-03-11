import { createContext, useContext, useState } from "react";

const MatchsQueryContext = createContext();

function MatchsQueryProvider({ children }) {
  const [query, setQuery] = useState("");

  return (
    <MatchsQueryContext.Provider value={{ query, setQuery }}>
      {children}
    </MatchsQueryContext.Provider>
  );
}

function useMatchsQuery() {
  const data = useContext(MatchsQueryContext);

  return data;
}

export { MatchsQueryProvider, useMatchsQuery };
