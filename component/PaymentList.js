import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TextInput, StyleSheet } from "react-native";
import { REACT_APP_API_URL } from "@env";
import axios from "axios";

const PaymentList = () => {
  const [payments, setPayments] = useState([]);
  const [paymentsStore, setPaymentsStore] = useState([]);
  const [searchUserId, setSearchUserId] = useState("");

  useEffect(() => {
    axios
      .get(`${REACT_APP_API_URL}/paymentAction/payments`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setPayments(response.data);
          setPaymentsStore(response.data);
        }
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des paiements :", error)
      );
  }, []);

  const handleSearch = (text) => {
    setSearchUserId(text);
    if (!text || text.length <5) return setPayments(paymentsStore);
    const filteredPayments = paymentsStore.filter(
      (payment) => payment?.userId == text
    );
    if (filteredPayments) {
      setPayments(filteredPayments);
    } else {
      setPayments(paymentsStore);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Liste des Paiements</Text>
      <TextInput
        style={styles.input}
        placeholder="Rechercher par ID utilisateur"
        keyboardType="phone-pad"
        value={searchUserId}
        onChangeText={(text) => handleSearch(text)}
      />
      <View style={{ flex: 1 }}>
        <FlatList
          data={payments}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.paymentItem}>
              <Text>{`ID: ${item._id}`}</Text>
              <Text>{`Utilisateur ID: ${item.userId}`}</Text>
              <Text>{`Gain Payé: ${item.gainPaye} FCFA`}</Text>
              <Text>{`Date: ${new Date(
                item.createdAt
              ).toLocaleString()}`}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  paymentItem: {
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

export default PaymentList;
