import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
// import {
//   WhatsappShareButton,
//   WhatsappIcon,
//   EmailShareButton,
//   EmailIcon,
// } from 'react-share';
import { useRouter } from "expo-router";
import Button from "../elements/Button";
import { LinearGradient } from "expo-linear-gradient";
import AppBar from "../components/AppBar";
import { base64 } from "../assets";

const AudioShareComponent = () => {
  const textToShare =
    "Matt D. Smith \n Using the voice record button, let your bestie know that we sent them a text that contains your surprise gift 🤗🎁";

  // Define the URL scheme for WhatsApp
  const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(
    textToShare,
  )}&audio`;
  console.log("whatsappUrl", whatsappUrl);

  // Define the URL scheme for SMS (Note: This is a generic example, actual behavior may vary)
  const smsUrl = `sms:?body=${encodeURIComponent(textToShare)}&attachment=`;

  return (
    <View
      style={{
        flex: 1,
        gap: 12,
      }}
    >
      {/* Share via WhatsApp */}
      {/* <WhatsappShareButton url={whatsappUrl} title={textToShare}>
        <WhatsappIcon size={32} round />
      </WhatsappShareButton> */}

      {/* Share via SMS */}
      <a href={smsUrl} target="_blank" rel="noopener noreferrer">
        Share via SMS
      </a>
    </View>
  );
};

function AwesomeBirthDay() {
  const router = useRouter();

  return (
    <LinearGradient
      style={{
        ...styles.container,
        paddingTop: 48,
        paddingHorizontal: 24,
        flex: 1,
      }}
      colors={["#ff4b00", "#ca00fe"]}
      start={{ x: -0.3763, y: 0 }}
      end={{ x: 0.9403, y: 0 }} //
    >
      <AppBar logo={base64.logo_light} authenticated={true} />

      <View style={styles.container}>
        <Text style={styles.title}>
          You’re All Set Awesome Gift, Awesome Birthday
        </Text>
        <Image source={require("../assets/images/alldone.png")} />
        <Button
          bg="#e2e2e270"
          onPress={() => {
            router.push("/");
          }}
          label="Back to Home"
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingTop: 8,
  },
  contentContainer: {
    flex: 0,
    flexGrow: 0,
    flexShrink: 0,
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 3,
  },
  title: {
    flex: 0,
    flexGrow: 0,
    flexShrink: 0,
    width: 375,
    height: 36,
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
});

export default AwesomeBirthDay;
