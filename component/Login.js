import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import {  useNavigation } from "@react-navigation/native";
import { REACT_APP_API_URL } from "@env";
import axios from "axios";
import ModalMessage from "./ModalMessage";
import { useDispatch, useSelector } from "react-redux";
import { IsValidNumero } from "./GetsUserInfos";
import { authBackend } from "../feature/project.slice";

const { height, width } = Dimensions.get("window");
const Login = () => {
  const [contact, setcontact] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [text, setText] = useState("");
  const [thereIsError, setThereIsError] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (contact.length < 2 || motDePasse.length < 2) {
      setText("Oups veuillez  vérifier vos informations");
      setThereIsError(true);
    } else if (!motDePasse.trim() && motDePasse?.trim().length < 4) {
      setText(
        "Le mot de passe doit avoir au moins une longueur de 4 caractères"
      );
      setThereIsError(true);
      return;
    } else if (contact.trim().length < 1) {
      setText("Veuillez spécifier le numéro (tel)");
      setThereIsError(true);
      return;
    } else if (!IsValidNumero(contact.trim())) {
      setText("Le format du numéro est incorrect");
      setThereIsError(true);
      return;
    } else if (!contact.trim().startsWith("+")) {
      setText(
        "Veuillez précéder le numéro (tel) de l'indicatif du pays. Exemple : +255..."
      );
      setThereIsError(true);
      return;
    } else {
      axios
        .post(`${REACT_APP_API_URL}/makeConnection/login`, {
          contact,
          passWord: motDePasse,
        })
        .then((response) => {
          if (response.data._id) {
           dispatch(authBackend({contact : contact , passWord : motDePasse}));
           navigation.navigate("GameSettingForm");
          } else {
            if (response.data.contact.length > 2) {
              setText(response.data.contact); //this mean color text
              setThereIsError(true);
            } else if (response.data.password.length) {
              setText(response.data.password);
              setThereIsError(true);
            }
          }
        })
        .catch((error) => {
          setText("Oups , une erreur est survenue, veuillez ressayer plutart");
          setThereIsError(true);
        });
    }
  };
  return (
    <>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {thereIsError && (
          <ModalMessage
            text={text}
            color={"red"}
            setThereIsError={setThereIsError}
          />
        )}
        <View style={styles.container}>
          <View style={styles.logoAndTextUnderToLogo}>
            <Image
              source={{
                uri: "https://th.bing.com/th/id/OIG.od0ELrgo8Yrim3seoBIa?w=1024&h=1024&rs=1&pid=ImgDetMain",
              }}
              style={styles.logo}
            />
            <Text style={styles.textUnderToLogo}>Welcome back!</Text>
          </View>
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputText}>Votre Numero de téléphone</Text>
              <TextInput
                style={styles.input}
                placeholder="numero  exemple: +22533...."
                value={contact}
                onChangeText={setcontact}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputText}>Mot de passe</Text>
              <TextInput
                style={styles.input}
                placeholder="mot de pass"
                value={motDePasse}
                onChangeText={setMotDePasse}
              />
            </View>
          </View>
          <View style={{ position: "relative" }}>
            <TouchableOpacity onPress={handleLogin} style={styles.loginBtn}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <AntDesign name="back" size={30} color={"blue"} />
        </TouchableOpacity>
      </ScrollView>
     
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: width * 0.8,
    maxHeight: height * 100,
    marginLeft: "auto",
    marginRight: "auto",
    padding: 10,
    marginTop: "auto",
    marginBottom: "auto",
  },
  inputContainer: {
    marginTop: 30,
  },
  input: {
    borderWidth: 1.5,
    width: width * 0.8,
    borderRadius: 10,
    minHeight: 45,
    backgroundColor: "#DAE7E7",
    paddingLeft: 15,
  },
  logoAndTextUnderToLogo: {
    alignItems: "center",
    marginBottom: 15,
  },
  logo: {
    height: 60,
    width: 60,
    borderRadius: 10,
  },
  loginBtn: {
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 15,
    width: width * 0.3,
    borderRadius: 10,
    borderWidth: 2,
    borderTopColor: "blue",
    borderRightColor: "blue",
    borderLeftColor: "red",
    borderBottomColor: "red",
  },
  loginText: {
    textAlign: "center",
    marginVertical: 3,
    fontSize: 16,
  },
  backBtn: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  textUnderToLogo: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 5,
  },
  inputText: {
    fontSize: 15,
    fontWeight: "500",
  },
});

export default Login;
