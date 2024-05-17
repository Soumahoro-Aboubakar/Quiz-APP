import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { useSelector } from "react-redux";

const AlertComponent = ({ setUserWantPlay }) => {
    const userData = useSelector((state) => state.getStore);
  const handleWatchAds = () => {
    // Logique pour regarder les publicités
    Alert.alert(
      "Publicités",
      "Vous avez regardé la publicité et gagné des coins."
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          <Text
            style={{
              paddingRight: 10,
              fontSize: 16,
              fontFamily: "Instrument",
              textDecorationLine: "underline",
            }}
          >
            Total Coins disponibles
          </Text>{" "}
          <Text>: {userData.coinsTotal}</Text>
        </Text>
        <Text style={styles.message}>
          Désolé cher utilisateur, vous ne pouvez pas participer à ce jeu. Il
          vous faut au minimum 50 coins pour y participer. Pour bénéficier des
          coins, il vous faudra regarder de la publicité, cliquer si possible et
          lire son contenu afin de disposer des coins.
        </Text>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => setUserWantPlay(false)}
        >
          <Text style={styles.btnText}>Fermer</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    paddingBottom: 15,
    width: Dimensions.get("window").width * 0.85,
  },
  message: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Instrument",
  },
  watchAdsBtn: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  closeBtn: {
    backgroundColor: "#e74c3c",
    padding: 10,
    borderRadius: 5,
    width: Dimensions.get("window").width * 0.7,
    marginRight: "auto",
    marginLeft: "auto",
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default AlertComponent;
