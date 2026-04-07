import { Tabs,  useRouter, usePathname  } from "expo-router"
import { Ionicons } from "@expo/vector-icons";
import { TextInput, View ,Image,  Text, Pressable} from "react-native"

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useWindowDimensions } from "react-native";


function MobileTabs() {
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

 function DesktopLayout() {
  const router = useRouter();
  const pathname = usePathname();

const {width} = useWindowDimensions();
const isTablet = width >= 768;

  const navItems = [
    { name: "home", icon: "home-outline", route: "/home" },
    { name: "search", icon: "search-outline", route: "/search" },
    { name: "saved", icon: "bookmark-outline", route: "/saved" },
    { name: "profile", icon: "person-outline", route: "/profile" },
  ];

  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      
      <View
        style={{
          width: 240,
          backgroundColor: "#0f0f28",
          paddingTop: 5,
          paddingHorizontal: 20,
          justifyContent: "space-between",
          height:"100%",
          position:"relative"
        }}
      >
        <View>
          <Text
            style={{
              color: "#8967fe",
              fontSize: 22,
              fontWeight: "bold",
            }}
          >
            <Image
                   source={require("@/assets/images/log.png")}
                   style={{    width: isTablet ? 140 : 110,
                 height: isTablet ? 120 : 100,}}
                   resizeMode="contain"
                 />
          </Text>
          {navItems.map((item) => {
            const isActive = pathname === item.route;

            return (
              <Pressable
                key={item.name}
                onPress={() => router.push(item.route)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 12,
                  borderRadius: 12,
                  marginBottom: 12,
                  backgroundColor: isActive ? "rgba(137,103,254,0.15)" : "transparent",
                }}
              >
                <Ionicons
                  name={item.icon}
                  size={22}
                  color={isActive ? "#8967fe" : "white"}
                />
                <Text
                  style={{
                    color: isActive ? "#8967fe" : "white",
                    marginLeft: 12,
                    fontSize: 16,
                    fontWeight: "500",
                    textTransform: "capitalize",
                  }}
                >
                  {item.name}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Bottom Section (Profile / Footer) */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ color: "gray", fontSize: 12 }}>
            © 2026 MovieApp
          </Text>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: { display: "none" }, // hide mobile tabs
          }}
        />
      </View>
    </View>
  );
}

export default function TabsLayout() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;

  return isDesktop ? <DesktopLayout /> : <MobileTabs />;
}

