import { Ionicons } from "@expo/vector-icons";
import { Text, View, FlatList, Pressable , Dimensions, ScrollView} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState , useCallback} from "react";
import { useRouter, useFocusEffect,  } from "expo-router";
import MovieLoader from "@/movieLoader";
import Movieloader2 from "@/userMovies";

export default function SavedScreen() {
  const [savedMovies, setSavedMovies] = useState<any[]>([]);
  const [logged, setLogged] = useState(false);
  const router = useRouter();
  const {width} = Dimensions.get("window");

  const titleSize = width > 600 ? 30 : 20;

  const loadSavedMovies = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) return;
    try {
      const res = await fetch("http://localhost:5000/save-movie", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) return;

      const data = await res.json();
      setSavedMovies(data || []);
    } catch (err) {
      console.log("Failed to load saved movies:", err);
    }
  };
 useFocusEffect(
  useCallback(() => {
    const checkUserAndLoad = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        setLogged(true);
        await loadSavedMovies();
      } else {
        setLogged(false);
      }
    };
    checkUserAndLoad();
  }, [])

 );
  



  // Check login
  useEffect(() => {
    const checkUser = async () => {
      const token = await AsyncStorage.getItem("token");
      setLogged(!!token);
    };
    checkUser();
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
      style={{ flex: 1, paddingTop: 20 }}
    >
      <View style={{ flex: 1, marginTop: 5 , marginBottom:100}}>
        <Text
          style={{
            fontSize: titleSize,
            color: "#fff",
            paddingHorizontal: 15,
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          Save
        </Text>

        {!logged ? (
            <View style={{ flex:1, alignItems:"center", justifyContent:"center" }}>
            <View style={{ flexDirection:"column",paddingHorizontal: 15 }}>
              <Text style={{ color: "#fff", fontSize:20}}>
                You are not logged in.
              </Text>
            </View>
            <Text style={{ color: "#fff", marginTop:10, fontSize:15}}>
                 Please login to view your saved movies....
              </Text>

            <Pressable
              onPress={() => router.push("/profileStuff1/login")}
              style={{ marginTop: 20, alignItems: "center" }}
            >
              <Text style={{ color: "#fff",width:100, fontWeight: "500", backgroundColor:"#a78bfa", padding:15, borderRadius:20, textAlign:"center",fontSize:18 }}>
                Login
              </Text>
            </Pressable>
          </View>
        ) : savedMovies.length === 0 ? (
          <View style={{ flex:1,paddingHorizontal: 15 ,justifyContent:"center", alignItems:"center",flexDirection:"column"}}>
            <Text style={{ color: "#fff" , fontSize:20}}>No saved movies yet.</Text>
              <Text style={{ color: "#fff", fontSize:14}}>Add some by tapping the bookmark icon on a movie.</Text>
          </View>
        ) : (
          <FlatList
            data={savedMovies}
            keyExtractor={(item) => item._id}   // important
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View
                style={{
                  paddingHorizontal: 15,
                  paddingVertical: 12,
                  borderBottomWidth: 1,
                  borderBottomColor: "rgba(255,255,255,0.2)",
                }}
              >
                <Movieloader2{...item} />
              </View>
            )}
          />
        )}
      </View>
  
    </LinearGradient>
  );
}