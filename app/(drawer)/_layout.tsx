import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { Pressable } from "react-native";
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';


// <Feather name="sun" size={24} color="yellow" />
// <FontAwesome name="moon-o" size={24} color="black" />


const ToggleColorMode = () => {
  return (
    <Pressable onPress={() => alert('Button pressed!')} style={{ marginRight: 20 }}>
      <Feather name="sun" size={24} color="#fbc531" />
      <FontAwesome name="moon-o" size={24} color="black" />
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
