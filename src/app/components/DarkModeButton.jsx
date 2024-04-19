"use client";

import { Dropdown } from "react-bootstrap";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import CircleHalfStroke from "@/app/svg/CircleHalfStroke"; // Import CircleHalfStroke

export default function DarkModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderIcon = (icon, label) => (
    <>
      {icon}
      {label && <span className="ms-2">{label}</span>}
    </>
  );

  if (!mounted) {
    return null;
  }

  return (
    <Dropdown className="dropdown position-fixed bottom-0 end-0 mb-3 me-3 bd-mode-toggle ">
      <Dropdown.Toggle
        variant={
          theme === "dark" || theme === "system" ? "secondary" : "primary"
        }
        id="dropdown-basic"
      >
        {theme === "dark" &&
          renderIcon(<MoonIcon width={24} height={24} />, "Dark")}
        {theme === "light" &&
          renderIcon(<SunIcon width={24} height={24} />, "Light")}
        {theme === "system" &&
          renderIcon(<CircleHalfStroke width={24} height={24} />, "Auto")}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => setTheme("light")}>
          {renderIcon(<SunIcon width={24} height={24} />, "Light")}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setTheme("dark")}>
          {renderIcon(<MoonIcon width={24} height={24} />, "Dark")}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setTheme("system")}>
          {renderIcon(<CircleHalfStroke width={24} height={24} />, "Auto")}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
