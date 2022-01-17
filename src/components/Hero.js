import React from "react";
import { View, StyleSheet } from "react-native";
import { Image, Text, Spacer } from "native-base";
import { colors } from "../utils/Colors";

export const Hero = ({ heroObject }) => {
  return (
    <View style={styles.row}>
        <Image
          style={styles.imageHero}
          source={{
            uri: `${heroObject.thumbnail.path}.${heroObject.thumbnail.extension}`,
          }}
          size="md"
          alt="Hero Image."
        />
      <Text style={styles.nameHero}>{heroObject.name}</Text>
      <Spacer />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: colors.mainColor,
  },
  nameHero: {
    fontSize: 20,
    fontFamily: "Roboto-Light",
    fontWeight: "bold",
    color: "gray",
    marginTop: 40,
    marginLeft: 10,
    maxWidth: 200
  },
  imageHero: {
    marginLeft: 20,
    borderRadius: 50,
    marginVertical: 18,
  },
});
