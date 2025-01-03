import {
  faThumbsUp,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast";

function CustomToast({ t, text, type }) {
  return (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } pointer-events-auto flex w-full max-w-md rounded-lg bg-white font-montserrat shadow-lg ring-1 ring-black ring-opacity-5`}
    >
      <div className="w-0 flex-1 p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0 pt-0.5">
            <img className="h-10 w-10 rounded-full" src="/sexo.png" alt="" />
          </div>
          <div className="ml-3 flex flex-1 flex-row items-center justify-start gap-2">
            <FontAwesomeIcon
              icon={type === "success" ? faThumbsUp : faTriangleExclamation}
              className={`${type === "success" ? "text-purple-800" : "text-red-700"} text-2xl`}
            />

            <p className="mt-1 text-xs font-bold text-slate-700">{text}</p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={() => {
            toast.dismiss(t.id);
          }}
          className="flex w-full items-center justify-center rounded-none rounded-r-lg border border-transparent p-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default CustomToast;
