import React, { useState } from "react";
import { Text, View, TextInput, Pressable ,TouchableOpacity, Modal, StyleSheet} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import saveUser from "@/saveUser";



export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPass, setConfirm] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");
  const [showSuccessfulPopup, setShowSuccessfulPopup] = useState(false);
  
  const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};
const validateName = (name: string) => {
  // Only letters and spaces, at least 2 characters
  const re = /^[A-Za-z ]{2,}$/;
  return re.test(name.trim());
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
      style={{
        flex: 1,
        justifyContent: "center",
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
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 32,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 30,
          }}
        >
          Register
        </Text>

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

        {/* Username */}
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
          placeholderTextColor="#ccc"
          style={{
            height: 55,
            padding: 15,
            borderRadius: 15,
            backgroundColor: "rgba(255,255,255,0.15)",
            color: "#fff",
            marginBottom: 10,
          }}
        />
          {/* Email */}
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="#ccc"
          style={{
            height: 55,
            padding: 15,
            borderRadius: 15,
            backgroundColor: "rgba(255,255,255,0.15)",
            color: "#fff",
            marginBottom: 10,
          }}
        />

        {/* Password */}
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor="#ccc"
          secureTextEntry
          style={{
            height: 55,
            padding: 15,
            borderRadius: 15,
            backgroundColor: "rgba(255,255,255,0.15)",
            color: "#fff",
            marginBottom: 10,
          }}
        />

         {/* Confirm */}
        <TextInput
          value={confirmPass}
          onChangeText={setConfirm}
          placeholder="Confirm Password  "
          placeholderTextColor="#ccc"
          secureTextEntry
          style={{
            height: 55,
            padding: 15,
            borderRadius: 15,
            backgroundColor: "rgba(255,255,255,0.15)",
            color: "#fff",
            marginBottom: 30,
          }}
        />


        {/* Register Button */}
            <Pressable

          onPress={async () => {
             if (!username || !email || !password || !confirmPass) {
                setError("Please fill in all fields");
                return;
              }
                if (!validateName(username)) {
                setError("Name must contain only letters and at least 2 characters");
                return;
              }
               if (!validateEmail(email)) {
                setError("Please enter a valid email address");
                return;
              }

              if (password !== confirmPass) {
                setError("Passwords do not match");
                return;
              }
              setError("");
          
           const result = await saveUser(username, email, password, confirmPass);
             
              setUsername("");
              setEmail("");
              setPassword("");
              setConfirm("");
              if (!result.success) {
                setError(result.message);
              } else {
                 setShowSuccessfulPopup(true);
                  setTimeout(() => { 
                router.replace("/profileStuff1/login");
              }, 5000);
              }
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
            Register
          </Text>
        </Pressable>
       
     

         {/* Login*/}
        <Pressable
          onPress={() => router.push("/profileStuff1/login")}
          style={{marginTop:20, alignItems:"center", marginBottom: 5 }}
        >
          {({ hovered }) => (
            <Text
              style={{
                color: hovered ? "#c084fc" : "#a78bfa",
                fontWeight: "500",
              }}
            >
              Login
            </Text>
          )}
        </Pressable>



      </View>


      <Modal
                  transparent={true}
                  visible={showSuccessfulPopup}
                  animationType="fade"
                >
        <View style={styles.overlay}>
          <View style={styles.successCard}>
      
            <Text style={styles.successText}>
              Account  successfully registered
            </Text>
          </View>
      
        </View>
      </Modal>
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