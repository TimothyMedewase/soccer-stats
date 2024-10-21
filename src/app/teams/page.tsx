import React from "react";

const page = () => {
  return <div>Teams page</div>;
};
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Navbar } from "@/components/navbar";

const players = [
  {
    name: "Cristiano Ronaldo",
    image: "/placeholder.svg?height=400&width=400",
    team: "Al Nassr",
    stats: {
      games: 1492,
      ptsPerGame: 27.1,
      rebPerGame: 7.5,
      astPerGame: 7.4,
      fgPercentage: 50.6,
      championships: 4,
    },
  },
  {
    name: "Lionel Messi",
    image: "/placeholder.svg?height=400&width=400",
    team: "Inter Miami",
    stats: {
      games: 792,
      ptsPerGame: 23.4,
      rebPerGame: 9.8,
      astPerGame: 4.9,
      fgPercentage: 54.5,
      championships: 1,
    },
  },
];

export default function TeamComparison() {
  const maxStats = {
    games: Math.max(...players.map((p) => p.stats.games)),
    ptsPerGame: Math.max(...players.map((p) => p.stats.ptsPerGame)),
    rebPerGame: Math.max(...players.map((p) => p.stats.rebPerGame)),
    astPerGame: Math.max(...players.map((p) => p.stats.astPerGame)),
    fgPercentage: Math.max(...players.map((p) => p.stats.fgPercentage)),
    championships: Math.max(...players.map((p) => p.stats.championships)),
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4 overflow-x-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Compare Teams</h1>
        <div className="grid grid-cols-2 gap-8 min-w-[640px]">
          {players.map((player) => (
            <Card key={player.name} className="overflow-hidden">
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
                    label="Games Played"
                    value={player.stats.games}
                    max={maxStats.games}
                  />
                  <StatBar
                    label="Points per Game"
                    value={player.stats.ptsPerGame}
                    max={maxStats.ptsPerGame}
                  />
                  <StatBar
                    label="Rebounds per Game"
                    value={player.stats.rebPerGame}
                    max={maxStats.rebPerGame}
                  />
                  <StatBar
                    label="Assists per Game"
                    value={player.stats.astPerGame}
                    max={maxStats.astPerGame}
                  />
                  <StatBar
                    label="FG%"
                    value={player.stats.fgPercentage}
                    max={maxStats.fgPercentage}
                  />
                  <StatBar
                    label="Championships"
                    value={player.stats.championships}
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
