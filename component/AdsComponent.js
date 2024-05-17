import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";
import { initializeDatabase } from "./dataBase";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
  InterstitialAd,
  AdEventType,
  RewardedInterstitialAd,
  RewardedAdEventType,
  RewardedAd,
} from "react-native-google-mobile-ads";
//import { InterstitialAdManager } from "react-native-fbads";
//__ AffoussiataKone5919@gmail.com     
const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
  requestNonPersonalizedAdsOnly: true,
});

const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest(
  TestIds.REWARDED_INTERSTITIAL,
  {
    requestNonPersonalizedAdsOnly: true,
  }
);

const rewardedAd = RewardedAd.createForAdRequest(TestIds.REWARDED, {
  requestNonPersonalizedAdsOnly: true,
});

///___________facebook add implementation ___________________

const placementIdF =
  "VID_HD_9_16_39S_APP_INSTALL#747245383650574_747247716983674";


const ButtonComponent = ({ id, title, onPress, isLoading = false }) => (
  <TouchableOpacity
    disabled={isLoading}
    style={{
      backgroundColor: "#DDDDDD",
      padding: 10,
      margin: 10,
      borderRadius: 7,
      elevation: 5,
      position: "relative",
    }}
    onPress={onPress}
  >
    <Text style={{ fontSize: 18, fontWeight: "bold" }}>{title}</Text>
    {isLoading && (
      <View style={{ position: "absolute", top: 8, bottom: 0, right: 10 }}>
        <ActivityIndicator size={25} color="#0000ff" />
      </View>
    )}
  </TouchableOpacity>
);



const AdsComponent = () => {
  const [currentCoinsValue, setCurrentCoinsValue] = useState(10);
  ////___________________________________________handle  adMobs  ads_________________________________________________________
  const [interstitialLoaded, setInterstitialLoaded] = useState(false);
  const [rewardedInterstitialLoaded, setRewardedInterstitialLoaded] =
    useState(false);
  const [rewardedAdInitialLoaded, setRewardedAdInitialLoaded] = useState(false);
  ///_____________________  the first implementation is using adMob api
  const loadInterstitial = () => {
    const unsubscribeLoaded = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setInterstitialLoaded(true);
      }
    );

    const unsubscribeClosed = interstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setInterstitialLoaded(false);
        interstitial.load();
        setCurrentCoinsValue((prevValue) => prevValue + 5);
      }
    );

    interstitial.load();

    return () => {
      unsubscribeClosed();
      unsubscribeLoaded();
    };
  };

  ///=================================================
  const loadRewardedInterstitial = () => {
    const unsubscribeLoaded = rewardedInterstitial.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setRewardedInterstitialLoaded(true);
      }
    );

    const unsubscribeEarned = rewardedInterstitial.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward) => {
        setCurrentCoinsValue((prevValue) => prevValue + 10);
      }
    );

    const unsubscribeClosed = rewardedInterstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setRewardedInterstitialLoaded(false);
        rewardedInterstitial.load();
      }
    );

    rewardedInterstitial.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
      unsubscribeEarned();
    };
  };

  //===================================================
  const loadRewardedAd = () => {
    const unsubscribeLoaded = rewardedAd.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setRewardedInterstitialLoaded(true);
      }
    );

    const unsubscribeEarned = rewardedAd.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward) => {
        setCurrentCoinsValue((prevValue) => prevValue + 10);
      }
    );

    const unsubscribeClosed = rewardedAd.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setRewardedInterstitialLoaded(false);
        rewardedInterstitial.load();
      }
    );
    rewardedAd.load();
    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
      unsubscribeEarned();
    };
  };
  useEffect(() => {
    const unsubscribeInterstitialEvents = loadInterstitial();
    const unsubscribeRewardedInterstitialEvents = loadRewardedInterstitial();
    const unsubscribeRewardedAditialEvents = loadRewardedAd();
    return () => {
      unsubscribeInterstitialEvents();
      unsubscribeRewardedInterstitialEvents();
      unsubscribeRewardedAditialEvents();
    };
  }, []);

  ////____________________end handling adMobs__________________________________________________________

  ///_____________________ handle faceBook ads _______________________________________________________
/*   useEffect(() => {
    InterstitialAdManager.preloadAd(placementIdF)
      .then((didClick) => {
        setCurrentCoinsValue((prevValue) => prevValue + 7);
      })
      .catch((error) => {
        alert("error occured");
      });
  }, []); */

  ///_____________________end handling faceBook ads___________________________________________________
//AffoussiataKone5919@gmail.com
  useEffect(() => {
    initializeDatabase();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      
        <Text style={styles.title}>
          Regardez de la Publicité pour obtenir plus de coins
        </Text>
        <Text>
          <Text style={{ fontSize: 16, fontFamily: "Dosis" , marginLeft:15 }}>
            Total Coin{currentCoinsValue > 0 ? "s" : ""}
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>
          {" :  "+   currentCoinsValue}
          </Text>
        </Text>
        <>
          <ButtonComponent
            id={1}
            title="Coup de cœur"
            isLoading={rewardedAdInitialLoaded}
            onPress={() => rewardedAd.show()}
          />
          <ButtonComponent
            id={2}
            title="Mes loves"
            isLoading={rewardedInterstitialLoaded}
            onPress={() => rewardedInterstitial.show()}
          />
         {/*  <ButtonComponent
            id={3}
            title="Mes news"
            isLoading={true}
            onPress={() => InterstitialAdManager.showPreloadedAd(placementIdF)}
          /> */}
          <ButtonComponent
            onPress={() => interstitial.show()}
            id={4}
            title="Une surprise"
            isLoading={interstitialLoaded}
          />
        </>
      <BannerAd
        unitId={TestIds.BANNER}
        size={BannerAdSize.LARGE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onPress={() => setCurrentCoinsValue((prevValue) => prevValue + 8)}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  watchedAd: {
    backgroundColor: "#A0A0A0",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default AdsComponent;
