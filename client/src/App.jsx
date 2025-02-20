import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewMatch from "./pages/NewMatch";
import Layout from "./pages/Layout";
import { SidebarProvider } from "./context/SidebarProvider";
import { LoaderProvider } from "./context/LoaderProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Test from "./utils/Test";

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
                <Route path="new-match" element={<NewMatch />} />
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
