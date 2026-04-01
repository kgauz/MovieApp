import saveSearchToDB from "@/saveSearch";
import fetchMovies from "@/services/api";
import fetchTrending from "@/services/fetchTrending";
import useFetch from "@/services/useFech";
import TrendingMovies from "@/trendingMovies";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Search() {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [trending, setTrending] = useState([]);

  const { width } = useWindowDimensions();
  const spacing = 10;
  const columns = width > 900 ? 6 : width > 600 ? 5 : 3;
  const cardWidth = (width - spacing * (columns + 1)) / columns;

  const {
    data: movies,
    loading,
    error,
    refetch: fetch,
    reset,
  } = useFetch(() => fetchMovies({ query: searchText }), false);

  //  Fetch Trending

  useEffect(() => {
  const getTrending = async () => {
    try {

      const data = await  fetchTrending();

      if (!Array.isArray(data)) return;

      const mapped = data.map((m: any) => ({
        id: Number(m.movieID),
        title: m.title,
        poster_path: m.poster_url
          ? `https://image.tmdb.org/t/p/w500${m.poster_url}`
          : null,
        backdrop_path: null,
        movie_type: m.typeMovie,
        adult: false,
        genre_ids: [],
        original_language: "en",
        original_title: m.title,
        overview: "",
        popularity: m.count || 0,
        release_date: "",
        video: false,
        vote_average: 0,
        vote_count: 0,
      }));
     

      setTrending(mapped);
    } catch (err) {
      console.log("Error fetching trending:", err);
      setTrending([]); 
    }
  };

  getTrending();
}, []);

console.error("trending",trending);

  
  useEffect(() => {
    if (!searchText.trim()) {
      setSuggestions([]);
      reset();
      return;
    }

    const timer = setTimeout(async () => {
      const res = await fetchMovies({ query: searchText });
      setSuggestions(res?.slice(0, 5) || []);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchText]);

  useEffect(() => {
    if (!searchText.trim()) return;

    const timer = setTimeout(() => {
      fetch();
    }, 2000);

    return () => clearTimeout(timer);
  }, [searchText]);

  // Save search
  useEffect(() => {
    if (movies?.length > 0) {
      saveSearchToDB(movies[0]);
      console.error(movies[0]);
    }
  }, [movies]);



  const showTrending = !searchText.trim();

  return (
    <LinearGradient
      colors={["#0f0f1e", "#1a0033", "#2d0066", "#0f0f1e"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1, marginBottom:90 }}>

        
        <View
          style={{
            width: "90%",
            alignSelf: "center",
            marginTop: 15,
            borderRadius: 30,
            backgroundColor: "rgba(255,255,255,0.06)",
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.12)",
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 15,
            height: 50,
          }}
        >
          <Ionicons name="search" size={20} color="#aaa" />

          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search movies, series..."
            placeholderTextColor="#888"
            style={{
              flex: 1,
              marginLeft: 10,
              color: "#fff",
            }}
          />

          {searchText.length > 0 && (
            <Ionicons
              name="close-circle"
              size={18}
              color="#aaa"
              onPress={() => setSearchText("")}
            />
          )}
        </View>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <View
            style={{
              width: "90%",
              alignSelf: "center",
              backgroundColor: "#111",
              borderRadius: 10,
              marginTop: 5,
            }}
          >
            {suggestions.map((item) => (
              <Text
                key={item.id}
                onPress={() => {
                  setSearchText(item.title);
                  setSuggestions([]);
                }}
                style={{
                  padding: 12,
                  color: "#ddd",
                }}
              >
                {item.title}
              </Text>
            ))}
          </View>
        )}

        {/*  Title */}
        <Text
          style={{
            color: "#fff",
            fontSize: 25,
            marginLeft: 20,
            marginTop: 20,
            marginBottom: 10,
            fontWeight: "600",
          }}
        >
          {showTrending
            ? " Trending Now"
            : `Results for "${searchText}"`}
        </Text>

        {/* Error */}
        {error && (
          <Text style={{ color: "red", marginLeft: 20 }}>
            {error.message}
          </Text>
        )}

        {/*  Loader */}
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#9b5cff"
            style={{ marginTop: 30 }}
          />
        ) : (
          <FlatList
            data={showTrending ? trending : movies}
            key={columns}
            keyExtractor={(item) => item.id.toString()}
            numColumns={columns}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{
              justifyContent: "flex-start",
              paddingHorizontal: spacing/2,
               flexWrap: "wrap",
              marginBottom: 10,
            }}
            
            renderItem={({ item }) => (
              <View style={{ width: cardWidth, margin: spacing/2 }}>
                <TrendingMovies{...item} />
              </View>
            )}
          />
        )}

        {/* Empty state */}
        {!loading && !showTrending && movies?.length === 0 && (
          <View style={{ alignItems: "center" , justifyContent:"center"}}>
            <Ionicons name="film-outline" size={50} color="#666" />
            <Text style={{ color: "#aaa", marginTop: 10 }}>
              No results found
            </Text>
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}