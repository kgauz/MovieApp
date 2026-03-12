// import AsyncStorage from "@react-native-async-storage/async-storage";

// export default async function toggleSaved() {
//   const stored = await AsyncStorage.getItem("saved");
//   let savedItems = stored ? JSON.parse(stored) : [];

//   const exists = savedItems.find((item: any) => item.id === movie.id);

//   if (exists) {
//     savedItems = savedItems.filter((item: any) => item.id !== movie.id);
//   } else {
//     savedItems.push(movie);
//   }

//   await AsyncStorage.setItem("saved", JSON.stringify(savedItems));
// }