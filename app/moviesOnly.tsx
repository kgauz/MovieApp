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
  const topText = width > 600 ? "10%" : "30%";
  const heroHeight =
  width >= 1280 // Large Desktop (PC)
    ? height * 0.97
    : width >= 1024 // Small Desktop / Laptop
    ? height * 0.60
    : width >= 768 // Tablet
    ? height * 0.60
    : height * 0.55; // Mobile
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

            {/* Featured Movie */}
            {featuredMovie && (
              <View style={{ width: "100%", height: heroHeight, minHeight: 320,maxHeight: 5000, position: "relative" }}>
                <Image
                           source={{ uri:imageUrl }}
                           style={{
                             width: "100%",
                             height: "100%",
                             position: "absolute",
                           }}
                           resizeMode="cover"
                         />
               
                         <LinearGradient
                           colors={[
                             "rgba(0,0,0,0.2)",
                             "rgba(0,0,0,0.5)",
                             "rgba(0,0,0,0.9)"
                           ]}
                           locations={[0, 0.6, 1]}
                           style={{
                             position: "absolute",
                             width: "100%",
                             height: "100%",
                           }}
                         />
               
                         <LinearGradient
                           colors={[
                             "transparent",
                             "rgb(15,15,30)"
                           ]}
                           locations={[0.7, 1]}
                           style={{
                             position: "absolute",
                             bottom: 0,
                             width: "100%",
                             height: 120,
                           }}
                         />
                <View style={{ position: "absolute", width: "100%", paddingHorizontal: 16, top: topText, bottom: 120, justifyContent: "center" }}>
                  <Text style={{ color: "#fff", fontSize: 28, fontWeight: "bold", marginBottom: 10 }} numberOfLines={2}>
                    {featuredMovie.title || featuredMovie.name}
                  </Text>
                  <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, marginBottom: 16, maxWidth:500 }}>{featuredMovie.overview}</Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                     <TouchableOpacity
                             onPress={() => {
                               router.push({
                                 pathname: `/Watch/${featuredMovie?.id}`,
                                 params: { type: "movie" },
                               });
                             }
                           }
                             style={{
                               flexDirection: "row",
                               alignItems: "center",
                               backgroundColor: "#fff",
                               paddingVertical: 10,
                               paddingHorizontal: 20,
                               borderRadius: 6,
                               marginRight: 12,
                               height:40
                             }}
                   
                             
                           >
                             <Ionicons name="play" size={20} color="#000" />
                             <Text
                               style={{
                                 color: "#000",
                                 fontWeight: "bold",
                                 marginLeft: 6,
                                 fontSize:15
                               }}
                             >
                               Play
                             </Text>
                           </TouchableOpacity>
                    <TouchableOpacity
                         // pathname: "/movies/[id]",
                           onPress={() => {
                               router.push({
                                 pathname: `/movies/[id]`,
                                 params: { id:featuredMovie?.id ,
                                   type: "movie" },
                               });
                             }
                           }
                   
                       style={{
                         flexDirection: "row",
                         alignItems: "center",
                         paddingVertical: 10,
                         paddingHorizontal: 16,
                         borderRadius: 8,
                         backgroundColor: "#e5e5e5", 
                         height:40
                       }}
                     >
                       {/* Icon Circle */}
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
                   
                       <Text
                         style={{
                           color: "#000",
                           fontWeight: "500",
                           fontSize:15
                         }}
                       >
                         More info
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