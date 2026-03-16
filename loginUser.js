import AsyncStorage from "@react-native-async-storage/async-storage";
export default async function loginUser(username, password) {
  try {
    const res = await fetch("https://movieapp-acny.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    console.error(data);
    if(res.ok)
    {
         await AsyncStorage.setItem("token", data.token);
    }

    return data;

  } catch (err) {
    console.log("Login error:", err);
    return { message: "Something went wrong" };
  }
}
