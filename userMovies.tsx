import { Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View, Dimensions, ScrollView } from "react-native";
import { Movie } from "./movie";
import {Link} from "expo-router";


export default function MovieLoader2({
  id,
  title,
  poster,
  poster_path,
  releaseDate,
  rating,
}: any) {

  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : poster
    ? `https://image.tmdb.org/t/p/w500${poster}`
    : null;

  const { width } = Dimensions.get("window");

  // responsive poster width
  const posterWidth = width > 600 ? 190 : 80;
  const titleSize = width > 600 ? 30 : 16;
  const releaseSize = width > 600 ? 25 : 14;
  // const starSize = width > 600 ? 30 : 14;

  return (
    <TouchableOpacity style={{ width: "100%" }}>
      <View style={{ flexDirection: "row", gap: 20 }}>

        {/* Poster */}
        <View style={{ width: posterWidth }}>
          {imageUrl ? (
            <Image
              source={{ uri: imageUrl }}
              style={{
                width: "100%",
                aspectRatio: 2 / 3, // auto height
                borderRadius: 6,
              }}
              resizeMode="cover"
            />
          ) : (
            <View
              style={{
                width: "100%",
                aspectRatio: 2 / 3,
                backgroundColor: "#1f2933",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#9ca3af", fontSize: 12 }}>
                No Image
              </Text>
            </View>
          )}
        </View>

        {/* Movie Info */}
        <View style={{ flex: 1 }}>
          <Text style={{ color: "#fff", fontSize: titleSize }} numberOfLines={1}>
            {title}
          </Text>

          <Text style={{ color: "#ccc", fontSize: releaseSize }}>
            {releaseDate ? releaseDate : "unknown"}
          </Text>

          <View style={{ flexDirection: "row", marginTop: 4 }}>
            {Array.from({ length: Math.floor(rating / 3) }).map((_, index) => (
              <Ionicons key={index} name="star" size={releaseSize} color="yellow" />
            ))}
          </View>
        </View>

      </View>
    </TouchableOpacity>
  );
}