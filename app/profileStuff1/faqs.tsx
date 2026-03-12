import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import BackArrow from "@/backArrow";

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I create an account?",
      answer:
        "You can create an account by selecting the Login option on the profile page and completing the registration form."
    },
    {
      question: "How do I save movies?",
      answer:
        "Open a movie and tap the save or favorite button to add it to your saved list."
    },
    {
      question: "Why can't I log in?",
      answer:
        "Make sure your username and password are correct and that your internet connection is active."
    },
    {
      question: "How do I logout?",
      answer:
        "Go to the Profile page and select Logout from the menu."
    },
    {
      question: "How can I contact support?",
      answer:
        "You can contact us through the Contact Us page available in the Profile section."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
        <Text style={styles.title}>FAQs</Text>

        {faqs.map((item, index) => (
          <View key={index} style={styles.card}>
            <Pressable
              style={styles.questionRow}
              onPress={() => toggleFAQ(index)}
            >
              <Text style={styles.question}>{item.question}</Text>

              <Ionicons
                name={openIndex === index ? "chevron-up" : "chevron-down"}
                size={20}
                color="#fff"
              />
            </Pressable>

            {openIndex === index && (
              <Text style={styles.answer}>{item.answer}</Text>
            )}
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },

  title: {
    fontSize: 26,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 10,
    padding: 15,
    marginBottom: 12
  },

  questionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  question: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600"
  },

  answer: {
    color: "#d1d1d1",
    marginTop: 10,
    lineHeight: 22,
    fontSize: 14
  }
});