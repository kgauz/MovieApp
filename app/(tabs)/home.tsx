import MovieLoader from "@/movieLoader";
import TrendingMovies from "@/trendingMovies";
import fetchMovies from "@/services/api";
import useFetch from "@/services/useFech";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect , useCallback} from "react";
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
import { useRouter } from "expo-router";
import { fetchLatestTV } from "@/services/api";
import {fetchPopularSeries, TopRatedSeries} from "@/services/api";
import {TrendingMovieThisweek, OntheAirSeries,upcomingMovies,TrendingTvSeriesThisweek, topRatedMovies, fetchMovieById, fetchSeriesById} from "@/services/api";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
export default function Home() {
 

type TVShow = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  media_type: string;
};
type RecentItem = {
  id: number;
  title?: string;
  name?: string; // for series
  poster_path: string | null;
  media_type: "movie" | "tv";
};


  const [latestTV, setLatestTV] = useState<TVShow[]>([]);
  const { width, height } = useWindowDimensions();
  const router = useRouter();
  const [popularTvSeries, setPopularTvSeries] = useState<TVShow[]>([]);
  const [trendingMoviethisWeek, setTrendingMoviethisWeek] = useState<Movie[]>([]);
   const [trendingTvSeriesthisWeek, setTrendingTvSeriesthisWeek] = useState<TVShow[]>([]);
  const [topRatedMovie, setTopratedMovie] = useState<Movie[]>([]);
   const [topRatedSeries, setTopRatedSeries] = useState<TVShow[]>([]);
  const spacing = 10; // horizontal margin between cards
  const columns = width > 900 ? 6 : width > 600 ? 5 : 3;
  const [upcomingMovie, setUpcomingMovie] = useState<Movie[]>([]);
 const [ontheairSeries, setOntheAirSeries] = useState<TVShow[]>([]);
 let marginForRecent = 20;
 const [showArrow, setShowArrow] = useState(true);
 const [recent, setRecent] = useState<RecentItem[]>([]);
const cardWidth = (width - spacing * (columns + 1)) / columns;

const marginleft = width > 900 ? 100 : 0;
const isTablet = width >= 768;
const topText = width > 600 ? "10%" : "30%";
const heightImg =  width > 600 ? 102 : 85;
const navBarTop  = width > 600 ? 40 : 30;

    const heroHeight =
  width >= 1280 // Large Desktop (PC)
    ? height * 0.97
    : width >= 1024 // Small Desktop / Laptop
    ? height * 0.60
    : width >= 768 // Tablet
    ? height * 0.60
    : height * 0.55; // Mobile

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));
  
  const [trending, setTrending] = useState<Movie[]>([]);



  useEffect(()=>{
    const getTrendingMovieThisweek = async ()=>{
      const movieTrend =  await TrendingMovieThisweek();
      setTrendingMoviethisWeek(movieTrend);

    }
    getTrendingMovieThisweek();
  }, []);

  useEffect(()=>{
    const getTrendingTvSeriesThisweek = async ()=>{
      const movieTrend =  await TrendingTvSeriesThisweek();
      setTrendingTvSeriesthisWeek(movieTrend);

    }
    getTrendingTvSeriesThisweek();
  }, []);

  useEffect(()=>{
    const getTopRatedMovies = async ()=>{
      const movieTrend =  await topRatedMovies();
      setTopratedMovie(movieTrend);

    }
    getTopRatedMovies();
  }, []);

   useEffect(()=>{
    const getTopRatedSeries = async ()=>{
      const movieTrend =  await TopRatedSeries();
      setTopRatedSeries(movieTrend);

    }
    getTopRatedSeries();
  }, []);

   useEffect(()=>{
    const getUpcomingMovies = async ()=>{
      const movieTrend =  await upcomingMovies();
      setUpcomingMovie(movieTrend);

    }
    getUpcomingMovies();
  }, []);

   useEffect(()=>{
    const getOntheair = async ()=>{
      const movieTrend =  await OntheAirSeries();
      setOntheAirSeries(movieTrend);

    }
    getOntheair();
  }, []);
  


  useEffect(() => {
    const getData = async () => {
      const tv = await fetchLatestTV();
      setLatestTV(tv);
    };
    getData();
     fetchRecentMovies();
  }, []);


    const featuredMovie = movies?.find(item => item?.backdrop_path) || 
      movies?.[0];
   const imageUrl = featuredMovie?.backdrop_path?.startsWith("http")
  ? featuredMovie.backdrop_path
  : `https://image.tmdb.org/t/p/w500${featuredMovie?.backdrop_path}`;

  useEffect(()=>{
    const getInfor = async ()=>{
      const popularTv = await fetchPopularSeries();
      setPopularTvSeries(popularTv);
    }
    getInfor();
  }, []);

const fetchRecentMovies = async () => {
  try {
    const data = await AsyncStorage.getItem("recent");
    if (!data) return;

    const parsed = JSON.parse(data);

    const results = await Promise.all(
  parsed.map(async (item: any) => {
    try {

      if (item.type === "movie") {
        return await fetchMovieById(item.id);
      } else if (item.type === "tv") {
           return await fetchSeriesById(item.id);
      } else {
        return null;
      }

    } catch {
      return null;
    }
  })
);
  console.error(results);
setRecent(results.filter(Boolean));
  } catch (error) {
    console.log("Error loading recent:", error);
  }
};



