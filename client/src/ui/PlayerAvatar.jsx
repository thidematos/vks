function PlayerAvatar({ isBlue, championSplash, summonerName }) {
  return (
    <div className={`flex flex-col items-center justify-center gap-1`}>
      <img
        src={championSplash}
        className={` ${isBlue ? "border-blueTeam" : "border-redTeam"} size-[50px] rounded-full border-[2px]`}
      />
      <h6 className="text-sm">{summonerName.split(" ").at(1)}</h6>
    </div>
  );
}

export default PlayerAvatar;
