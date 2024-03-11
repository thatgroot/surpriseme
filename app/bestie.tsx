import React, { useContext } from "react";
import { View, Text, TextInput, Image, StyleSheet } from "react-native";

import Button from "../elements/Button";
import { useRouter } from "expo-router";
import { base64 } from "../assets";
import useDataStore from "../store";
import AppBar from "../components/AppBar";

import { Poppins_600SemiBold, useFonts } from "@expo-google-fonts/poppins";

export default function Bestie() {
  const router = useRouter();
  const { bestie, setBestie } = useDataStore();
  let [fontsLoaded] = useFonts({
    bold: Poppins_600SemiBold,
  });
  if (!fontsLoaded) {
    return null;
  }
  const handleNameChange = (text: any) => {
    setBestie({
      ...bestie,
      name: text,
    });
  };

  const handlePhoneChange = (text: any) => {
    setBestie({
      ...bestie,
      phone: text,
    });
  };

  return (
    <View
      style={{
        ...styles.container,
        paddingTop: 48,
        paddingHorizontal: 24,
        flex: 1,
      }}
    >
      <AppBar logo={""} authenticated={false} />
      <View style={styles.sliceContainer}>
        <Image
          source={{ uri: base64.orangeSlice, width: 32, height: 24 }}
          height={28}
          width={28}
          style={{
            objectFit: "contain",
          }}
        />
      </View>
      <View
        style={{
          display: "flex",
          gap: 36,
          alignItems: "center",
        }}
      >
        <Text style={styles.headerText}>Tag Your Bestie</Text>
        <View style={styles.content}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Your Bestie Name"
              style={styles.input}
              value={bestie.name}
              onChangeText={handleNameChange}
            />
            <TextInput
              placeholder="Your Phone Number"
              style={styles.input}
              value={`${bestie.phone}`}
              onChangeText={handlePhoneChange}
            />
          </View>
          <Button onPress={() => router.push("/record")} label="Next" />
        </View>
      </View>
      <Image
        source={require("../assets/images/signup-illustration.png")}
        style={styles.illustration}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    maxWidth: 375,
    padding: 6,
    paddingTop: 2,
    gap: 84,
  },
  header: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    alignSelf: "stretch",
    position: "relative",
    gap: 34,
  },
  sliceContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    minWidth: 275,
  },
  headerText: {
    fontSize: 30,
    width: 150,
    textAlign: "center",
    color: "black",
    fontFamily: "bold",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 48,
    zIndex: 20,
  },
  inputContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 18,
  },
  input: {
    fontSize: 16,
    fontWeight: "bold",
    justifyContent: "flex-start",
    alignItems: "center",
    width: 244,
    height: 44,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#ca00ff",
  },

  illustration: {
    position: "absolute",
    bottom: 0,
  },
});
