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
    poster ? `https://image.tmdb.org/t/p/w780${poster}`
     : poster_path ?
    `https://image.tmdb.org/t/p/w500${poster_path}` 
    : null;

  const { width } = useWindowDimensions();

  const isTablet = width > 600;
   const isDesktop = width >= 1024;
   const marginleft = width >= 1024 ? 20 : 6;
  const desktopFontSize = width >= 1024 ? 15 : 10;

  return (
    <TouchableOpacity style={{ width: "100%" , marginLeft:marginleft}}>
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
              { width: "100%", borderRadius: 8 },
              isDesktop
                ? { height: 260 } 
                : isTablet
                ? { aspectRatio: 2 / 3 }
                : { height: 180 },
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
                : { height: 180 },
            ]}
          >
            <Text style={{ color: "#9ca3af", fontSize: 12 }}>No Image</Text>
          </View>
        )}
      </Link>
      <Text
        style={{ color: "#fff", fontSize: desktopFontSize, marginTop: 5 }}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {title}
      </Text>
      <Text style={{ color: "#fff", fontSize: desktopFontSize }}>
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
