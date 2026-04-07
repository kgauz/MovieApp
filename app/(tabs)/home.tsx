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
import { Animated } from "react-native";
import HorizontalArrows from "../horizontalArrows";
import HorizontalSection from "../horizontalSection";


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
  const spacing = 10; 
  const columns = width > 900 ? 6 : width > 600 ? 5 : 3;
  const [upcomingMovie, setUpcomingMovie] = useState<Movie[]>([]);
  const [ontheairSeries, setOntheAirSeries] = useState<TVShow[]>([]);
 let marginForRecent = 20;
 const [showArrow, setShowArrow] = useState(true);
 const [recent, setRecent] = useState<RecentItem[]>([]);
//  const cardWidth = (width - spacing * (columns + 1)) 

const isTablet = width >= 768;
const topText = width > 600 ? "10%" : "30%";
const heightImg =  width > 600 ? 102 : 85;
const navBarTop  = width > 600 ? 40 : 30;

const isDesktop = width >= 1024; 
const cardWidth = isDesktop ? 180 : (width - spacing * (columns + 1)) / columns;
const marginleft = isDesktop ? 100 : 0
const [hovered, setHovered] = useState(false);
const heroHeight =
  width >= 1280 ? height * 0.97 : 
  width >= 1024 ? height * 0.6 :  
  width >= 768 ? height * 0.6 :   
  height * 0.55;                   

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));
  const [trending, setTrending] = useState<Movie[]>([]);
  const listRef = React.useRef<FlatList>(null);
  const [currentOffset, setCurrentOffset] = useState(0);
  const scrollAmount = cardWidth * 3; 



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
const HoverableCard = ({ item, cardWidth, spacing }: any) => {
  const scale = React.useRef(new Animated.Value(1)).current;
  const elevation = React.useRef(new Animated.Value(2)).current;

  const onHoverIn = () => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1.05, // subtle zoom
        useNativeDriver: true,
      }),
      Animated.timing(elevation, {
        toValue: 8,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const onHoverOut = () => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(elevation, {
        toValue: 2,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };

  return (
    <Animated.View
      style={{
        width: cardWidth,
        marginRight: spacing,
        transform: [{ scale }],
        elevation, 
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: elevation,
        shadowOffset: { width: 0, height: elevation },
        borderRadius: 10,
       
      }}
      onMouseEnter={isDesktop ? onHoverIn : undefined}
      onMouseLeave={isDesktop ? onHoverOut : undefined}
    >
      <MovieLoader {...item} />
    </Animated.View>
  );
};

const scrollLeft = () => {
  listRef.current?.scrollToOffset({
    offset: Math.max(currentOffset - scrollAmount, 0),
    animated: true,
  });
};

const scrollRight = () => {
  listRef.current?.scrollToOffset({
    offset: currentOffset + scrollAmount,
    animated: true,
  });
};

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
    
  
   
{!isDesktop && (
  <View
    style={{
      flex: 1,
      alignItems: "flex-start",
      marginLeft: marginleft,
      marginBottom: 0,
      maxHeight: heightImg,
      flexDirection: "row",
      alignSelf: "flex-start",
    }}
  >

    <Image
      source={require("@/assets/images/log.png")}
      style={{
        width: isTablet ? 140 : 110,
        height: isTablet ? 120 : 100,
      }}
      resizeMode="contain"
    />
    <View
      style={{
        marginTop: navBarTop,
        alignSelf: "flex-start",
        flexDirection: "row",
        columnGap: isTablet ? 20 : 10,
      }}
    >
      <TouchableOpacity
        onPress={() => router.replace("/")}
        style={{
          borderRadius: 15,
          padding: 10,
          backgroundColor: "#8b5cf6",
        }}
      >
        <Text style={{ color: "#fff" }}>All</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/moviesOnly")}
        style={{
          backgroundColor: "#fff",
          borderRadius: 15,
          padding: 10,
        }}
      >
        <Text>Movies</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/seriesOnly")}
        style={{
          backgroundColor: "#fff",
          borderRadius: 15,
          padding: 10,
        }}
      >
        <Text>Series</Text>
      </TouchableOpacity>
    </View>
  </View>
)}


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

<View style={{}}>
    {recent?.length > 0 && (
  <>

   <HorizontalSection
  title="Recently Played"
  data={recent}
  cardWidth={cardWidth}
  spacing={spacing}
  isDesktop={isDesktop}
  renderItem={({ item }) => (
    <HoverableCard
      item={item}
      cardWidth={cardWidth}
      spacing={spacing}
    />
  )}
  />
    
  </>
  )}
</View>


  <View style={{}}>
    <HorizontalSection
  title="Trending movie this week"
  data={trendingMoviethisWeek}
  cardWidth={cardWidth}
  spacing={spacing}
  isDesktop={isDesktop}
  renderItem={({ item }) => (
    <HoverableCard
      item={item}
      cardWidth={cardWidth}
      spacing={spacing}
    />
  )}
/>
  
  </View> 

    <View style={{}}>
      <HorizontalSection
    title=" Trending series this week"
    data={trendingTvSeriesthisWeek}
    cardWidth={cardWidth}
    spacing={spacing}
    isDesktop={isDesktop}
    renderItem={({ item }) => (
      <HoverableCard
      item={item}
      cardWidth={cardWidth}
      spacing={spacing}
    />
  )}
    />
   
  </View> 
     
    <View style={{}}> 
          <HorizontalSection
    title="Latest TV Series"
    data={latestTV}
    cardWidth={cardWidth}
    spacing={spacing}
    isDesktop={isDesktop}
    renderItem={({ item }) => (
      <HoverableCard
      item={item}
      cardWidth={cardWidth}
      spacing={spacing}
    />
  )}
    />
   
  </View> 

   
    <View style={{}}>

    <HorizontalSection
    title=" Popular Movies"
    data={movies}
    cardWidth={cardWidth}
    spacing={spacing}
    isDesktop={isDesktop}
    renderItem={({ item }) => (
      <HoverableCard
      item={item}
      cardWidth={cardWidth}
      spacing={spacing}
    />
  )}
    />
   
   </View> 


   <View style={{}}>

    <HorizontalSection
    title=" Popular Series "
    data={popularTvSeries}
    cardWidth={cardWidth}
    spacing={spacing}
    isDesktop={isDesktop}
    renderItem={({ item }) => (
      <HoverableCard
      item={item}
      cardWidth={cardWidth}
      spacing={spacing}
    />
  )}
    />
    
  </View> 
  
    <View style={{}}> 

      <HorizontalSection
    title="Top Rated Movies"
    data={topRatedMovie}
    cardWidth={cardWidth}
    spacing={spacing}
    isDesktop={isDesktop}
    renderItem={({ item }) => (
      <HoverableCard
      item={item}
      cardWidth={cardWidth}
      spacing={spacing}
    />
  )}
  />
     
  </View> 

  <View style={{}}>

      <HorizontalSection
    title="Top Rated Series"
    data={topRatedSeries}
    cardWidth={cardWidth}
    spacing={spacing}
    isDesktop={isDesktop}
    renderItem={({ item }) => (
      <HoverableCard
      item={item}
      cardWidth={cardWidth}
      spacing={spacing}
    />
  )}
  />
     
  </View> 
   
  <View style={{}}>
      <HorizontalSection
    title="Now Playing Movies"
    data={upcomingMovie}
    cardWidth={cardWidth}
    spacing={spacing}
    isDesktop={isDesktop}
    renderItem={({ item }) => (
      <HoverableCard
      item={item}
      cardWidth={cardWidth}
      spacing={spacing}
    />
  )}
  />
   
  </View> 

  <View style={{  marginBottom:90}}>

      <HorizontalSection
    title="On The Air Series"
    data={ontheairSeries}
    cardWidth={cardWidth}
    spacing={spacing}
    isDesktop={isDesktop}
    renderItem={({ item }) => (
      <HoverableCard
      item={item}
      cardWidth={cardWidth}
      spacing={spacing}
    />
  )}
  />
    
    </View>
     

</ScrollView>

      )}
       
    </SafeAreaView>
  </LinearGradient>
);
} 