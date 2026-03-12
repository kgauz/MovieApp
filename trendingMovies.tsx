import { Image, Text, View, useWindowDimensions, TouchableOpacity } from "react-native";
import { Movie } from "./movie";
import { useRouter } from "expo-router";
import { ResizeMode } from "react-native-video";

type MovieLoaderProps = Movie & {
  index: number;
};

export default function TrendingMovies({
  id,
  title,
  poster_path,
  index,
}: MovieLoaderProps) {

  const { width } = useWindowDimensions();
  // const posterHeight = width > 600 ? 220 : 150;
 // const posterWidth =  "100%";
  // const posterHeight = width * 0.4;
   const posterWidth = width > 900 ? 160 : width > 600 ? 140 : 110;
   const posterHeight = posterWidth * 1.5;

  const router = useRouter();

  return (
    <TouchableOpacity
      style={{ width: "100%" }}
      onPress={() => router.push(`/movies/${id}`)} // navigate on press
    >
      <View style={{ position: "relative" }}>

        {poster_path ? (
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${poster_path}`,
            }}
            style={{
              width: posterWidth,
              height: posterHeight,
              borderRadius: 5,
            }}
            resizeMode="cover"
          />
        ) : (
          <View
            style={{
              width: posterWidth,
              height: posterHeight,
              backgroundColor: "#1f2933",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "#9ca3af", fontSize: 12 }}>
              No Image
            </Text>
          </View>
        )}

        {/* Ranking number */}
        <View
          style={{
            position: "absolute",
            bottom: 5,
            left: 5,
          }}
        >
          {/* White border */}
          <Text
            style={{
              position: "absolute",
              fontSize: 30,
              fontWeight: "bold",
              color: "white",
              textShadowColor: "white",
              textShadowOffset: { width: 0, height: 0 },
              textShadowRadius: 6,
            }}
          >
            {index + 1}
          </Text>

          {/* Black number */}
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              color: "black",
            }}
          >
            {index + 1}
          </Text>
        </View>

      </View>

      {/* Movie title */}
      <Text
        style={{ color: "#fff", fontSize: 10, marginTop: 5 }}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {title}
      </Text>

    </TouchableOpacity>
  );
}