import Title from "../ui/Title";

import { useGetRemote } from "../hooks/useGetRemote";
import FirstDragonKill from "../features/dragon_stats/FirstDragonKill";

function DragonStats() {
  const match = useGetRemote();

  return (
    <main className="padSidebarSize markup flex w-full grow flex-col items-center justify-start py-10">
      <Title text={"Dragon Stats"} />
      <div>
        <FirstDragonKill />
      </div>
    </main>
  );
}

export default DragonStats;
