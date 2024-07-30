import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist } from 'zustand/middleware';

const useColorSchemeStore = create(
  persist(
    (set) => ({
      colorScheme: 'light',
      toggleColorScheme: () =>
        set((state) => ({
          colorScheme: state.colorScheme === 'light' ? 'dark' : 'light',
        })),
    }),
    {
      name: 'color-scheme-storage', // name of item in the storage
      getStorage: () => AsyncStorage, // use AsyncStorage for persistence
    }
  )
);

export default useColorSchemeStore;
