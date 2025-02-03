import { cloneElement, useState } from "react";

function Button({ width, children, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={`${isHovered ? "border-violet-400 bg-purple-500 text-slate-200" : "bg-purple-600 text-slate-100"} ${width ? width : "w-auto"} rounded border px-4 py-2 font-vks shadow-lg`}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      onClick={() => onClick()}
    >
      {cloneElement(children, {
        className: `${children.props.className} ${isHovered && "scale-110"}`,
      })}
    </button>
  );
}

export default Button;
