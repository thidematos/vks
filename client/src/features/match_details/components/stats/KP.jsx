import { useParams } from "react-router-dom";
import useGetMatchs from "../../../matchs/useGetMatchs";
import StatCard from "../StatCard";
import { useMatchDetails } from "../../context/MatchDetailsProvider";
import { getKPS } from "../../utils/getKPS";
import ComparisonTable from "./ComparisonTable";

import { Swiper, SwiperSlide } from "swiper/react";

function KP() {
  const { matchID } = useParams();
  const { currentMatch } = useGetMatchs(matchID);
  const { teamOne, teamTwo } = useMatchDetails();

  if (!currentMatch || !teamOne.activePlayer || !teamTwo.activePlayer)
    return null;

  const criticalTimes = currentMatch.criticalTimes;

  const teams = [teamOne, teamTwo];

  const [teamOneActiveKP, teamTwoActiveKP] = getKPS(teams, criticalTimes);

  const sumonnersNames = teams.map((team) =>
    currentMatch.participants.allPlayers
      .find((player) => player.puuid === team.activePlayer)
      .summonerName.split(" ")
      .at(1),
  );

  const times = ["07", "15", "20"];

  const endGameKPS = teams.map((team) => {
    const teamStr = team.id === 100 ? "teamOne" : "teamTwo";

    const curPlayer = currentMatch.perMinuteStats[teamStr]
      .at(-1)
      .players.find((player) => player.puuid === team.activePlayer);

    const curPlayerParticipation =
      curPlayer.stats.assists + curPlayer.stats.championsKilled;

    const curTeamTotal = currentMatch.perMinuteStats[teamStr]
      .at(-1)
      .players.reduce((acc, item) => (acc += item.stats.championsKilled), 0);

    return (
      curTeamTotal > 0 ? curPlayerParticipation / curTeamTotal : 0
    ).toFixed(2);
  });

  console.log(currentMatch);

  return (
    <StatCard label={"KP"}>
      <Swiper className="swiper">
        <SwiperSlide className="swiper-slide">
          <ComparisonTable>
            <ComparisonTable.Header summonersNames={sumonnersNames} />
            {times.map((time, ind) => {
              const accessStr = `at${time}`;

              return (
                <ComparisonTable.DataRow
                  key={time}
                  isKP={true}
                  metric={`kp@${time}`}
                  teamsData={[
                    teamOneActiveKP.teamOne.kps[ind][accessStr],
                    teamTwoActiveKP.teamTwo.kps[ind][accessStr],
                  ]}
                />
              );
            })}
            <ComparisonTable.DataRow
              metric={"Endgame"}
              isKP={true}
              teamsData={endGameKPS}
            />
          </ComparisonTable>
        </SwiperSlide>
        <SwiperSlide>
          <ComparisonTable.TeamAverage
            label={"kp"}
            isKP={true}
            teams={[
              currentMatch.perMinuteStats.teamOne,
              currentMatch.perMinuteStats.teamTwo,
            ]}
          />
        </SwiperSlide>
      </Swiper>
    </StatCard>
  );
}

export default KP;
