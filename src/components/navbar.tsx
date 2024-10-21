"use client";
import React from "react";
import { NavbarUI } from "./ui/navbar-ui";

export function Navbar() {
  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Players",
      link: "/players",
    },
    {
      name: "Teams",
      link: "/teams",
    },
  ];
  return (
    <div className="relative  w-full">
      <NavbarUI navItems={navItems} />
    </div>
  );
}
