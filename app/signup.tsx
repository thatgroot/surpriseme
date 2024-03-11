import React, { useContext } from "react";
import { View, Image, TextInput, StyleSheet, Text } from "react-native";
import Button from "../elements/Button";
import AppBar from "../components/AppBar";
import { useRouter } from "expo-router";
import useDataStore from "../store";

export default function SignUp() {
  const router = useRouter();

  const { bio, setBio } = useDataStore();

  return (
    <View
      style={{
        ...styles.container,
        paddingTop: 48,
        paddingHorizontal: 24,
        flex: 1,
      }}
    >
      <AppBar logo="" authenticated={false} />
      <View style={styles.illustrationContainer}>
        <Image source={require("../assets/images/signup-illustration.png")} />
      </View>
      <View style={styles.contentContainer}>
        <Image
          source={require("../assets/images/signup-illustration2.png")}
          style={{
            width: 325,
            height: 325,
          }}
        />
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={(text) => {
              setBio({
                ...bio,
                name: text,
              });
            }}
            value={`${bio.name}`}
            placeholder="Your Name"
            style={styles.input}
          />
          <TextInput
            onChangeText={(text) => {
              setBio({
                ...bio,
                phone: text,
              });
            }}
            value={`${bio.phone}`}
            placeholder="Your Phone Number"
            style={styles.input}
          />
        </View>
        <Button
          onPress={() => {
            router.push("/bestie");
          }}
          label="Next"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    backgroundColor: "white",
    gap: 84,
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 16,
  },
  illustrationContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-start",
    width: 430,
    position: "absolute",
    bottom: 0,
    gap: 2.5,
  },
  illustrationImage: {
    width: 379,
    height: 386,
  },
  inputContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 4,
  },
  input: {
    fontSize: 16,
    fontWeight: "bold",
    width: 244,
    height: 44,
    padding: 12,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#ca00ff",
    marginBottom: 9,
  },
});
