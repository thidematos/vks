function PlayerAvatar({ isBlue, player, lane, isActive, onChangeActive }) {
  return (
    <div
      className={`relative flex cursor-pointer flex-col items-center justify-center gap-2`}
      onClick={() => onChangeActive()}
    >
      <h6
        className={`${isActive ? "font-bold text-purple-700" : "text-slate-700"} text-sm`}
      >
        {player.summonerName?.split(" ")?.at(1)?.toUpperCase()}
      </h6>
      <img
        src={player.champion.splash}
        className={` ${isBlue ? "border-blueTeam" : "border-redTeam"} ${isActive ? "scale-125" : "scale-100"} size-[40px] rounded-full border-[2px] transition-all`}
      />
      <p className="text-xs">{lane?.toUpperCase()}</p>
    </div>
  );
}

export default PlayerAvatar;
