import { Stack} from "expo-router";
import "./global.css";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
    <StatusBar hidden={true}/>
    <Stack>
      {/* Tabs layout */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
       <Stack.Screen name="movies/[id]" options={{ headerShown: false}} />
        <Stack.Screen name="Watch/[watch]" options={{ headerShown: false }}  />
        <Stack.Screen name="profileStuff1/login" options={{ headerShown: false }} />
        <Stack.Screen name="profileStuff1/register" options={{ headerShown: false }} />
        <Stack.Screen name="profileStuff1/forgotPassword" options={{ headerShown: false }} />
         <Stack.Screen name="profileStuff1/UserAccount" options={{ headerShown: false }} />
         <Stack.Screen name="profileStuff1/contactUs" options={{ headerShown: false }} />
         <Stack.Screen name="profileStuff1/copyrightPolicy" options={{ headerShown: false }} />
         <Stack.Screen name="profileStuff1/faqs" options={{ headerShown: false }} />
         <Stack.Screen name="profileStuff1/termsOfService" options={{ headerShown: false }} />
          <Stack.Screen name="profileStuff1/aboutUs" options={{ headerShown: false }} />
          <Stack.Screen name="profileStuff1/privacyPolicy" options={{ headerShown: false }} />
    </Stack>
    </>
  );
}
