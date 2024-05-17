import { createStackNavigator } from "@react-navigation/stack";
import HistoriqueScreen from "./component/Historique";
import MainScreen from "./component/MainScreen";
import Qcm from "./component/Qcm";
import ReclamationScreen from "./component/ReclamationScreen";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import DomainSelectionScreen from "./component/DomainSelectionScreen";
import GetUserInfo from "./component/GetsUserInfos";
import AdsComponent from "./component/AdsComponent";
import Login from "./component/Login";
import GameSettingForm from "./component/GameSettingForm";
import UserPayment from "./component/UserPayment";
import PaymentList from "./component/PaymentList";
import ExplicationModeFonctionnement from "./component/ExplicationModeFonctionnement";
import LackOfCoins from "./component/LackOfCoins";
import { SafeAreaView } from "react-native";

const Stack = createStackNavigator();
const MainStackScreen = () => {
  const [fontsLoaded] = useFonts({
    Dosis: require("./fonts/InstrumentSerif-Italic.ttf"),
    Instrument: require("./fonts/InstrumentSerif-Regular.ttf"),
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
  /*   AffoussiataKone5919@gmail.com       <Stack.Screen name="AdsComponent" component={AdsComponent} />
              <Stack.Screen  name="ExplicationModeFonctionnement" component={ExplicationModeFonctionnement} />
 */
  
  return (
    <>
      <Stack.Navigator
        initialRouteName="GetUserInfos"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen
          name="DomainSelectionScreen"
          component={DomainSelectionScreen}
        />
        <Stack.Screen name="AdsComponent" component={AdsComponent} />
        <Stack.Screen name="Historique" component={HistoriqueScreen} />
        <Stack.Screen name="Qcm" component={Qcm} />
        <Stack.Screen name="ReclamationScreen" component={ReclamationScreen} />
        <Stack.Screen name="GetUserInfos" component={GetUserInfo} />
       <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="GameSettingForm" component={GameSettingForm} />
        <Stack.Screen name="UserPayment" component={UserPayment} />
        <Stack.Screen name="PaymentList" component={PaymentList} />
        <Stack.Screen name="LackOfCoins"  component={LackOfCoins}/>
        <Stack.Screen  name="ExplicationModeFonctionnement" component={ExplicationModeFonctionnement} />
      </Stack.Navigator>
    </>
  );
};

export default MainStackScreen;
