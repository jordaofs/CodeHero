import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { colors } from "./utils/Colors";
import { Image, NativeBaseProvider, Center } from "native-base";

export const Details = ({ navigation, route }) => {
  const hero = route.params.hero;
  return (
    <NativeBaseProvider>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Detalhes do Herói</Text>
        </View>
        <View>
          <Center>
            <Image
              mt="5"
              mb="5"
              style={styles.imageHero}
              source={{
                uri: `${hero.thumbnail.path}.${hero.thumbnail.extension}`,
              }}
              size="2xl"
              alt="Hero Image."
            ></Image>
          </Center>
          <Text style={styles.text}>Nome: {hero.name}</Text>
          <Text style={styles.text}>
            Descrição: {hero.description || "Vazio."}
          </Text>
          <Text style={styles.text}>
            Qtd. de Revistas: {hero.comics.available}
          </Text>
          <Text style={styles.text}>
            Aparições em Séries: {hero.series.available}
          </Text>
          <Text style={styles.text}>
            Aparições em Histórias: {hero.stories.available}
          </Text>
          <Text
            style={styles.textLink}
            onPress={() => Linking.openURL(hero.urls[0].url)}
          >
            Clique aqui para mais detalhes!
          </Text>
        </View>
        <TouchableOpacity style={styles.returnButton} onPress={() => navigation.goBack()}>
          <Text style={styles.textButton}>Voltar para a lista de herois.</Text>
        </TouchableOpacity>
      </ScrollView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: "100%",
    backgroundColor: colors.mainColor,
  },
  textHeader: {
    fontSize: 25,
    fontFamily: "Roboto-Light",
    color: colors.white,
    marginLeft: "5%",
  },
  text: {
    fontSize: 18,
    fontFamily: "Roboto-Light",
    textAlign: "justify",
    marginLeft: "5%",
    maxWidth: "90%",
  },
  textLink: {
    fontSize: 18,
    fontFamily: "Roboto-Light",
    color: "blue",
    marginLeft: "5%",
  },
  returnButton: {
    margin: "5%",
    alignItems: "center",
    backgroundColor: colors.mainColor,
  },
  textButton: {
    fontSize: 16,
    fontFamily: "Roboto-Dark",
    color: colors.white

  },
});
