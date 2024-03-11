import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import { useRouter } from "expo-router";
import AppBar from "../components/AppBar";
import Button from "../elements/Button";
import { Audio } from "expo-av";
import * as Sharing from "expo-sharing";
import useDataStore from "../store";
import { base64 } from "../assets";
import { useUpload } from "../hooks/server";
import { handleFileUpload } from "../utils/audio";

export default function RecordScreen() {
  const router = useRouter();
  const [recording, setRecording] = useState<Audio.Recording>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Audio.Recording>();
  const [uri, setUri] = useState<string>();
  const [elapsedTime, setElapsedTime] = useState(0);
  const { bestie, setChannel, channel } = useDataStore();
  const [done, setDone] = useState(false);
  const { uploadStatus, error, url, handleUpload } = useUpload();

  async function startRecording() {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
      );

      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording..");
    setRecording(undefined);
    await recording?.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });

    const uri = recording?.getURI();

    setUri(uri ?? "");
    handleFileUpload(uri ?? "");
    console.log("Recording stopped and stored at", uri);
  }

  async function playRecording() {
    try {
      const audio = await Audio.Sound.createAsync(
        { uri: uri ?? "" },
        { shouldPlay: true, isLooping: true },
      );
      const { sound } = audio;
      //@ts-ignore
      setSound(sound);
      setIsPlaying(true);

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && !status.isPlaying) {
          // Clear the interval when playback is complete
          setIsPlaying(false);
          setElapsedTime(0);
        } else if (status.isLoaded) {
          setElapsedTime(status.positionMillis);
        }
      });
    } catch (error) {
      console.error("Error loading sound", error);
    }
  }

  async function stopPlayback() {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
      setElapsedTime(0);
    }
  }

  async function shareAudio() {
    const audio = new Audio.Sound();
    await audio.loadAsync({ uri: uri ?? "" });

    await Sharing.shareAsync(uri ?? "", {
      dialogTitle: "Hello",
    });

    console.log("uri", uri);
    // Handle result as in the text sharing example
  }
  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    if (isPlaying) {
      interval = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1000);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isPlaying]);
  const handleSendMessage = async () => {
    const phoneNumber = bestie.phone;
    const message = `Hi, The Print Project here! You were selected to shop our Fly Surprise Birthday Card! Your friend is waiting for you to make them smile, scream or laugh with this pleasant surprise.
    Shop Now: https://www.etsy.com/listing/1392286959/personalized-photo-birthday-card-custom?click_key=9b729f83078212c5f0d0943520decdbf80f41fb3%3A1392286959&click_sum=c9f4e2c3&ref=hp_rv-1&sts=1`;

    const url = `sms://${phoneNumber}${message ? `?body=${message}` : ""}`; // Optionally pre-fill message
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      // Handle unsupported scenario (inform user?)
    }
  };
  const handleWhatsApp = async () => {
    const phoneNumber = bestie.phone;
    const message = `Hi, The Print Project here! You were selected to shop our Fly Surprise Birthday Card! Your friend is waiting for you to make them smile, scream or laugh with this pleasant surprise.
    Shop Now: https://www.etsy.com/listing/1392286959/personalized-photo-birthday-card-custom?click_key=9b729f83078212c5f0d0943520decdbf80f41fb3%3A1392286959&click_sum=c9f4e2c3&ref=hp_rv-1&sts=1`;

    const url = `whatsapp://send?phone=${phoneNumber}&text=${message}`;
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      await Linking.openURL(
        `https://wa.me/phone=${phoneNumber}&text=${message}`,
      );
    }
  };

  return (
    <View
      style={{
        ...styles.container,
        paddingTop: 48,
        paddingHorizontal: 24,
        flex: 1,
        gap: 84,
      }}
    >
      <AppBar logo={base64.logo} authenticated={false} />
      <View
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          gap: 72,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            gap: 24,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: 6,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#eeefef",
                width: 325,
                paddingVertical: 6,
                paddingHorizontal: 12,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  position: "relative",
                  gap: 12,
                }}
              >
                <Image
                  source={require("../assets/images/message.png")}
                  style={{
                    width: 36,
                    height: 36,
                    objectFit: "cover",
                  }}
                />
                <Text
                  style={{
                    fontSize: 16,
                    textAlign: "left",
                    color: "#4e4e4e",
                  }}
                >
                  MESSAGES
                </Text>
              </View>
              <Text
                style={{
                  width: 44,
                  fontSize: 14,
                  textAlign: "left",
                  color: "#4e4e4e",
                }}
              >
                now
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                padding: 12,
                borderBottomLeftRadius: 6,
                borderBottomRightRadius: 6,
                width: 325,
                backgroundColor: "#ddd",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  textAlign: "left",
                  color: "#4a4a4a",
                }}
              >
                Matt D. Smith
              </Text>
              <Text
                style={{
                  textAlign: "left",
                  color: "#4a4a4a",
                }}
              >
                Using the voice record button, let your bestie know that we sent
                them a text that contains your surprise gift
                <Text
                  style={{
                    fontSize: 16,
                    textAlign: "left",
                    color: "#4a4a4a",
                  }}
                >
                  🤗🎁
                </Text>
              </Text>
            </View>
          </View>

          {/* <TouchableOpacity
            onPress={recording ? stopRecording : startRecording}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              position: "relative",
              gap: 24,
            }}
          >
            <Image
              source={
                recording
                  ? require("../assets/images/pause.png")
                  : require("../assets/images/record.png")
              }
              style={{
                width: 88,
                height: 88,
              }}
            />
            <Text
              style={{
                fontSize: 25,
                textAlign: "center",
                color: "#cc03f5",
              }}
            >
              {formatTime(elapsedTime)}
            </Text>
          </TouchableOpacity> */}

          {/* <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              gap: 22,
              backgroundColor: "#fff",
            }}
          >
            <TouchableOpacity
              onPress={isPlaying ? stopPlayback : playRecording}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 12,
              }}
            >
              <Image
                source={
                  isPlaying
                    ? require("../assets/images/pause.png")
                    : require("../assets/images/play.png")
                }
                style={{
                  width: 32,
                  height: 32,
                  objectFit: "cover",
                }}
              />
              <View
                style={{
                  width: 175,
                  height: 3.35,
                  backgroundColor: "#CC03F5",
                  borderRadius: 2,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                shareAudio();
              }}
            >
              <Image
                source={require("../assets/images/share.png")}
                style={{
                  width: 43.19,
                  height: 32,
                  objectFit: "cover",
                }}
              />
            </TouchableOpacity>
          </View> */}
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 24,
          }}
        >
          <TouchableOpacity
            style={{
              borderWidth: 2,
              borderRadius: 100,
              borderColor: channel === "sms" ? "red" : "white",
            }}
            onPress={() => {
              setChannel("sms");
            }}
          >
            <Image
              source={{ uri: base64.sms }}
              style={{
                height: 48,
                width: 48,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderWidth: 2,
              borderRadius: 100,
              borderColor: channel === "whatsapp" ? "red" : "white",
            }}
            onPress={() => {
              setChannel("whatsapp");
            }}
          >
            <Image
              source={{ uri: base64.whatsapp }}
              style={{
                height: 48,
                width: 48,
              }}
            />
          </TouchableOpacity>
        </View>
        <Button
          onPress={() => {
            if (done) {
              router.push("/awesome");
              return;
            }
            if (channel === "whatsapp") {
              handleWhatsApp();
            } else {
              handleSendMessage();
            }
            setTimeout(() => {
              setDone(true);
            }, 1500);
          }}
          label={done ? "Next" : "Send Message"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    padding: 6,
    paddingTop: 2,
    overflow: "hidden",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 12,
    padding: 6,
    maxWidth: 430,
    height: "100%",
    position: "relative",
    overflow: "hidden",
  },
  logoContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 6,
  },
  logo: {
    height: 70,
    width: "100%",
  },
  content: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 16,
  },
  messageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 1.5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#eeefef",
  },
  messageContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 6,
    padding: 6,
    backgroundColor: "white", // Adjust the background color as needed
  },
  recordContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 46,
  },
  recordTime: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#cc03f5",
    textAlign: "center",
  },
  chatIcon: {
    width: 9,
    height: 9,
    objectFit: "cover",
  },
  messageHeaderText: {
    fontSize: 16,
    color: "#4e4e4e",
    textAlign: "left",
  },
  messageTime: {
    width: 11,
    fontSize: 16,
    color: "#4e4e4e",
    textAlign: "left",
  },
  messageBody: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 1.5,
    padding: 3,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: "#ddd",
  },
  messageText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4a4a4a",
    textAlign: "left",
  },
  recordButton: {
    // Adjust styles for the record button
  },
  sendContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  sendButton: {
    // Adjust styles for the send button
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
});
