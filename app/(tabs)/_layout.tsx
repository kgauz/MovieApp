import { Tabs } from "expo-router"
import { Ionicons } from "@expo/vector-icons";
import { TextInput, View ,Image, } from "react-native"

import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  
  return (
    <Tabs
        screenOptions={{
        headerShown: false,

        //  Floating rounded tab bar
        tabBarStyle: {
        position: "absolute",
        bottom: insets.bottom + 10, // adapts to phone shape
        left: 16,
        right: 16,
        height: 60,
        backgroundColor: "rgba(15,15,40,0.85)", // glassy
        borderRadius: 25,
        borderTopWidth: 0,
        paddingBottom: 0,
        paddingTop: 1,
        elevation: 8,  // shadow on Android
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        overflow: "hidden", // ensures rounded corners apply
},
        tabBarItemStyle: {
          width: 60,
          height: 60,
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 6,
          overflow: "hidden",
          elevation: 6,
          shadowColor: "#000",
          shadowOpacity: 0.15,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 4 },
          paddingTop:1,
          marginTop:4,
          paddingLeft:4,
          paddingRight:5,
          
        
        
        },


        // 🔵 Active circular tab
    
        tabBarActiveTintColor: "#8967fe",
      

       

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
         

        },
      }}
        >
      <Tabs.Screen name="home" options={{ title: 'home',  headerShown: false,
         tabBarIcon: ({ color,focused }) => (

    <Ionicons
      name={focused ? "home" : "home-outline"}
      size={24}
      color={color}
    />
),
      }} />
      <Tabs.Screen name="search" options={{ title: "search",  headerShown: false ,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              size={24}
              color={color}
            />
          ),
      }} />
      <Tabs.Screen name="saved" options={{ title: "save" ,  headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "bookmark" : "bookmark-outline"}
              size={24}
              color={color}
            />
          ),
      }} />
      <Tabs.Screen name="profile" options={{ title: "profile",  headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={24}
              color={color}
            />
          ),
       }} />
    </Tabs>
  );
}
