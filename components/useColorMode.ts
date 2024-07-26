import { useState, useEffect } from "react";
import { Appearance, Platform } from "react-native";

if (Platform.OS === 'web' && !Appearance.setColorScheme) {
  // Fügen Sie eine globale Methode hinzu, um das Farbschema für das Web zu ändern
  Appearance.setColorScheme = (scheme) => {
    if (scheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
}

export const useChangeColorMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(Appearance.getColorScheme() === "dark");

  useEffect(() => {
    const getColorMode = () => {
      const colorMode = localStorage.getItem("ColorMode");
      if (colorMode) {
        setIsDarkMode(colorMode === "dark");
        Appearance.setColorScheme(colorMode);
      }
    };

    getColorMode();

    const colorSchemeListener = ({ colorScheme }) => {
      setIsDarkMode(colorScheme === "dark");
      localStorage.setItem("ColorMode", colorScheme);
    };

    Appearance.addChangeListener(colorSchemeListener);

    return () => {
      Appearance.removeChangeListener(colorSchemeListener);
    };
  }, []);

  const toggleColorScheme = () => {
    const newColorScheme = isDarkMode ? "light" : "dark";
    localStorage.setItem("ColorMode", newColorScheme);
    Appearance.setColorScheme(newColorScheme);
    setIsDarkMode(!isDarkMode);
  };

  return [isDarkMode, toggleColorScheme];
};
