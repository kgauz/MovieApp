import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter} from "expo-router";
import { ScrollView, Alert, TouchableOpacity , Text, View, Image ,
  ActivityIndicator, Dimensions, useWindowDimensions} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import saveMovie from "@/savedMovie"


const { width, height } = Dimensions.get("window");

const scale = (size:any) => {
  const newSize = (width / 375) * size; // 375 = base phone width
  return Math.max(size * 0.9, Math.min(newSize, size * 1.4));
};

const imageHeight = width > 600
  ? Math.min(height * 8.8, 600)
  : height * 0.45;

const fontSizeH = scale(15);
const titleSize = scale(24);
const taglineSize = scale(14);
const userRatingSize = scale(13);
const overView = scale(18)

export default function MovieDetails() {
  const { id } = useLocalSearchParams();
  const [movie, setMovie] = useState(null);
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);

  const API_KEY = process.env.EXPO_PUBLIC_MOVIE_API_KEY; 

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      }
    })
      .then(res => res.json())
      .then(data => setMovie(data));
   
  }, [id]);

  useEffect(() => {
  checkSaved();
}, []);



const checkSaved = async () => {
  const stored = await AsyncStorage.getItem("saved");
  const savedItems = stored ? JSON.parse(stored) : [];

  const exists = savedItems.find((item: any) => item.id === Number(id));
  setIsSaved(!!exists);
};

  if (!movie) return (
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
      <View style={{ alignItems: "center", marginTop: 100 }}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={{ marginTop: 20, color: "#fff" }}>
                  Please wait...
                </Text>
                </View>
      </LinearGradient>

  );
  const handleSave = async () => {
  if (!movie) return;
  console.log("movie not accessed");

  const result = await saveMovie({
    id: movie.id,
    title: movie.title,
    poster: movie.poster_path,
    release_date:movie.release_date,
    rating: movie.vote_average,
  });
 
  if (result.error === "LOGIN_REQUIRED") {
    Alert.alert(
      "Login Required",
      "You must login to save movies.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Login", onPress: () => router.push("/profileStuff1/login") }
      ]
    );
    return;
  }

  if (result.error === "NETWORK_ERROR") {
    Alert.alert("Network Error", "Cannot connect to server.");
    return;
  }

  Alert.alert(result.msg);
  setIsSaved(!isSaved);
};

  return (
             <LinearGradient
            colors={[
              "rgb(10,10,20)",    
              "rgb(25,0,50)",      
              "rgb(75,0,130)",     
              "rgb(15,15,30)"      
            ]}
            locations={[0, 0.35, 0.7, 1]}
            start={{ x: 0, y: 0 }}   // left
            end={{ x: 1, y: 0 }}     // right
            style={{ flex: 1 }}
          >
        <ScrollView

       style={{
          flex: 1,
          backgroundColor: "transparent", // IMPORTANT
        }}
      showsVerticalScrollIndicator={false}
    >
    
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
        }}
        style={{
          width: "100%",
          height: imageHeight
        }}
        resizeMode="cover"
      />

     

      {/* Content */}
      <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
        {/* Title */}
        <Text
          style={{
            color: "#fff",
            fontSize: titleSize,
            fontWeight: "bold",
          }}
        >
          {movie.title}
        </Text>

        {/* Meta Info */}
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: 8,
            gap: 10,
          }}
        >
          <Text style={{ color: "#aaa", fontSize:userRatingSize  }}>
            {movie.release_date}
          </Text>

          <Text style={{ color: "#aaa", fontSize:userRatingSize }}>
            {movie.genres?.map(g => g.name).join(" • ")}
          </Text>

          {movie.runtime && (
            <Text style={{ color: "#aaa", fontSize: userRatingSize }}>
              {movie.runtime} min
            </Text>
          )}
        </View>

        {/* Tagline */}
        {movie.tagline ? (
          <Text
            style={{
              color: "#ddd",
              marginTop: 15,
              fontSize: taglineSize,
              fontStyle: "italic",
            }}
          >
            {movie.tagline}
          </Text>
        ) : null}

        <View
  style={{
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  }}
  >
    <View
      style={{
        backgroundColor: "#1f2235",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
      }}
    >
      <Text
        style={{
          color: "#FFD700",
          fontSize: taglineSize,
          fontWeight: "bold",
        }}
      >
        ⭐ {movie.vote_average?.toFixed(1)}
      </Text>
    </View>

    <Text
      style={{
        color: "#aaa",
        marginLeft: 10,
        fontSize: userRatingSize,
      }}
    >
      User Rating
    </Text>
  </View>

        {/* Overview Title */}
        <Text
          style={{
            color: "#fff",
            marginTop: 25,
            fontSize: overView,
            fontWeight: "600",
          }}
        >
          Overview
        </Text>

        {/* Overview Text */}
        <Text
          style={{
            color: "#ccc",
            marginTop: 10,
            fontSize: fontSizeH,
            lineHeight: 22,
          }}
        >
          {movie.overview}
        </Text>
   
   <View style={{ flex: 1, flexDirection:"row", gap:20, alignItems: "center", marginTop: 30 }}>

  {/* //save */}

   <TouchableOpacity
    style={{
      width: 100,
      backgroundColor: "#9b5cff",
      paddingVertical: 12,
      borderRadius: 20,
      alignItems: "center",
    }}
    onPress={() => router.push(`/Watch/${id}`)}
  >
    <Text
      style={{
        color: "#fff",
        fontSize: 15,
        fontWeight: "600",
      }}
    >
      Play
    </Text>
  </TouchableOpacity>
   
  <TouchableOpacity
  style={{
    width: 50,
    backgroundColor: "#9b5cff",
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
  }}
  onPress={handleSave}
>
  <Ionicons
    name={isSaved ? "bookmark" : "bookmark-outline"}
    size={20}
    color="#fff"
  />
</TouchableOpacity>

 

</View>
  <View style={{ flex: 1 }}>
  <View style={{flex:1, marginTop:"auto", marginBottom:30}}>
  <TouchableOpacity
    onPress={() => {
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace("/");
      }
    }}
    style={{
      position: "absolute",
      top: 10,
      left: 5,
      zIndex: 10,
      padding: 8,
      borderRadius: 20,
    }}
  >
    <Ionicons name="arrow-back" size={24} color="#fff" />
  </TouchableOpacity>
  </View>
  </View>


       
      </View>

      
    </ScrollView>
    </LinearGradient>
  );
}