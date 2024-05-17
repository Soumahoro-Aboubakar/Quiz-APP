import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
//economie,culture_africaine,culture_africaine_côteIvoire,culture_africaine_BurkinaFaso,comptabilite,culture_scientifique,Naruto,Jujutsu kaisen,medecine,programmation_langage_python
const domains = [ 'Droit' , 'Football', 'Economie', 'Comptabilite', 'Informatique', 'Culture Scientifique',  'Culture Africaine' ,"Culture Africaine Côte d'Ivoire" ,"Culture Africaine Burkina Faso" , 'Medecine' ,"Programmation langage JavaScript","Programmation langage Python" ,'mangas',"Naruto","Jujutsu Kaisen"]; // Liste de vos domaines
//footBall,droit,manga,economie,cutlture scientique,culure litteraire,culture generale,actualité du monde,histoire
const DomainSelectionScreen = () => {
  const route = useRoute();
   const isTest = route.params?.isTest === true ? true : false;
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const filteredDomains = domains.filter(domain =>
    domain.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDomainSelection = (selectedDomain_) => {
    let selectedDomain = selectedDomain_.replace(/ /g, "_");
    navigation.navigate('Qcm', { selectedDomain,isTest : isTest});   
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sélectionnez un domaine :</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Rechercher un domaine"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <ScrollView style={styles.scrollView}>
        {filteredDomains.map((domain, index) => (
          <TouchableOpacity
            key={index}
            style={styles.domainItem}
            onPress={() => handleDomainSelection(domain)}
          >
            <Text>{domain}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  scrollView: {
    flex: 1,
  },
  domainItem: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
});

export default DomainSelectionScreen;
