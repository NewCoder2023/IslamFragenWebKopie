import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "utils/supabase";
import { useEffect, useCallback } from "react";
import Toast from "react-native-toast-message";
import { router } from "expo-router";

const fetchText = async (table: string, title: string) => {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq("title", title)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useFetchText = (table: string, title: string) => {
  const queryClient = useQueryClient();
  const queryKey = ["text", table, title];

  const fetchTextQuery = useQuery({
    queryKey,
    queryFn: () => fetchText(table, title),
    enabled: !!table && !!title,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 30, // 30 minutes
  });

  const { data: item, isLoading: isFetching, error: fetchError } = fetchTextQuery;

  const subscribeToTable = useCallback(() => {
    if (table) {
      const subscription = supabase
        .channel(table)
        .on("postgres_changes", { event: "INSERT", schema: "public", table }, () => {
          Toast.show({ type: "info", text1: "Data has been updated!" });
          queryClient.invalidateQueries({ queryKey });
        })
        .on("postgres_changes", { event: "UPDATE", schema: "public", table }, () => {
          Toast.show({ type: "info", text1: "Data has been updated!" });
          queryClient.invalidateQueries({ queryKey });
        })
        .on("postgres_changes", { event: "DELETE", schema: "public", table }, () => {
          Toast.show({ type: "info", text1: "Data has been updated!" });
          queryClient.invalidateQueries({ queryKey });
        })
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [table, title, queryClient, queryKey]);

  useEffect(() => {
    if (table) {
      const unsubscribe = subscribeToTable();
      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }
  }, [table, subscribeToTable]);

  return {
    item,
    fetchError,
    isFetching,
    refetch: () => queryClient.invalidateQueries({ queryKey }),
  };
};
