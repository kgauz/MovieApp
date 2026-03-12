import React, { useState } from "react";
import { View, ActivityIndicator, Platform } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { WebView } from "react-native-webview";
import { Linking } from "react-native";

export default function Watch() {
  const { watch } = useLocalSearchParams();
  const Movieid = "1234821";
 
  const [loading, setLoading] = useState(true);

  if (!watch) {
  console.log("No movie ID provided — loading default movie 123");
}

     const url = `https://vidsrc.cc/v2/embed/movie/${watch}`;
   
  
     if (Platform.OS === "web") {
   
    return (
      <iframe
        src={url}
        allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
        allowFullScreen
       referrerPolicy="no-referrer"

        style={{ width: "100%", height: "100vh", border: "none" }}
      />
    );
  }
  if (Platform.OS === "ios") {
  Linking.openURL(url);
  return null;
}

  //
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <WebView
        style={{ flex: 1 }}
        source={{ uri: url }}
        javaScriptEnabled
        domStorageEnabled
        allowsFullscreenVideo
        mediaPlaybackRequiresUserAction={false}
        onLoadEnd={() => setLoading(false)}
      />
      {loading && (
        <ActivityIndicator
          size="large"
          color="red"
          style={{
            position: "absolute",
            top: "50%",
            alignSelf: "center",
          }}
        />
      )}
    </View>
  );
}