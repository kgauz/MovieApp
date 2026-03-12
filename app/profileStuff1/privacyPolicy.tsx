import BackArrow from "@/backArrow";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, Text, StyleSheet } from "react-native";
export default function PrivacyPolicy() {
  return (
    <LinearGradient
      colors={[
        "rgb(10,10,20)",
        "rgb(25,0,50)",
        "rgb(75,0,130)",
        "rgb(15,15,30)"
      ]}
      style={{ flex: 1 }}
    >
    <BackArrow/>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Privacy Policy</Text>

        <Text style={styles.text}>
          We respect your privacy and are committed to protecting your personal
          information. This application collects only the information necessary
          to provide a better user experience.
        </Text>

        <Text style={styles.subtitle}>Information We Collect</Text>
        <Text style={styles.text}>
          We may collect your username, preferences, and activity within the
          application in order to improve our services.
        </Text>

        <Text style={styles.subtitle}>How We Use Information</Text>
        <Text style={styles.text}>
          Your information is used to personalize your experience, maintain
          your account, and improve the quality of our services.
        </Text>

        <Text style={styles.subtitle}>Security</Text>
        <Text style={styles.text}>
          We implement appropriate security measures to protect your
          information from unauthorized access.
        </Text>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container:{
    padding:20
  },
  title:{
    color:"#fff",
    fontSize:26,
    fontWeight:"bold",
    marginBottom:20
  },
  subtitle:{
    color:"#fff",
    fontSize:18,
    fontWeight:"600",
    marginTop:15
  },
  text:{
    color:"#d1d1d1",
    fontSize:15,
    lineHeight:22,
    marginTop:8
  }
});