useFocusEffect(
  useCallback(() => {
    fetchRecentMovies();
  }, [])
);


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
    <SafeAreaView style={{ flex: 1}}>
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

        <ScrollView showsVerticalScrollIndicator={false}
      >
    
    {/* Logo */}
    { <View style={{ flex:1,alignItems: "flex-start", marginLeft:marginleft , marginBottom:0, maxHeight:heightImg, flexDirection:"row", alignSelf:"flex-start"}}>
      <Image
        source={require("@/assets/images/log.png")}
        style={{    width: isTablet ? 140 : 110,
      height: isTablet ? 120 : 100,}}
        resizeMode="contain"
      />
     <View style={{marginTop:navBarTop ,alignSelf:"flex-start", flexDirection:"row", columnGap: isTablet ? 20 : 10, }}>
      <TouchableOpacity
       onPress={() => router.replace("/")}
          style={{
            borderRadius: 15,
            padding:10,
             backgroundColor: "#8b5cf6" ,
            
            
          }}
        >
          <Text style={{ color: "#fff"  }}>
            All
          </Text>
        </TouchableOpacity>
         <TouchableOpacity
             onPress={() => router.push("/moviesOnly")}
          style={{
              backgroundColor:  "#fff",
            borderRadius: 15,
            padding:10,
            
          }}
        >
          <Text >
            Movies
          </Text>
        </TouchableOpacity>
         <TouchableOpacity
           onPress={() => router.push("/seriesOnly")}
          style={{
             backgroundColor: "#fff",
            borderRadius: 15,
            padding:10,
            
          }}
        >
          <Text>
            Series
          </Text>
        </TouchableOpacity>

        </View>


    </View>
     }


{featuredMovie && (
  <View style={{ width: "100%", height: heroHeight, minHeight: 320,maxHeight: 5000, position: "relative" , overflow:"hidden"}}>

    {/* Background Image */}
    <Image
               source={{ uri: imageUrl }}
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


    {/*  MOVIE INFO  */}
    <View
      style={{
        position: "absolute",
        width: "100%",
        paddingHorizontal: 16,
        top:topText,
        bottom:120,
        justifyContent:"center",
        
      }}
    >

      {/* Movie Title */}
      <Text
        style={{
          color: "#fff",
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 10,
        }}
        numberOfLines={2}
      >
        {featuredMovie.title || featuredMovie.name}
      </Text>

      {/* Genre / Info Row */}
      <Text
        style={{
          color: "rgba(255,255,255,0.8)",
          fontSize: 14,
          marginBottom: 16,
          alignSelf:"flex-start",
          maxWidth:500,
        }}
      >
        {featuredMovie.overview}
      </Text>

      {/* Buttons Row */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        
        {/* Play Button */}
        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: `/Watch/${featuredMovie?.id}`,
              params: { type: featuredMovie?.movie_type },
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

        {/* My List Button */}
       
      <TouchableOpacity
      // pathname: "/movies/[id]",
        onPress={() => {
            router.push({
              pathname: `/movies/[id]`,
              params: { id:featuredMovie?.id ,
                type: featuredMovie?.movie_type },
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
      height:40,
      
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


<View style={{}}>
      {recent?.length > 0 && (
  <>
    <Text style={{ color: "#fff", margin: 10, marginTop: 20, fontSize:20 }}>
      Recently Played 
    </Text>

    <FlatList
      horizontal
      data={recent}
      keyExtractor={(item) => item.id.toString()}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <View style={{ marginRight: 10, width: cardWidth}}>
          <MovieLoader {...item} />
       
        </View>

      )}
    />
     

  </>
)}
</View>


    {/* Trending movie this week TV */}
  <View style={{}}>
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


    {/* Trending series this week TV */}
    <View style={{}}>
    <Text style={{ color: "#fff", margin: 10, marginTop: 20,  fontSize:20 }}>
      Trending series this week
    </Text>

    <FlatList
      horizontal
      data={trendingTvSeriesthisWeek}
      keyExtractor={(item) => item.id.toString()}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <View style={{ marginRight: 10, width: cardWidth }}>
          <MovieLoader {...item} />
        </View>
      )}
    />
    </View>
     
 
    {/* Latest TV */}
    <View style={{}}> 
    <Text style={{ color: "#fff", margin: 10, marginTop: 20,  fontSize:20 }}>
      Latest TV Series
    </Text>

    <FlatList
      horizontal
      data={latestTV}
      keyExtractor={(item) => item.id.toString()}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <View style={{ marginRight: 10, width: cardWidth }}>
          <MovieLoader {...item} />
        </View>
      )}
    />
    </View>

    
    {/* Latest Movies */}
    <View style={{}}>
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


   <View style={{}}>
    <Text style={{ color: "#fff", margin: 10, marginTop: 20,  fontSize:20 }}>
      Popular Series
    </Text>

    <FlatList
      horizontal
      data={popularTvSeries}
      keyExtractor={(item) => item.id.toString()}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <View style={{ marginRight: 10, width: cardWidth }}>
          <MovieLoader {...item} />
        </View>
      )}
    />
    </View>

    
    <View style={{}}> 
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

  <View style={{}}>
     <Text style={{ color: "#fff", margin: 10, marginTop: 20,  fontSize:20 }}>
      Top Rated Series
    </Text>


    <FlatList
      horizontal
      data={topRatedSeries}
      keyExtractor={(item) => item.id.toString()}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <View style={{ marginRight: 10, width: cardWidth }}>
          <MovieLoader {...item} />
        </View>
      )}
    />
    </View>
  
  <View style={{}}>
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
    

  <View style={{  marginBottom:90}}>
    <Text style={{ color: "#fff", margin: 10, marginTop: 20,  fontSize:20 }}>
      On The Air Series
    </Text>

    <FlatList
      horizontal
      data={ontheairSeries}
      keyExtractor={(item) => item.id.toString()}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <View style={{ marginRight: 10, width: cardWidth }}>
          <MovieLoader {...item} />
        </View>
      )}
    />
     

    </View>




</ScrollView>

      )}
       
    </SafeAreaView>
  </LinearGradient>
);
} 