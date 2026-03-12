import BackArrow from "@/backArrow";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, Text, StyleSheet } from "react-native";

export default function TermsOfService() {
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
        <Text style={styles.title}>Terms of Service</Text>

        <Text style={styles.text}>
          By using this application, you agree to comply with and be bound by
          the following terms and conditions.
        </Text>

        <Text style={styles.subtitle}>User Responsibilities</Text>
        <Text style={styles.text}>
          Users must ensure that their account information is accurate and
          that the application is used responsibly.
        </Text>

        <Text style={styles.subtitle}>Service Availability</Text>
        <Text style={styles.text}>
          We strive to maintain continuous service availability but do not
          guarantee uninterrupted access at all times.
        </Text>

        <Text style={styles.subtitle}>Changes</Text>
        <Text style={styles.text}>
          These terms may be updated periodically to reflect improvements
          and changes to our services.
        </Text>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container:{ padding:20 },
  title:{ color:"#fff", fontSize:26, fontWeight:"bold", marginBottom:20 },
  subtitle:{ color:"#fff", fontSize:18, fontWeight:"600", marginTop:15 },
  text:{ color:"#d1d1d1", fontSize:15, lineHeight:22, marginTop:8 }
});