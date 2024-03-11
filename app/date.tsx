import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
} from "react-native";
import { base64 } from "../assets";
import AppBar from "../components/AppBar";
import Button from "../elements/Button";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import useDataStore from "../store";

export default function Date() {
  const router = useRouter();
  const { dob, setDob } = useDataStore();
  const [checkedIndex, setCheckedIndex] = useState(dob.date - 1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleYearChange = (value: string | number) => {
    setDob({
      ...dob,
      year: +value,
    });
  };

  const handleMonthChange = (value: string | number) => {
    setDob({
      ...dob,
      month: +value,
    });
  };

  const handleDateSelection = (
    date: number,
    index: React.SetStateAction<number>,
  ) => {
    setDob({
      ...dob,
      date,
    });
    setCheckedIndex(index);
  };

  const handleNextButtonClick = () => {
    router.push("/signup");
  };

  return (
    <View
      style={{
        ...styles.container,
        backgroundImage: require("../assets/images/bg-date.png"),
        paddingTop: 48,
        paddingHorizontal: 24,
      }}
    >
      <AppBar logo="" authenticated={false} />
      <Image
        source={require("../assets/images/date_illustration.png")}
        style={styles.illustration}
      />
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <View style={styles.sliceContainer}>
            <Image
              source={{ uri: base64.orangeSlice }}
              height={28}
              width={28}
              style={{
                objectFit: "contain",
              }}
            />
          </View>
          <Text style={styles.titleText}>When is the Big Day</Text>
        </View>
        <View
          style={{
            display: "flex",
            maxWidth: 275,
            backgroundColor: "white",
            borderRadius: 18,
            padding: 12,
          }}
        >
          <View style={styles.datePickerContainer}>
            <TouchableOpacity
              onPress={handleToggleModal}
              style={{
                ...styles.datePickerButton,
                flex: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Image
                source={require("../assets/images/arrowLeft.png")}
                style={{
                  height: 10,
                  objectFit: "contain",
                }}
              />
              <Text style={styles.datePickerButtonText}>{`${
                months[dob.month - 1]
              } ${dob.year}`}</Text>
              <Image
                source={require("../assets/images/arrowRight.png")}
                style={{
                  height: 10,
                  objectFit: "contain",
                }}
              />
            </TouchableOpacity>

            <Modal
              animationType="slide"
              transparent={true}
              visible={isModalOpen}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Year"
                    keyboardType="numeric"
                    value={dob.year.toString()}
                    onChangeText={handleYearChange}
                  />
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Month"
                    keyboardType="numeric"
                    value={dob.month.toString()}
                    onChangeText={handleMonthChange}
                  />
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={handleToggleModal}
                  >
                    <Text style={styles.modalButtonText}>Done</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
          <View style={styles.weekdaysContainer}>
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, index) => (
              <View key={index} style={styles.weekday}>
                <Text style={styles.weekdayText}>{day}</Text>
              </View>
            ))}
          </View>
          <View style={styles.datesContainer}>
            {Array.from({ length: 31 }, (_, index) => ({
              date: index + 1,
              disabled: index > 28,
              checked: index == checkedIndex,
            })).map(({ date, disabled, checked }, index) => (
              <TouchableOpacity
                key={index}
                style={{ width: 32, height: 32 }}
                onPress={() => handleDateSelection(date, index)}
              >
                <LinearGradient
                  colors={
                    checked ? ["#ff4b00", "#ca00fe"] : ["#ffffff", "#ffffff"]
                  }
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={[styles.dateText, checked && styles.checkedDateText]}
                  >
                    {date}
                  </Text>
                  {checked && (
                    <Image
                      source={{ uri: base64.check }}
                      style={styles.checkIcon}
                    />
                  )}
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <Button onPress={handleNextButtonClick} label="Next" />
      </View>
    </View>
  );
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  illustration: {
    width: 530,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  contentContainer: {
    zIndex: 10,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
  },
  titleContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 10,
    minWidth: 275,
  },
  sliceContainer: {
    display: "flex",
    alignItems: "flex-start",
    minWidth: 275,
  },
  orangeSlice: {
    height: 28,
  },
  title: {
    display: "flex",
    flexDirection: "column",
  },
  titleText: {
    color: "black",
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 5,
  },
  datePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  datePickerButton: {
    borderRadius: 8,
    paddingVertical: 8,
  },
  datePickerButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalInput: {
    width: 150,
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    marginVertical: 10,
    padding: 8,
  },
  modalButton: {
    backgroundColor: "#ff4b00",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  weekdaysContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  weekday: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    backgroundColor: "white",
  },
  weekdayText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  datesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    width: "100%",
  },
  dateButton: {
    display: "flex",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderWidth: 1,
    borderColor: "black",
  },
  checkedDateButton: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  disabledDateButton: {
    opacity: 0.5,
  },
  dateText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
  },
  checkedDateText: {
    color: "white",
  },
  checkIcon: {
    width: 12,
    height: 12,
    position: "absolute",
    top: 2,
    right: 2,
  },
  backgroundImage: {
    zIndex: 0,
    position: "absolute",
    bottom: -24,
    left: 0,
    right: 0,
    width: "100%",
  },
});
