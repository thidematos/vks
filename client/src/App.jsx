import { BrowserRouter, Route, Routes } from "react-router-dom";
import Start from "./pages/Start";
import Layout from "./pages/Layout";
import { SidebarProvider } from "./context/SidebarProvider";
import { LoaderProvider } from "./context/LoaderProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import MatchDetails from "./pages/MatchDetails";
import Test from "./utils/Test";
import Button from "./ui/Button";
import DragonStats from "./pages/DragonStats";
import New from "./features/match_details/New";
import Map from "./features/match_details/Map";
import Matchs from "./pages/Matchs";

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
                <Route path="matchs" element={<Matchs />} />
                <Route path="map" element={<Map />} />
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
