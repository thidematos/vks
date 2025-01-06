import { useGetRemote } from "../../hooks/useGetRemote";
import Title from "../../ui/Title";
import { format } from "date-fns";
import { formatMinSec } from "../../utils/formatMinSec";

function FirstDragonKill() {
  const match = useGetRemote();

  return (
    <div>
      <Title text="First Dragon Kill" variation="secondary" />
      <p>Killed at: {formatMinSec(match.dragonStats.timestamp)}</p>
      <p></p>
    </div>
  );
}

export default FirstDragonKill;
