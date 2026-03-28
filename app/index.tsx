import "./global.css";
import { Redirect } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { View, Image, useWindowDimensions } from "react-native";
import { useEffect, useState } from "react";

export default function Index() {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const [goHome, setGoHome] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setGoHome(true);
    }, 3000); 

    return () => clearTimeout(timer);
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
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image
          source={require("@/assets/images/log.png")}
          style={{
            width: isTablet ? 180 : 170,
            height: isTablet ? 160 : 140,
          }}
          resizeMode="contain"
        />
      </View>
      {goHome ? (
        <Redirect href="/home" />

      ): (null)}

    </LinearGradient>
  );
}