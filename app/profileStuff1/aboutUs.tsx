import React from "react";
import { Text,ScrollView, StyleSheet} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import BackArrow from "@/backArrow";

export default function AboutUs() {
 
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
       
    <BackArrow/>
      <ScrollView style={styles.container}>
        
        <Text style={styles.title}>About Us</Text>

        <Text style={styles.text}>
          Our application is designed to provide users with a modern and
          intuitive movie discovery experience. We aim to make finding,
          exploring, and saving your favorite movies simple and enjoyable.
        </Text>

        <Text style={styles.subtitle}>Our Mission</Text>
        <Text style={styles.text}>
          Our mission is to build a platform that allows users to easily
          discover new movies, manage their watchlists, and enjoy a smooth
          and visually appealing experience.
        </Text>

        <Text style={styles.subtitle}>Our Vision</Text>
        <Text style={styles.text}>
          We strive to continuously improve the application by adding
          innovative features, improving performance, and maintaining
          a modern design that users love.
        </Text>

        <Text style={styles.subtitle}>Location</Text>
        <Text style={styles.text}>
          Developed in South Africa with a passion for technology
          and entertainment.
        </Text>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 15,
  },
  text: {
    color: "#d1d1d1",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
  },
});