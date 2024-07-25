import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hjyfekrajykvtyodsuks.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqeWZla3JhanlrdnR5b2RzdWtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYyMzQwOTcsImV4cCI6MjAzMTgxMDA5N30.uLgXLZc9ZvU__76A2sGfS0s_C3DvxoivfiawpTTgka0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: {
      getItem: (key) => Promise.resolve(window.localStorage.getItem(key)),
      setItem: (key, value) => {
        window.localStorage.setItem(key, value);
        return Promise.resolve();
      },
      removeItem: (key) => {
        window.localStorage.removeItem(key);
        return Promise.resolve();
      },
    },
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

