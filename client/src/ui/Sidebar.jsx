import { useSidebar } from "../context/SidebarProvider";
import Logo from "./Logo";

function Sidebar() {
  const { isOpen, toggleSidebar } = useSidebar();

  const openSidebar = "bg-purple-700 w-auto w-[200px] px-4";

  const closedSidebar = "w-[50px] px-2 bg-purple-50";

  return (
    <aside
      className={`fixed z-[100] h-full origin-left rounded-r border-y border-r border-violet-300 py-2 shadow-xl transition-colors duration-500 ${isOpen ? openSidebar : closedSidebar}`}
    >
      <div
        className={`flex h-[100px] flex-row items-center justify-start ${isOpen && "gap-1"} cursor-pointer`}
        onClick={() => toggleSidebar()}
      >
        <Logo />

        <Logo.Writing
          className={`origin-left transition-transform ${isOpen ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}`}
        />
      </div>
    </aside>
  );
}

export default Sidebar;
