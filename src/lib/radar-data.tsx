import { playerStats } from "@/app/players/page-data";
const radarData = [
  {
    stat: "Passes",
    player1: playerStats[0].stats.passes,
    player2: playerStats[1].stats.passes,
  },
  {
    stat: "Fwd Pass%",
    player1: playerStats[0].stats.fwdPass,
    player2: playerStats[1].stats.fwdPass,
  },
  {
    stat: "Prog Passes",
    player1: playerStats[0].stats.progPasses,
    player2: playerStats[1].stats.progPasses,
  },
  {
    stat: "Def Actions",
    player1: playerStats[0].stats.defActions,
    player2: playerStats[1].stats.defActions,
  },
  {
    stat: "Duel%",
    player1: playerStats[0].stats.duel,
    player2: playerStats[1].stats.duel,
  },
  {
    stat: "Aerial%",
    player1: playerStats[0].stats.aerial,
    player2: playerStats[1].stats.aerial,
  },
];

export default radarData;
