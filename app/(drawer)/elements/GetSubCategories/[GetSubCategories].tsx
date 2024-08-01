import { View, Text } from "components/Themed";
import { StyleSheet } from "react-native";
import React, { useLayoutEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import RenderSubCategories from "components/RenderSubCategories";
import { Stack } from "expo-router";
import useFetchSubCategories from "components/useFetchSubCategories2";
import { useRefetchSubeStore } from "components/refetchSubStore";

export default function GetSubCategories() {
  const { subCategory } = useLocalSearchParams<{ subCategory: string }>();
  const { fetchError, subCategories, refetch, isFetchingSub } =
    useFetchSubCategories();
  const { fetchStatus, setRefetch, hasRefetched } = useRefetchSubeStore();

  const encodeTable = (title: string) => {
    const cleanTable = title.trim().replace(/\n/g, "");
    return encodeURIComponent(cleanTable)
      .replace(/\(/g, "%28")
      .replace(/\)/g, "%29");
  };

  // Use effect hook to refetch data when subCategory changes
  useLayoutEffect(() => {
    if (subCategory && !hasRefetched(subCategory)) {
      refetch();
      setRefetch(subCategory);
    }
  }, [subCategory, refetch, setRefetch, hasRefetched]);

  // Determine matched table and filtered items based on subCategory
  const matchedTable = subCategories?.find(
    (table) => table.tableName === subCategory
  );
  const filteredItems = matchedTable ? matchedTable.questions : [];

  console.log(subCategory);
  return (
    <View style={styles.container}>
      {!subCategory ? (
        <RenderSubCategories
          items={[]}
          fetchError={fetchError}
          table=''
          isFetching={isFetchingSub}
        />
      ) : (
        <>
          <Stack.Screen options={{ headerTitle: subCategory }} />
          <RenderSubCategories
            items={filteredItems}
            fetchError={fetchError}
            table={encodeTable(subCategory)}
            isFetching={isFetchingSub}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
