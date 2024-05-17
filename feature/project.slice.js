import { createSlice } from "@reduxjs/toolkit";
import { updateValue } from "../component/dataBase";

export const projectSlice = createSlice({
  name: "store",
  initialState: {
    coinsTotal: 8000,
    currentCoinValue: 200,
    pays: "",
    phoneNumber: "",
    pseudo: "",
    montantImpaye: 0,
    montantPaye: 0,
    userId: "",
    userIsPlayingRandomGame: false,
    randomGameResultIsReady: false,
    userHasTheRightToMakeSetting: false,
    results: [],
    passWord: "",
    contact: "",
  },
  reducers: {
    IncrementCurrentCoinValue: (state, { payload }) => {
      if (payload) {
        if (payload > 10) {
          state.currentCoinValue = state.currentCoinValue + 10;
          state.coinsTotal = state.coinsTotal + 10;
        } else {
          state.currentCoinValue = state.currentCoinValue + payload;
          state.coinsTotal = state.coinsTotal + payload;
        }
      } else {
        console.log("une erreur est survenue");
      }
    },
    IncrementCoinTotal: (state, { payload }) => {
      if (payload) {
        if (payload > 10) {
          state.coinsTotal = state.coinsTotal + 10;
        } else {
          state.coinsTotal = state.coinsTotal + payload;
        }
      } else {
        console.log("une erreur est survenue");
      }
    },
    getUserInfo: (state, { payload }) => {
      const {
        pays,
        pseudo,
        phoneNumber,
        montantImpaye,
        montantPaye,
        coinsTotal,
        userId,
        userIsPlayingRandomGame,
        randomGameResultIsReady,
        userHasTheRightToMakeSetting,
      } = payload || {};
      console.log(payload, " payload");
      if (!payload) {
        return;
      } else {
        state.pays = pays;
        state.pseudo = pseudo;
        state.phoneNumber = phoneNumber;
        if (montantImpaye) state.montantImpaye = montantImpaye;
        if (montantPaye) state.montantPaye = montantPaye;
        if (coinsTotal) state.coinsTotal = coinsTotal;
        if (userId) state.userId = userId;
        if (userHasTheRightToMakeSetting)
          state.userHasTheRightToMakeSetting =
            userHasTheRightToMakeSetting == 1 ? true : false;
        if (userIsPlayingRandomGame)
          state.userIsPlayingRandomGame =
            userIsPlayingRandomGame == 0 ? false : true;
        if (randomGameResultIsReady)
          state.randomGameResultIsReady =
            randomGameResultIsReady === 0 ? false : true;
      }

      return state;
    },
    playRandomGame: (state, { payload }) => {
      if (state.coinsTotal >= 50) {
        if (payload) {
          state.coinsTotal = state.coinsTotal - 15;
        } else {
          state.coinsTotal = state.coinsTotal - 50;
        }
        updateValue("coins", state.coinsTotal, 1);
      }
      return state;
    },

    handleRandomResult: (state, { payload }) => {
      console.log(payload, " this the payoad fron handleRandomResult state");
      if (payload.isNew) {
        if (!state.randomGameResultIsReady) {
          updateValue("randomGameResultIsReady", 1, 1);
          return {
            ...state,
            randomGameResultIsReady: true,
          };
        }
      } else {
        if (state.randomGameResultIsReady) {
          updateValue("randomGameResultIsReady", 0, 1);
          return {
            ...state,
            randomGameResultIsReady: false,
          };
        }
      }
    },
    handlePlayIngFunction: (state, { payload }) => {
      if (payload == 1 && !state.userIsPlayingRandomGame) {
        state.userIsPlayingRandomGame = true;
        updateValue("userIsPlayingRandomGame", 1, 1); // le premier 1 signifie vrai et le second signifie le premier enregistrement de la table userIsPlayingRandomGame
      } else {
        if (state.userIsPlayingRandomGame && payload === 0) {
          state.userIsPlayingRandomGame = false;
          updateValue("userIsPlayingRandomGame", 0, 1); // le premier 0 signifie false et le 1 signifie le premier enregistrement de la table userIsPlayingRandomGame
        }
      }

      return state;
    },
    authBackend: (state, { payload }) => {
      if (payload) {
        state.passWord = payload.passWord;
        state.contact = payload.contact;
      }
    },
  },
});

export const {
  IncrementCurrentCoinValue,
  IncrementCoinTotal,
  getUserInfo,
  playRandomGame,
  handlePlayIngFunction,
  handleRandomResult,
  authBackend,
} = projectSlice.actions;
export default projectSlice.reducer;
