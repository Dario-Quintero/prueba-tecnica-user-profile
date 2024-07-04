"use client";
import s from "./toggletheme.module.css"
import { useState } from "react";
import SunIcon from "../Icons/SunIcon";
import MoonIcon from "../Icons/MoonIcon";

const ToggleTheme = () => {
  const [theme, setTheme] = useState("dark");

  const handleTheme = (theme: string) => {
    const $html = document.querySelector("html");
    if (theme === "dark") {
      setTheme("light");
      $html?.setAttribute("data-mode", "light");
    } else {
      setTheme("dark");
      $html?.setAttribute("data-mode", "dark");
    }
  };

  return (
    <div onClick={() => handleTheme(theme)} className={`${s.container} ${s.zoom}`}>
      {theme === "dark" ? <MoonIcon /> : <SunIcon />}
    </div>
  );
};

export default ToggleTheme;
