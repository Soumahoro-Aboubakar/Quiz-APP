import React from 'react';
import { View, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';

const Spinner = () => {
  return (
    <View style={styles.spinnerContainer}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  spinnerContainer: {
    position: 'absolute',
    top: Dimensions.get("window").height*0.5,
    left: '50%',
    zIndex: 9, // Pour s'assurer que le spinner apparaît au-dessus des autres éléments
    transform: [{ translateX: -25 }, { translateY: -25 }], // Ajustement pour placer le spinner au centre
    backgroundColor: '#DEDECC', // Arrière-plan semi-transparent pour la visibilité
    borderRadius: 5,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:10,
  },
});

export default Spinner;
