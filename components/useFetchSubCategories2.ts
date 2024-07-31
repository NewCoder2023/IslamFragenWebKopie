import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "utils/supabase";
import { useEffect, useCallback } from "react";
import { useFetchCategories } from "./useFetchCategories";
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
  const { data: tableNamesData, isLoading: isTableNamesLoading, error: tableNamesError } = useFetchCategories();

  // Adjusting the type definition to match the expected structure
  const tableNames = tableNamesData?.flatMap((table: { tableName: string; category: string }) =>
    table.tableName.split(",").map((t: string) => t.trim())
  );

  const queryKey = ["subCategories", tableNames];

  const fetchSubCategoriesQuery = useQuery({
    queryKey,
    queryFn: () => fetchSubCategories(tableNames || []),
    enabled: !!tableNames && tableNames.length > 0,
  });

  const { data: subCategories, isLoading: isFetchingSub, error: fetchError } = fetchSubCategoriesQuery;

  const subscribeToTable = useCallback(() => {
    if (tableNames) {
      const subscriptions = tableNames.map((tableName) => {
        return supabase
          .channel(tableName)
          .on("postgres_changes", { event: "INSERT", schema: "public", table: tableName }, () => {
            Toast.show({ type: "info", text1: "Die Fragen und Antworten wurden aktualisiert!" });
            queryClient.invalidateQueries(["subCategories"]);
            router.navigate("/");
          })
          .on("postgres_changes", { event: "UPDATE", schema: "public", table: tableName }, () => {
            Toast.show({ type: "info", text1: "Die Fragen und Antworten wurden aktualisiert!" });
            queryClient.invalidateQueries(["subCategories"]);
            router.navigate("/");
          })
          .on("postgres_changes", { event: "DELETE", schema: "public", table: tableName }, () => {
            Toast.show({ type: "info", text1: "Die Fragen und Antworten wurden aktualisiert!" });
            queryClient.invalidateQueries(["subCategories"]);
            router.navigate("/");
          })
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
  }, [tableNames, subscribeToTable]);

  return {
    fetchError,
    subCategories,
    refetch: () => queryClient.invalidateQueries(["subCategories"]),
    isFetchingSub: isTableNamesLoading,
    tableNamesError,
  };
}
