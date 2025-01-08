import { useEffect, useState } from "react";
import { useRemote } from "../../context/RemoteProvider";
import Button from "./../../ui/Button";

function Map() {
  const { getRemoteState } = useRemote();

  const [counter, setCounter] = useState(0);

  const data = getRemoteState();

  const parsed = JSON.parse(data);

  //const position = parsed?.canyonPathing[counter];
  const position = {
    x: 2500,
    z: 8000,
  };

  console.log(position);

  function setMoving() {
    const id = setInterval(() => {
      if (counter <= parsed.canyonPathing.length) {
        setCounter((state) => state + 1);
      } else clearInterval(id);
    }, 100);
  }

  return (
    <>
      <div className="relative size-[500px] rounded border-2 border-purple-600 shadow">
        <div
          style={{
            bottom: `${position?.z / 33}px`,
            left: `${position?.x / 33}px`,
          }}
          className="absolute size-[15px] rounded-full bg-purple-700 shadow-lg transition-all"
        />
        <div className="centerXY absolute size-[15px] bg-red-700 shadow-lg transition-all" />
        <img src="/map.png" className="rounded" />
      </div>
      <Button onClick={() => setMoving()}>
        <p className="text-xl">NEXT</p>
      </Button>
    </>
  );
}

export default Map;
