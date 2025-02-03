import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Date from "./Date";
import Game from "./Game";
import Patch from "./Patch";

function Menu() {
  return (
    <div className="markup col-span-10 flex w-full flex-row justify-around gap-10 pb-4 pt-10">
      <div className="flex flex-row items-center">
        <p>METRICS: </p>
        <button className="flex flex-col items-center justify-center rounded-full bg-purple-700 p-2 text-slate-50 shadow-xl">
          <span>XP</span>
        </button>
      </div>
      <div className="flex flex-row gap-10">
        <Game />
        <Date />
        <Patch />
      </div>
    </div>
  );
}

export default Menu;
