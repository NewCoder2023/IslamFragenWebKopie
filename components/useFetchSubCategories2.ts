import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "utils/supabase";
import { useEffect, useCallback } from "react";
import { useFetchCategories } from "components/useFetchCategories";
import Toast from "react-native-toast-message";
import { router } from "expo-router";

interface SubCategoryItem {
  id: number;
  title: string;
}

interface TableData {
  tableName: string;
  questions: SubCategoryItem[];
}

const fetchSubCategories = async (tableNames: string[]) => {
  const fetchTableData = async (tableName: string) => {
    const { data, error } = await supabase
      .from(tableName)
      .select("*")
      .order("title", { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    return { tableName, questions: data as SubCategoryItem[] };
  };

  const allData = await Promise.all(tableNames.map(fetchTableData));
  return allData;
};

export default function useFetchSubCategories() {
  const queryClient = useQueryClient();
  const {
    data: tableNamesData,
    isFetchingCat,
    CategoriesError,
  } = useFetchCategories();

  // Adjusting the type definition to match the expected structure
  const tableNames = tableNamesData?.flatMap(
    (table: { tableName: string; category: string }) =>
      table.tableName.split(",").map((t: string) => t.trim())
  );

  const queryKey = ["subCategories", tableNames];

  const fetchSubCategoriesQuery = useQuery({
    queryKey,
    queryFn: () => fetchSubCategories(tableNames || []),
    enabled: !!tableNames && tableNames.length > 0,
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    gcTime: 1000 * 60 * 10, // Keep data in cache for 10 minuten
  });

  const {
    data: subCategories,
    isLoading: isFetchingSub,
    error: SubCategoriesError,
  } = fetchSubCategoriesQuery;

  const subscribeToTable = useCallback(() => {
    if (tableNames) {
      const subscriptions = tableNames.map((tableName) => {
        return supabase
          .channel(tableName)
          .on(
            "postgres_changes",
            { event: "INSERT", schema: "public", table: tableName },
            () => {
              Toast.show({
                type: "info",
                text1: "Die Fragen und Antworten wurden aktualisiert!",
              });
              queryClient.invalidateQueries({ queryKey: ["subCategories"] });
              router.navigate("/");
            }
          )
          .on(
            "postgres_changes",
            { event: "UPDATE", schema: "public", table: tableName },
            () => {
              Toast.show({
                type: "info",
                text1: "Die Fragen und Antworten wurden aktualisiert!",
              });
              queryClient.invalidateQueries({ queryKey: ["subCategories"] });
              router.navigate("/");
            }
          )
          .on(
            "postgres_changes",
            { event: "DELETE", schema: "public", table: tableName },
            () => {
              Toast.show({
                type: "info",
                text1: "Die Fragen und Antworten wurden aktualisiert!",
              });
              queryClient.invalidateQueries({ queryKey: ["subCategories"] });
              router.navigate("/");
            }
          )
          .subscribe();
      });

      return () => {
        subscriptions.forEach((subscription) => subscription.unsubscribe());
      };
    }
  }, [tableNames, queryClient]);

  useEffect(() => {
    if (tableNames) {
      const unsubscribe = subscribeToTable();
      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }
    console.log(subCategories);
  }, [tableNames, subscribeToTable]);

  return {
    SubCategoriesError: SubCategoriesError ? SubCategoriesError.message : undefined,
    subCategories,
    refetch: () =>
      queryClient.invalidateQueries({ queryKey: ["subCategories"] }),
    isFetchingSub: isFetchingCat,
    CategoriesError,
  };
}
