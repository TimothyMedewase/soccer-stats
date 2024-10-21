"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ResponsiveRadar } from "@nivo/radar";
import { Navbar } from "@/components/navbar";

const positions = [
  "Goalkeeper",
  "Centrebacks",
  "Fullbacks",
  "Midfielders",
  "Wingers",
  "Strikers",
];

const playerStats = [
  {
    name: "Cristiano Ronaldo",
    team: "Al Nassr",
    image: "/placeholder.svg?height=400&width=400",
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
    name: "Lionel Messi",
    team: "Inter Miami",
    image: "/placeholder.svg?height=400&width=400",
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

const RadarChart = ({
  data,
}: {
  data: { stat: string; player1: number; player2: number }[];
}) => (
  <div style={{ height: 400 }}>
    <ResponsiveRadar
      data={data}
      keys={["player1", "player2"]}
      indexBy="stat"
      maxValue="auto"
      margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
      curve="linearClosed"
      borderWidth={2}
      borderColor={{ from: "color" }}
      gridLevels={5}
      gridShape="circular"
      gridLabelOffset={36}
      enableDots={true}
      dotSize={10}
      dotColor={{ theme: "background" }}
      dotBorderWidth={2}
      dotBorderColor={{ from: "color" }}
      enableDotLabel={true}
      dotLabel="value"
      dotLabelYOffset={-12}
      colors={["#3b82f6", "#ec4899"]}
      fillOpacity={0.25}
      blendMode="multiply"
      animate={true}
      motionConfig="wobbly"
      legends={[
        {
          anchor: "top-left",
          direction: "column",
          translateX: -50,
          translateY: -40,
          itemWidth: 80,
          itemHeight: 20,
          itemTextColor: "#999",
          symbolSize: 12,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  </div>
);

export default function PlayerComparison() {
  const [selectedPosition, setSelectedPosition] = useState("");
  const [playerNames, setPlayerNames] = useState(["", ""]);

  const handleNameChange = (name: string, index: number) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

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

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4 overflow-x-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Compare Players</h1>
        <div className="flex justify-center mb-6">
          <Select value={selectedPosition} onValueChange={setSelectedPosition}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select position" />
            </SelectTrigger>
            <SelectContent>
              {positions.map((position) => (
                <SelectItem key={position} value={position}>
                  {position}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-8 min-w-[640px] mb-8">
          {playerStats.map((player, index) => (
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
                  <div className="space-y-2 flex-grow">
                    <Input
                      placeholder="Enter player name"
                      value={playerNames[index]}
                      onChange={(e) => handleNameChange(e.target.value, index)}
                      className="bg-white text-black placeholder-gray-400"
                    />
                    <p className="text-sm opacity-75">{player.team}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="mt-4">
                <div className="space-y-4">
                  <StatBar
                    label="Passes"
                    value={player.stats.passes}
                    max={100}
                  />
                  <StatBar
                    label="Forward Pass %"
                    value={player.stats.fwdPass}
                    max={100}
                  />
                  <StatBar
                    label="Progressive Passes"
                    value={player.stats.progPasses}
                    max={100}
                  />
                  <StatBar
                    label="Defensive Actions"
                    value={player.stats.defActions}
                    max={100}
                  />
                  <StatBar label="Duel %" value={player.stats.duel} max={100} />
                  <StatBar
                    label="Aerial %"
                    value={player.stats.aerial}
                    max={100}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Player Performance Radar Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <RadarChart data={radarData} />
          </CardContent>
        </Card>
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
