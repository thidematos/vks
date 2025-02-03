import { Link, useParams } from "react-router-dom";
import { useSidebar } from "../context/SidebarProvider";

import Logo from "./Logo";

function Sidebar({ children }) {
  const { isOpen, toggleSidebar } = useSidebar();

  const openSidebar = "bg-purple-700 w-auto w-[200px] px-4";

  const closedSidebar = "w-[50px] px-2 bg-purple-50";

  return (
    <aside
      className={`fixed z-[100] flex h-full origin-left flex-col items-center justify-start gap-5 rounded-r border-y border-r border-violet-300 py-2 shadow-xl transition-colors duration-500 ${isOpen ? openSidebar : closedSidebar}`}
    >
      {children}
    </aside>
  );
}

function Header() {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <div
      className={`flex h-[100px] flex-row items-center justify-start ${isOpen && "gap-1"} cursor-pointer`}
      onClick={() => toggleSidebar()}
    >
      <Logo />

      <Logo.Writing
        className={`origin-left transition-transform ${isOpen ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}`}
      />
    </div>
  );
}

function SidebarIcon({ to, img, writing }) {
  const { isOpen } = useSidebar();

  return (
    <Link
      to={to}
      className={`flex w-full flex-row items-center justify-start ${isOpen && "gap-3"}`}
    >
      <div className={"rounded-full border border-purple-600"}>
        <img
          src={`/${img}`}
          className={`rounded-full ${isOpen ? "max-w-[60px]" : "w-full"}`}
        />
      </div>
      {isOpen && (
        <p className="text-center font-vks text-xl text-gray-200">{writing}</p>
      )}
    </Link>
  );
}

function Content() {
  return (
    <div className="flex h-[80%] flex-col items-center justify-start gap-6">
      <SidebarIcon to={"/"} writing={"Dragons"} img={"dragon-icon.jpg"} />

      <SidebarIcon
        to={"/matchs"}
        writing={"All Matchs"}
        img={"matchs-icon.png"}
      />

      <SidebarIcon
        to={"/players"}
        writing={"Players"}
        img={"players-icon.png"}
      />
    </div>
  );
}

Sidebar.Header = Header;
Sidebar.Content = Content;

export default Sidebar;
