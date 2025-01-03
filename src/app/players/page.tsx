"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/navbar";
import { positions, playerStats, seasons } from "@/app/players/page-data";
import { RadarChart } from "@/components/radar-chart";
import radarData from "@/lib/radar-data";
import StatBar from "@/components/ui/statbar";

export default function PlayerComparison() {
  const [selectedPosition, setSelectedPosition] = useState("");
  const [playerNames, setPlayerNames] = useState(["", ""]);
  const [seasonName, setSeasonName] = useState("");

  const handleNameChange = (name: string, index: number) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  return (
    <div>
      <Navbar />
      <div className="m-4">
        <div className="min-h-screen flex flex-col my-4">
          <div className="flex flex-row justify-center space-x-12">
            <div className="flex justify-center mb-6">
              <Select
                value={selectedPosition}
                onValueChange={setSelectedPosition}
              >
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
            <div className="flex justify-center">
              <Select value={seasonName} onValueChange={setSeasonName}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select a Season" />
                </SelectTrigger>
                <SelectContent>
                  {seasons.map((season) => (
                    <SelectItem key={season} value={season}>
                      {season}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 min-w-[640px] mb-8 mx-4">
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
                        onChange={(e) =>
                          handleNameChange(e.target.value, index)
                        }
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
                    <StatBar
                      label="Duel %"
                      value={player.stats.duel}
                      max={100}
                    />
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
          <div className="mx-4">
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="mx-auto">
                  Player Performance Radar Chart
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadarChart data={radarData} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
