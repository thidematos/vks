function ChampionAvatar({ src, size = "size-[50px]", positioning }) {
  return (
    <div className={`overflow-hidden rounded-full ${size} ${positioning}`}>
      <img src={src} />
    </div>
  );
}

export default ChampionAvatar;
