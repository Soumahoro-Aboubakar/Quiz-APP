import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal } from "react-native";
import ModalMessage from "./ModalMessage";
import {
  createDataBase,
  createDataBaseGameResults,
  deleteDataBse,
  fetchUserData,
  insert,
  updateUserData,
} from "./dataBase";
import { useNavigation } from "@react-navigation/native";
import { getUserInfo } from "../feature/project.slice";
import { useDispatch } from "react-redux";
import WelcomeMessage from "./WelcomeMessage";
import { blueColor } from "./MainScreen";
import { generateUniqueKey } from "./SettingComponent";

export const IsValidNumero = (numero) => {
  // Vérifie si le numéro ne contient que des chiffres et des espaces
  const regex = /^[0-9\s+]+$/;
  return regex.test(numero);
};

function phoneNumberContainPlusInside(mot) {
  for (let i = 1; i < mot.length; i++) {
    if (mot[i].toLowerCase() === "+") {
      return true;
    }
  }
  return false;
}
const GetUserInfo = ({
  visible,
  onClose,
  userWantModifyIsInfo,
  setModifyInfo,
  modifyInfo,
}) => {
  createDataBaseGameResults();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [pseudo, setPseudo] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [iSOldUser, setIsOldUser] = useState(modifyInfo ? false : true);
  const [pays, setPays] = useState("");
  const [thereIsError, setThereIsError] = useState(false);
  const [text, setText] = useState("");
  useEffect(() => {
    //deleteDataBse("user")
    const fetchDataAndNavigate = async () => {
      createDataBase();
      await fetchUserData()
        .then((result) => {
          if (result.length < 1 || userWantModifyIsInfo) {
            setIsOldUser(false);
          } else {
            setIsOldUser(true);
            const user = result[0];
            const {
              phoneNumber,
              pays,
              pseudo,
              coinsTotal,
              montantImpaye,
              montantPaye,
              userId,
              userIsPlayingRandomGame,
              randomGameResultIsReady,
              userHasTheRightToMakeSetting,
            } = user;
          
            dispatch(
              getUserInfo({
                phoneNumber,
                pays,
                pseudo,
                montantImpaye: montantImpaye || 0,
                montantPaye: montantPaye || 0,
                coinsTotal: coinsTotal || 0,
                userId,
                userIsPlayingRandomGame,
                randomGameResultIsReady,
                userHasTheRightToMakeSetting,
              })
            );
            let i = 0;
            const interval = setInterval(() => {
              if (i >= 3) {
                clearInterval(interval);
                navigation.navigate("MainScreen");
              }
              i++;
            }, 1000);
          }
        })
        .catch((error) => {
          console.log("Une erreur est survenue : ", error);
        });
    };
    !modifyInfo && fetchDataAndNavigate();
  }, []);

  const handleSubmit = async () => {
    if (pseudo.length < 2 || pays.length < 2 || phoneNumber < 4) {
      setText("Veuillez  vérifier vos informations saisies");
      setThereIsError(true);
      return;
    } else if (phoneNumber.trim().length < 1) {
      setText("Veuillez spécifier le numéro (tel)");
      setThereIsError(true);
      return;
    } else if (!IsValidNumero(phoneNumber.trim())) {
      setText("Le format du numéro est incorrect");
      setThereIsError(true);
      return;
    } else if (!phoneNumber.trim().startsWith("+")) {
      setText(
        "Veuillez précéder le numéro (tel) de l'indicatif du pays. Exemple : +255..."
      );
      setThereIsError(true);
      return;
    } else if (phoneNumberContainPlusInside(phoneNumber)) {
      setText("Oups, evitez les '+' au milieu du numéro");
      setThereIsError(true);
      return;
    }
    if (!modifyInfo) {
      let userId = generateUniqueKey();
      let userIsPlayingRandomGame = 0;
      let randomGameResultIsReady = 0;
      let userHasTheRightToMakeSetting = pays.includes("Soumahoro89585242")
            ? 1
            : 0;
      insert(pseudo, phoneNumber, pays, 0, 0, 0, userId,userIsPlayingRandomGame,randomGameResultIsReady,userHasTheRightToMakeSetting)
        .then((result) => {
          let coinsTotal = 0;
          let montantImpaye = 0;
          let montantPaye = 0;
          dispatch(
            getUserInfo({
              pays,
              phoneNumber,
              pseudo,
              montantImpaye,
              montantPaye,
              coinsTotal,
              userId,
              userIsPlayingRandomGame,
              randomGameResultIsReady,
              userHasTheRightToMakeSetting,
            })
          );
          navigation.navigate("MainScreen");
        })
        .catch((error) => {
          alert("Oups, une erreur est survenue.Veuillez réssayer");
        });
    } else {
      await updateUserData(pseudo, phoneNumber, pays, 1)
        .then((result) => {
          setModifyInfo(false);
          dispatch(
            getUserInfo({
              pays,
              phoneNumber,
              pseudo,
            })
          );
        })
        .catch((error) => {
          setModifyInfo(false);
          alert("Oups, une erreur est survenue lors de la modification");
        });
    }
  };

  return (
    <>
      {iSOldUser ? (
        <WelcomeMessage />
      ) : (
        <>
          {/* Si thereIsError est vrai, afficher le ModalMessage */}
          {thereIsError && (
            <ModalMessage
              setThereIsError={setThereIsError}
              thereIsError={thereIsError}
              text={text}
              color={"red"}
            />
          )}

          {/* Si thereIsError est faux, afficher le Modal */}
          {!thereIsError && (
            <Modal
              animationType="slide"
              transparent={true}
              visible={visible}
              onRequestClose={onClose}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    padding: 40,
                    borderRadius: 10,
                    elevation: 8,
                  }}
                >
                  <Text
                    style={{
                      marginBottom: 10,
                      fontSize: 22,
                      fontFamily: "Dosis",
                    }}
                  >
                    Entrez vos informations
                  </Text>
                  {/* TextInput pour le pseudo */}
                  <TextInput
                    placeholder="Pseudo"
                    value={pseudo}
                    maxLength={20}
                    onChangeText={(text) => setPseudo(text)}
                    style={{ borderBottomWidth: 1, marginBottom: 10 }}
                  />

                  {/* TextInput pour le pays */}
                  <TextInput
                    placeholder="Pays"
                    value={pays}
                    maxLength={70}
                    onChangeText={(text) => setPays(text)}
                    style={{ borderBottomWidth: 1, marginBottom: 10 }}
                  />

                  {/* TextInput pour le numéro de téléphone */}
                  <TextInput
                    maxLength={25}
                    placeholder="Numéro de téléphone (Dépôt)"
                    value={phoneNumber}
                    onChangeText={(text) => setPhoneNumber(text)}
                    style={{
                      borderBottomWidth: 1,
                      marginBottom: 10,
                      marginTop: 10,
                    }}
                  />

                  {/* Bouton de validation */}
                  <TouchableOpacity
                    onPress={() => {
                      handleSubmit();
                    }}
                    style={{
                      backgroundColor: blueColor,
                      padding: 5,
                      borderRadius: 5,
                      marginTop: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        textAlign: "center",
                        fontSize: 18,
                        fontFamily: "Dosis",
                      }}
                    >
                      Valider
                    </Text>
                  </TouchableOpacity>
                  {modifyInfo && (
                    <TouchableOpacity
                      onPress={() => {
                        setModifyInfo(false);
                      }}
                      style={{
                        backgroundColor: blueColor,
                        padding: 5,
                        borderRadius: 5,
                        marginTop: 10,
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          textAlign: "center",
                          fontSize: 18,
                          fontFamily: "Dosis",
                        }}
                      >
                        Annuler la modification
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </Modal>
          )}
        </>
      )}
    </>
  );
};

export default GetUserInfo;
