import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "utils/supabase";
import { useEffect, useCallback, useState } from "react";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { notifySuccess, notifyError, notifyInfo } from "components/toast";

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
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 10,
    refetchOnReconnect: true
  });

  const {
    data: item,
    isLoading: isFetching,
    error: fetchError,
  } = fetchTextQuery;

  const subscribeToTable = useCallback(() => {
    if (table) {
      const subscription = supabase
        .channel(table)
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table },
          () => {
            notifyInfo("Die Fragen und Antworten wurden aktualisiert!");
            queryClient.invalidateQueries({ queryKey });
            router.navigate("/");
          }
        )
        .on(
          "postgres_changes",
          { event: "UPDATE", schema: "public", table },
          () => {
            notifyInfo("Die Fragen und Antworten wurden aktualisiert!");
            queryClient.invalidateQueries({ queryKey });
            router.navigate("/");
          }
        )
        .on(
          "postgres_changes",
          { event: "DELETE", schema: "public", table },
          () => {
            notifyInfo("Die Fragen und Antworten wurden aktualisiert!");
            queryClient.invalidateQueries({ queryKey });
            router.navigate("/");
          }
        )
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
    fetchError: fetchError?.message || "",
    isFetching,
    refetch: () => queryClient.invalidateQueries({ queryKey }),
  };
};
