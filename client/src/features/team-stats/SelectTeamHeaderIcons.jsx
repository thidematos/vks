import LaneIcon from "../../ui/LaneIcon";

function SelectTeamHeaderIcons() {
  return (
    <div className="flex flex-row items-center justify-center gap-6">
      <LaneIcon lane={"top"} />
      <LaneIcon lane={"jungle"} />
      <LaneIcon lane={"mid"} />
      <LaneIcon lane={"adc"} />
      <LaneIcon lane={"supp"} />
    </div>
  );
}

export default SelectTeamHeaderIcons;
