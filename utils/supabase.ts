import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hjyfekrajykvtyodsuks.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqeWZla3JhanlrdnR5b2RzdWtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYyMzQwOTcsImV4cCI6MjAzMTgxMDA5N30.uLgXLZc9ZvU__76A2sGfS0s_C3DvxoivfiawpTTgka0";

  const isBrowser = typeof window !== 'undefined';

  export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      storage: isBrowser
        ? {
            getItem: (key) => Promise.resolve(window.localStorage.getItem(key)),
            setItem: (key, value) => {
              window.localStorage.setItem(key, value);
              return Promise.resolve();
            },
            removeItem: (key) => {
              window.localStorage.removeItem(key);
              return Promise.resolve();
            },
          }
        : {
            getItem: async () => null,
            setItem: async () => {},
            removeItem: async () => {},
          },
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  });