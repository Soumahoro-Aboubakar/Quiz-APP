import React, { useCallback, useEffect } from "react";
import { BackHandler } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
const BackButtonHandler = ({ onBackPress, children }) => {
  const navigation = useNavigation();
   
  useFocusEffect(
   useCallback(() =>{
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (onBackPress) {
          onBackPress()
          return true;
        }
        return false;
      }
    );

    return () => backHandler.remove();
      
  } , [navigation])
  );

  return children;
};

export default BackButtonHandler;
