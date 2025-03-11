import ChampionAvatar from "../../ui/ChampionAvatar";

function ChampionList({ blue, red }) {
  const positions = Array.from({ length: 5 }, (_, ind) => `${ind * 22}px`);

  const redReversed = red.slice().reverse();

  const listContainerStyles = "relative w-full flex flex-row items-center";

  function buildAvatars(champion, ind, isBlue) {
    const z = isBlue ? 400 - ind : 400 + ind;
    const styles = { zIndex: z };

    if (isBlue) styles.left = positions[ind];
    if (!isBlue) styles.right = positions[ind];

    return (
      <div key={champion.key} style={styles} className="absolute">
        <ChampionAvatar size="size-[35px]" src={champion.splashArt} />
      </div>
    );
  }

  return (
    <div className="flex flex-row">
      <div className={listContainerStyles}>
        {blue.map((champion, ind) => buildAvatars(champion, ind, true))}
      </div>
      <div className={listContainerStyles}>
        {redReversed.map((champion, ind) => buildAvatars(champion, ind, false))}
      </div>
    </div>
  );
}

export default ChampionList;
