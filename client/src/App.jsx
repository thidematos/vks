import { BrowserRouter, Route, Routes } from "react-router-dom";
import Start from "./pages/Start";
import Layout from "./pages/Layout";
import { SidebarProvider } from "./context/SidebarProvider";
import { LoaderProvider } from "./context/LoaderProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Test from "./utils/Test";
import DragonStats from "./pages/DragonStats";
import Matchs from "./pages/Matchs";
import Players from "./pages/Players";
import MatchDetails from "./pages/MatchDetails";

import "swiper/css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <LoaderProvider>
        <SidebarProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="new-match" element={<Start />} />
                <Route path="players" element={<Players />} />
                <Route path="/matchs/:matchID" element={<MatchDetails />} />
                <Route path="matchs" element={<Matchs />} />
                <Route path="test-jsonl" element={<Test />} />
                <Route
                  path="match-details/:gameId/dragon-stats"
                  element={<DragonStats />}
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </SidebarProvider>
      </LoaderProvider>
    </QueryClientProvider>
  );
}

export default App;
