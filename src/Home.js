import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Heading, NativeBaseProvider, Spinner } from "native-base";
import { IconFill } from "@ant-design/icons-react-native";
import { Hero } from "../src/components/Hero";
import { colors } from "../src/utils/Colors";
import { BASE_URL, API_KEY, HASH, TS } from "@env";

export const Home = ({ navigation }) => {
  const [heroName, setHeroName] = useState(null);
  const [heroes, setHeroes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalHeroes, setTotalHeroes] = useState(null);
  useEffect(() => {
    const url = `${BASE_URL}/public/characters`;
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(url, {
          params: {
            apikey: API_KEY,
            hash: HASH,
            ts: TS,
            name: heroName,
            limit: 4,
            offset: page === 1 ? 0 : (page - 1) * 4,
          },
        });
        if (response.status === 200) {
          setHeroes(response.data.data.results);
          setTotalHeroes(response.data.data.total);
          setIsLoading(false);
          return;
        } else {
          throw new Error("Erro ao consultar os heróis!");
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Erro ao consultar os heróis!");
        } else {
          setIsLoading(false);
        }
      }
    };
    fetchUsers();
  }, [page, heroName]);
  return (
      <NativeBaseProvider>
        <View style={styles.container}>
          <View style={styles.containerHeroesList}>
            <View style={styles.containerHeader}>
              <View style={styles.rowTitle}>
                <Text style={styles.busca}>BUSCA</Text>
                <Text style={styles.marvel}> MARVEL </Text>
                <Text style={styles.testeFrontEnd}>TESTE FRONT-END</Text>
              </View>
              <View style={styles.rowSearch}>
                <Text style={styles.nomePersonagem}>Nome do Personagem</Text>
                <TextInput
                  style={styles.inputPersonagem}
                  onChangeText={(text) => {setPage(1), setHeroName(text || null)}}
                />
              </View>
            </View>
            {isLoading ? (
              <View style={styles.loading}>
                <Spinner color={colors.mainColor} />
                <Heading color={colors.mainColor} fontSize="lg">
                  Carregando...
                </Heading>
              </View>
            ) : (
              <FlatList
                style={styles.heroesList}
                ListHeaderComponent={() => (
                  <View style={styles.headerList}>
                    <Text style={styles.headerText}>Nome</Text>
                  </View>
                )}
                data={heroes}
                renderItem={({ item }) => totalHeroes === 0 ? (<Text>Not Found!</Text>) : ( <TouchableOpacity onPress={() => navigation.navigate('Details', {hero: item})}><Hero heroObject={item} /></TouchableOpacity>)}
                keyExtractor={(item) => item.name}
              />
            )}
          </View>
        </View>
        <View style={styles.paginationView}>
          <View style={styles.pagination}>
            <IconFill
              name="caret-left"
              color={colors.mainColor}
              size={50}
              onPress={() => {
                setPage(page === 1 ? page : page - 1);
              }}
            />
            {page === 1 ? null : (
              <TouchableOpacity
                style={styles.pageButton}
                onPress={() => setPage(page - 1)}
              >
                <Text style={styles.textButton}>{page - 1}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.activeButton}>
              <Text style={styles.textActiveButton}>{page}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.pageButton}>
              <Text style={styles.textButton} onPress={() => setPage(page + 1)}>
                {page + 1}
              </Text>
            </TouchableOpacity>
            {page === 1 ? (
              <TouchableOpacity
                style={styles.pageButton}
                onPress={() => setPage(page + 2)}
              >
                <Text style={styles.textButton}>3</Text>
              </TouchableOpacity>
            ) : null}
            <IconFill
              name="caret-right"
              color={colors.mainColor}
              size={50}
              onPress={() => {
                setPage(page + 1);
              }}
            />
          </View>
          <View style={styles.borderEnd}></View>
        </View>
      </NativeBaseProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "stretch",
  },
  containerHeroesList: {
    flexGrow: 1,
  },
  loading: {
    alignItems: "center",
    marginTop: "25%",
  },
  heroesList: {
    flexGrow: 1,
    marginTop: 12,
  },
  headerList: {
    backgroundColor: colors.mainColor,
    flexGrow: 1,
    height: 40,
    justifyContent: "center",
  },
  headerText: {
    color: colors.white,
    marginLeft: 110,
    fontSize: 18,
  },
  paginationView: {
    alignItems: "center",
    borderBottomWidth: 10,
    borderBottomColor: colors.mainColor,
    backgroundColor: colors.white
  },
  pagination: {
    flexDirection: "row",
    //marginLeft: 30,
    //marginTop: 18,
    marginBottom: 10,
    justifyContent: "center",
  },
  pageButton: {
    width: "12%",
    borderWidth: 1,
    borderRadius: 50,
    borderColor: colors.mainColor,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  activeButton: {
    width: "12%",
    borderWidth: 1,
    borderRadius: 50,
    borderColor: colors.mainColor,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.mainColor,
  },
  textButton: {
    color: colors.mainColor,
    fontSize: 25,
  },
  textActiveButton: {
    color: colors.white,
    fontSize: 25,
  },
  containerHeader: {},
  busca: {
    color: colors.mainColor,
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "Roboto-Black",
    lineHeight: 19,
    borderBottomWidth: 2,
    borderColor: colors.mainColor,
  },
  marvel: {
    color: colors.mainColor,
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "Roboto-Black",
    lineHeight: 19,
  },
  testeFrontEnd: {
    color: colors.mainColor,
    fontSize: 16,
    fontFamily: "Roboto-Light",
    lineHeight: 19,
  },
  rowTitle: {
    flexDirection: "row",
    marginTop: 12,
    marginBottom: 12,
    marginLeft: 30,
  },
  rowSearch: {
    marginHorizontal: 30,
  },
  nomePersonagem: {
    color: colors.mainColor,
    fontSize: 16,
  },
  inputPersonagem: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "gray",
  },
});
