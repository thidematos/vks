import { useParams } from "react-router-dom";
import { useGetPlayers } from "../../../players/useGetPlayers";
import { useMatchDetails } from "../../context/MatchDetailsProvider";
import useGetMatchs from "../../../matchs/useGetMatchs";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function GraphicXP() {
  const { teamOne, teamTwo } = useMatchDetails();
  const { matchID } = useParams();

  const { currentMatch } = useGetMatchs(matchID);

  if (!teamOne.activePlayer || !teamTwo.activePlayer || !currentMatch)
    return null;

  const summonerNameBlueSide = currentMatch.participants.allPlayers.find(
    (player) => player.puuid === teamOne.activePlayer,
  ).summonerName;
  const summonerNameRedSide = currentMatch.participants.allPlayers.find(
    (player) => player.puuid === teamTwo.activePlayer,
  ).summonerName;

  const perMinuteXpStats = Array.from(
    { length: currentMatch.perMinuteStats.teamOne.length },
    (_, ind) => {
      return {
        teamOnePlayerXP: currentMatch.perMinuteStats.teamOne[ind].players.find(
          (player) => player.puuid === teamOne.activePlayer,
        ).xp,
        teamTwoPlayerXP: currentMatch.perMinuteStats.teamTwo[ind].players.find(
          (player) => player.puuid === teamTwo.activePlayer,
        ).xp,
        timestamp: `${currentMatch.perMinuteStats.teamOne[
          ind
        ].formattedTimestamp
          .split(":")
          .at(0)}`,
      };
    },
  );

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h1 className="font-vks text-2xl uppercase text-purple-700">XP</h1>
      <ResponsiveContainer width={"85%"} height={350}>
        <LineChart data={perMinuteXpStats}>
          <Line
            dataKey={"teamOnePlayerXP"}
            name={summonerNameBlueSide}
            dot={false}
          />
          <Line
            dataKey={"teamTwoPlayerXP"}
            name={summonerNameRedSide}
            dot={false}
          />
          <YAxis />
          <Tooltip />
          <XAxis dataKey={"timestamp"} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GraphicXP;
