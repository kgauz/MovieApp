import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet } from "react-native";
import BackArrow from "@/backArrow";

export default function ContactUs() {

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
      <View style={styles.container}>
        <Text style={styles.title}>Contact Us</Text>

        <Text style={styles.text}>
          If you have any questions, feedback, or support requests, please
          contact us using the details below.
        </Text>

        <Text style={styles.info}>Email: kgaugelomatshela@gmail.com</Text>
        <Text style={styles.info}>Phone: +27 64 848 979</Text>
        <Text style={styles.info}>Location: South Africa</Text>
      </View>
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
  text:{
    color:"#d1d1d1",
    fontSize:15,
    lineHeight:22
  },
  info:{
    color:"#fff",
    fontSize:16,
    marginTop:15
  }
});