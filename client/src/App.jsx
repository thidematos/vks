import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewMatch from "./pages/NewMatch";
import Layout from "./pages/Layout";
import { SidebarProvider } from "./context/SidebarProvider";
import { LoaderProvider } from "./context/LoaderProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Test from "./utils/Test";

import "swiper/css";
import Matchs from "./pages/Matchs";
import TeamStats from "./pages/TeamStats";

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
                <Route path="new-match" element={<NewMatch />} />
                <Route path="matchs" element={<Matchs />} />
                <Route path="team-stats" element={<TeamStats />}>
                  <Route path="data" element={<p>Eu sou a data</p>} />
                  <Route
                    path="objectives"
                    element={<p>Eu sou a objectives</p>}
                  />
                  <Route
                    path="comparatives"
                    element={<p>Eu sou a comparatives</p>}
                  />
                  <Route path="winrate" element={<p>Eu sou a winrate</p>} />
                </Route>
                <Route path="test-jsonl" element={<Test />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </SidebarProvider>
      </LoaderProvider>
    </QueryClientProvider>
  );
}

export default App;
