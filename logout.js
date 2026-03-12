import AsyncStorage from "@react-native-async-storage/async-storage";
export default async function logout(router)
{
    const token = await AsyncStorage.getItem("token");
    if(!token)
    {
        alert("You are not logged in");
        return;
    }
    await AsyncStorage.removeItem("token");
    router.replace("/(tabs)/profile");
}