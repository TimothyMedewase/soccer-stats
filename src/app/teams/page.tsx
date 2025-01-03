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
import { leagues, teams, seasons } from "@/app/teams/teams-data";
import { RadarChart } from "@/components/radar-chart";
import radarData from "@/lib/radar-data";
import StatBar from "@/components/ui/statbar";

export default function TeamComparison() {
  const [selectedLeague, setSelectedLeague] = useState("");
  const [teamNames, setTeamNames] = useState(["", ""]);
  const [seasonName, setSeasonName] = useState("");

  const handleNameChange = (name: string, index: number) => {
    const newNames = [...teamNames];
    newNames[index] = name;
    setTeamNames(newNames);
  };

  return (
    <div>
      <Navbar />
      <div className="m-4">
        <div className="min-h-screen flex flex-col my-4">
          <div className="flex flex-row justify-center space-x-12">
            <div className="flex justify-center mb-6">
              <Select value={selectedLeague} onValueChange={setSelectedLeague}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select a League" />
                </SelectTrigger>
                <SelectContent>
                  {leagues.map((league) => (
                    <SelectItem key={league} value={league}>
                      {league}
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
            {teams.map((team) => (
              <Card key={team.name} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-20 h-20 border-2 border-white">
                      <AvatarImage src={team.image} alt={team.name} />
                      <AvatarFallback>
                        {team.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2 flex-grow">
                      <Input
                        placeholder="Enter Team name"
                        //value={team.name}
                        onChange={(e) =>
                          handleNameChange(e.target.value, teams.indexOf(team))
                        }
                        className="bg-white text-black placeholder-gray-400"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="mt-4">
                  <div className="space-y-4">
                    <StatBar
                      label="Passes"
                      value={team.stats.passes}
                      max={100}
                    />
                    <StatBar
                      label="Forward Pass %"
                      value={team.stats.fwdPass}
                      max={100}
                    />
                    <StatBar
                      label="Progressive Passes"
                      value={team.stats.progPasses}
                      max={100}
                    />
                    <StatBar
                      label="Defensive Actions"
                      value={team.stats.defActions}
                      max={100}
                    />
                    <StatBar label="Duel %" value={team.stats.duel} max={100} />
                    <StatBar
                      label="Aerial %"
                      value={team.stats.aerial}
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
                  Team Performance Radar Chart
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
