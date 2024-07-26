import { useState, useEffect } from "react";
import { Appearance } from "react-native";

export const useChangeColorMode = () => {
  const colorScheme = Appearance.getColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");

  useEffect(() => {
    const getColorMode = () => {
      const colorMode = localStorage.getItem("ColorMode");
      if (colorMode) {
        setIsDarkMode(colorMode === "dark");
      }
    };

    getColorMode();
  }, []);

  const toggleColorScheme = () => {
    const changeColor = isDarkMode ? "light" : "dark";
    localStorage.setItem("ColorMode", changeColor);
    setIsDarkMode(!isDarkMode);
  };

  return [isDarkMode, toggleColorScheme];
};
