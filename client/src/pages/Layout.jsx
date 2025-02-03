import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../ui/Sidebar";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Loader from "../ui/Loader";
import { RemoteProvider } from "../context/RemoteProvider";
import Modal from "../ui/Modal";
import { ModalProvider } from "../context/ModalProvider";
import Players from "./Players";
import { PlayersProvider } from "../context/PlayersProvider";

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") return;
    navigate("new-match");
  }, [navigate, location]);

  return (
    <>
      <RemoteProvider>
        <ModalProvider>
          <PlayersProvider>
            <Sidebar>
              <Sidebar.Header />
              <Sidebar.Content />
            </Sidebar>
            <div className="min-w-screen flex min-h-screen flex-col items-start justify-start bg-slate-200 pl-[50px] font-montserrat text-slate-700">
              <Toaster position="bottom-center" />
              <Outlet />
              <Loader />
            </div>
            <Modal />
          </PlayersProvider>
        </ModalProvider>
      </RemoteProvider>
    </>
  );
}

export default Layout;
