function LaneIcon({ lane, onClick }) {
  const icons = {
    top: "/top.png",
    jungle: "/jungle.png",
    mid: "/mid.png",
    adc: "/adc.png",
    supp: "/supp.png",
  };

  return (
    <div
      className="flex size-[40px] items-center justify-center rounded-full border border-purple-400 bg-grey_background p-2 shadow-sm"
      onClick={onClick || null}
    >
      <img src={icons[lane]} />
    </div>
  );
}

export default LaneIcon;
