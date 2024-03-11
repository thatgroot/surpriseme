import React, { ReactNode } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  GestureResponderEvent,
} from "react-native";
import {
  Poppins_900Black,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";

type Props = {
  bg?: string;
  label?: string;
  onPress?: (event: GestureResponderEvent) => void;
  children?: ReactNode;
};

const Button = ({ bg = "#ca00ff", label, onPress, children }: Props) => {
  let [fontsLoaded] = useFonts({
    black: Poppins_900Black,
    bold: Poppins_700Bold,
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        borderRadius: 100,
        backgroundColor: bg,
        width: 245,
      }}
    >
      {children ? (
        children
      ) : (
        <Text
          style={{
            fontSize: 16,
            fontFamily: "black",
            fontWeight: "bold",
            color: "white",
          }}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
