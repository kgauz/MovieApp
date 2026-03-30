import BackArrow from "@/backArrow";
import MovieLoader from "@/movieLoader";
import { fetchLatestTV, fetchPopularSeries, OntheAirSeries, TopRatedSeries, TrendingTvSeriesThisweek } from "@/services/api";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
type TVShow = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  media_type: string;
  backdrop_path: string | null;
};


export default function SeriesOnly() {
  const { width, height } = useWindowDimensions();
  const router = useRouter();
  const spacing = 10;
  const columns = width > 900 ? 6 : width > 600 ? 5 : 3;
  const cardWidth = (width - spacing * (columns + 1)) / columns;
  const [latestTV, setLatestTV] = useState<TVShow[]>([]);
  const [popularTvSeries, setPopularTvSeries] = useState<TVShow[]>([]);
  const [trendingTvSeriesthisWeek, setTrendingTvSeriesthisWeek] = useState<TVShow[]>([]);
  const [topRatedSeries, setTopRatedSeries] = useState<TVShow[]>([]);
  const [ontheairSeries, setOntheAirSeries] = useState<TVShow[]>([]);
  const [loading, setLoading] = useState(true);
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

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const trending = await TrendingTvSeriesThisweek();
        const latest = await fetchLatestTV();
        const popular = await fetchPopularSeries();
        const topRated = await TopRatedSeries();
        const onAir = await OntheAirSeries();

        setTrendingTvSeriesthisWeek(trending);
        setLatestTV(latest);
        setPopularTvSeries(popular);
        setTopRatedSeries(topRated);
        setOntheAirSeries(onAir);

        setLoading(false);
      } catch (err) {
        console.log("Error fetching series data:", err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Featured series for hero image
   const featuredSeries =
  trendingTvSeriesthisWeek?.find(item => item?.backdrop_path) || 
  trendingTvSeriesthisWeek?.[0];
  const heroImageUrl = featuredSeries?.backdrop_path?.startsWith("http")
    ? featuredSeries.backdrop_path
    : `https://image.tmdb.org/t/p/w500${featuredSeries?.backdrop_path}`;

   
  
  if (loading) {
    
    return (
       <LinearGradient
      colors={["rgb(10,10,20)", "rgb(25,0,50)", "rgb(75,0,130)", "rgb(15,15,30)"]}
      locations={[0, 0.35, 0.7, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
      >
  
      <View style={{ alignItems: "center", marginTop: 40 }}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={{ marginTop: 20, color: "#fff" }}>
                  Please wait...
                </Text>
              </View>
    
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={["rgb(10,10,20)", "rgb(25,0,50)", "rgb(75,0,130)", "rgb(15,15,30)"]}
      locations={[0, 0.35, 0.7, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Logo & Navigation Buttons */}
          <View style={{ flexDirection: "row", alignItems: "flex-start", marginLeft: marginleft,  maxHeight: heightImg }}>
            <Image
              source={require("@/assets/images/log.png")}
              style={{width: isTablet ? 140 : 110,
      height: isTablet ? 120 : 100,}}
              resizeMode="contain"
            />
            <View style={{ flexDirection: "row", marginTop: navBarTop, columnGap: 10 }}>
              <TouchableOpacity
                onPress={() => router.push("/")}
                style={{ borderRadius: 15, padding: 10, backgroundColor: "#fff" }}
              >
                <Text style={{ color: "#000" }}>All</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push("/moviesOnly")}
                style={{ borderRadius: 15, padding: 10, backgroundColor: "#fff" }}
              >
                <Text style={{ color: "#000" }}>Movies</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push("/seriesOnly")}
                style={{ borderRadius: 15, padding: 10, backgroundColor: "#8b5cf6" }}
              >
                <Text style={{ color: "#fff" }}>Series</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Featured Series Hero */}
          {featuredSeries && (
            <View style={{ width: "100%", height: heroHeight, minHeight: 320,maxHeight: 5000, position: "relative", marginTop: 0 }}>
            {/* Background Image */}
          <Image
            source={{ uri: heroImageUrl }}
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
              <View style={{ position: "absolute", width: "100%",top:topText ,paddingHorizontal: 16, bottom: 120 , alignItems:"flex-start", justifyContent:"center"}}>
                <Text style={{ color: "#fff", fontSize: 28, fontWeight: "bold", marginBottom: 10 }} numberOfLines={2}>
                  {featuredSeries.title || featuredSeries.name}
                </Text>
                <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: 14,maxWidth:500, marginBottom: 16 }}>
                  {featuredSeries.overview}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                   <TouchableOpacity
                            onPress={() => {
                              if (!featuredSeries?.id) return;
                              router.push({
                                pathname: `/Watch/${featuredSeries?.id}`,
                                params: { type: "tv" },
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
                              if (!featuredSeries?.id) return;
                              router.push({
                                pathname: `/movies/[id]`,
                                params: { id:featuredSeries?.id ,
                                  type: "tv"},
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

          <View style={{flex:1 }}>
               {/* Trending series this week TV */}
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


            <View style={{ flex:1}}>
              {/* Latest TV */}
              <Text style={{ color: "#fff", margin: 10, marginTop: 20,  fontSize:20 }}>
                Latest  Series
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

          {/* Popular Series */}
            <View style={{ flex:1}}>
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
          

          {/* Top Rated Series */}
         
           <View style={{ flex:1 }}>
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
         

          {/* On The Air Series */}
          
            <View style={{flex:1}}>
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

              <BackArrow/>
          



        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}