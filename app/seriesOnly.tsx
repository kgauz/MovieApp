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
  const isDesktop = width>= 1024;

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


          
          {featuredSeries && (
            <View
              style={{
                width: "100%",
                height: isDesktop ? 600 : heroHeight, 
                position: "relative",
                overflow: "hidden",
              }}
            >
            
              <Image
                source={{ uri: heroImageUrl }}
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
                  {featuredSeries.title || featuredSeries.name}
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
                  {featuredSeries.overview}
                </Text>
          
                {/* Buttons */}
                <View style={{ flexDirection: "row"}}>
                  {/* Play Button */}
                  <TouchableOpacity
                           onPress={() => {
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