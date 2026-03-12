import React from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import BackArrow from "@/backArrow";

export default function CopyrightPolicy() {
  return (
    <LinearGradient
      colors={[
        "rgb(10,10,20)",
        "rgb(25,0,50)",
        "rgb(75,0,130)",
        "rgb(15,15,30)"
      ]}
      locations={[0, 0.35, 0.7, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >

      <BackArrow/>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Copyright Policy</Text>

        <Text style={styles.text}>
          All content available in this application, including text,
          graphics, logos, icons, images, and software, is the property
          of the application developers or its content providers and
          is protected by international copyright laws.
        </Text>

        <Text style={styles.subtitle}>Ownership</Text>
        <Text style={styles.text}>
          The design, structure, and functionality of this application
          are owned by the developers and may not be copied, reproduced,
          or distributed without prior written permission.
        </Text>

        <Text style={styles.subtitle}>Permitted Use</Text>
        <Text style={styles.text}>
          Users may access and use the application for personal,
          non-commercial purposes only. Any unauthorized use,
          reproduction, or distribution of content may violate
          copyright laws.
        </Text>

        <Text style={styles.subtitle}>Third-Party Content</Text>
        <Text style={styles.text}>
          Some content such as movie posters, descriptions, or ratings
          may belong to third-party providers. Such content remains the
          property of their respective owners and is used in accordance
          with their licensing terms.
        </Text>

        <Text style={styles.subtitle}>Policy Updates</Text>
        <Text style={styles.text}>
          This copyright policy may be updated from time to time
          to reflect changes in our services or legal requirements.
        </Text>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20
  },
  subtitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 15
  },
  text: {
    color: "#d1d1d1",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8
  }
});