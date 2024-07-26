import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useChangeColorMode } from "components/useColorMode";

const ToggleColorMode = () => {
  const [isDarkMode, toggleColorScheme] = useChangeColorMode();

  return (
    <Pressable onPress={toggleColorScheme} style={{ marginRight: 20 }}>
      {isDarkMode ? (
        <Feather name='sun' size={24} color='#fbc531' />
      ) : (
        <FontAwesome name='moon-o' size={24} color='black' />
      )}
    </Pressable>
  );
};
export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer initialRouteName='/index'>
        <Drawer.Screen
          name='index' // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Home",
            title: "Islam-Fragen",
            headerRight: () => <ToggleColorMode />,
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
            headerRight: () => <ToggleColorMode />,
          }}
        />
        <Drawer.Screen
          name='askQuestion' // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Frage stellen",
            title: "Eine Frage stellen",
            headerRight: () => <ToggleColorMode />,
          }}
        />
        <Drawer.Screen
          name='favorites' // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Favoriten",
            title: "Favoriten",
            headerRight: () => <ToggleColorMode />,
          }}
        />
        <Drawer.Screen
          name='search' // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Suche",
            title: "Suche",
            headerRight: () => <ToggleColorMode />,
          }}
        />

        <Drawer.Screen
          name='ueber' // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Über",
            title: "Über",
            headerRight: () => <ToggleColorMode />,
          }}
        />
        <Drawer.Screen
          name='impressum' // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Impressum",
            title: "Impressum",
            headerRight: () => <ToggleColorMode />,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
