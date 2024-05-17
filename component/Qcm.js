import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import { REACT_APP_API_URL } from "@env";
import { useDispatch, useSelector } from "react-redux";
import {
  handleRandomResult,
  playRandomGame,
} from "../feature/project.slice";
import BackBtn from "./BackBtn";
import { Entypo } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import BackButtonHandler from "./BackButtonHandler";
import Spinner from "./Spinner";
import {

  insertGameResult,
} from "./dataBase";
import ShowImage from "./ShowImage";
import { winNumber } from "./Constants";
import BackgroundImageComponent from "./BackgroundImageComponent";
/*  const questions = [
  {
    question: "Quelle est la capitale de la France ?",
    options: ["Londres", "Paris", "Berlin", "Madrid"],
    correctAnswer: "Paris",
  },
  {
    question: "Quelle est la couleur du ciel par temps clair ?",
    options: ["Rouge", "Vert", "Bleu", "Jaune"],
    correctAnswer: "Bleu",
  },
  // Ajoutez d'autres questions ici...
];  */

// Fonction pour mélanger un tableau aléatoirement
function shuffleArray(array) {
  if (Array.isArray(array)) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  } else return [];
}

const { height, width } = Dimensions.get("window");
export default function Qcm() {
  //deleteDataBse("gameResults")
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.getStore);
  const route = useRoute();
  const navigation = useNavigation();
  const questionField = route?.params?.selectedDomain;
  const isTest = route.params.isTest;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [goodQuestionTimer, setGoodQuestionTimer] = useState(0);
  const [coinsAreAlreadyRemoved, setCoinsAreAlreadyRemoved] = useState(false);
  const [answerStatus, setAnswerStatus] = useState("");
  const [showDotsOptions, setShowDotsOptions] = useState(false);
  const [currentQuestionLength, setCurrentQuestionLength] = useState(1);
  const [userIsPaid, setUserIsPaid] = useState(false);
  const [selectedAnswer_, setSelectedAnswer_] = useState("");
  const [timer, setTimer] = useState(15); // Timer initialisé à 15 secondes
  const [timerIsUP, setTimerIsUp] = useState(false);
  const [isTheFirstRunning,setIstheFirstRunning]= useState(true);
  // const [questionField, setQuestionField] = useState("All");
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    const fetchQuestions = () => {
      axios
        .get(`${REACT_APP_API_URL}/connected/getAll/${questionField}`)
        .then((response) => {
          setQuestions(shuffleArray(response.data));
        })
        .catch((error) => {
          console.log(error, "  error occured to fetch qcm  data ");
          navigation.navigate("DomainSelectionScreen")
        });
    };

    fetchQuestions();
  }, []);
  useEffect(() => {
    let interval;
    if (timer > 0 && answerStatus === "") {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && answerStatus === "") {
      setAnswerStatus("incorrect");
      setTimerIsUp(true);
    }
    return () => clearInterval(interval);
  }, [timer, answerStatus]);
  //this alllow to permet to load font
  const handleUserPaid = async () => {
    let date = new Date();
    const gameResultData = {
      userId: userData.userId,
      message: "Gagné",
      phoneNumber: userData.phoneNumber,
      timer: date.toISOString(),
      paye: "non",
      gain: 350,
      userValue: 0, //(definie dans la partie aleatoire)
      results: [], //(definie dans la partie aleatoire)
      usersLength: 1, //cette partie est definie a 1 car s'il n'est pas pris en compte dans le qcm. (definie dans la partie aleatoire)
      type: "qcm", // ou 'game' selon votre besoin
    };

    await axios
      .post(`${REACT_APP_API_URL}/connected/game/qcm/result`, gameResultData)
      .then((response) => {
        if (response.data) {
          insertGameResult(response.data);
          dispatch(
            handleRandomResult({
              isNew: true, //permet de dire qu'il n'y a un niveau resultat
            })
          );
          setUserIsPaid(true);
        }
      })
      .catch((error) => {
        console.log("====================================");
        console.log(error, "  this the error");
        console.log("====================================");
      });
  };
  const handleAnswer = (selectedAnswer) => {
    setSelectedAnswer_(selectedAnswer);
    if (answerStatus === "") {
      clearInterval(timer); // Arrête le compteur lorsque la réponse est donnée
      if (selectedAnswer === questions[currentQuestion].correctAnswer) {
        setAnswerStatus("correct");
        setGoodQuestionTimer((prev) => prev + 1);
      } else {
        setAnswerStatus("incorrect");
      }
    }
  };
  const handleEndGame = () => {
    if (!(goodQuestionTimer >= winNumber) && currentQuestionLength >= 2) {
      let date = new Date();
      const gameResultData = {
        userId: userData.userId,
        message: "Perdu",
        phoneNumber: userData.phoneNumber,
        timer: date.toISOString() + "",
        paye: "non",
        gain: 0,
        userValue: 1, //(definie dans la partie aleatoire)
        results: [], //(definie dans la partie aleatoire)
        usersLength: 1, //cette partie est definie a 1 car s'il n'est pas pris en compte dans le qcm. (definie dans la partie aleatoire)
        type: "qcm", // ou 'game' selon votre besoin
      };
      insertGameResult(gameResultData);
      /*  dispatch(
        handleRandomResult({
          isNew: true, //permet de dire qu'il n'y a un niveau resultat
        })
      ); */
    }
    setCurrentQuestionLength(0);
    setGoodQuestionTimer(0);
    setUserIsPaid(false);
    setCoinsAreAlreadyRemoved(false);
    setShowDotsOptions(false);
    if (userData.coinsTotal < 50) {
      navigation.navigate("LackOfCoins");
    }
  };
  const handleNextQuestion = async () => {
    //Après nous pourons organiser une competitions entre les utilisateurs
    if (goodQuestionTimer >= winNumber && !userIsPaid) {
      !isTest && handleUserPaid();
    }
    // voici les moments, propiste pour mettre  les status (dès l'arriver, 10 , 20 )
    if (currentQuestionLength >= 30) {
      handleEndGame();
    }

    if (currentQuestionLength >= 2 && !coinsAreAlreadyRemoved) {
      dispatch(playRandomGame(isTest));
      setCoinsAreAlreadyRemoved(true);
    }
    if (currentQuestionLength < 15) {
      setTimer(15);
    } else if (currentQuestionLength >= 15 && currentQuestionLength < 20) {
      setTimer(13);
    } else if (currentQuestionLength >= 20 && currentQuestionLength < 22) {
      setTimer(8);
    } else if (currentQuestionLength >= 22 && currentQuestionLength < 26) {
      setTimer(6);
    } else {
      setTimer(5);
    }
    if (questions.length - 1 <= currentQuestion) {
      return alert("Bravo, vous avez atteint le sommet !");
    }
    setCurrentQuestionLength((prev) => prev + 1);
    setCurrentQuestion((prev) => prev + 1); // Pour le deconte du nombre question , j'ai decidé d'utiliser setCurrentQuestionLength  car il sera renitialiser a 1 lorsque l'utilisateur atteindra 30. Ce qui n'est pas le cas pour setCurrentQuestion. car lui servira a afficher la question suivante  dans le tableau de question et ne sera pas renitialiser a 0 pour ne pas presenter les même question a l'utilisateur
    setAnswerStatus("");
    // setTimer(15);
    setTimerIsUp(false);
  };

  if (questions.length < 1) {
    return <BackgroundImageComponent />;
  }
  if(isTheFirstRunning){
    setIstheFirstRunning(false);
    handleEndGame();
   }

  const backBtn = () => {
    Alert.alert(
      "Confirmation",
      "Voulez-vous annuler cette section ?",
      [
        {
          text: "Non",
          onPress: () => console.log("Action Non"), // Remplacez par votre fonction pour "Non"
          style: "cancel",
        },
        {
          text: "Oui",
          onPress: () => {
            if (goodQuestionTimer >= winNumber && !userIsPaid) {
              !isTest && handleUserPaid();
            }
            navigation.goBack();
          }, // Remplacez par votre fonction pour "Oui"
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <BackButtonHandler onBackPress={backBtn}>
      <BackBtn routeBtnColor={"#3498db"} />
      {currentQuestionLength >= 30 && (
        <ShowImage userWin={goodQuestionTimer >= winNumber} />
      )}
      {showDotsOptions && (
        <View
          style={{
            backgroundColor: "white",
            padding: 10,
            borderRadius: 10,
            position: "absolute",
            zIndex: 2,
            top: 55,
            right: 8,
          }}
        >
          {/*  <TouchableOpacity style={styles.dotsBtn}>
            <Text style={styles.dotsText}>salut je suis de la partie </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dotsBtn}>
            <Text
              style={[styles.dotsText, { textDecorationLine: "line-through" }]}
            >
              Participez à un concours
            </Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={[styles.dotsBtn, { marginBottom: 5 }]}
            onPress={() => {
              handleEndGame();
              handleNextQuestion();
            }}
          >
            <Text style={styles.dotsText}>Reprendre la partie</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dotsBtn}
            onPress={() => setShowDotsOptions(false)}
          >
            <Text style={[styles.dotsText, { color: "red" }]}>
              Fermer la senction
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity
        style={{ position: "absolute", top: 15, right: 15, zIndex: 2 }}
        onPress={() => setShowDotsOptions(true)}
      >
        <Entypo name="dots-three-vertical" size={25} color={"#3498db"} />
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 30,
        }}
      >
        <>
          <Text style={{ paddingTop: 30 }}>
            <Text
              style={{ fontSize: 16, fontWeight: "bold", paddingRight: 10 }}
            >
              Domaine
            </Text>
            :{"  "}
            <Text style={{ fontFamily: "Instrument", fontSize: 18 }}>
              {questionField.replace(/_/g, " ")}
            </Text>
          </Text>
          <View style={styles.container}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                width: width,
                marginBottom: 20,
              }}
            >
              <Text style={[styles.coin]}>
                {winNumber}/30 =<Text style={{ fontSize: 17 }}> 350 FCFA</Text>
              </Text>
              <Text
                style={[
                  styles.coin,
                  { fontWeight: "400", fontFamily: "Instrument" },
                ]}
              >
                Coins Total :{" "}
                <Text style={{ fontSize: 18 }}> {userData.coinsTotal}</Text>
              </Text>
            </View>
            <Text style={[styles.questionText, { fontFamily: "Dosis" }]}>
              {questions[currentQuestion].question}
            </Text>
            <Text style={{ fontFamily: "Instrument" }}>
              Reponses exactes <Text> {goodQuestionTimer}/30 </Text>
            </Text>
            <Text>
              <Text style={{ fontSize: 15, fontWeight: "800" }}>N°:</Text>{" "}
              <Text>{currentQuestionLength}</Text>
            </Text>
            <Text style={styles.answerStatusText}>
              <Text style={{ color: "red" }}>{timer}</Text> secondes
            </Text>
            {questions[currentQuestion].options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  answerStatus === "incorrect" &&
                  option === questions[currentQuestion].correctAnswer
                    ? styles.correctAnswer
                    : answerStatus === "incorrect" &&
                      option !== questions[currentQuestion].correctAnswer
                    ? styles.incorrectAnswer
                    : null,
                  answerStatus === "correct" &&
                    option === questions[currentQuestion].correctAnswer && {
                      backgroundColor: "#2ecc71",
                    },
                ]}
                onPress={() => handleAnswer(option)}
                disabled={answerStatus !== ""}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
            {answerStatus !== "" && (
              <View>
                {timerIsUP ? (
                  <Text style={styles.answerStatusText}>Temps écoulé !</Text>
                ) : (
                  <>
                    <Text style={styles.answerStatusText}>
                      {answerStatus === "correct"
                        ? "Correct !"
                        : "Incorrect ! "}
                    </Text>
                    <Text style={styles.answerStatusText}>
                      {answerStatus != "correct" && (
                        <Text>Vous aviez sélectionné : {selectedAnswer_}</Text>
                      )}
                    </Text>
                  </>
                )}
                <TouchableOpacity
                  style={styles.nextButton}
                  onPress={handleNextQuestion}
                >
                  <Text style={styles.nextButtonText}>Question suivante</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </>
      </ScrollView>
    </BackButtonHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  questionText: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  optionButton: {
    backgroundColor: "#3498db",
    padding: 10,
    marginVertical: 5,
    width: width * 0.8,
    borderRadius: 10,
  },
  optionText: {
    color: "#fff",
    textAlign: "center",
  },
  correctAnswer: {
    backgroundColor: "#2ecc71",
  },
  incorrectAnswer: {
    backgroundColor: "red",
  },
  answerStatusText: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  nextButton: {
    backgroundColor: "#2ecc71",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  nextButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  coin: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  dotsBtn: { marginTop: 10 },
  dotsText: {
    fontSize: 14,
    fontWeight: "700",
  },
});
