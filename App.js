import React, { useEffect } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MainStackScreen from "./MainStackScreen";
import DrawerContente from "./component/drawer/DrawerContente";
import { Provider} from "react-redux"; 
import store from "./App/App"; 


const Drawer = createDrawerNavigator();
/*  handle facebook ads intragration
  "plugins": [
      [
        "react-native-fbsdk-next",
        {
          "appID": "1190100438021443",
          "clientToken": "EAAWV2O1IsQIBOzg9iAsPcCq3C6KGjE05q8Q3X8KllTtvHd9kXJ8ozzTZAqjc1cxG6VZAEC8Uh708VprwZBdq9gPYJGxh9Me8UvVU8rXXIFDiYg66j7AEA9qGD4Un1lxTOXnEszQgvPjjUq6WDWG5fesPVpZChOZBsNYidYGFZBquKg57gLdgax4vXK",
          "displayName": "ToqeToqe",
          "advertiserIDCollectionEnabled": false,
          "autoLogAppEventsEnabled": false,
          "isAutoInitEnabled": true,
          "iosUserTrackingPermission": "This identifier will be used to deliver personalized ads to you."
        }
      ],
      "react-native-fbads"
    ],

     "build": {

*/


const App = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        color: "white",
      }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Provider store={store}>
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName="MainStackScreen"
            screenOptions={{
              headerShown: false,
            }}
            drawerContent={(props) => {
              return <DrawerContente {...props} />;
            }}
          >
            <Drawer.Screen
              name="MainStackScreen"
              options={{
                headerShown: false,
              }}
              component={MainStackScreen}
            />
            
          </Drawer.Navigator>
        </NavigationContainer>
      </Provider>
    </SafeAreaView>
  );
};

export default App;
