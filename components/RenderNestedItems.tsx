import { Text, View } from "components/Themed";
import { Pressable, StyleSheet } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useColorScheme } from "hooks/useColorScheme.web";
import { FlashList } from "@shopify/flash-list";
import { coustomTheme } from "./coustomTheme";
import { ActivityIndicator } from "react-native";
import { formatTitle } from "components/formatTitle";
import { encodeTitle } from "components/encodeTitle";

interface NestedItem {
  id: number;
  title: string;
}

interface RenderNestedItemsProps {
  items: NestedItem[];
  fetchError?: string;
  table: string;
  isFetchinTable: boolean;
}

const RenderNestedItems: React.FC<RenderNestedItemsProps> = ({
  items,
  fetchError,
  isFetchinTable,
}) => {
  const colorScheme = useColorScheme();
  const themeStyles = coustomTheme();

  return (
    <View style={styles.container}>
      <>
        {fetchError && (
          <View style={styles.renderError}>
            <Text style={[styles.errorText, themeStyles.error]}>
              {fetchError}
            </Text>
          </View>
        )}
        {isFetchinTable && (
          <View style={styles.loadingIndicator}>
            <ActivityIndicator
              size='large'
              color={colorScheme == "light" ? "black" : "white"}
            />
            <Text style={styles.loadingIndicatorText}>
              Kategorien werden geladen. Das kann je nach Internetverbindung,
              einen kleinen Augenblick dauern!
            </Text>
            <Text style={styles.loadingIndicatorText}>
              Allahumma salli ala Muhammad wa aali Muhammad
            </Text>
          </View>
        )}
        {items.length > 0 && (
          <View style={styles.itemsContainer}>
            <FlashList
              data={items}
              extraData={colorScheme}
              estimatedItemSize={85}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Link
                  style={styles.FlashListItems}
                  key={item.id.toString()}
                  href={{
                    pathname: "elements/renderCategory/[renderCategory]",
                    params: {
                      subCategory: `${encodeTitle(item.title)}`,
                      id: item.id.toString(),
                      fetchError: fetchError,
                    },
                  }}
                  asChild
                >
                  <Pressable>
                    <View
                      style={[styles.renderItem, themeStyles.containerContrast]}
                    >
                      <Text style={styles.itemText}>
                        {formatTitle(item.title)}
                      </Text>
                      <Feather
                        name='arrow-right-circle'
                        size={25}
                        color={colorScheme === "light" ? "black" : "white"}
                      />
                    </View>
                  </Pressable>
                </Link>
              )}
            />
          </View>
        )}
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    marginBottom: 10,
  },
  itemsContainer: {
    flex: 1,
  },
  FlashListItems: {
    paddingTop: 15,
  },
  renderItem: {
    flexDirection: "row",
    padding: 20,
    borderWidth: 0.2,
    alignItems: "center",
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    paddingRight: 20,
    lineHeight: 30,
  },
  renderError: {
    marginTop: 20,
    paddingLeft: 12,
    paddingRight: 12,
  },
  errorText: {
    fontSize: 20,
    textAlign: "center",
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  loadingIndicatorText: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 15,
  },
});

export default RenderNestedItems;
