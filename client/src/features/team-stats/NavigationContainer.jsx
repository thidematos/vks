import NavigationLinks from "./NavigationLinks";
import OverviewLogo from "./OverviewLogo";
import SelectTeamHeaderIcons from "./SelectTeamHeaderIcons";

function NavigationContainer() {
  return (
    <nav className="flex h-[85px] w-[90%] flex-row items-center justify-between rounded-xl border border-gray-300 bg-white_background px-8 shadow-lg">
      <OverviewLogo />
      <NavigationLinks />
      <SelectTeamHeaderIcons />
    </nav>
  );
}

export default NavigationContainer;
