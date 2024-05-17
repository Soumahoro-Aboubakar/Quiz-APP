import axios from "axios";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { REACT_APP_API_URL } from "@env";
import { useDispatch, useSelector } from "react-redux";
import {
  playRandomGame,
} from "../feature/project.slice";
import {

  updateValue,
} from "./dataBase";
import AlertComponent from "./AlertComponent";

const blueColor = "#56B2D6";
const { height, width } = Dimensions.get("window");
const NumberInputComponent = ({
  setUserWantPlay,
  location,
  setThereIsError,
  setText,
}) => {
  const dispatch = useDispatch();
  const [userChoix, setUserChoix] = useState("");

  const [isValidUserChoix, setIsValidUserChoix] = useState(true); // Added state for validation feedback
  const userData = useSelector((state) => state.getStore);
  const userCanPlay = userData.coinsTotal > 50;
  const isValidNumber = (value, min, max) => {
    const numericValue = parseFloat(value);
    return !isNaN(numericValue) && numericValue >= min && numericValue <= max;
  };

  const handleValidation = () => {
    const isValid1 = isValidNumber(userChoix, 1, 100);
    setIsValidUserChoix(isValid1);
    // deleteDataBse("user")
    if (isValid1) {
      setUserWantPlay(false);

      // Utilisation de l'opérateur de nullish coalescing pour accéder à coords
      const coords = location?.coords ?? null;
      console.log("====================================");
      console.log(coords, "cords");
      console.log("====================================");
      if (coords) {
        console.log("====================================");
        console.log("ddddddddddddddd");
        console.log("====================================");
        axios
          .post(`${REACT_APP_API_URL}/random/number`, {
            localityInfos: {
              latitude: coords.latitude,
              longitude: coords.longitude,
            },
            userId: userData.userId,
            userValue: userChoix,
            phoneNumber: userData.phoneNumber,
          })
          .then((response) => {
            console.log(
              "isvalid2",
              response.data,
              userData,
              "  this the response"
            );
            dispatch(playRandomGame());
            updateValue("userIsPlayingRandomGame", 1, 1);
          })
          .catch((error) => {
            console.error("Error during POST request:", error);
          });
      } else {
        console.log("2222");
        setThereIsError(true);
        setText(
          "Oops, il semble y avoir un problème. Veuillez patienter une minute, puis réessayez. Si l'erreur persiste, désactivez puis réactivez l'option de localisation. Si le problème persiste après toutes ces tentatives, veuillez redémarrer l'application."
        );
      }

      console.log("isvalid3");
      console.log(location, " localisation");
    }
  };

  return (
    <>
      <View
        style={[
          styles.container,
          userCanPlay ? { bottom: height - height * 0.69 } : null,
        ]}
      >
        <View
          style={[
            {
              borderWidth: 1,
              borderColor: "black",
              borderRadius: 10,
              shadowColor: blueColor,
              shadowOpacity: 1,
              shadowOffset: { width: 3.5, height: 2.5 },
              borderWidth: 1,
              borderColor: "black",
              backgroundColor: "white",
              elevation: 4,
            },
            userCanPlay ? { paddingHorizontal: 30, paddingVertical: 50 } : null,
          ]}
        >
          {userCanPlay ? (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>
                  Choisissez votre nombre entre 1 et 100{" "}
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    !isValidUserChoix && styles.invalidInput,
                  ]}
                  keyboardType="numeric"
                  placeholder="1-100"
                  autoFocus={true}
                  onChangeText={(text) => setUserChoix(text)}
                />
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={handleValidation}
              >
                <Text style={styles.buttonText}>Valider</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { marginTop: 10 }]}
                onPress={() => {
                  setUserWantPlay(false);
                }}
              >
                <Text style={styles.buttonText}>Annuler</Text>
              </TouchableOpacity>
            </>
          ) : (
            <AlertComponent  setUserWantPlay={setUserWantPlay} />
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 80,
    right: 0,
    left: 0,
    backgroundColor: "white",
    zIndex: 5,
    elevation: 4,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    width: 200,
    borderRadius: 10,
    marginHorizontal: "auto",
    marginBottom: -10,
    marginRight: "auto",
    marginLeft: "auto",
    textAlign: "center",
  },
  invalidInput: {
    borderColor: "red",
  },
  button: {
    backgroundColor: blueColor,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginVertical: -5,
    marginHorizontal: 15,
  },
});

export default NumberInputComponent;
