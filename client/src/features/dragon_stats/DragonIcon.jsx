import { Link } from "react-router-dom";
import { useSidebar } from "../../context/SidebarProvider";

function DragonIcon({ className }) {
  const { isOpen } = useSidebar();

  return (
    <div className={className}>
      <img
        src="/dragon-icon.jpg"
        className={`rounded-full ${isOpen ? "max-w-[60px]" : "w-full"}`}
      />
    </div>
  );
}

function Writing() {
  const { isOpen } = useSidebar();
  if (!isOpen) return null;

  return <div className="font-vks text-xl text-gray-200">Dragon Stats</div>;
}

DragonIcon.Writing = Writing;

export default DragonIcon;
