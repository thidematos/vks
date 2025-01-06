import { Link, useParams } from "react-router-dom";
import { useSidebar } from "../context/SidebarProvider";
import DragonIcon from "../features/dragon_stats/DragonIcon";
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

function Content() {
  const { isOpen } = useSidebar();
  const { gameId } = useParams();

  return (
    <div className="flex h-[80%] flex-col items-center justify-start">
      <Link
        to={`/match-details/${gameId}/dragon-stats`}
        className={`flex flex-row items-center justify-start ${isOpen && "gap-2"}`}
      >
        <DragonIcon className={`rounded-full border border-purple-600`} />
        <DragonIcon.Writing />
      </Link>
    </div>
  );
}

Sidebar.Header = Header;
Sidebar.Content = Content;

export default Sidebar;
