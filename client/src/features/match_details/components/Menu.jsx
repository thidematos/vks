import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Date from "./Date";
import Game from "./Game";
import Patch from "./Patch";

function Menu() {
  return (
    <div className="col-span-10 flex w-full flex-row items-center justify-around gap-10 pt-6">
      <div className="flex flex-row gap-10">
        <Game />
        <Date />
        <Patch />
      </div>
    </div>
  );
}

export default Menu;
