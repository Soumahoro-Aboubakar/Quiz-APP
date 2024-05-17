import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { REACT_APP_API_URL } from "@env";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";
import axios from "axios";
import ModalMessage from "./ModalMessage";
import * as MailComposer from "expo-mail-composer";

const Assistant = () => {
  const [messageTitle, setmessageTitle] = useState("");
  const [message, setMessage] = useState("");
  const [text, setText] = useState("");
  const [isSend, setIsSend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [thereIsError, setThereIsError] = useState(false);
  const userData = useSelector((state) => state.getStore);
  const userID = 42554554;
  const sendMessage = () => {
    if (messageTitle.trim().length < 2) {
      setText("Veuillez préciser le motif");
      setThereIsError(true);
    } else if (message.trim().length < 5) {
      setText("La taille de votre message doit être au minimun de longeur 5");
    } else {
      if (!userID) {
        return alert("Something went wrong , please try later");
      }
      setIsLoading(true);
      options = {
        subject: messageTitle + "  " + userData.phoneNumber,
        recipients: ["AboubakarKone8958@gmail.com"],
        body: message,
      };
      let promise = new Promise((resolve, reject) => {
        MailComposer.composeAsync(options)
          .then((result) => {
            resolve(result);
            setIsSend(true);
            setText("Message envoyé");
            setThereIsError(true);
            setmessageTitle("");
            setMessage("");
            setIsLoading(false);
          })
          .catch((error) => {
            reject(error);
            setThereIsError(true);
            setText("Oups une erreur est survenue lors de l'envoi du message");
            setIsLoading(false);
          });
      });
      promise.then(
        (result) => console.log("Status: email " + result.status),
        (error) => console.log("Status: email " + error.status)
      );
/*       const messageTitleTrim = messageTitle.trim();
      const messageTrim = message.trim();
      const dataToDisplay = {
        messageTitleTrim,
        messageTrim,
        userID,
      };
 */
      /*     axios
        .post(
          `${REACT_APP_API_URL}/userPreocupation/add/message`,
          dataToDisplay
        )
        .then((response) => {
          setIsSend(true);
          setText("Message envoyé");
          setThereIsError(true);
          setmessageTitle("");
          setMessage("");
          setIsLoading(false);
        })
        .catch((error) => {
          setThereIsError(true);
          setText("Oups une erreur est survenue lors de l'envoi du message");
          setIsLoading(false);
        }); */
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {thereIsError && (
        <ModalMessage
          text={text}
          color={!isSend ? "red" : "blue"}
          setThereIsError={setThereIsError}
          registorIsOk={isSend}
        />
      )}
      {isLoading && <Spinner />}
      <View style={styles.container}>
        <Text style={styles.title}>Contactez notre service d'assistance via l'email</Text>
        <TextInput
          style={styles.input}
          placeholder="motif"
          value={messageTitle}
          onChangeText={setmessageTitle}
          autoFocus={true}
        />
        <TextInput
          style={[styles.input, { height: 200 }]}
          multiline
          placeholder="Votre message"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity
          onPress={sendMessage}
          style={{ backgroundColor: "#4481F9", borderRadius: 10 }}
        >
          <Text
            style={{
              fontSize: 17,
              color: "white",
              marginVertical: 5,
              marginHorizontal: 10,
            }}
          >
            Envoyer
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: "100%",
    textAlign: "center",
  },
});

export default Assistant;
