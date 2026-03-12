
import { View , TouchableOpacity} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function BackArrow()
{
    const router = useRouter();
    return (
    <View style={{marginTop:10, marginBottom:40}}>
        <TouchableOpacity
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace("/");
            }
          }}
          style={{
            position: "absolute",
            top: 10,
            left: 5,
            zIndex: 10,
            padding: 8,
            borderRadius: 20,
          }}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        </View>
    );
}