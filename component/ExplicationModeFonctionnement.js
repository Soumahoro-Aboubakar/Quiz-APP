import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from "react-native";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";  
const ExplicationModeFonctionnement = () => {
  const SectionTitle = ({ title, fontSize }) => (
    <View>
      <Text style={{ textAlign: "center", fontWeight: "bold", fontSize }}>
        ______
        <Text>{title}</Text>
        ______
      </Text>
    </View>
  );

  const TermExplanation = ({ term, description }) => (
    <View>
      <Text>
        ____<Text style={{ fontWeight: "600", fontSize: 15 }}>{term}</Text> :{" "}
        <Text style={{ fontFamily: "Dosis", fontSize: 17, marginVertical: 15 }}>
          {description}
        </Text>
      </Text>
    </View>
  );

  const renderSection = (title, fontSize, terms) => (
    <View>
      <SectionTitle title={title} fontSize={fontSize} />
      {terms.map((term) => (
        <TermExplanation
          key={term.term}
          term={term.term}
          description={term.description}
        />
      ))}
    </View>
  );

  return (
    <>
      <SafeAreaView>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <View style={styles.container}>
            <View style={{ marginBottom: 20 }}>
              <Text
                style={{
                  fontFamily: "Instrument",
                  fontSize: 17,
                  textDecorationLine: "underline",
                }}
              >
                Explications des termes de l'application
              </Text>
            </View>
            {/*    {renderSection("Section Aléatoire ( Ecran principal )", 16, [
          {
            term: "Rayon de convergence",
            description:
              "Le terme 'Rayon de convergence' se réfère à une zone spécifique, c'est-à-dire une région géographique particulière. Dans cette zone, seules les personnes se trouvant à une distance spécifique les unes des autres sont incluses. Cette distance détermine la localité, et seules les personnes situées dans cette localité peuvent participer à une même compétition. Pour illustrer, si le Rayon de convergence est défini à 2 kilomètres(KM), seuls les individus qui se trouvent à une distance de 2 kilomètres ou moins l'un de l'autre seront inclus dans la même localité. Ainsi, le gagnant sera sélectionné parmi les participants de cette localité spécifique. Un utilisateur situé à plus de 2 kilomètres de vous ne pourra pas participer car il n'appartient pas à la même localité.",
          },
          {
            term: "Nombre de personne concourante",
            description:
              "Cette expression fait référence au nombre de joueurs connectés pour le jeu sur le nombre de personnes minimum demandé pour commencer le jeu. Par exemple, si le Nombre de personne concourante est défini à 21/30, cela signifie qu'il y a 21 joueurs et qu'il faut au minimum 30 personnes pour lancer le jeu et donner le résultat.",
          },
          {
            term: "Gagnant",
            description:
              "Ce mot fait référence au nombre de numéros gagnants sur le jeu en cours. Par exemple, si 'Gagnant' est défini à ?/5, cela signifie qu'il y aura 5 numéros gagnants pris entre 1 et 100 (exemple : 12, 54, 85, 89, 100).",
          },
          {
            "term": "Le bouton Participer",
            "description": "Ce bouton vous permet de participer à un jeu aléatoire. Si vous êtes gagnant, vous remporterez une somme d'argent en fonction du nombre de joueurs et du nombre de gagnants. Il est important de noter que vous devez posséder des coins pour pouvoir participer. Vous pouvez obtenir des coins en regardant des publicités dans la section 'Visualiser de la publicité'."
          },
          {
            "term": "Le bouton Synchroniser",
            "description": "Ce bouton vous permet d'obtenir des informations sur le statut (commencé, terminé, en cours,non débuté) de votre jeu ou de savoir s'il y a déjà un jeu lancé dans votre localité. Dans le cas où un jeu est en cours, vous pouvez y participer en ayant suffisamment de coins."
          },          
        ])} */}
            {renderSection("Section Test ta Culture", 17, [
              {
                term: "Description de la partie",
                description:
                  "Cette section comporte généralement quatre questions, parmi lesquelles une seule est correcte. Vous serez confronté à 30 questions, et si vous parvenez à répondre correctement à plus de 25 d'entre elles, vous remporterez la partie. En outre, si vous avez regardé les différentes publicités qui vous ont été présentées, vous remporterez non seulement la partie mais aussi une somme d'argent. Il est impératif de regarder les publicités pour bénéficier de cette somme d'argent. Pour consulter vos résultats, veuillez les retrouver dans la section historique.",
              },
              {
                term: "Important",
                description:
                  "Nous tenons avant tout à nous excuser pour le moyen de paiement actuel et vous assurer que tout sera automatisé dans les versions à venir. Pour toutes vos préoccupations, n'hésitez pas à nous contacter via la section 'Réclamation' en laissant le motif et le libellé de votre plainte.",
              },
            ])}
          </View>
        </ScrollView>

        <StatusBar style="auto" />
      </SafeAreaView>
      <View
        style={{
          position: "absolute",
          zIndex: 2,
          bottom: 10,
          right: 0,
          left: 0,
        }}
      >
        <Text style={{ textAlign: "center" }}>
          <BannerAd
            unitId={TestIds.BANNER}
            size={BannerAdSize.LARGE_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
          />
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
});

export default ExplicationModeFonctionnement;
