import { format } from "date-fns";
import useGetMatchs from "../../hooks/useGetMatchs";
import Table from "./Table";
import ChampionList from "./ChampionList";
import { useMatchsQuery } from "./context/MatchsQueryProvider";

const numOfCols = {
  matchID: "col-span-1",
  patch: "col-span-1",
  duration: "col-span-1",
  date: "col-span-1",
  winner: "col-span-1",
  champions: "col-span-3",
};

function MatchList() {
  const { matchs } = useGetMatchs();

  const { query } = useMatchsQuery();

  if (!matchs) return null;

  const filteredMatchs = matchs.filter((match) => {
    if (!query) return true;

    const lowerCaseQuery = query.toLowerCase();

    let showMatch = false;

    if (String(match.game_settings.gameID).includes(lowerCaseQuery))
      showMatch = true;

    match.participants.all.forEach((player) => {
      if (player.summonerName.toLowerCase().includes(lowerCaseQuery))
        showMatch = true;
    });

    return showMatch;
  });

  return (
    <div className="flex w-full flex-col items-center justify-start">
      <Table>
        <Table.Row isTitle>
          <Table.Column cols={numOfCols.matchID}>Match ID</Table.Column>
          <Table.Column cols={numOfCols.patch}>Patch</Table.Column>
          <Table.Column cols={numOfCols.duration}>Duration</Table.Column>
          <Table.Column cols={numOfCols.date}>Date</Table.Column>
          <Table.Column cols={numOfCols.winner}>
            <p className="w-full">Winner</p>
          </Table.Column>
          <Table.Column cols={numOfCols.champions}>Champions</Table.Column>
        </Table.Row>
        {filteredMatchs.map((match) => (
          <Table.Row key={match._id}>
            <Table.Column cols={numOfCols.matchID}>
              {match.game_settings.gameID}
            </Table.Column>
            <Table.Column cols={numOfCols.patch}>
              {match.game_settings.patch}
            </Table.Column>
            <Table.Column cols={numOfCols.duration}>
              <span className="tracking-widest">
                {`${match.game_settings.duration}`}{" "}
                <span className="text-xs">min.</span>
              </span>
            </Table.Column>
            <Table.Column cols={numOfCols.date}>
              {format(match.game_settings.date, "dd/MM/yyyy")}
            </Table.Column>
            <Table.Column cols={numOfCols.winner}>
              <p
                className={`${match.game_settings.winningTeam === 100 ? "text-blueTeam" : "text-redTeam"} w-full font-vks text-xl`}
              >
                {match.game_settings.winningTeam === 100 ? "blue" : "red"}
              </p>
            </Table.Column>
            <Table.Column cols={numOfCols.champions}>
              <ChampionList
                blue={match.participants.blueSide.map(
                  (player) => player.champion,
                )}
                red={match.participants.redSide.map(
                  (player) => player.champion,
                )}
              />
            </Table.Column>
          </Table.Row>
        ))}
      </Table>
    </div>
  );
}

export default MatchList;
