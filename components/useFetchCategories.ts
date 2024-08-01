import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "utils/supabase";
import { useEffect } from "react";
import { useCallback } from "react";
import { router } from "expo-router";

const fetchTableNames = async () => {
  const { data, error } = await supabase
    .from("AllTableNames")
    .select("tableName, category")
    .order("tableName", { ascending: true });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const useFetchCategories = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["tableNames"],
    queryFn: fetchTableNames,
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    gcTime: 1000 * 60 * 10, // Keep data in cache for 10 minuten
  });

  
  const subscribeToTable = useCallback(() => {
    const subscription = supabase
      .channel("AllTableNames")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "AllTableNames" },
        () => {
          queryClient.invalidateQueries({ queryKey: ["tableNames"] });
          router.navigate("/");
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "AllTableNames" },
        () => {
          queryClient.invalidateQueries({ queryKey: ["tableNames"] });
          router.navigate("/");
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "AllTableNames" },
        () => {
          queryClient.invalidateQueries({ queryKey: ["tableNames"] });
          router.navigate("/");
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [queryClient]);

  useEffect(() => {
    const unsubscribe = subscribeToTable();
    return () => {
      unsubscribe();
    };
  }, [subscribeToTable]);

  return {
    data: query.data,
    CategoriesError: query.error?.message || "",
    isFetchingCat: query.isLoading,
    isFetching: query.isFetching,
    refetch: query.refetch,
  };
};