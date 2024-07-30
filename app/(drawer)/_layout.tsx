import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { useColorScheme } from "hooks/useColorScheme.web";
import useColorSchemeStore from "components/colorStore"; // Import the store
import { createScreenOptions } from "components/headerOptions"; //
import { Pressable, TextStyle } from "react-native";

export default function Layout() {
  const colorScheme = useColorScheme();
  const toggleColorScheme = useColorSchemeStore(
    (state: any) => state.toggleColorScheme
  );

  const headerWithoutButton = (colorScheme: any) => ({
    headerStyle: {
      backgroundColor: colorScheme === "light" ? "white" : "black", // Set background color
    },
    headerTintColor: colorScheme === "light" ? "black" : "white", // Set text color
    headerTitleStyle: {
      fontWeight: "bold" as TextStyle["fontWeight"], // Ensure correct type
    },
  });

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
            ...headerWithoutButton(colorScheme)
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
            ...headerWithoutButton(colorScheme)
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
