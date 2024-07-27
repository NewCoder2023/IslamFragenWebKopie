/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { useState, useEffect } from "react";
import { Text as DefaultText, View as DefaultView } from "react-native";
import { SafeAreaView as DefaultSafeAreaView } from "react-native-safe-area-context";
import Colors from "constants/Colors";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeSafeAreaViewProps } from "react-native-safe-area-context";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];
export type SafeAreaViewProps = ThemeProps & NativeSafeAreaViewProps;

const getThemeFromAsyncStorage = async () => {
  try {
    const storedTheme = await AsyncStorage.getItem('isDarkMode');
    return storedTheme === 'true' ? 'dark' : 'light';
  } catch (error) {
    console.error('Failed to load theme from AsyncStorage:', error);
    return 'light'; // Default to light theme if there's an error
  }
};

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await getThemeFromAsyncStorage();
      setTheme(storedTheme);
    };
    loadTheme();
  }, []);

  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function SafeAreaView(props: SafeAreaViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <DefaultSafeAreaView style={[{ backgroundColor }, style]} {...otherProps} />
  );
}
