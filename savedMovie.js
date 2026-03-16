import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function saveMovie(movie) {
  const token = await AsyncStorage.getItem("token");

  if (!token) {
    return { error: "LOGIN_REQUIRED" };
  }

  try {
    const response = await fetch("https://movieapp-acny.onrender.com/save-movie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        movie
      }),
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return { error: "NETWORK_ERROR" };
  }
}
