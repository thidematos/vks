import { useSidebar } from "../../context/SidebarProvider";

function MatchIcon({ className }) {
  const { isOpen } = useSidebar();

  return (
    <div className={className}>
      <img
        src="/matchs-icon.png"
        className={`rounded-full ${isOpen ? "max-w-[60px]" : "w-full"}`}
      />
    </div>
  );
}

function Writing() {
  const { isOpen } = useSidebar();
  if (!isOpen) return null;

  return (
    <p className="text-center font-vks text-xl text-gray-200">All Matchs</p>
  );
}

MatchIcon.Writing = Writing;

export default MatchIcon;
