import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const BackBtn = ({ route, routeBtnColor }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (typeof route === 'string') {
      navigation.navigate(route);
    } else {
      navigation.goBack();
    }
  };    

  return (
    <View>
      <TouchableOpacity
        style={{ position: "absolute", top: 10, left: 10 , zIndex:2}}
         onPress={handlePress}
      >
        <AntDesign name="back" size={35} color={routeBtnColor} />
      </TouchableOpacity>
    </View>
  );
};

export default BackBtn;
