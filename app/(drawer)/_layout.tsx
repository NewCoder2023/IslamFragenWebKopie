import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name='index' // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Home",
            title: "Islam-Fragen",
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
