import { Pressable, StyleSheet } from "react-native";
import { View, Text } from "components/Themed";
import QuestionLinks from "components/QuestionLinks";
import { coustomTheme } from "components/coustomTheme";
import { useColorScheme } from "hooks/useColorScheme.web";
import { Image } from "expo-image";
import Colors from "constants/Colors";
import { ImageBackground } from "react-native";
import { useLayoutEffect } from "react";
import { Appearance } from "react-native";
import { useSetFontSize } from "components/fontSizeStore";
import useFetchSubCategories from "components/useFetchSubCategories";
import { Alert } from "react-native";
export default function index() {
  const colorscheme = useColorScheme();
  const themeStyles = coustomTheme();
  const { fontSize, setLineHeight, setFontSize } = useSetFontSize();

  // Test
  // test 2
  return (
    <View style={styles.container}>
      <View style={[styles.headerContainer, themeStyles.indexBorderDash]}>
        <View style={[styles.header, themeStyles.backgroundIndex]}>
          {/* <ImageBackground
            source={require("assets/images/background.png")}
            style={styles.calligraphyBackground}
          > */}
          <View style={styles.headerElements}>
            <View style={styles.headerImageContainer}>
              <Image
                style={styles.headerImage}
                source={require("assets/images/logo.png")}
                contentFit='contain'
              />
            </View>
            <View style={styles.headerTextContainer}>
              <Text style={[styles.headerText, themeStyles.inverseTextIndex]}>
                Islam-Fragen
              </Text>
              <Text style={[styles.headerDash, themeStyles.indexBorderDash]}>
                __________
              </Text>
            </View>
          </View>
          {/* </ImageBackground> */}
        </View>
      </View>
      <View style={styles.categoryContainer}>
        <QuestionLinks />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  headerContainer: {
    flex: 1,
    borderBottomWidth: 3,
  },
  header: {
    flex: 1,
    flexDirection: "column",
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  calligraphyBackground: {
    flex: 1,
    resizeMode: "cover",
  },

  headerElements: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  headerTextContainer: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -30,
  },
  headerImageContainer: {
    height: "80%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  headerDash: {
    marginBottom: 30,
    marginTop: -10,
    fontSize: 20,
  },
  headerText: {
    fontSize: 40,
  },

  headerImage: {
    width: "100%", // Take full width of the container
    height: "100%",
  },
  searchContainer: {
    width: "100%",
    position: "absolute",
    top: "70%",
    backgroundColor: "transparent",
  },
  search: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 20,
    paddingRight: 15,
    borderWidth: 2,
    borderRadius: 30,
    backgroundColor: "blue",
  },
  searchIcon: {
    paddingLeft: 12,
  },
  border: {
    fontSize: 25,
    paddingLeft: 3,
    paddingBottom: 5,
    fontWeight: "100",
    alignSelf: "center",
  },
  seachText: {
    paddingLeft: 5,
    fontSize: 16,
  },
  searchField: {},
  categoryContainer: {
    flex: 2,
    marginBottom: 20,
  },
});
