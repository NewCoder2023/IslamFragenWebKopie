import { useEffect, useLayoutEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useFetchSubCategories from "./useFetchSubCategories";
import { useFetchTableNames } from "./useFetchTableNames";
import { supabase } from "@/utils/supabase";
interface Item {
  id: number;
  title: string;
  answer?: string;
  answer_sistani?: string;
  answer_khamenei?: string;
  question: string;
}

const createStorageKey = (table: string) => `${table}`;

export const useFetchText = (table: string, title: string) => {
  const { tableNames, isFetchinTable, fetchTableNames } = useFetchTableNames();
  const [item, setItem] = useState<Item | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const { subCategories, refetch } = useFetchSubCategories();

  const fetchData = async () => {
    try {
      // Make sure tableNames available in case text is opend via link directly

      setIsFetching(true);
      await refetch(); // Ensure latest data is available

      const storageKey = createStorageKey(table);
      const storedData = await AsyncStorage.getItem(storageKey);

      if (storedData) {
        const parsedData: Item[] = JSON.parse(storedData); // Parse the JSON data

        // Normalizing title by trimming spaces
        const normalizedTitle = title.trim();
        const foundItem =
          parsedData.find((item) => item.title.trim() === normalizedTitle) ||
          null;

        if (foundItem) {
          setItem(foundItem);
        } else {
          setFetchError(
            `Item with title "${title}" not found in table "${table}"`
          );
        }
      } else {
        setFetchError(`Stored data not found for table "${table}"`);
      }
    } catch (error) {
      setFetchError(`Error fetching item by title: ${error}`);
      setItem(null);
    } finally {
      setIsFetching(false);
    }
  };

  useLayoutEffect(() => {
    fetchData();
  }, [table, title]);

  return { item, fetchError, isFetching };
};
