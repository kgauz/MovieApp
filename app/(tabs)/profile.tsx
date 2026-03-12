import { Ionicons } from "@expo/vector-icons";
import { Link,useRouter , useFocusEffect } from "expo-router";
import { Text, View , Pressable,Modal,StyleSheet , ScrollView} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useCallback } from "react";
import logout from "@/logout";


export default function Profile() {
  const [isLoggedIn,setIsLoggeddIn] = useState(false);
  const [loginNotShow, setLoginNotShow] = useState(true);
  const [logoutShow, setLogoutShow] = useState(false);
  const router = useRouter();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

useFocusEffect(
  useCallback(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        setIsLoggeddIn(true);
        setLoginNotShow(false);
        setLogoutShow(true);
      } else {
        setIsLoggeddIn(false);
        setLoginNotShow(true);
        setLogoutShow(false);
      }
    };

    checkLogin();
  }, [])
);

  const menuItems = [
    { title: "Account", icon: "person-outline", link: "/profileStuff1/UserAccount",visible:isLoggedIn  },
    { title: "Login", icon: "log-in-outline", link: "/profileStuff1/login", visible:loginNotShow },
    { title: "Logout", icon: "log-in-outline",onPress:() =>    setShowLogoutPopup(true), visible:logoutShow },
    { title: "Privacy Policy", icon: "shield-checkmark-outline", link: "/profileStuff1/privacyPolicy",visible:true  },
    { title: "Terms of Service", icon: "document-text-outline", link: "/profileStuff1/termsOfService",visible:true  },
    { title: "Copy Right Policy", icon: "copy-outline", link: "/profileStuff1/copyrightPolicy",visible:true  },
    { title: "Contact Us", icon: "call-outline", link: "/profileStuff1/contactUs", visible:true  },
    { title: "About Us", icon: "information-circle-outline", link: "/profileStuff1/aboutUs", visible:true  },
    { title: "FAQs", icon: "help-circle-outline", link: "/profileStuff1/faqs" ,visible:true },
    { title: "Rate Us", icon: "star-outline", link: "#", visible:true  },
  ];

  

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
      <ScrollView style={{flex:1, marginBottom: 80, padding:20}}>


      <Text
        style={{
          fontSize: 25,
          color: "#fff",
          paddingHorizontal: 15,
          fontWeight: "bold",
        }}
      >
        Profile
      </Text>

      {menuItems
      .filter(item =>item.visible)
      .map((item, index) => (

        <View key={index} style={{ marginTop: 25 }}>
          {item.link ? (
          <Link href={item.link} style={{ paddingHorizontal: 15 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name={item.icon} size={22} color="#fff" />
              <Text style={{ fontSize: 16, color: "#fff", marginLeft: 12 }}>
                {item.title}
              </Text>
            </View>
          </Link>
          ):(
            <View style={{ paddingHorizontal: 15 }}>
              <Text
              onPress={item.onPress}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name={item.icon} size={22} color="#fff" />
              <Text style={{ fontSize: 16, color: "#fff", marginLeft: 12 }}>
                {item.title}
              </Text>
                </View>
              </Text>
              </View>
          )}
          <View
            style={{
              height: 1,
              backgroundColor: "rgba(255,255,255,0.15)",
              marginTop: 12,
              marginHorizontal: 15,
            }}
          />

          





        </View>
      ))}


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
                    onPress={ async() => {
                      setShowLogoutPopup(false);
                       await logout(router);
                        setIsLoggeddIn(false);
                        setLoginNotShow(true);
                        setLogoutShow(false);
                    }}
                    style={styles.delete}
                  >
                    <Text style={{ color: "white" }}>Yes</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
           </ScrollView>
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
 
});