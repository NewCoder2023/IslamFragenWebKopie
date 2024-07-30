import React from 'react';
import { Pressable, TextStyle } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';

type ColorScheme = 'light' | 'dark';
type ToggleColorScheme = () => void;

const getHeaderRight = (colorScheme: ColorScheme, toggleColorScheme: ToggleColorScheme) => (
  <Pressable onPress={toggleColorScheme} style={{marginRight: 20}}>
    {colorScheme === "light" ? (
      <FontAwesome name='moon-o' size={24} color='black' />
    ) : (
      <Feather name='sun' size={24} color='white' />
    )}
  </Pressable>
);

export const createScreenOptions = (colorScheme: ColorScheme, toggleColorScheme: ToggleColorScheme) => ({
  headerStyle: {
    backgroundColor: colorScheme === 'light' ? 'white' : 'black', // Set background color
  },
  headerTintColor: colorScheme === 'light' ? 'black' : 'white', // Set text color
  headerTitleStyle: {
    fontWeight: 'bold' as TextStyle['fontWeight'], // Ensure correct type
  },
  headerRight: () => getHeaderRight(colorScheme, toggleColorScheme),
});
