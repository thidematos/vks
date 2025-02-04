import { useParams } from "react-router-dom";
import { useMatchDetails } from "../../context/MatchDetailsProvider";
import StatCard from "../StatCard";
import useGetMatchs from "../../../matchs/useGetMatchs";
import { calculateXpAtInterval } from "../../utils/calculateXpAtInterval";
import { AverageCalculator } from "../../utils/averageCalculator";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

function XP() {
  const { teamOne, teamTwo } = useMatchDetails();
  const { matchID } = useParams();
  const { currentMatch } = useGetMatchs(matchID);

  if (!currentMatch || !teamOne.activePlayer || !teamTwo.activePlayer)
    return null;

  const teams = [teamOne, teamTwo];

  let activeTeamTwoXP;

  let activeTeamOneXP;

  teams.forEach((team) => {
    const accessTeamString = team.id === 100 ? "teamOne" : "teamTwo";

    const data = currentMatch.perMinuteStats[accessTeamString].map((stat) => {
      return {
        timestamp: Number(stat.formattedTimestamp.split(":").at(0)),
        playerXP: stat.players.find(
          (player) => player.puuid === team.activePlayer,
        ).xp,
        puuid: team.activePlayer,
      };
    });

    if (accessTeamString === "teamOne") return (activeTeamOneXP = data);
    else if (accessTeamString === "teamTwo") return (activeTeamTwoXP = data);
  });

  return (
    <StatCard label={"XP"}>
      <Swiper className="swiper">
        <SwiperSlide className="">
          <div className="grid grid-cols-4 gap-y-2">
            <span className="col-span-4 text-center font-bold uppercase">
              Comparison
            </span>
            <Header teams={teams} currentMatch={currentMatch} />
            <XpAt
              label={"xp@7"}
              interval={{ end: 7 }}
              activeTeamOneXP={activeTeamOneXP}
              activeTeamTwoXP={activeTeamTwoXP}
            />
            <XpAt
              label={"xp@15"}
              interval={{ end: 15 }}
              activeTeamOneXP={activeTeamOneXP}
              activeTeamTwoXP={activeTeamTwoXP}
            />
            <XpAt
              label={"xp@20"}
              interval={{ end: 20 }}
              activeTeamOneXP={activeTeamOneXP}
              activeTeamTwoXP={activeTeamTwoXP}
            />
            <XpTotal
              activeTeamOneXP={activeTeamOneXP}
              activeTeamTwoXP={activeTeamTwoXP}
            />
            <XpPerMinute
              activeTeamOneXP={activeTeamOneXP}
              activeTeamTwoXP={activeTeamTwoXP}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide className="">
          <TeamAverage
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

function TeamAverage({ teams }) {
  const [teamOne, teamTwo] = teams;

  const averages = new AverageCalculator(teamOne, teamTwo).getXPAverages();

  return (
    <div className="col-span-1 flex flex-col">
      <span className="col-span-1 w-full text-center font-bold uppercase">
        Averages
      </span>
      {averages.map((average, ind, arr) => (
        <AverageBox
          average={average}
          key={average.time}
          isLast={ind === arr.length - 1}
        />
      ))}
    </div>
  );
}

function AverageBox({ average, isLast }) {
  return (
    <div
      className={`items-evenly flex flex-col gap-2 ${!isLast && "border-b border-b-slate-400"} py-2`}
    >
      <h2 className="w-full text-center">xp@{average.time}</h2>
      <div className="flex flex-row items-center justify-evenly">
        <div className="flex flex-col items-center">
          <span className="font-vks font-bold text-blueTeam">BLUE</span>
          <span>{average.teamOneAverage}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-vks font-bold text-redTeam">RED</span>

          <span>{average.teamTwoAverage}</span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-sm">Avg. Diff</span>
          <Diff
            teamOneTotal={average.teamOneAverage}
            teamTwoTotal={average.teamTwoAverage}
          />
        </div>
      </div>
    </div>
  );
}

function Col({ children }) {
  return (
    <div className="col-span-1 py-2 text-center">
      <span>{children}</span>
    </div>
  );
}

function XpPerMinute({ activeTeamOneXP, activeTeamTwoXP }) {
  const finalTeamOneXP = activeTeamOneXP.at(-1).playerXP;
  const finalTeamTwoXP = activeTeamTwoXP.at(-1).playerXP;

  const finalMin = activeTeamOneXP.at(-1).timestamp;

  const teamOnePerMinute = (finalTeamOneXP / finalMin).toFixed(2);
  const teamTwoPerMinute = (finalTeamTwoXP / finalMin).toFixed(2);

  return (
    <>
      <Col>Per min.</Col>
      <Col>{teamOnePerMinute}</Col>
      <Col>{teamTwoPerMinute}</Col>
      <Col>
        <Diff teamOneTotal={teamOnePerMinute} teamTwoTotal={teamTwoPerMinute} />
      </Col>
    </>
  );
}

function XpTotal({ activeTeamOneXP, activeTeamTwoXP }) {
  const finalTeamOneXP = activeTeamOneXP.at(-1).playerXP;
  const finalTeamTwoXP = activeTeamTwoXP.at(-1).playerXP;

  return (
    <>
      <Col>Total</Col>
      <Col>{finalTeamOneXP}</Col>
      <Col>{finalTeamTwoXP}</Col>
      <Col>
        <Diff teamOneTotal={finalTeamOneXP} teamTwoTotal={finalTeamTwoXP} />
      </Col>
    </>
  );
}

function XpAt({ label, interval, activeTeamOneXP, activeTeamTwoXP }) {
  const teamOneTotal = calculateXpAtInterval(activeTeamOneXP, interval);
  const teamTwoTotal = calculateXpAtInterval(activeTeamTwoXP, interval);

  return (
    <>
      <Col>{label}</Col>
      <Col>{teamOneTotal}</Col>
      <Col>{teamTwoTotal}</Col>
      <Col>
        <Diff teamOneTotal={teamOneTotal} teamTwoTotal={teamTwoTotal} />
      </Col>
    </>
  );
}

function Diff({ teamOneTotal, teamTwoTotal }) {
  const diff = teamOneTotal - teamTwoTotal;

  return (
    <span
      className={`${
        diff > 0
          ? "text-blueTeam"
          : diff === 0
            ? "text-green-600"
            : "text-redTeam"
      } font-bold`}
    >{`${((Math.abs(diff) / (teamOneTotal >= teamTwoTotal ? teamTwoTotal : teamOneTotal)) * 100).toFixed(2)}%`}</span>
  );
}

function Header({ teams, currentMatch }) {
  return (
    <div className="col-span-4 grid grid-cols-4 border-b border-b-gray-600">
      <Col className="col-span-1 border-r border-slate-400">Metric</Col>
      {teams.map((team) => (
        <Col key={team.activePlayer}>
          <span
            className={`${team.id === 100 ? "text-blueTeam" : "text-redTeam"} font-bold`}
          >
            {currentMatch.participants.allPlayers
              .find((player) => player.puuid === team.activePlayer)
              .summonerName.split(" ")
              .at(1)}
          </span>
        </Col>
      ))}
      <Col>Diff</Col>
    </div>
  );
}

export default XP;
