import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import RenderCategories from "components/RenderCategories";
import { Stack } from "expo-router";
import { useFetchCategories } from "components/useFetchCategories";
import { Loading } from "components/Loading";

export default function GetCategories() {
  const { category } = useLocalSearchParams<{ category: string }>();

  const encodeTable = (title: string) => {
    const cleanTable = title.trim().replace(/\n/g, "");
    return encodeURIComponent(cleanTable)
      .replace(/\(/g, "%28")
      .replace(/\)/g, "%29");
  };

  const {
    data: tableNames,
    CategoriesError,
    isFetchingCat,
  } = useFetchCategories();

  // Render Loading till tableNames is fetched
  if (isFetchingCat) {
    return <Loading message='Kategorien werden geladen!' />;
  }

  // Filter and map the category items
  const categoryItems = (tableNames ?? [])
    .filter((item) => item.category === category)
    .map((item, index) => ({
      id: index,
      title: item.tableName.trim(),
    }));

  return (
    <View style={styles.container}>
      {!tableNames || !category ? (
        <RenderCategories
          items={[]}
          fetchError={CategoriesError}
          table={""}
          isFetchinTable={isFetchingCat}
        />
      ) : (
        <View style={styles.container}>
          <Stack.Screen options={{ headerTitle: category }} />
          <RenderCategories
            items={categoryItems}
            fetchError={CategoriesError}
            table={encodeTable(category)}
            isFetchinTable={isFetchingCat}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
