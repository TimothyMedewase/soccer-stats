import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Navbar } from "@/components/navbar";

const players = [
  {
    name: "Team1/ Player1",
    image: "/placeholder.svg?height=400&width=400",
    team: "Players team",
    stats: {
      passes: 86,
      fwdPass: 76.4,
      progPasses: 2.7,
      defActions: 54.7,
      duel: 81.2,
      aerial: 29.8,
    },
  },
  {
    name: "Team2/ Player2",
    image: "/placeholder.svg?height=400&width=400",
    team: "Players team",
    stats: {
      passes: 19.3,
      fwdPass: 48.5,
      progPasses: 59.8,
      defActions: 62.7,
      duel: 65.1,
      aerial: 81.8,
    },
  },
];

export default function PlayerComparison() {
  const maxStats = {
    games: Math.max(...players.map((p) => p.stats.passes)),
    ptsPerGame: Math.max(...players.map((p) => p.stats.fwdPass)),
    rebPerGame: Math.max(...players.map((p) => p.stats.progPasses)),
    astPerGame: Math.max(...players.map((p) => p.stats.defActions)),
    fgPercentage: Math.max(...players.map((p) => p.stats.duel)),
    championships: Math.max(...players.map((p) => p.stats.aerial)),
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col">
        <div className="grid grid-cols-2 gap-8 min-w-[640px] my-12">
          {players.map((player) => (
            <Card key={player.name} className="overflow-hidden mx-4">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20 border-2 border-white">
                    <AvatarImage src={player.image} alt={player.name} />
                    <AvatarFallback>
                      {player.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl">{player.name}</CardTitle>
                    <p className="text-sm opacity-75">{player.team}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="mt-4">
                <div className="space-y-4">
                  <StatBar
                    label="Passes"
                    value={player.stats.passes}
                    max={maxStats.games}
                  />
                  <StatBar
                    label="Forward Pass %"
                    value={player.stats.fwdPass}
                    max={maxStats.ptsPerGame}
                  />
                  <StatBar
                    label="Progressive Passes"
                    value={player.stats.progPasses}
                    max={maxStats.rebPerGame}
                  />
                  <StatBar
                    label="Defensive Actions"
                    value={player.stats.defActions}
                    max={maxStats.astPerGame}
                  />
                  <StatBar
                    label="Duel %"
                    value={player.stats.duel}
                    max={maxStats.fgPercentage}
                  />
                  <StatBar
                    label="Aerial %"
                    value={player.stats.aerial}
                    max={maxStats.championships}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatBar({
  label,
  value,
  max,
}: {
  label: string;
  value: number;
  max: number;
}) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm font-medium">{value.toFixed(1)}</span>
      </div>
      <Progress value={(value / max) * 100} className="h-2" />
    </div>
  );
}
