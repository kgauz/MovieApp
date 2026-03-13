import MovieLoader from "@/movieLoader";
import TrendingMovies from "@/trendingMovies";
import fetchMovies from "@/services/api";
import useFetch from "@/services/useFech";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { Movie } from "@/movie";
import { LinearGradient } from "expo-linear-gradient";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,useWindowDimensions,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const { width } = useWindowDimensions();
  const router = useRouter();
 
    const spacing = 10; // horizontal margin between cards
const columns = width > 900 ? 6 : width > 600 ? 5 : 3;

// Calculate width per card dynamically
const cardWidth = (width - spacing * (columns + 1)) / columns;

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));
  
  const [trending, setTrending] = useState<Movie[]>([]);


useEffect(() => {
  const getTrending = async () => {
    try {
      const res = await fetch("https://movieapp-acny.onrender.com/trending"); 
      const data = await res.json();

      const mapped = data.map((m: any) => ({
        id: m.movieID,                  // TMDB expects id
        title: m.title,
        poster_path: m.poster_url,
        backdrop_path: null,             
        adult: false,                    // default
        genre_ids: [],                   // default empty
        original_language: "en",
        original_title: m.title,
        overview: "",
        popularity: 0,
        release_date: "",
        video: false,
        vote_average: 0,
        vote_count: 0,
      }));

      setTrending(mapped);
    } catch (err) {
      console.log("Error fetching trending:", err);
    }
  };

  getTrending();
}, []);

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
    <SafeAreaView style={{ flex: 1 , marginBottom:85}}>
      {moviesLoading ? (
        <View style={{ alignItems: "center", marginTop: 40 }}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={{ marginTop: 20, color: "#fff" }}>
            Please wait...
          </Text>
        </View>
      ) : moviesError ? (
        <Text style={{ color: "white" }}>
          Error: {moviesError?.message}
        </Text>
      ) : (
        <FlatList
          data={movies}
          key={columns}
          keyExtractor={(item) => item.id.toString()}
          numColumns={columns}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{
            paddingHorizontal: spacing / 2,   justifyContent: "flex-start",
             flexWrap: "wrap",
          }}
          ListHeaderComponent={
            <>
              {/* Logo */}
              <View style={{ alignItems: "center", marginTop: 20 }}>
                <Image
                  source={require("@/assets/images/movielogo.png")}
                  style={{ width: 110, height: 110 }}
                  resizeMode="contain"
                />
              </View>

              {/* Search */}
              <View
                style={{
                  width: "90%",
                  alignSelf: "center",
                  marginTop: 10,
                }}
              >
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
                returnKeyType="search"
                blurOnSubmit={true}
                onSubmitEditing={() => {
                  if (!searchText.trim()) return;

                  router.push({
                    pathname: "/(tabs)/search",
                    params: { query: searchText.trim() },
                  });
                  //setSearchText("");
                }}
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

              {/* Trending */}
              <View style={{ padding: 10 }}>
                <Text style={{ color: "white", marginBottom: 10, marginTop:15 }}>
                  Trending Movies
                </Text>

                {trending.length === 0 ? (
                  <Text style={{ color: "white" }}>
                    No trending movies yet
                  </Text>
                ) : (
                  <FlatList
                    data={trending}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                      <View
                        style={{
                       
                              width: width > 900 ? 170 : width > 600 ? 150 : 120

                         
                        }}
                      >
                        <TrendingMovies {...item} index={index} />
                      </View>
                    )}
                  />
                )}
              </View>

              {/* Latest Title */}
              <Text
                style={{
                  fontSize: 15,
                  marginLeft: 11,
                  color: "#fff",
                  marginTop: 0,
                }}
              >
                Latest Movies
              </Text>
            </>
          }
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
      )}
    </SafeAreaView>
  </LinearGradient>
);
}
