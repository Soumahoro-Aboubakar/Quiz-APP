import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NoHistoryMessage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        Oups, vous n'avez aucune historique conservée jusqu'à présent.
      </Text>
      <Text style={styles.instructions}>
        Rendez-vous dans la section "Test ta culture" pour les jouer.
      </Text>
      <Text style={styles.corrections}>
        Corrigez les erreurs et formulez les phrases.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  message: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  corrections: {
    fontSize: 14,
    textAlign: 'center',
    color: 'gray',
  },
});

export default NoHistoryMessage;
