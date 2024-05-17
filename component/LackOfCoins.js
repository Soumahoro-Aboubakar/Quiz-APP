import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";

// Suppression des importations inutilisées

// Utilisation de la destructuration pour obtenir height et width
const { height } = Dimensions.get("window");
const color = "#CEECF7";
export default function LackOfCoins() {
  const navigation = useNavigation();
  const userData = useSelector((state) => state.getStore);
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <View style={{ height: height * 0.5, backgroundColor: "green" }}>
        <Image
          style={{ flex: 1 }}
          source={{
            uri: "https://th.bing.com/th/id/OIG2.uqE2GvkhA1QnvaENv8Wv?w=270&h=270&c=6&r=0&o=5&dpr=1.3&pid=ImgGn",
          }}
        />
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <View
          style={{
            // height: height,
            // position: "absolute",
            // top: height * 0.49,
            // right: 0,
            //left: 0,
            backgroundColor: "white",
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            fontFamily: "Instrument",
            fontSize: 21,
          }}
        >
          <View style={{ marginTop: 10 }}>
            <Text style={{ textAlign: "center" }}>
              Mes Coins disponibles
              <Text
                style={{
                  textAlign: "center",
                  marginBottom: 2,
                  fontSize: 15,
                  fontWeight: "bold",
                  fontFamily: "Instrument",
                }}
              >
                :{"  " + userData.coinsTotal}
              </Text>
            </Text>
          </View>
          <Text
            style={{
              textAlign: "center",
              fontSize: 17,
              marginTop: 10,
              fontFamily: "Dosis",
            }}
          >
            Oups, il semble que vous n'avez pas suffisamment de coins pour
            répondre aux questions. Vous avez besoin d'au moins{" "}
            <Text style={{ fontWeight: "bold" }}>50</Text> coins. Vous pouvez
            obtenir plus de coins en visitant la section
            <TouchableOpacity
              style={styles.btn}
              onPress={() => navigation.navigate("AdsComponent")}
            >
              <Text style={styles.btnText}>Visualiser de la publicité</Text>
            </TouchableOpacity>
            . Veuillez noter qu'il est nécessaire de cliquer sur la publicité et
            de lire le contenu pour recevoir des coins. Dans le cas contraire
            (fraude), vous risquez de ne pas recevoir de coins ou de récompenses
            suite à vos réponses correctes. Nous vous invitons à éviter les
            fraudes.
          </Text>
          <Text style={{ textAlign: "center" }}>
            _______________________________________
          </Text>
          <View style={{ marginTop: 10 }}>
            <Text
              style={{
                textAlign: "center",
                marginBottom: 5,
                fontSize: 17,
                fontWeight: "bold",
                fontFamily: "Instrument",
              }}
            >
              Entraînement
            </Text>
            <Text
              style={{
                fontSize: 16,
                textAlign: "center",
                fontFamily: "Instrument",
              }}
            >
              Cette section est liée à la formation sur toutes les questions.
              Vous participerez à des jeux de questions-réponses dans le but
              d'apprendre. Il n'y a pas de récompenses même en cas de victoire.
              Pour participer, vous avez besoin d'au moins 15 coins.{" "}
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  if (userData.coinsTotal >= 15) {
                    navigation.navigate("DomainSelectionScreen", {
                      isTest: true,
                    });
                  } else {
                    alert("Coins insuffisant");
                  }
                }}
              >
                <Text style={styles.btnText}>Participer maintenant</Text>
              </TouchableOpacity>
            </Text>
          </View>
          {/* Ajout d'une vue vide */}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
            }}
          ></View>
        </View>
      </ScrollView>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  btn: {
    backgroundColor: color,
    borderRadius: 5,
    marginTop: 4,
  },
  btnText: { marginHorizontal: 10, color: "#595C5D", fontSize: 16, padding: 5 },
});
