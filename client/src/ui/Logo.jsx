import { useState } from "react";
import { useSidebar } from "../context/SidebarProvider";

function Logo() {
  const { isOpen } = useSidebar();

  return (
    <img
      className={`${isOpen ? "" : "rounded border border-purple-600 p-1 shadow-lg"} max-h-[60%] duration-200`}
      src="/helmet-logo.png"
    />
  );
}

function Writing({ className }) {
  return <img src="/writing-logo.png" className={`max-h-[60%] ${className}`} />;
}

Logo.Writing = Writing;

export default Logo;
