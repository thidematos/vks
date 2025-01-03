import { BrowserRouter, Route, Routes } from "react-router-dom";
import Start from "./pages/Start";
import Layout from "./pages/Layout";
import { SidebarProvider } from "./context/SidebarProvider";
import { LoaderProvider } from "./context/LoaderProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import MatchDetails from "./pages/MatchDetails";
import Test from "./utils/Test";

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
                <Route path="matchs" element={<Test />} />
                <Route
                  path="match-details/:gameId/:puuid"
                  element={<MatchDetails />}
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
