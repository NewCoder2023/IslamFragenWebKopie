import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import RenderNestedItems from "components/RenderNestedItems";
import { Stack } from "expo-router";
import { useFetchCategories } from "components/useFetchCategories";

export default function RenderNestedCategories() {
  const { category } = useLocalSearchParams<{ category: string }>();

  const encodeTable = (title: string) => {
    const cleanTable = title.trim().replace(/\n/g, "");
    return encodeURIComponent(cleanTable)
      .replace(/\(/g, "%28")
      .replace(/\)/g, "%29");
  };

  const { data: tableNames, error, isLoading } = useFetchCategories();

  if (!category) {
    return (
      <View style={styles.container}>
        <RenderNestedItems
          items={[]}
          fetchError='Invalid category'
          table=''
          isFetchinTable={isLoading}
        />
      </View>
    );
  }

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error loading data: {error.message}</Text>;
  }

  // Filter and map the category items
  const categoryItems = tableNames
    .filter((item) => item.category === category)
    .map((item, index) => ({
      id: index,
      title: item.tableName.trim(),
    }));

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerTitle: category }} />
      <RenderNestedItems
        items={categoryItems}
        fetchError={error ? error.message : null}
        table={encodeTable(category)}
        isFetchinTable={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
