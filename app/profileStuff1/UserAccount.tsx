import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { Text, StyleSheet, View ,Modal, TouchableOpacity, Pressable, ActivityIndicator} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {deleteUser} from "@/delete";
import logout from "@/logout";


export default function userAccount() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [showLogoutPopup, setShowLogoutPopup] = useState(false);
    const [showSuccessfulPopup, setShowSuccessfulPopup]  = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        router.replace("/profileStuff1/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/profile", {
          headers: {
            Authorization: token,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setUser(data);
        } else {
          router.replace("/profileStuff1/login");
        }
      } catch (error) {
        console.log("Profile error:", error);
      }
    };

    fetchProfile();
  }, []);

    if (!user) return (
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


        <View style={{flex:1, alignItems:"center",marginTop:40}}>
          
            <Ionicons
            name ="person-circle-outline"
            size={80}
            color={"#fff"}
            />
             <View style={{ alignItems: "center" }}>

        {user && (
          <>
            <Text style={{ color: "#fff", fontSize: 20, marginTop: 1 }}>
              {user.username}
            </Text>

            <Text style={{ color: "#ccc", fontSize: 16, marginTop: 5 }}>
              {user.email}
            </Text>
          </>
        )}
      </View>

       {/* Logout Button */}
              <Pressable
              onPress={()=>{
                setShowLogoutPopup(true);
                      
              }}
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
                    width:"30%",
                    marginTop:30
                  },
                ]}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 15,
                    fontWeight: "bold",
                    letterSpacing: 1,
                  }}
                >
                  Logout
                </Text>
              </Pressable>

               {/* Delete Account */}
              <Pressable
              onPress={()=>{
                setShowDeletePopup(true)
                
              }}
              
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
                    width:"40%",
                    marginTop:30
                  },
                ]}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 15,
                    fontWeight: "bold",
                    letterSpacing: 1,
                  }}
                >
                  Delete Account
                </Text>
              </Pressable>

              <Modal
            transparent={true}
            visible={showDeletePopup}
            animationType="fade"
          >
  <View style={styles.overlay}>
    <View style={styles.popup}>
      <Text style={styles.title}>Delete Account</Text>
      <Text style={styles.message}>
        Are you sure you want to permanently delete your account?
      </Text>

      <View style={styles.buttons}>
        <Pressable
          onPress={() => setShowDeletePopup(false)}
          style={styles.cancel}
        >
          <Text>Cancel</Text>
        </Pressable>

        <Pressable
          onPress={ async() => {
            setShowDeletePopup(false);
           const results = await deleteUser(router);
           if(results)
           {
              setShowSuccessfulPopup(true);

              setTimeout(() => {
                router.replace("/profileStuff1/login");
              }, 5000);
           }
        

            
          }}
          style={styles.delete}
        >
          <Text style={{ color: "white" }}>Delete</Text>
        </Pressable>
      </View>
    </View>
  </View>
</Modal>

<Modal
            transparent={true}
            visible={showLogoutPopup}
            animationType="fade"
          >
  <View style={styles.overlay}>
    <View style={styles.popup}>
      <Text style={styles.title}>Logout</Text>
      <Text style={styles.message}>
        Are you sure that you want to logout?
      </Text>

      <View style={styles.buttons}>
        <Pressable
          onPress={() => setShowLogoutPopup(false)}
          style={styles.cancel}
        >
          <Text>Cancel</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            setShowLogoutPopup(false);
             logout(router);
          }}
          style={styles.delete}
        >
          <Text style={{ color: "white" }}>Yes</Text>
        </Pressable>
      </View>
    </View>
  </View>
</Modal>



<Modal
            transparent={true}
            visible={showSuccessfulPopup}
            animationType="fade"
          >
  <View style={styles.overlay}>
    <View style={styles.successCard}>

      <Text style={styles.successText}>
        Account deleted successfully
      </Text>
    </View>

  </View>
</Modal>

        </View>
     

     
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  popup: {
    width: 300,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  },
  message: {
    marginBottom: 20
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  cancel: {
    padding: 10
  },
  delete: {
   backgroundColor:"#a78bfa",
    padding: 10,
    borderRadius: 5
  },
  successCard: {
    width: 260,
    backgroundColor: "white",
    padding: 25,
    borderRadius: 15,
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5, // Android shadow
  },

  successText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    color: "#333",
  },
});