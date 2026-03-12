import React, { useState } from "react";
import { Text, View, TextInput, Pressable ,TouchableOpacity} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import verifyUser from "@/loginUser"

export default function Login() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

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
      style={{
        flex: 1,
        alignItems: "center",
        padding: 20,
      }}
    >
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
            backgroundColor: "rgba(0,0,0,0.6)",
            padding: 8,
            borderRadius: 20,
          }}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

         <Text style={{fontSize:30,marginTop:50, alignSelf:"flex-start", color:"#fff"}}>Provide your email address</Text>

      {/* Glass Card */}
      <View
        style={{
          width: "100%",
          maxWidth: 400,
          padding: 30,
          borderRadius: 25,
          backgroundColor: "rgba(255,255,255,0.08)",
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(10px)", // works on web
          marginTop:30,
        }}
      >
       
                 {error ? (
          <View
            style={{
              backgroundColor: "#ffe6e6",
              borderLeftWidth: 4,
              borderLeftColor: "#ff3b30",
              padding: 12,
              marginBottom: 15,
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                color: "#b00020",
                fontSize: 14,
                fontWeight: "500",
              }}
            >
              {error}
            </Text>
          </View>
        ) : null}


       
        <Text style={{color:"#fff", fontSize:15, marginBottom:20}}>We will help you reset your password</Text>

        {/* Username */}
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Email"
          placeholderTextColor="#ccc"
          style={{
            height: 55,
            padding: 15,
            borderRadius: 15,
            backgroundColor: "rgba(255,255,255,0.15)",
            color: "#fff",
            marginBottom: 20,
          }}
        />

     {/* Login Button */}
             <Pressable
               onPress={ ()=>{router.push("/profile")}}

               style={({ hovered, pressed }) => [
                 {
                   paddingVertical: 16,
                   borderRadius: 15,
                   alignItems: "center",
                   backgroundColor: hovered ? "#8b5cf6" : "#6d28d9",
                   transform: [{ scale: pressed ? 0.96 : 1 }],
                   shadowColor: "#8b5cf6",
                   shadowOpacity: hovered ? 0.8 : 0.4,
                   shadowRadius: hovered ? 15 : 6,
                   elevation: 8,
                 },
               ]}
             >
               <Text
                 style={{
                   color: "#fff",
                   fontSize: 18,
                   fontWeight: "bold",
                   letterSpacing: 1,
                 }}
               >
                 Submit
               </Text>
             </Pressable>

      </View>
    </LinearGradient>
  );
}