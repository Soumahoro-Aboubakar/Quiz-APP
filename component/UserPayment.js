// UserPayment.js

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { REACT_APP_API_URL } from "@env";
import axios from "axios";
import ModalMessage from "./ModalMessage";
import { useSelector } from "react-redux";

const data = [
  {
    gain: 0,
    id: 1,
    message: "Perdu",
    paye: "non",
    phoneNumber: "+373838383",
    results: "[64,95,12]",
    timer: "2024-01-18T23:30:25.215Z",
    userValue: 55,
    usersLength: 6,
  },
  {
    gain: 0,
    id: 2,
    message: "Perdu",
    paye: "non",
    phoneNumber: "+373838383",
    results: "[64,95,12]",
    timer: "2024-01-18T23:30:25.215Z",
    userValue: 65,
    usersLength: 6,
  },
  {
    gain: 2400,
    id: 3,
    message: "Gagné",
    paye: "non",
    phoneNumber: "+373838383",
    results: "[64,95,12]",
    timer: "2024-01-18T23:30:25.215Z",
    userValue: 12,
    usersLength: 6,
  },
  {
    gain: 0,
    id: 4,
    message: "Perdu",
    paye: "non",
    phoneNumber: "+373838383",
    results: "[64,95,12]",
    timer: "2024-01-18T23:30:25.215Z",
    userValue: 8,
    usersLength: 6,
  },
  {
    gain: 0,
    id: 5,
    message: "Perdu",
    paye: "non",
    phoneNumber: "+373838383",
    results: "[64,95,12]",
    timer: "2024-01-18T23:30:25.215Z",
    userValue: 47,
    usersLength: 6,
  },
  {
    gain: 0,
    id: 6,
    message: "Perdu",
    paye: "non",
    phoneNumber: "+373838383",
    results: "[64,95,12]",
    timer: "2024-01-18T23:30:25.215Z",
    userValue: 8,
    usersLength: 6,
  },
  {
    gain: 400,
    id: 7,
    message: "Gagné",
    paye: "non",
    phoneNumber: "+373838383",
    results: "[38,78,65]",
    timer: "2024-01-19T00:22:37.446Z",
    userValue: 65,
    usersLength: 1,
  },
  {
    gain: 400,
    id: 8,
    message: "Gagné",
    paye: "non",
    phoneNumber: "+373838383",
    results: "[58,72,93]",
    timer: "2024-01-19T00:39:11.390Z",
    userValue: 58,
    usersLength: 1,
  },
  {
    gain: 400,
    id: 9,
    message: "Gagné",
    paye: "non",
    phoneNumber: "+3939394884",
    results: "[75,55,90]",
    timer: "2024-01-19T01:10:52.159Z",
    userValue: 55,
    usersLength: 1,
  },
  {
    gain: 1200,
    id: 10,
    message: "Gagné",
    paye: "non",
    phoneNumber: "+3939394884",
    results: "[20,58,5]",
    timer: "2024-01-19T02:59:11.382Z",
    userValue: 58,
    usersLength: 3,
  },
  {
    gain: 0,
    id: 11,
    message: "Perdu",
    paye: "non",
    phoneNumber: "+3939394884",
    results: "[20,58,5]",
    timer: "2024-01-19T02:59:11.382Z",
    userValue: 55,
    usersLength: 3,
  },
  {
    gain: 0,
    id: 12,
    message: "Perdu",
    paye: "non",
    phoneNumber: "+3939394884",
    results: "[20,58,5]",
    timer: "2024-01-19T02:59:11.382Z",
    userValue: 55,
    usersLength: 3,
  },
  {
    gain: 0,
    id: 13,
    message: "Perdu",
    paye: "non",
    phoneNumber: "+2250789585242",
    results: "[15,90,73]",
    timer: "2024-01-20T01:12:16.252Z",
    userValue: 65,
    usersLength: 10,
  },
  {
    gain: 0,
    id: 14,
    message: "Perdu",
    paye: "non",
    phoneNumber: "+2250789585242",
    results: "[15,90,73]",
    timer: "2024-01-20T01:12:16.252Z",
    userValue: 69,
    usersLength: 10,
  },
  {
    gain: 0,
    id: 15,
    message: "Perdu",
    paye: "non",
    phoneNumber: "+2250789585242",
    results: "[15,90,73]",
    timer: "2024-01-20T01:12:16.252Z",
    userValue: 69,
    usersLength: 10,
  },
  {
    gain: 0,
    id: 16,
    message: "Perdu",
    paye: "non",
    phoneNumber: "+2250789585242",
    results: "[15,90,73]",
    timer: "2024-01-20T01:12:16.252Z",
    userValue: 48,
    usersLength: 10,
  },
  {
    gain: 4000,
    id: 17,
    message: "Gagné",
    paye: "non",
    phoneNumber: "+2250789585242",
    results: "[15,90,73]",
    timer: "2024-01-20T01:12:16.252Z",
    userValue: 90,
    usersLength: 10,
  },
  {
    gain: 0,
    id: 18,
    message: "Perdu",
    paye: "non",
    phoneNumber: "+2250789585242",
    results: "[15,90,73]",
    timer: "2024-01-20T01:12:16.252Z",
    userValue: 70,
    usersLength: 10,
  },
  {
    gain: 0,
    id: 19,
    message: "Perdu",
    paye: "non",
    phoneNumber: "+2250789585242",
    results: "[15,90,73]",
    timer: "2024-01-20T01:12:16.252Z",
    userValue: 45,
    usersLength: 10,
  },
  {
    gain: 0,
    id: 20,
    message: "Perdu",
    paye: "non",
    phoneNumber: "+2250789585242",
    results: "[15,90,73]",
    timer: "2024-01-20T01:12:16.252Z",
    userValue: 80,
    usersLength: 10,
  },
  {
    gain: 0,
    id: 21,
    message: "Perdu",
    paye: "non",
    phoneNumber: "+2250789585242",
    results: "[15,90,73]",
    timer: "2024-01-20T01:12:16.252Z",
    userValue: 10,
    usersLength: 10,
  },
  {
    gain: 0,
    id: 22,
    message: "Perdu",
    paye: "non",
    phoneNumber: "+2250789585242",
    results: "[15,90,73]",
    timer: "2024-01-20T01:12:16.252Z",
    userValue: 68,
    usersLength: 10,
  },
  {
    gain: 0,
    id: 23,
    message: "Perdu",
    paye: "non",
    phoneNumber: "+2250789585242",
    results: "[58,18,37]",
    timer: "2024-01-20T20:27:49.398Z",
    userValue: 80,
    usersLength: 2,
  },
  {
    gain: 800,
    id: 24,
    message: "Gagné",
    paye: "non",
    phoneNumber: "+2250789585242",
    results: "[58,18,37]",
    timer: "2024-01-20T20:27:49.398Z",
    userValue: 58,
    usersLength: 2,
  },
  {
    gain: 0,
    id: 25,
    message: "Perdu",
    paye: "non",
    phoneNumber: "+2250789585242",
    results: "[66,1,40]",
    timer: "2024-01-20T20:47:10.751Z",
    userValue: 58,
    usersLength: 5,
  },
  {
    gain: 2000,
    id: 26,
    message: "Gagné",
    paye: "non",
    phoneNumber: "+2250789585242",
    results: "[66,1,40]",
    timer: "2024-01-20T20:47:10.751Z",
    userValue: 40,
    usersLength: 5,
  },
  {
    gain: 0,
    id: 27,
    message: "Perdu",
    paye: "non",
    phoneNumber: "+2250789585242",
    results: "[66,1,40]",
    timer: "2024-01-20T20:47:10.751Z",
    userValue: 48,
    usersLength: 5,
  },
  {
    gain: 0,
    id: 28,
    message: "Perdu",
    paye: "non",
    phoneNumber: "+2250789585242",
    results: "[66,1,40]",
    timer: "2024-01-20T20:47:10.751Z",
    userValue: 78,
    usersLength: 5,
  },
  {
    gain: 0,
    id: 29,
    message: "Perdu",
    paye: "non",
    phoneNumber: "+2250789585242",
    results: "[66,1,40]",
    timer: "2024-01-20T20:47:10.751Z",
    userValue: 71,
    usersLength: 5,
  },
  {
    gain: 0,
    id: 30,
    message: "Perdu",
    paye: "non",
    phoneNumber: "+2250789585242",
    results: "[62,49,80]",
    timer: "2024-01-20T21:04:33.386Z",
    userValue: 45,
    usersLength: 5,
  },
  {
    gain: 0,
    id: 31,
    message: "Perdu",
    paye: "non",
    phoneNumber: "+2250789585242",
    results: "[62,49,80]",
    timer: "2024-01-20T21:04:33.386Z",
    userValue: 1,
    usersLength: 5,
  },
  {
    gain: 0,
    id: 32,
    message: "Perdu",
    paye: "non",
    phoneNumber: "+2250789585242",
    results: "[62,49,80]",
    timer: "2024-01-20T21:04:33.386Z",
    userValue: 95,
    usersLength: 5,
  },
  {
    gain: 0,
    id: 33,
    message: "Perdu",
    paye: "non",
    phoneNumber: "+2250789585242",
    results: "[62,49,80]",
    timer: "2024-01-20T21:04:33.386Z",
    userValue: 87,
    usersLength: 5,
  },
  {
    gain: 2000,
    id: 34,
    message: "Gagné",
    paye: "non",
    phoneNumber: "+2250789585242",
    results: "[62,49,80]",
    timer: "2024-01-20T21:04:33.386Z",
    userValue: 80,
    usersLength: 5,
  },
  {
    gain: 0,
    id: 35,
    message: "Perdu",
    paye: "non",
    phoneNumber: "+2250789585242",
    results: "[25,40,99]",
    timer: "2024-01-20T21:07:05.694Z",
    userValue: 58,
    usersLength: 3,
  },
  {
    gain: 0,
    id: 36,
    message: "Perdu",
    paye: "non",
    phoneNumber: "+2250789585242",
    results: "[25,40,99]",
    timer: "2024-01-20T21:07:05.694Z",
    userValue: 64,
    usersLength: 3,
  },
  {
    gain: 1200,
    id: 37,
    message: "Gagné",
    paye: "non",
    phoneNumber: "+2250789585242",
    results: "[25,40,99]",
    timer: "2024-01-20T21:07:05.694Z",
    userValue: 99,
    usersLength: 3,
  },
  {
    gain: 0,
    id: 38,
    message: "Perdu",
    paye: "non",
    phoneNumber: "+2250789585242",
    results: "[47,28,65,82,95]",
    timer: "2024-01-20T21:23:19.203Z",
    userValue: 58,
    usersLength: 3,
  },
  {
    gain: 1200,
    id: 39,
    message: "Gagné",
    paye: "non",
    phoneNumber: "+2250789585242",
    results: "[47,28,65,82,95]",
    timer: "2024-01-20T21:23:19.203Z",
    userValue: 47,
    usersLength: 3,
  },
  {
    gain: 0,
    id: 40,
    message: "Perdu",
    paye: "non",
    phoneNumber: "+2250789585242",
    results: "[47,28,65,82,95]",
    timer: "2024-01-20T21:23:19.203Z",
    userValue: 80,
    usersLength: 3,
  },
  {
    gain: 0,
    id: 41,
    message: "Perdu",
    paye: "non",
    phoneNumber: "+2250789585242",
    results: "[8,25,51,99,82]",
    timer: "2024-01-20T21:38:34.826Z",
    userValue: 58,
    usersLength: 5,
  },
  {
    gain: 0,
    id: 42,
    message: "Perdu",
    paye: "non",
    phoneNumber: "+2250789585242",
    results: "[8,25,51,99,82]",
    timer: "2024-01-20T21:38:34.826Z",
    userValue: 98,
    usersLength: 5,
  },
  {
    gain: 0,
    id: 43,
    message: "Perdu",
    paye: "non",
    phoneNumber: "+2250789585242",
    results: "[8,25,51,99,82]",
    timer: "2024-01-20T21:38:34.826Z",
    userValue: 45,
    usersLength: 5,
  },
  {
    gain: 0,
    id: 44,
    message: "Perdu",
    paye: "non",
    phoneNumber: "+2250789585242",
    results: "[8,25,51,99,82]",
    timer: "2024-01-20T21:38:34.826Z",
    userValue: 74,
    usersLength: 5,
  },
  {
    gain: 2000,
    id: 45,
    message: "Gagné",
    paye: "non",
    phoneNumber: "+2250789585242",
    results: "[8,25,51,99,82]",
    timer: "2024-01-20T21:38:34.826Z",
    userValue: 25,
    usersLength: 5,
  },
];

