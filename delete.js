import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Platform } from "react-native";



export const deleteUser = async (router) => {
  const token = await AsyncStorage.getItem("token");


  if (!token) {
    alert("Not logged in");
    return;
  }

  try {
    const response = await fetch("https://movieapp-acny.onrender.com/delete-account", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await response.json();

    if (response.ok) {
      await AsyncStorage.removeItem("token");
      return{success:true};
    } else {
      return{success:false, message:data.message};
    }
  } catch (error) {
    console.log("Delete error:", error);
  }
};
