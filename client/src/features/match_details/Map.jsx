import { useGetParticipantStats } from "../../hooks/useGetParticipantStats";

function Map() {
  const { currentFrame } = useGetParticipantStats();

  const position = currentFrame?.stats.position;

  return (
    <div className="relative size-[250px] rounded border-2 border-purple-600 shadow">
      <div
        style={{
          bottom: `${position?.y / 64}px`,
          left: `${position?.x / 64}px`,
        }}
        className="absolute size-[15px] rounded-full bg-purple-700 shadow-lg transition-all"
      />
      <img src="/map.png" className="rounded" />
    </div>
  );
}

export default Map;
