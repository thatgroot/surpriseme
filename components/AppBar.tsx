import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { base64 } from "../assets";
import { LinearGradient } from "expo-linear-gradient";
// @ts-ignore
// import user from '../assets/image/user.png';

interface Props {
  authenticated?: boolean;
  logo: string;
}

const AppBar = ({ logo = base64.logo, authenticated = true }: Props) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: logo, width: 125 }} style={styles.logo} />

      {authenticated ? (
        <LinearGradient
          colors={["#F5697375", "#F5697360"]} // Array of color stops
          start={{ x: 0.15, y: 0.3 }} // Starts in the center (adjust if needed)
          end={{ x: 1, y: 0.5 }} // Ends in the bottom right (adjust if needed)
          style={{
            borderRadius: 32.89,
          }}
        >
          <View style={styles.authenticatedContainer}>
            <Image
              source={require("../assets/images/user.png")}
              style={styles.userIcon}
            />

            <Image source={{ uri: base64.chevron, width: 13, height: 8.1 }} />
          </View>
        </LinearGradient>
      ) : (
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Sign up</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    position: "relative",
  },
  logo: {
    height: 30, // Adjust the height as needed
  },
  authenticatedContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 40,
    width: 136,
    paddingHorizontal: 12,
  },
  userIcon: {
    height: 32,
    width: 32,
  },

  dropdownArrow: {
    marginLeft: 6,
  },

  signupContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 94,
    height: 40, // Adjust the height as needed
    borderRadius: 46.01,
    borderWidth: 1,
    borderColor: "#d1d1d1",
  },
  signupText: {
    fontSize: 14, // Adjust the font size as needed
    color: "black",
  },
});

export default AppBar;
