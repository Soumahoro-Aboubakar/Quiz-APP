import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Dimensions,
  Switch,
  TouchableOpacity,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { REACT_APP_API_URL } from "@env";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import ModalMessage from "./ModalMessage";
import { useSelector } from "react-redux";
const { width } = Dimensions.get("window");
const GameSettingForm = () => {
  const userData = useSelector((state) => state.getStore);
  const navigation = useNavigation();
  const [winnerPrice, setWinnerPrice] = useState("");
  const [maxPriceToWin, setMaxPriceToWin] = useState("");
  const [radiusOfConvergence, setRadiusOfConvergence] = useState("");
  const [maxWinners, setMaxWinners] = useState("");
  const [startingTime, setStartingTime] = useState("");
  const [gameTakeABreak, setGameTakeABreak] = useState(false);
  const [thereIsError, setThereIsError] = useState(false);
  const [text, setText] = useState("");
  const [isOk, setIsOk] = useState(false);
  const [showDotsOptions, setShowDotsOptions] = useState(false);
  const toggleGameTakeABreak = () => {
    setGameTakeABreak((prevValue) => !prevValue);
  };

  useEffect(() => {
    const fetchLastSetting = async () => {
      axios
        .get(`${REACT_APP_API_URL}/lastSetting`)
        .then((response) => {
          if (response.data._id) {
            let result = response.data;
            setWinnerPrice(result.winnerPrice.toString());
            setMaxPriceToWin(result.maxPriceToWin.toString());
            setRadiusOfConvergence(result.radiusOfConvergence.toString());
            setMaxWinners(result.maxWinners.toString());
            setStartingTime(result.startingTime.toString());
            setGameTakeABreak(result.gameTakeABreak);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchLastSetting();
  }, []);
  const handlePost = async () => {
    try {
      if (validateInputs()) {
        const response = await axios.post(
          `${REACT_APP_API_URL}/localityInfos`,
          {
            settings: {
              winnerPrice,
              maxPriceToWin,
              radiusOfConvergence,
              maxWinners,
              startingTime,
              gameTakeABreak,
            },
            autho: {
              contact: userData.contact,
              passWord: userData.passWord,
            },
          }
        );
        setIsOk(true);
        setText("Succes");
        setThereIsError(true);
      }
    } catch (error) {
      console.log(error);
      setIsOk(false);
      setText("Une erreur est survenue");
      setThereIsError(true);
      /*  Alert.alert(
        "Erreur",
        "Une erreur s'est produite lors de l'enregistrement. Veuillez réessayer."
      ); */
    }
  };

  const validateInputs = () => {
    const inputs = [
      { value: winnerPrice, label: "Prix du gagnant" },
      { value: maxPriceToWin, label: "Prix maximum à gagner" },
      { value: radiusOfConvergence, label: "Rayon de convergence" },
      { value: maxWinners, label: "Nombre maximum de gagnants" },
      { value: startingTime, label: "Temps de démarrage" },
    ];

    for (const input of inputs) {
      if (!input.value) {
        Alert.alert(
          "Erreur",
          `Le champ "${input.label}" ne peut pas être vide.`
        );
        return false;
      }
    }
    return true;
  };
  const clearInputs = () => {
    setWinnerPrice("");
    setMaxPriceToWin("");
    setRadiusOfConvergence("");
    setMaxWinners("");
    setStartingTime("");
  };

  return (
    <View style={styles.container}>
      {thereIsError && (
        <ModalMessage
          text={text}
          color={isOk ? "blue" : "red"}
          setThereIsError={setThereIsError}
        />
      )}
      <TouchableOpacity
        style={{ position: "absolute", top: 15, right: 15, zIndex: 2 }}
        onPress={() => setShowDotsOptions(true)}
      >
        <Entypo name="dots-three-vertical" size={30} color={"#3498db"} />
      </TouchableOpacity>
      {showDotsOptions && (
        <View
          style={{
            backgroundColor: "white",
            padding: 10,
            borderRadius: 10,
            position: "absolute",
            zIndex: 2,
            top: 55,
            right: 8,
          }}
        >
          <TouchableOpacity
            style={styles.dotsBtn}
            onPress={() => navigation.navigate("UserPayment")}
          >
            <Text style={styles.dotsText}>Faire un payement</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dotsBtn}
            onPress={() => navigation.navigate("PaymentList")}
          >
            <Text style={styles.dotsText}>Voir les payements</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dotsBtn}
            onPress={() => setShowDotsOptions(false)}
          >
            <Text style={[styles.dotsText, { color: "red" }]}>
              Fermer la senction
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <Text style={styles.title}>Configurer le jeu</Text>
      {renderInput("Prix du gagnant", winnerPrice, setWinnerPrice)}
      {renderInput("Prix maximum à gagner", maxPriceToWin, setMaxPriceToWin)}
      {renderInput(
        "Rayon de convergence",
        radiusOfConvergence,
        setRadiusOfConvergence
      )}
      {renderInput("Nombre maximum de gagnants", maxWinners, setMaxWinners)}
      {renderInput("Temps de démarrage", startingTime, setStartingTime)}
      <View style={styles.containerSwitch}>
        <Text style={[styles.labelSwitch, { fontSize: 15, marginRight: 5 }]}>
          Mettez tous les jeux sur pause
        </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={gameTakeABreak ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleGameTakeABreak}
          value={gameTakeABreak}
        />
        <Text style={styles.statusTextSwitch}>
          {gameTakeABreak ? "En pause" : "Actif"}
        </Text>
      </View>
      <TouchableOpacity
        onPress={handlePost}
        style={{
          backgroundColor: "#66EE8F",
          padding: 10,
          paddingHorizontal: 20,
          borderRadius: 7,
          marginTop: 15,
        }}
      >
        <Text>Enregistrer</Text>
      </TouchableOpacity>
    </View>
  );
};

const renderInput = (label, value, onChangeText) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>
      {label}:{" "}
      {(label === "Temps de démarrage" && "en minute") ||
        (label === "Nombre maximum de gagnants" && "par defaut 3")}
    </Text>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={(text) => onChangeText(text)}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },

  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    width: width * 0.5,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    marginRight: "auto",
    marginLeft: "auto",
    borderRadius: 10,
  },
  containerSwitch: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  labelSwitch: {
    fontSize: 16,
    marginRight: 10,
  },
  statusTextSwitch: {
    marginLeft: 10,
    fontSize: 16,
  },
  dotsBtn: { marginTop: 10 },
  dotsText: {
    fontSize: 17,
    fontWeight: "700",
  },
});

export default GameSettingForm;
