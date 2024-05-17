import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { AntDesign, Octicons } from "@expo/vector-icons";
import {
  createDataBaseTransaction,
  getAllGameResults,
  updateGameResults,
} from "./dataBase";
import Spinner from "./Spinner";
import GetUserInfo from "./GetsUserInfos";
import { blueColor } from "./MainScreen";
import axios from "axios";
import { REACT_APP_API_URL } from "@env";
import { useSelector } from "react-redux";

const { width, height } = Dimensions.get("window");

function formatDateToCustomString(isoDateString) {
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  };
  const date = new Date(isoDateString);
  return date.toLocaleString("fr-FR", options);
}

const MontantTotalComponent = ({ data }) => {
  if (!Array.isArray(data)) return <Text></Text>;
  const filteredDataNonPayé = data.filter(
    (item) => item.gain > 0 && item.paye === "non"
  );
  const filteredDataPayé = data.filter(
    (item) => item.gain > 0 && item.paye === "oui"
  );
  const montantTotalNonPayé = filteredDataNonPayé.reduce(
    (total, item) => total + item.gain,
    0
  );
  const montantTotalPayé = filteredDataPayé.reduce(
    (total, item) => total + item.gain,
    0
  );

  return (
    <View style={{ marginTop: -10, paddingBottom: 10, marginLeft: 15 }}>
      <Text>
        Montant Total des Gagnants non payés :{" "}
        <Text style={{ fontWeight: "bold" }}> {montantTotalNonPayé} FCFA</Text>
      </Text>
      <Text>
        Montant Total des Gagnants payés :{" "}
        <Text style={{ fontWeight: "bold" }}> {montantTotalPayé} FCFA</Text>
      </Text>
    </View>
  );
};
const compareDates = (a, b) => {
  const dateA = new Date(a.timer);
  const dateB = new Date(b.timer);

  return dateB - dateA;
};
const HistoriqueScreen = () => {
  const userProperties = useSelector((state) => state.getStore);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modifyInfo, setModifyInfo] = useState(false);
  const [gameResult, setGameResult] = useState([]);
  const [payments, setPayments] = useState([]);

  const fetchPayment = async () => {
    await axios
      .get(
        `${REACT_APP_API_URL}/paymentAction//getUser/payments/${userProperties.phoneNumber}`
      )
      .then((response) => {
        if (Array.isArray(response.data)) {
          setPayments(response.data);
        } else {
          setPayments(null);
        }
      })
      .catch((error) => console.log(error, " error occured"));
  };
  useEffect(() => {
    createDataBaseTransaction();
    fetchPayment();
    getAllGameResults()
      .then((result) => {
        setGameResult(result);
        const sortedData = result.sort(compareDates);
        setTransactions(sortedData);
        setIsLoading(false);
      })
      .catch((error) => {
        alert(
          "Oups,une erreur est survenue lors de la  récuperation  de vos informations"
        );
      });
  }, []);

  useEffect(() => {
    handleUserPayment(payments, gameResult);
  }, [payments?.length, gameResult?.length]);

  const handleUserPayment = (userData, localUserData) => {
    if (!Array.isArray(userData) && !Array.isArray(localUserData)) return;
    if (userData.length < 1 || localUserData.length < 1) return;
    let totalPayment = userData.reduce(
      (total, user) => total + user.gainPaye,
      0
    );
    for (let j = 0; j < localUserData.length; j++) {
      let localUserInfos = localUserData[j];
      if (localUserInfos.paye === "non" && localUserInfos.message === "Gagné") {
        if (localUserInfos.gain > totalPayment) {
          updateGameResults("gain", localUserInfos.gain - totalPayment, j + 1);
          //  return;
          break;
        } else {
          updateGameResults("paye", "oui", j + 1);
          totalPayment = totalPayment - localUserInfos.gain;
        }
      }
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <Text
        style={{
          textAlign: "center",
          fontSize: 14,
          fontWeight: "600",
          color: blueColor,
        }}
      >
        Dépôt versé
      </Text>
      <View style={styles.scrollViewItem}>
        <Text style={styles.scrollViewItemText}>Participant</Text>
        <Text style={styles.scrollViewItemText}>{item.usersLength}</Text>
      </View>
      <View style={styles.scrollViewItem}>
        <Text style={styles.scrollViewItemText}>Status</Text>
        <Text style={styles.scrollViewItemText}>
          <Text style={{ marginTop: 100 }}>
            <Octicons
              name="dot-fill"
              color={item.message === "Gagné" ? "#66EE8F" : "red"}
              size={20}
            />
          </Text>
          {item.message}
        </Text>
      </View>
     {/*  {item.type != "qcm" && (
        <>
          <View style={styles.scrollViewItem}>
            <Text style={styles.scrollViewItemText}>Nombre choisi</Text>
            <Text style={styles.scrollViewItemText}>{item.userValue}</Text>
          </View>
          <View style={styles.scrollViewItem}>
            <Text style={styles.scrollViewItemText}>Résultat</Text>
            <Text style={styles.scrollViewItemText}>
              {JSON.parse(item.results).join(", ")}
            </Text>
          </View>
        </>
      )} */}
   
      <View style={styles.scrollViewItem}>
        <Text style={styles.scrollViewItemText}>Gain</Text>
        <Text style={styles.scrollViewItemText}>{item.gain}</Text>
      </View>
      {/* <View style={styles.scrollViewItem}>
        <Text style={styles.scrollViewItemText}>Payé</Text>
        <Text style={styles.scrollViewItemText}>{item.paye}</Text>
      </View> */}
      <View style={styles.scrollViewItem}>
        <Text style={styles.scrollViewItemText}>Numéro(Tél)</Text>
        <Text style={styles.scrollViewItemText}>{item.phoneNumber}</Text>
      </View>
      <View style={styles.scrollViewItem}>
        <Text style={styles.scrollViewItemText}>Date</Text>
        <Text style={styles.scrollViewItemText}>
          {formatDateToCustomString(item.timer)}
        </Text>
      </View>
    </View>
  );
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          textAlign: "center",
          fontSize: 18,
          fontWeight: "500",
          marginVertical: 10,
          marginBottom: 10,
        }}
      >
        Section historique
      </Text>
      <TouchableOpacity
        onPress={() => {
          /*   const participant = "20/500";
          const result = "Gagné";
          const paid = "oui";
          const gain = "50";
          const date = "2024-02-10"; // Format as needed
          const phoneNumber = "+5155544158";
          insertTransaction(participant, result, paid, gain, date, phoneNumber); */
          setModifyInfo(true);
        }}
        style={[styles.btn, { backgroundColor: blueColor }]}
      >
        <Text style={[styles.btnText, { color: "#fff" }]}>
          Modifier mes informations
        </Text>
      </TouchableOpacity>
      <MontantTotalComponent data={transactions} />
      {!isLoading ? (
        !modifyInfo && (
          <FlatList
            data={transactions}
            renderItem={renderItem}
            contentContainerStyle={{ flexGrow: 1 }}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={<View style={{ height: 500 }}></View>}
          />
        )
      ) : (
        <Spinner />
      )}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backBtn}
      >
        <AntDesign name="back" size={30} color={blueColor} />
      </TouchableOpacity>
      {modifyInfo && (
        <GetUserInfo
          userWantModifyIsInfo={true}
          setModifyInfo={setModifyInfo}
          modifyInfo={modifyInfo}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    width: width * 0.95,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 5,
    padding: 10,
    elevation: 6,
  },
  scrollViewItem: {
    width: width * 0.9,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  scrollViewItemText: { fontSize: 14, fontWeight: "400" },
  btn: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: blueColor,
    marginTop: 15,
    width: "auto",
    width: "50%",
    marginRight: "auto",
    marginLeft: "auto",
    marginBottom: 30,
  },
  btnText: {
    fontSize: 15,
    fontWeight: "500",
    paddingHorizontal: 5,
    textAlign: "center",
    paddingVertical: 10,
    width: "auto",
  },
  backBtn: {
    position: "absolute",
    top: 17,
    left: 17,
  },
});
export default HistoriqueScreen;
