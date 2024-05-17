import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';

const BackgroundImageComponent = () => {
  return (
    <ImageBackground source={require("../assets/loadingPro.gif")} style={styles.backgroundImage}>
      <View style={styles.overlay}></View>
    </ImageBackground>
  );
};
   
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BackgroundImageComponent;
