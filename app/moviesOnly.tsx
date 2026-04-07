import MovieLoader from "@/movieLoader";
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
  ScrollView,
  useWindowDimensions,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { TrendingMovieThisweek, upcomingMovies, topRatedMovies } from "@/services/api";
import BackArrow from "@/backArrow"





export default function MoviesOnly() {
  const { width, height } = useWindowDimensions();
  const router = useRouter();
  const spacing = 10;
  const columns = width > 900 ? 6 : width > 600 ? 5 : 3;
  const cardWidth = (width - spacing * (columns + 1)) / columns;
  const [trendingMoviethisWeek, setTrendingMoviethisWeek] = useState<Movie[]>([]);
  const [topRatedMovie, setTopratedMovie] = useState<Movie[]>([]);
  const [upcomingMovie, setUpcomingMovie] = useState<Movie[]>([]);
  const [showArrow, setShowArrow] = useState(true);
  const marginleft = width > 900 ? 100 : 0;
  const isTablet = width >= 768;
  const isDesktop = width >= 1024; 
  const topText = width > 600 ? "10%" : "30%";
  const heroHeight =
  width >= 1280
    ? height * 0.97
    : width >= 1024 
    ? height * 0.60
    : width >= 768 
    ? height * 0.60
    : height * 0.55; 
    const heightImg =  width > 600 ? 102 : 85;
    const navBarTop  = width > 600 ? 40 : 30;

  const { data: movies, loading: moviesLoading, error: moviesError } = useFetch(() => fetchMovies({ query: "" }));

  useEffect(() => {
    const getTrendingMovieThisweek = async () => setTrendingMoviethisWeek(await TrendingMovieThisweek());
    getTrendingMovieThisweek();
  }, []);

  useEffect(() => {
    const getTopRatedMovies = async () => setTopratedMovie(await topRatedMovies());
    getTopRatedMovies();
  }, []);

  useEffect(() => {
    const getUpcomingMovies = async () => setUpcomingMovie(await upcomingMovies());
    getUpcomingMovies();
  }, []);

  const featuredMovie = trendingMoviethisWeek?.find(item => item?.backdrop_path) || 
      trendingMoviethisWeek?.[0];
  const imageUrl = featuredMovie?.backdrop_path?.startsWith("http")
    ? featuredMovie.backdrop_path
    : `https://image.tmdb.org/t/p/w500${featuredMovie?.backdrop_path}`;

  return (
    <LinearGradient
      colors={["rgb(10,10,20)", "rgb(25,0,50)", "rgb(75,0,130)", "rgb(15,15,30)"]}
      locations={[0, 0.35, 0.7, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        {moviesLoading ? (
          <View style={{ alignItems: "center", marginTop: 40 }}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={{ marginTop: 20, color: "#fff" }}>Please wait...</Text>
          </View>
        ) : moviesError ? (
          <Text style={{ color: "white" }}>Error: {moviesError?.message}</Text>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Logo & Buttons */}
            <View style={{ flex: 1, alignItems: "flex-start", marginLeft: marginleft, maxHeight: heightImg, flexDirection: "row" }}>
              <Image
                source={require("@/assets/images/log.png")}
                style={{  width: isTablet ? 140 : 110,
      height: isTablet ? 120 : 100,}}
                resizeMode="contain"
              />
              <View style={{ marginTop: navBarTop, flexDirection: "row", columnGap: 10 }}>
                <TouchableOpacity
                  onPress={() => router.push("/")}
                  style={{ borderRadius: 15, padding: 10, backgroundColor: "#fff" }}
                >
                  <Text >All</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => router.push("/moviesOnly")}
                   style={{ borderRadius: 15, padding: 10, backgroundColor: "#8b5cf6" }}
                >
                  <Text style={{ color: "#fff" }}>Movies</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => router.push("/seriesOnly")}
                  style={{ backgroundColor: "#fff", borderRadius: 15, padding: 10 }}
                >
                  <Text>Series</Text>
                </TouchableOpacity>
              </View>
            </View>

            {featuredMovie && (
              <View
                style={{
                  width: "100%",
                  height: isDesktop ? 600 : heroHeight, 
                  position: "relative",
                  overflow: "hidden",
                }}
              >
              
                <Image
                  source={{ uri: imageUrl }}
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    opacity: 0.9,
                  }}
                  resizeMode="cover"
                />
            
                <LinearGradient
                  colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.6)", "rgba(0,0,0,0.95)"]}
                  locations={[0, 0.5, 1]}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                  }}
                />
            
              
                <View
                  style={{
                    position: "absolute",
                    left: isDesktop ? 100 : 20, 
                    bottom: 60,
                    maxWidth: isDesktop ? 600 : "90%",
                  }}
                >
                 
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: isDesktop ? 48 : 28,
                      fontWeight: "bold",
                      marginBottom: 16,
                    }}
                    numberOfLines={2}
                  >
                    {featuredMovie.title || featuredMovie.name}
                  </Text>
            
                  
                  <Text
                    style={{
                      color: "rgba(255,255,255,0.85)",
                      fontSize: isDesktop ? 18 : 14,
                      marginBottom: 20,
                      lineHeight: isDesktop ? 26 : 20,
                    }}
                    numberOfLines={3}
                  >
                    {featuredMovie.overview}
                  </Text>
            
                  {/* Buttons */}
                  <View style={{ flexDirection: "row"}}>
                    {/* Play Button */}
                    <TouchableOpacity
                      onPress={() =>
                        router.push(`/Watch/${featuredMovie.id}?type=${featuredMovie.movie_type}`)
                      
                      }
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "#fff",
                        paddingVertical: 12,
                        paddingHorizontal: 24,
                        borderRadius: 8,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 5 },
                        shadowOpacity: 0.3,
                        shadowRadius: 10,
                         marginRight: 12,
                      }}
                    >
                      <Ionicons name="play" size={20} color="#000" />
                      <Text style={{ color: "#000", fontWeight: "bold", marginLeft: 8, fontSize: 16 }}>
                        Play
                      </Text>
                    </TouchableOpacity>
            
                    <TouchableOpacity
                      onPress={() => 
                        { router.push({
                           pathname: "/movies/[id]",
                            params: { id:featuredMovie?.id , 
                              type: featuredMovie?.movie_type }, }); }
                            }
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingVertical: 12,
                        paddingHorizontal: 20,
                        borderRadius: 8,
                        backgroundColor: "rgba(255,255,255,0.85)",
                      }}
                    >
                      <View
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 14,
                          backgroundColor: "#fff",
                          alignItems: "center",
                          justifyContent: "center",
                          marginRight: 8,
                        }}
                      >
                        <Ionicons name="information" size={20} color="#000" />
                      </View>
                      <Text style={{ color: "#000", fontWeight: "500", fontSize: 16 }}>
                        More Info
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
            
               
              </View>
            )}

            <View style={{ flex:1}}>
                {/* Trending movie this week TV */}
                <Text style={{ color: "#fff", margin: 10, marginTop: 20,  fontSize:20 }}>
                  Trending movie this week
                </Text>
            
                <FlatList
                  horizontal
                  data={trendingMoviethisWeek}
                  onEndReached={() => setShowArrow(false)}
                  onScrollBeginDrag={() => setShowArrow(true)}
                  keyExtractor={(item) => item.id.toString()}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <View style={{ marginRight: 10, width: cardWidth }}>
                      <MovieLoader {...item} />
                    </View>
                  )}
                />
                 
            
              </View>


              <View style={{ flex:1 }}>
                {/* Latest Movies */}
                <Text style={{ color: "#fff", margin: 10, marginTop: 20,  fontSize:20 }}>
                  Popular Movies
                </Text>
            
                <FlatList
                  horizontal
                  data={movies}
                  keyExtractor={(item) => item.id.toString()}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <View style={{ marginRight: 10, width: cardWidth }}>
                      <MovieLoader {...item} />
                    </View>
                  )}
                />
            
                  
                </View>
          
            
              <View style={{ flex:1}}>
                 <Text style={{ color: "#fff", margin: 10, marginTop: 20 ,  fontSize:20}}>
                  Top Rated Movies
                </Text>
            
                <FlatList
                  horizontal
                  data={topRatedMovie}
                  keyExtractor={(item) => item.id.toString()}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <View style={{ marginRight: 10, width: cardWidth }}>
                      <MovieLoader {...item} />
                    </View>
                  )}
                />
              
                </View>

              <View style={{ flex:1 }}>
                <Text style={{ color: "#fff", margin: 10, marginTop: 20,  fontSize:20 }}>
                  Now Playing Movies
                </Text>
            
                <FlatList
                  horizontal
                  data={upcomingMovie}
                  keyExtractor={(item) => item.id.toString()}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <View style={{ marginRight: 10, width: cardWidth }}>
                      <MovieLoader {...item} />
                    </View>
                  )}
                />
                
                </View>

                <BackArrow/>

          </ScrollView>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}