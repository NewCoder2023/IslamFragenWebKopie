import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pressable } from "react-native";
import { router } from "expo-router";
import { useRouter } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useColorScheme } from "hooks/useColorScheme.web";
import useColorSchemeStore from "components/colorStore"; // Import the store
import { createScreenOptions } from "components/headerOptions"; //

export default function Layout() {
  const colorScheme = useColorScheme();
  const toggleColorScheme = useColorSchemeStore(
    (state: any) => state.toggleColorScheme
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer initialRouteName='/index'>
        <Drawer.Screen
          name='index' // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Home",
            title: "Islam-Fragen",
            ...createScreenOptions(colorScheme, toggleColorScheme),
          }}
        />
        <Drawer.Screen
          name='elements' // This is the name of the page and must match the url from root
          options={{
            drawerLabel: () => null,
            title: "",
            drawerItemStyle: { height: 0 }, // Hide the item by setting its height to 0
            ...createScreenOptions(colorScheme, toggleColorScheme),
          }}
        />

        <Drawer.Screen
          name='news' // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Neuigkeiten",
            title: "Neuigkeiten",
            ...createScreenOptions(colorScheme, toggleColorScheme),
          }}
        />
        <Drawer.Screen
          name='askQuestion' // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Frage stellen",
            title: "Eine Frage stellen",
          }}
        />
        <Drawer.Screen
          name='favorites' // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Favoriten",
            title: "Favoriten",
            ...createScreenOptions(colorScheme, toggleColorScheme),
          }}
        />
        <Drawer.Screen
          name='search' // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Suche",
            title: "Suche",
            ...createScreenOptions(colorScheme, toggleColorScheme),
          }}
        />

        <Drawer.Screen
          name='ueber' // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Über",
            title: "Über",
            ...createScreenOptions(colorScheme, toggleColorScheme),
          }}
        />
        <Drawer.Screen
          name='impressum' // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Impressum",
            title: "Impressum",
            ...createScreenOptions(colorScheme, toggleColorScheme),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
