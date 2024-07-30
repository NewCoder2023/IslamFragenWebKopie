// useInitializeSettings.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { notifyInfo } from "components/toast";

const useInitializeSettings = (setFontSize, setLineHeight) => {
  // Check if app has been opened before
  const initialFetchDone = async () => {
    const initialTable = await AsyncStorage.getItem("initialFetchDoneTable");
    const initialSub = await AsyncStorage.getItem("initialFetchDoneSub");
    console.log("initialTable " + initialTable);
    console.log("initialSub " + initialSub);
    if (!initialTable || !initialSub) {
      notifyInfo(
        "Daten werden geladen! Es kann einige Minuten dauern, bis du alle Fragen angezeigt bekommst"
      );
    }
  };

  // Get saved fontsettings (Size and Lineheight)
  const getFontSetting = async () => {
    const storedFontSize = await AsyncStorage.getItem("fontSize");
    const storedLineHeight = await AsyncStorage.getItem("lineHeight");
    if (storedFontSize) {
      setFontSize(Number(storedFontSize));
    }

    if (storedLineHeight) {
      setLineHeight(Number(storedLineHeight));
    }
  };

  const initializeSettings = async () => {
    await getFontSetting();
  };

  return {
    initialFetchDone,
    initializeSettings
  };
};

export default useInitializeSettings;
