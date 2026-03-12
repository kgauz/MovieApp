import MovieLoader from "@/movieLoader";
import fetchMovies from "@/services/api";
import useFetch from "@/services/useFech";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import saveSearchToDB from "@/saveSearch";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TextInput, useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";

export default function Search() {
    const { query } = useLocalSearchParams();
    const [searchText, setSearchText] = useState(
      typeof query === "string" ? query : ""
    );
    console.log(query);
    const { width } = useWindowDimensions();
    const spacing = 10; // horizontal margin between cards
    const columns = width > 900 ? 6 : width > 600 ? 5 : 3;
  

  const cardWidth = (width - spacing * (columns + 1)) / columns;

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: fetch,
    reset: reset,
  } = useFetch(() => fetchMovies({ query: searchText }), false);

  useEffect(() => {
    if (!searchText.trim()) {
      reset();
      return;
    }

    const timer = setTimeout(() => {
      fetch();
    }, 2000);

    return () => clearTimeout(timer);
  }, [searchText]);

  useEffect(() => {
    if (!movies || movies.length === 0) return;

    const firstMovie = movies[0];
    saveSearchToDB(firstMovie);
  }, [movies]);

  return (
    <LinearGradient
      colors={[
        "rgb(10,10,20)",
        "rgb(25,0,50)",
        "rgb(75,0,130)",
        "rgb(15,15,30)",
      ]}
      locations={[0, 0.35, 0.7, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1 , marginBottom:80}}>
        <View style={{ alignItems: "center", marginTop: 30 }}>
          <Image
            source={require("@/assets/images/movielogo.png")}
            style={{
              width: 110,
              height: 110,
              marginBottom: 10,
            }}
            resizeMode="contain"
          />
        </View>

        <SafeAreaView style={{ flex: 1,width: "100%", marginTop: 3 }}>
          {moviesLoading ? (
            <ActivityIndicator
              size="large"
              color="#9b5cff"
              style={{ marginTop: 20 }}
            />
          ) : moviesError ? (
            <Text style={{ color: "white" }}>
              Error: {moviesError?.message}
            </Text>
          ) : (
            <View style={{flex:1, width: "100%" }}>
              <View>
                <View style={{ flex:1,width: "90%",alignSelf:"center", marginTop: 10,position: "relative" }}>
                <Ionicons
                name="search"
                size={20}
                color="#fff"
                style={{
                position: "absolute",
                left: 20,
                top: 12,
                 zIndex: 1,
                 }}
                />

                <TextInput
                value={searchText}
                onChangeText={setSearchText}
                placeholder="Search movies..."
                 placeholderTextColor="#94a3b8"
                style={{
                height: 45,
                backgroundColor: "rgba(255,255,255,0.08)",
                borderRadius: 25,
                 paddingLeft: 50,
                 color: "#fff",
                borderWidth: 1,
               borderColor: "rgba(255,255,255,0.15)",
                }}
                 />
                </View>

                <Text
                  style={{
                    marginTop: 20,
                    marginBottom: 10,
                    marginLeft:15,
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: "500",
                  }}
                >
                  Search Results {searchText}
                </Text>

                {!moviesLoading &&
                  !moviesError &&
                  movies?.length === 0 &&
                  searchText.trim() !== "" && (
                    <Text style={{ marginTop: 10, color: "#fff" }}>
                      Movies not found
                    </Text>
                  )}
              </View>

              <View style={{ flex: 1 }}>
                <FlatList
                  data={movies}
                  key={columns}
                  keyExtractor={(item) => item.id.toString()}
                  numColumns={columns}
                  showsVerticalScrollIndicator={false}
                  columnWrapperStyle={{
                      paddingHorizontal: spacing / 2,   justifyContent: "flex-start",
                   
                    }}
                  renderItem={({ item }) => (
                    <View
                      style={{
                      margin: spacing / 2 ,
                      width: cardWidth,
                      
                      }}
                    >
                      <MovieLoader {...item} />
                    </View>
                  )}
                />
              </View>
            </View>
          )}
        </SafeAreaView>
      </View>
    </LinearGradient>
  );
}