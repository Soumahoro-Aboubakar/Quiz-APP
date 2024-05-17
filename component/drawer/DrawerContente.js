import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import React, { useEffect, useState } from "react";
import { Avatar } from "react-native-paper";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  View,
  Text,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { blueColor } from "../MainScreen";

const girl2Image =
  "https://th.bing.com/th/id/OIG.od0ELrgo8Yrim3seoBIa?w=1024&h=1024&rs=1&pid=ImgDetMain";
const { width, height } = Dimensions.get("window");
const DrawerContente = (props) => {
  const navigation = useNavigation();
  // const IsConnected = useSelector((state)=> state.getAllUsers.userIsConnected);

  const [isCalling, setIsCalling] = useState(false);
  const [videoOptionIsAllowed, setVideoOptionIsAllowed] = useState(true);
  const [screenShortIsAllowed, setScreenShortIsAllowed] = useState(true);
  const [isAvailableForAll, setIsAvailableForAll] = useState(true);
  const [isConfirmatiion, setIsConfirmation] = useState(false);
  const [sound, setSound] = useState(false);
  const [isNeedHelp, setIsNeedHelp] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [userIsConnected, seUserIsCOnnected] = useState(false);
  const [fontsLoaded] = useFonts({
    Instrument: require("../../fonts/InstrumentSerif-Regular.ttf"),
  });
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  const iconColor = "#717171";
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  //expo start -c

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          marginBottom: 15,
        }}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              height: height * 0.22,
              backgroundColor: blueColor,
              borderBottomRightRadius: 75,
              marginBottom: 0,
              padding: 0,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                padding: 0,
                fontSize: 17,
                fontWeight: "bold",
                marginTop: 15,
                color: "white",
              }}
            >
              {"ToqeToqe"}
            </Text>
            <View
              style={{
                top: 0,
                flex: 1,
                height: 150,
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  //transform: [{ translateX: 5 }],
                }}
              >
                <TouchableOpacity onPress={() => navigation.navigate("ExplicationModeFonctionnement")}>
                  <Text></Text>
                  <View style={{backgroundColor:"white" , padding:10,borderRadius:10,}}>
                    <Text style={{fontSize:12 , color:blueColor}}>Mode de fonctionnement</Text>
                  </View>
                </TouchableOpacity>

              </Text>
            
            </View>  
          </View>

          <DrawerContentScrollView
            {...props}
            contentContainerStyle={{
              backgroundColor: "red",
              flexGrow: 1,
              paddingTop: 0,
              position: "relative",
            }}
          >
            <View style={{ flex: 1 }}>
              <View
                style={{
                  ...StyleSheet.absoluteFillObject,
                  zIndex: 2,
                  backgroundColor: blueColor,
                }}
              />
              <View
                style={{
                  flex: 1,
                  backgroundColor: "white",
                  borderTopLeftRadius: 75,
                  marginTop: 0,
                  zIndex: 3,
                }}
              >
                <View
                  style={{
                    marginLeft: 20,
                    marginTop: 30,
                    flex: 1,
                  }}
                >
                  <Text style={styles.appName}>A lire </Text>
                  <ScrollView contentContainerStyle={{ flex: 1 }}>
                    <Text
                      style={{
                        padding: 10,
                        fontWeight: "600",
                        color: "black",
                        marginTop: -10,
                        fontSize: 20,
                        fontFamily: "Instrument",
                      }}
                    >
                      "Toqetoqe" est une application développée par un étudiant
                      ivoirien dans le but de permettre à toute personne de se
                      divertir grâce à ses potentiels. En plus du
                      divertissement, les utilisateurs pourront gagner un peu
                      d'argent grâce à leurs connaissances en participant à des
                      quiz culturels et autres.{/*  Bien que la section avec des
                      nombres aléatoires existe, je tiens surtout à préciser que
                      cette fonctionnalité a été intégrée pour divertir les
                      utilisateurs lors de leurs trajets en bus le soir,
                      notamment au retour des écoles. */} En ce qui concerne les
                      paiements, je tiens à préciser qu'en tant qu'étudiant, je
                      démarre le projet avec un budget bien défini. Cela
                      signifie qu'il pourrait y avoir des retards dans les
                      paiements suite aux victoires des utilisateurs, mais cela
                      ne devrait pas vous dissuader de jouer. Une fois payé
                      grâce à vos publicités regardées, vous recevrez votre
                      part. Normalement, après avoir gagné à un jeu, vous devez
                      recevoir le paiement dans les 72 heures qui suivent.
                      Cependant, comme je l'ai mentionné, je démarre le projet
                      avec un budget, donc il se peut que vous soyez payé
                      lorsque la structure des publicités AdMob me versera la
                      somme générée suite aux visionnages des publicités. En
                      général, les publicités sont payées à la fin du mois en
                      cours. Donc, s'il arrive que vous ne soyez pas payé dans
                      les 168 heures, vous devrez attendre jusqu'à la fin du
                      mois. Je tiens à avertir que si vous trichez, cela sera
                      automatiquement détecté et vous ne serez pas rémunéré même
                      si vous gagnez aux jeux. Lorsque vous regardez une
                      publicité, assurez-vous de la regarder entièrement et, si
                      possible, de cliquer et lire le contenu. Sinon, il se peut
                      que vous ne gagniez rien en raison de la triche. Lorsque
                      vous regardez une publicité entièrement, cela vous sera
                      notifié soit sur l'écran principal en incrémentant le
                      nombre de publicités regardées, soit en augmentant le
                      nombre total de coins."Pour le fonctionnement de
                      l'application, veuillez consulter la section 'mode de
                      fonctionnement' ci-haut".
                    </Text>
                  </ScrollView>
                </View>
              </View>
            </View>
          </DrawerContentScrollView>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  section: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingLeft: 10,
    marginTop: 10,
  },
  textSection: {
    marginLeft: 15,
    fontWeight: "700",
    color: "#717171",
    marginTop: 2,
  },
  switch: { transform: [{ translateX: -14 }] },
  switchText: { transform: [{ translateX: -18 }, { translateY: 13 }] },
  appName: {
    fontSize: 20,
    fontWeight: "bold",
    color: blueColor,
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 2,
    transform: [{ translateY: -13 }],
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalCloseButton: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  modalCloseButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  modalImage: {
    width: "80%",
    height: "80%",
  },
});

export default DrawerContente;
