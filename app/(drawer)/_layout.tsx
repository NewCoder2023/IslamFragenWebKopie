import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pressable } from "react-native";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer initialRouteName='/index'>
        <Drawer.Screen
          name='index' // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Home",
            title: "Islam-Fragen",
          }}
        />
        <Drawer.Screen
          name='(elements)' // This is the name of the page and must match the url from root
          options={{
            drawerLabel: () => null,
            title: "",
            drawerItemStyle: { height: 0 }, // Hide the item by setting its height to 0
          }}
        />
        <Drawer.Screen
          name='news' // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Neuigkeiten",
            title: "Neuigkeiten",
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
          }}
        />
        <Drawer.Screen
          name='search' // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Suche",
            title: "Suche",
          }}
        />

        <Drawer.Screen
          name='ueber' // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Über",
            title: "Über",
          }}
        />
        <Drawer.Screen
          name='impressum' // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Impressum",
            title: "Impressum",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
