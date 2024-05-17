import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
const { height, width } = Dimensions.get("window");
//import { CircularProgressBase } from "react-native-circular-progress-indicator";
const imageHeight = height * 0.65;
const TextHeight = height-imageHeight;
const props = { 
  activeStrokeWidth: 25,
  inActiveStrokeWidth: 25,
  inActiveStrokeOpacity: 0.2,
  duration: 3500,
};
export default function WelcomeMessage() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      
      <View style={{ height: imageHeight, backgroundColor: "green" , justifyContent:"center" }}>
        <Image
          style={{ width:"100%",height:"100%" }}
          //resizeMode="stretch"
          source={require("../assets/welcomeImage.jpg")}
        />
      </View>
      <View
        style={{
          height: TextHeight,//height * 0.49
          //position: "absolute",
          right: 0,
          left: 0,
          backgroundColor: "white",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            fontWeight: "bold",
            marginTop: 10,
          }}
        >  
          ToqeToqe qui est chaux hoooooooo.....
        </Text>
        {/*  <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <CircularProgressBase
            {...props}
            value={100}
            radius={125}
            activeStrokeColor={"#C3692F"}
            inActiveStrokeColor={"#e84118"}
           
          >
            <CircularProgressBase
              {...props}
              value={90}
              radius={100}
              activeStrokeColor={"#87DA74"}
              inActiveStrokeColor={"#badc58"}  
            >
              <CircularProgressBase
                {...props}
                value={85}
                radius={75}
                activeStrokeColor={"#6AA7B7"}
                inActiveStrokeColor={"#18dcff"}
              />
            </CircularProgressBase>
          </CircularProgressBase>
        </View> */}
        <View  style={{alignItems:"center" , justifyContent:"center" , marginTop:TextHeight/6}}>
         <ActivityIndicator size={100} color="#7DF994" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  
});
