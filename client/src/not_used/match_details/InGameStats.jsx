import { useParams } from "react-router-dom";
import { useGetMatchs } from "./useGetMatchs";
import { useMatchDetails } from "../../context/matchDetailsProvider";
import { useGetParticipantStats } from "../../hooks/useGetParticipantStats";

function InGameStats() {
  const { matchs } = useGetMatchs();
  const { currentFrame } = useGetParticipantStats();

  if (!matchs) return null;

  return (
    <div className="grid w-[60%] grid-cols-2 rounded border border-purple-600 p-4 shadow-lg">
      <div className="col-span-1 grid grid-flow-row grid-cols-2 gap-1">
        <h4 className="col-span-2 text-center font-vks text-2xl text-purple-900">
          Champion Stats
        </h4>
        <Row
          title={"Ability Haste"}
          stat={currentFrame.stats.championStats.abilityHaste}
        />
        <Row
          title={"Ability Power"}
          stat={currentFrame.stats.championStats.abilityPower}
        />
        <Row title={"Armor"} stat={currentFrame.stats.championStats.armor} />

        <Row
          title={"Armor Pen. "}
          stat={currentFrame.stats.championStats.armorPen}
        />
        <Row
          title={"Armor Pen %"}
          stat={currentFrame.stats.championStats.armorPenPercent}
        />
        <Row
          title={"Attack Dmg. "}
          stat={currentFrame.stats.championStats.attackDamage}
        />
        <Row
          title={"Attack Speed"}
          stat={currentFrame.stats.championStats.attackSpeed}
        />
        <Row
          title={"Armor Pen %"}
          stat={currentFrame.stats.championStats.armorPenPercent}
        />
        <Row
          title={"Bonus Armor Pen %"}
          stat={currentFrame.stats.championStats.bonusArmorPenPercent}
        />
        <Row
          title={"Bonus Magic Pen %"}
          stat={currentFrame.stats.championStats.bonusMagicPenPercent}
        />
        <Row
          title={"CC Reduction"}
          stat={currentFrame.stats.championStats.ccReduction}
        />
        <Row
          title={"CD Reduction"}
          stat={currentFrame.stats.championStats.cooldownReduction}
        />
        <Row title={"Health"} stat={currentFrame.stats.championStats.health} />
        <Row
          title={"Health Max"}
          stat={currentFrame.stats.championStats.healthMax}
        />
        <Row
          title={"Health Regen"}
          stat={currentFrame.stats.championStats.healthRegen}
        />
        <Row
          title={"Lifesteal"}
          stat={currentFrame.stats.championStats.lifesteal}
        />
        <Row
          title={"Magic Pen"}
          stat={currentFrame.stats.championStats.magicPen}
        />
        <Row
          title={"Magic Pen %"}
          stat={currentFrame.stats.championStats.magicPenPercent}
        />
        <Row
          title={"Magic Resist"}
          stat={currentFrame.stats.championStats.magicResist}
        />
        <Row
          title={"Mov. Speed"}
          stat={currentFrame.stats.championStats.movementSpeed}
        />
        <Row
          title={"Omnivamp"}
          stat={currentFrame.stats.championStats.omnivamp}
        />
        <Row
          title={"Physical Vamp"}
          stat={currentFrame.stats.championStats.physicalVamp}
        />
        <Row title={"Power"} stat={currentFrame.stats.championStats.power} />
        <Row
          title={"Power Max"}
          stat={currentFrame.stats.championStats.powerMax}
        />
        <Row
          title={"Power Regen"}
          stat={currentFrame.stats.championStats.powerRegen}
        />
        <Row
          title={"Spell Vamp"}
          stat={currentFrame.stats.championStats.spellVamp}
        />
      </div>
      <div className="col-span-1 grid grid-flow-row grid-cols-2 border-l border-purple-800">
        <h4 className="col-span-2 text-center font-vks text-2xl text-purple-900">
          Other Stats
        </h4>
        <Row title={"Current Gold"} stat={currentFrame.stats.currentGold} />
        <Row title={"Gold Per Sec."} stat={currentFrame.stats.goldPerSecond} />
        <Row
          title={"Jungle Minions"}
          stat={currentFrame.stats.jungleMinionsKilled}
        />
        <Row title={"Minions"} stat={currentFrame.stats.minionsKilled} />
        <Row title={"Level"} stat={currentFrame.stats.level} />
        <Row title={"Total Gold"} stat={currentFrame.stats.totalGold} />
        <Row title={"XP"} stat={currentFrame.stats.xp} />
      </div>
    </div>
  );
}

function Row({ title, icon, stat }) {
  return (
    <div className="col-span-1 row-span-1 flex flex-row justify-between px-2 text-sm">
      <p className="">{title}:</p>
      <p>{String(stat).padStart(2, "0")}</p>
    </div>
  );
}

export default InGameStats;
