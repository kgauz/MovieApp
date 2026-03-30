import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { Movie } from "./movie";
export default function MovieLoader({
  id,
  poster_path,
  poster, 
  title,
  release_date,
  vote_average =0,
  movie_type,
}: Movie & { poster?: string }) {
  const imageURL =
    poster ||
    (poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : null);
  console.log(imageURL);
  const { width } = useWindowDimensions();

  const isTablet = width > 600;

  return (
    <TouchableOpacity style={{ width: "100%" , marginLeft:6}}>
      <Link
        href={{
          pathname: "/movies/[id]",
          params: {
            id: id,
            type: movie_type,
          },
        }}
      >
        {" "}
        {imageURL ? (
          <Image
            source={{
              uri: imageURL,
            }}
            style={[
              { width: "100%", borderRadius: 6 },
              isTablet
                ? { aspectRatio: 2 / 3 } // Tablet
                : { height: 180 }, // Phone
            ]}
            resizeMode="cover"
          />
        ) : (
          <View
            style={[
              {
                width: "100%",
                backgroundColor: "#1f2933",
                alignItems: "center",
                justifyContent: "center",
              },
              isTablet
                ? { aspectRatio: 2 / 3 } // Tablet
                : { height: 170 },
            ]}
          >
            <Text style={{ color: "#9ca3af", fontSize: 12 }}>No Image</Text>
          </View>
        )}
      </Link>
      <Text
        style={{ color: "#fff", fontSize: 10, marginTop: 5 }}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {title}
      </Text>
      <Text style={{ color: "#fff", fontSize: 10 }}>
        {release_date ? new Date(release_date).getFullYear() : ""}
      </Text>

      <View style={{ flexDirection: "row", marginTop: 3 }}>
        {Array.from({
          length: Math.floor(vote_average / 3),
        }).map((_, index) => (
          <Ionicons key={index} name="star" size={12} color="yellow" />
        ))}
      </View>
    </TouchableOpacity>
  );
}