export const groupUsersByPhoneNumber = (users) => {
  const groupedUsers = {};

  users.forEach((user) => {
    const { phoneNumber } = user;

    if (!groupedUsers[phoneNumber]) {
      groupedUsers[phoneNumber] = [];
    }
    groupedUsers[phoneNumber].push(user);
  });

  return groupedUsers;
};

const UserPayment = () => {
  const userDataValue = useSelector((state) => state.getStore);
  const groupedUsers = groupUsersByPhoneNumber(data);
  const [winningUsers, setWinningUsers] = useState([]);
  const [thereIsError, setThereIsError] = useState(false);
  const [text, setText] = useState("");
  const [isOk, setIsOk] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      await axios
        .get(`${REACT_APP_API_URL}/connected/game/getAllResults`)
        .then((response) => {
          if (Array.isArray(response.data)) {
            console.log(response.data, "the response");
            setWinningUsers(
              Object.keys(groupUsersByPhoneNumber(response.data))
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetch();
  }, []);

  const UserPaymentRender = ({ user  }) => {
    const [paymentAmount, setPaymentAmount] = useState("0");
    if (!user) return;
    let userData = groupedUsers[user];

    if (!userData) return;
    let userInfos = userData[0];
    const totalMoney = userData?.reduce(
      (accumulator, currentUser) => accumulator + currentUser.gain,
      0
    );
    const handlePaymentSubmit = () => {
      if (parseInt(paymentAmount, 10) < 10) return;
      if (totalMoney < parseInt(paymentAmount, 10)) {
        alert("le montant entré est  au montant a payer ");
      } else {
        axios
          .post(`${REACT_APP_API_URL}/paymentAction/payments`, {
            userId: userInfos.phoneNumber,
            gainPaye: paymentAmount,
            contact : userDataValue.contact,
            passWord : userDataValue.passWord,
          })
          .then((response) => {
            console.log(response);
            setIsOk(true);
            setText("Succes");
            setThereIsError(true);
          })
          .catch((error) => {
            console.log(error);
            setIsOk(false);
            setText("Un problème est survenu");
            setThereIsError(true);
          });
      }
    };

    return (
      <View style={styles.userPayment}>
        {thereIsError && (
          <ModalMessage
            text={text}
            color={isOk ? "blue" : "red"}
            setThereIsError={setThereIsError}
          />
        )}
        <View>
          <Text>Montant gagné : {totalMoney} €</Text>
          <Text>Numéro de téléphone : {userInfos?.phoneNumber}</Text>
        </View>
        <View>
          <Text>Montant à verser :</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={paymentAmount}
            onChangeText={(text) => setPaymentAmount(text)}
          />
          <Button title="Valider le paiement" onPress={handlePaymentSubmit} />
        </View>
      </View>
    );
  };

  const handleSearch = (text) => {
    if (!text) return setWinningUsers(Object.keys(groupedUsers));
    console.log(text);
    if (groupedUsers[text]) {
      setWinningUsers([`${text}`]);
    }
  };
  return (
    <View style={styles.app}>
      <Text style={styles.heading}>Interface de paiement</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Entrez un numéro de téléphone"
        keyboardType="phone-pad"
        onChangeText={(text) => handleSearch(text)}
      />
      <View style={{ position: "relative", flex: 1 }}>
        <TouchableOpacity
          onPress={() => alert("salut")}
          style={{ position: "absolute", top: -50, right: 10, zIndex: 3 }}
        >
          <FontAwesome5 name="search-dollar" size={25} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        {winningUsers.map((user) => (
          <UserPaymentRender
            key={user}
            user={user}
          />
        ))}
        {/* {winningUsers.map((user) => (
          <UserPaymentRender
            key={user.id}
            user={user}
            onPaymentSubmit={handlePaymentSubmit}
          />
        ))} */}
      </ScrollView>
      {/* Affichez les composants UserPayment pour chaque utilisateur gagnant */}
      <View style={{ flex: 1, marginTop: 0 }}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 8,
    zIndex: 3,
  },
  userPayment: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
});

export default UserPayment;
