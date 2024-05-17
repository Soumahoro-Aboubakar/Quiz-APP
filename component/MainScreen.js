import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, {  useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import {
  AntDesign,
  Octicons,
} from "@expo/vector-icons";
import axios from "axios";
import { REACT_APP_API_URL } from "@env";
import { useDispatch, useSelector } from "react-redux";
const { height, width } = Dimensions.get("window");

import {
  handleRandomResult,
} from "../feature/project.slice";
import {
  insertGameResult,
  updateValue,
} from "./dataBase";
import BackButtonHandler from "./BackButtonHandler";
import * as Network from "expo-network";
import { winNumber } from "./Constants";

export const blueColor = "#56B2D6";
export const minutesToMilliseconds = (minutes) => {
  return minutes * 60 * 1000;
};

function estDifferenceSuperieureALimiteMinutes(datePassee) {
  if (!datePassee) {
    console.error(
      "Les paramètres datePassee et limiteMinutes sont nécessaires."
    );
    return false;
  }

  const dateActuelle = new Date().getTime();
  const dateEnMillisecondes = new Date(datePassee).getTime();

  if (isNaN(dateActuelle) || isNaN(dateEnMillisecondes)) {
    console.error(
      "Les valeurs de datePassee ou date actuelle ne sont pas valides."
    );
    return false;
  }

  const differenceEnMillisecondes = dateActuelle - dateEnMillisecondes;
  const differenceEnMinutes = differenceEnMillisecondes / (1000 * 60);
  return differenceEnMillisecondes;
}

const questions = [
  {
    domain: "culture_africaine",
    question: "Quelle est la capitale du Kenya ?",
    options: ["Nairobi", "Kampala", "Kigali", "Djibouti"],
    correctAnswer: "Nairobi",
  },
  {
    domain: "culture_africaine",
    question:
      "Quel est le pays d'Afrique du Nord sans côte sur la mer Méditerranée ?",
    options: ["Algérie", "Libye", "Maroc", "Tunisie"],
    correctAnswer: "Mali",
  },
  {
    domain: "culture_africaine",
    question:
      "Quel est le festival culturel annuel au Nigeria qui met en valeur la tradition yoruba ?",
    options: [
      "Festival d'Osun-Osogbo",
      "Festival d'Ékpe",
      "Festival d'Obudu",
      "Festival de Durbar",
    ],
    correctAnswer: "Festival d'Osun-Osogbo",
  },
  {
    domain: "culture_africaine",
    question: "Quel est le plus grand parc national d'Afrique de l'Est ?",
    options: [
      "Parc national de Serengeti",
      "Parc national du Kilimandjaro",
      "Parc national d'Amboseli', 'Parc national de Tsavo",
    ],
    correctAnswer: "Parc national de Serengeti",
  },
  {
    domain: "culture_africaine",
    question: "Quel est le plus grand groupe ethnique en Afrique du Sud ?",
    options: ["Zoulou", "Xhosa", "Afrikaner", "Sotho"],
    correctAnswer: "Zoulou",
  },
  {
    domain: "culture_africaine",
    question: "Quel est le sport le plus populaire en Éthiopie ?",
    options: ["Football", "Athlétisme", "Boxe", "Tennis"],
    correctAnswer: "Football",
  },
  {
    domain: "culture_africaine",
    question: "Quelle est la monnaie de l'Égypte ?",
    options: ["Dinar", "Livre égyptienne", "Dirham", "Rial"],
    correctAnswer: "Livre égyptienne",
  },
  {
    domain: "culture_africaine",
    question:
      "Quel est le pays africain souvent appelé 'Pays de l'arc-en-ciel' ?",
    options: ["Namibie", "Tanzanie", "Afrique du Sud", "Maurice"],
    correctAnswer: "Afrique du Sud",
  },
  {
    domain: "culture_africaine",
    question: "Quel est le plus grand pays d'Afrique par superficie ?",
    options: [
      "Nigeria",
      "Soudan",
      "Algérie",
      "République Démocratique du Congo",
    ],
    correctAnswer: "Algérie",
  },
  {
    domain: "culture_africaine",
    question: "Quelle est la langue officielle du Ghana ?",
    options: ["Yoruba", "Akan", "Hausa", "Kikuyu"],
    correctAnswer: "Akan",
  },
];

const TimerComponent = (time) => {
  if (time === undefined || time === null) return;

  const timeInMilliseconds = Math.max(0, minutesToMilliseconds(15) - time);

  const seconds = Math.floor(timeInMilliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (seconds < 60) {
    return `${seconds} ${seconds === 1 ? "seconde" : "secondes"}`;
  } else {
    return `${minutes} minute${
      minutes !== 1 ? "s" : ""
    } ${remainingSeconds} seconde${remainingSeconds !== 1 ? "s" : ""}`;
  }
};

const MainScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const userData = useSelector((state) => state.getStore);
  const [userWantPlay, setUserWantPlay] = useState(false);
  const [dataIsFetching, setDataIsFetching] = useState(false);
  const [gameResultIsReady, setGameResultIsReady] = useState(true);
  const [newAddIsAvailable, setNewAddIsAvailable] = useState(true);
  const [userHasData, setUserHasData] = useState(false);
  const [gameResult, setGameResult] = useState([]);
  const [thereIsError, setThereIsError] = useState(false);
  const [text, setText] = useState("");
  const [gameInfos, setGameInfos] = useState({
    maxWinners: 3,
    playersLength: 0,
    radiusOfConvergence: 2,
    startTimer: 0,
  });

  useFocusEffect(() => {
    (async () => {
      const result = await Network.getNetworkStateAsync();
      if (result) {
        setUserHasData(result.isConnected);
      }
    })();
  });
  //handle localisation  infos
  /*   useEffect(() => {
    const obtenirPermissionEtPosition = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("La permission d'accéder à la localisation a été refusée");
        Alert.alert(
          "Permission Refusée",
          "Cette application nécessite l'accès à votre position. Veuillez activer les services de localisation dans les paramètres de votre appareil.",
          [
            {
              text: "Annuler",
              style: "cancel",
            },
            {
              text: "Activer la localisation",
              onPress: () => {
                // Rediriger l'utilisateur vers les paramètres de l'appareil pour les permissions de localisation
                Location.openSettings();
              },
            },
          ]
        );
      } else {
        const gestionnairePosition = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.BestForNavigation,
            timeInterval: minutesToMilliseconds(2),
          },
          (nouvellePosition) => {
            setLocation(nouvellePosition);
          }
        );

        // Pour arrêter de surveiller la position lorsque le composant est démonté
        return () => {
          if (gestionnairePosition) {
            gestionnairePosition.remove();
          }
        };
      }
    };
    obtenirPermissionEtPosition();
  }, []); */

  const fetchData = () => {
    userData.userIsPlayingRandomGame && fetchDataRanDomGameResult();
    location &&
      (async () => {
        setDataIsFetching(true);
        await axios
          .post(`${REACT_APP_API_URL}/localityInfos`, {
            localityInfos: {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            },
          })
          .then((response) => {
            setDataIsFetching(false);
            if (response.data) return setGameInfos(response.data);
          })
          .catch((error) => {
            console.log("error occured ", error);
            setDataIsFetching(false);
          });
      })();
    !location && setDataIsFetching(false);
  };

  const fetchDataRanDomGameResult = () => {
    (async () => {
      await axios
        .get(
          `${REACT_APP_API_URL}/connected/game/getAll/result/${userData.userId}`
        )
        .then((response) => {
          setGameResultIsReady(true);
          if (response.data) {
            if (Array.isArray(response.data)) {
              if (response.data.length > 0) {
                setGameResult(response.data);
                for (let i = 0; i < response.data.length; i++) {
                  let result = response.data[i];
                  insertGameResult(result);
                  dispatch(
                    handleRandomResult({
                      isNew: true,
                    })
                  );
                  updateValue("randomGameResultIsReady", 1, 1);
                }
              }
            }
          }
        })
        .catch((error) => {
          console.log("error occured ", error);
        });
    })();
  };

  /*   useEffect(() => {
    fetchData();
    createDataBaseGameResults();
  }, []); */
  /*   useEffect(() => {
    let intervalId;

    if (location) {
      intervalId = setInterval(() => {
        console.log("Fetching data...");
        fetchData();
      }, 30000);
    }

    return () => clearInterval(intervalId);
  }, []); */

  /*   const postQuestions = () => {
    axios
      .post(`http://192.168.1.100:5000/api/connected/storeQuestions`, {
        questions: qcmQuestion,
      })
      .then((response) => {
        console.log(response.data, "  this the response");
      })
      .catch((error) => {
        console.log("this the error : ", error);
      });
  }; */

  return (
    <BackButtonHandler onBackPress={() => console.log("exist app")}>
      {/*    {thereIsError && (
        <ModalMessage
          setThereIsError={setThereIsError}
          thereIsError={thereIsError}
          text={text}
          color={"red"}
        />
      )}
      {userWantPlay && (
        <NumberInputComponent
          setUserWantPlay={setUserWantPlay}
          userWantPlay={userWantPlay}
          location={location}
          userData={userData}
          setText={setText}
          setThereIsError={setThereIsError}
        />
      )} */}
      <TouchableOpacity
        onPress={() => navigation.openDrawer()}
        style={{ position: "absolute", top: 15, left: 20, zIndex: 5 }}
      >
        <AntDesign name="menu-fold" size={24} color="black" />
      </TouchableOpacity>
      <View style={{ position: "absolute", top: 10, right: 10, zIndex: 3 }}>
        <Text style={{ fontSize: 12, fontWeight: "600", color: "#555" }}>
          {gameInfos.playersLength > 0 &&
            `le lencement dans ${TimerComponent(
              estDifferenceSuperieureALimiteMinutes(gameInfos.startTimer) >= 0
                ? estDifferenceSuperieureALimiteMinutes(gameInfos.startTimer)
                : 0
            )} `}
        </Text>
      </View>
      <View
        style={[
          styles.container,
          {
            backgroundColor: "#f0f0f0",
            shadowColor: "#000",
            shadowOpacity: 0.3,
            shadowRadius: 3,
            shadowOffset: { width: 0, height: 2 },
          },
        ]}
      >
        <View style={{ marginHorizontal: 5 }}>
          {/*  <Text style={{ fontSize: 16, fontWeight: "bold", color: "#333" }}>
            Rayon de convergence :{" "}
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                fontWeight: "bold",
                color: blueColor,
              }}
            >
              {gameInfos.radiusOfConvergence}
              <Text
                style={{ fontSize: 15, fontWeight: "bold", color: blueColor }}
              >
                {gameInfos.radiusOfConvergence != "le monde" && "Km"}
              </Text>
            </Text>
          </Text> */}
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
              color: "#333",
              fontFamily: "Instrument",
            }}
          >
            <Text style={{ fontSize: 16 }}>ToqeToqe</Text> vous souhaite la
            bienvenue
          </Text>
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "700",
              color: "#7E8085",
              marginRight: 10,
            }}
          >
            {/* <Text style={{ marginRight: 10 }}> Personnes concourentes</Text> */}
            <Text>{winNumber}/30 réponses exactes remportent : </Text>
            {/* <Text
              style={{
                fontSize: 14,
                fontWeight: "400",
                color: "#555",
                padding: 10,
              }}
            >
              {"  "} {gameInfos.playersLength}/21
            </Text> */}
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: "#555",
                padding: 10,
              }}
            >
              350 FCFA
            </Text>
          </Text>
        </View>
        {userData.randomGameResultIsReady && (
          <Text
            style={{ fontWeight: "bold", fontSize: 10, textAlign: "center" }}
          >
            Vos resultats sont disponibles dans la section Historique
          </Text>
        )}
        <View
          style={{
            width: width * 0.8,
            height: 1,
            backgroundColor: "black",
            marginVertical: 10,
          }}
        ></View>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {/* <Text style={{ textAlign: "center" }}>
            {" "}
            {dataIsFetching && (
              <ActivityIndicator size="large" color={blueColor} />
            )}
          </Text> */}
          <View
            style={{
              flex: 1,
              marginHorizontal: 10,
              // elevation: 6,
              marginTop: 7,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              marginBottom: height * 0.35,
              paddingBottom: 20,
              backgroundColor: "#fff",
              padding: 15,
            }}
          >
            <View
              style={{
                width: width * 0.8,
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5,
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: "500", color: "#333" }}>
                Status
              </Text>

              <Text style={{ fontSize: 14, fontWeight: "400", color: "#555" }}>
                <Octicons
                  name="dot-fill"
                  color={
                    /* gameInfos.playersLength > 1 */ userHasData
                      ? "#66EE8F"
                      : "red"
                  }
                />{" "}
                {"  "}
                {
                  /* gameInfos.playersLength  > 1 */ userHasData
                    ? "En cours"
                    : "Break"
                }
              </Text>
            </View>
            {/*     <View
              style={{
                width: width * 0.8,
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5,
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: "500", color: "#333" }}>
                Gagner
              </Text>
              <Text style={{ fontSize: 14, fontWeight: "400", color: "#555" }}>
                null
              </Text>
            </View> */}
            {/* <View
              style={{
                width: width * 0.8,
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5,
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: "500", color: "#333" }}>
                Gagnant
              </Text>

              <TouchableOpacity
                onPress={() => setUserWantPlay(true)}
                style={{
                  paddingHorizontal: 15,
                  paddingVertical: 3,
                  backgroundColor: "#CCC9C8",
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Instrument",
                    color: "white",
                    fontSize: 15,
                  }}
                >
                  Participer
                </Text>
              </TouchableOpacity>

              <Text
                style={{ fontSize: 15, fontWeight: "bold", color: blueColor }}
              >
                ?/{gameInfos.maxWinners}
              </Text>
            </View> */}
            {/*       <View
              style={{
                width: width * 0.8,
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5,
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: "500", color: "#333" }}>
                Gain payé
              </Text>
              <Text style={{ fontSize: 15, fontWeight: "600" }}>
                {userData.montantPaye} fran cfa
              </Text>
            </View> */}
            {/*      <View
              style={{
                width: width * 0.8,
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5,
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: "500", color: "#333" }}>
                Gain impayé
              </Text>
             
              <Text style={{ fontSize: 15, fontWeight: "600" }}>
                {userData.montantImpaye} franc cfa
              </Text>
            </View> */}
            <View
              style={{
                width: width * 0.8,
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5,
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: "500", color: "#333" }}>
                Mes Coins disponibles
              </Text>
              <Text style={{ fontSize: 14, fontWeight: "800", color: "#555" }}>
                {userData.coinsTotal}
              </Text>
            </View>
            <View
              style={{
                width: width * 0.8,
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5,
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: "500", color: "#333" }}>
                Pseudo
              </Text>
              {/*  <TouchableOpacity
                onPress={() => fetchData()}
                style={{
                  paddingHorizontal: 15,
                  paddingVertical: 3,
                  backgroundColor: "#CCC9C8",
                  borderRadius: 10,
                  transform: [{ translateX: 1 }],
                  marginBottom: 5,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Instrument",
                    color: "white",
                    fontSize: 15,
                  }}
                >
                  Synchroniser
                </Text>
              </TouchableOpacity> */}
              <Text style={{ fontSize: 14, fontWeight: "400", color: "#555" }}>
                {userData.pseudo}
              </Text>
            </View>

            <View
              style={{
                width: width * 0.8,
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5,
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: "500", color: "#333" }}>
                Mom numero (rétraire)
              </Text>

              <Text style={{ fontSize: 14, fontWeight: "400", color: "#555" }}>
                {userData.phoneNumber}
              </Text>
            </View>
            <View
              style={{
                width: width * 0.8,
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5,
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: "500", color: "#333" }}>
                Pays
              </Text>
              <Text style={{ fontSize: 14, fontWeight: "400", color: "#555" }}>
                {userData.pays.replace(/Soumahoro89585242/g, "")}
              </Text>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "700",
                  color: "#7E8085",
                  marginRight: 10,
                  fontFamily: "Instrument",
                  textAlign: "center",
                }}
              >
                <Text style={{}}>Les paiements se font à partir de : </Text>

                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#555",
                    padding: 10,
                  }}
                >
                  2000 FCFA
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            maxHeight: height * 0.69,
            elevation: 8,
            zIndex: 2,
            backgroundColor: "#fff",
            padding: 15,
            width: "100%",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: blueColor }]}
            onPress={() => {
              if (userData.coinsTotal < 50) {
                navigation.navigate("LackOfCoins");
              } else {
                navigation.navigate("AdsComponent");
              }
            }}
          >
            <Text style={[styles.btnText, { color: "#fff" }]}>
              Visualisés de la publicité{" "}
              {newAddIsAvailable && (
                <Text style={{ color: "red", fontSize: 12, fontWeight: "900" }}>
                  new abs
                </Text>
              )}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("ReclamationScreen")}
            style={[styles.btn, { backgroundColor: blueColor }]}
          >
            <Text style={[styles.btnText, { color: "#fff" }]}>
              Faire une réclamation
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (userData.coinsTotal >= 50) {
                navigation.navigate("DomainSelectionScreen");
              } else {
                navigation.navigate("LackOfCoins");
              }
            }}
            style={[styles.btn, { backgroundColor: blueColor }]}
          >
            <Text style={[styles.btnText, { color: "#fff" }]}>
              Test ta culture
            </Text>
          </TouchableOpacity>
          {/*  {userData.userHasTheRightToMakeSetting && (
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              style={[styles.btn, { backgroundColor: blueColor }]}
            >
              <Text style={[styles.btnText, { color: "#fff" }]}>
                make setting
              </Text>
            </TouchableOpacity>
          )} */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Historique");
              dispatch(
                handleRandomResult({
                  isNew: false,
                })
              ); // cette partie permet de specifier que l'utilisateur n'a plus de resultat a prendre ce le backend
            }}
            style={[styles.btn, { backgroundColor: blueColor }]}
          >
            <Text style={[styles.btnText, { color: "#fff" }]}>
              Voir l'historique{" "}
              {userData.randomGameResultIsReady && (
                <Text style={{ color: "red" }}>Result</Text>
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </BackButtonHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: "center",
    padding: 10,
  },
  btn: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: blueColor,
    marginTop: 15,
  },
  btnText: {
    fontSize: 15,
    fontWeight: "500",
    paddingHorizontal: 5,
    textAlign: "center",
    paddingVertical: 10,
  },
});

export default MainScreen;
