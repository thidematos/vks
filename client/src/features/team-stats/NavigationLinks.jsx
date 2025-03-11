import { NavLink } from "react-router-dom";

function NavigationLinks() {
  return (
    <div className="bg-grey_background flex h-[65%] flex-row items-center justify-center gap-10 rounded px-8 shadow">
      <NavLink to={`/team-stats/data`}>
        <span className="font-medium">Data</span>
      </NavLink>
      <NavLink to={"/team-stats/objectives"}>
        <span className="font-medium">Objectives</span>
      </NavLink>
      <NavLink to={"/team-stats/comparatives"}>
        <span className="font-medium">Comparatives</span>
      </NavLink>
      <NavLink to={"/team-stats/winrate"}>
        <span className="font-medium">Winrate</span>
      </NavLink>
    </div>
  );
}

export default NavigationLinks;
