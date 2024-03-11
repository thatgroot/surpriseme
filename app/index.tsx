import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { base64 } from "../assets";
import Button from "../elements/Button";
// @ts-ignore
import bg from "../assets/images/bg.png";
// @ts-ignore
import illustration from "../assets/images/illustration.png";
import { useRouter } from "expo-router";
import AppBar from "../components/AppBar";
import {
  Poppins_800ExtraBold,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { sendMessage } from "../utils/twilio";

const Splash = () => {
  const router = useRouter();
  let [fontsLoaded] = useFonts({
    black: Poppins_800ExtraBold,
    bold: Poppins_700Bold,
  });
  const { logo, orangeSlice, greenSlice } = base64;
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View
      style={{
        paddingTop: 48,
        paddingHorizontal: 24,
        flex: 1,
      }}
    >
      <Image source={bg} style={styles.bgImage} />
      <AppBar logo="" authenticated={false} />
      <View style={styles.scaffold}>
        <View style={styles.topContent}>
          <View style={styles.sliceContainer}>
            <Image
              source={{ uri: orangeSlice }}
              height={28}
              width={28}
              style={{
                objectFit: "contain",
              }}
            />
          </View>
          <View style={styles.textContainer}>
            <Text
              style={{
                fontSize: 36,
                textAlign: "center",
                fontFamily: "bold",
              }}
            >
              CELEBRATE
            </Text>
            <Button
              onPress={() => {
                router.push("/date");
              }}
              label="When is Your Birthday?"
            />
            <Text style={styles.tagline}>
              Celebrate with a gift from a friend.
            </Text>
          </View>
          <View
            style={{
              ...styles.sliceContainer,
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <Image
              source={{ uri: greenSlice }}
              height={28}
              width={28}
              style={{
                objectFit: "contain",
              }}
            />
          </View>
        </View>
        <View style={styles.illustration}>
          <Image source={illustration} />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  scaffold: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    maxWidth: 430,
    position: "relative",
    overflow: "hidden",
    padding: 6,
    gap: 64,
    paddingTop: 8,
  },
  sliceContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    minWidth: 275,
  },
  bgImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
  body: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    flexGrow: 1,
    position: "relative",
  },
  bodyTop: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "relative",
    gap: 6,
  },
  topContent: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 36,
    // ... other flex styles
  },
  textContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 48,
  },
  textWrapper: {
    // Styles for text wrapper
    // ... other styles
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  button: {
    // Styles for the button
    // ... other button styles
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },

  tagline: {
    width: 272,
    fontSize: 25,
    fontFamily: "black",
    textAlign: "center",
    color: "black",
  },
  illustration: {
    height: 188,
    // Other styles for illustration
    position: "absolute",
    bottom: 0,
  },
});

export default Splash;
