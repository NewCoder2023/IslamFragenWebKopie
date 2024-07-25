import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { router } from "expo-router";

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
          name='impressum' // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Impressum",
            title: "Impressum",
          }}
        />
        <Drawer.Screen
          name='ueber' // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Über",
            title: "Über",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
