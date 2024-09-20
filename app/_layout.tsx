import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import "react-native-devsettings/withAsyncStorage";

import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    PrimaryFont: require("../assets/fonts/DMSerifText-Regular.ttf"),
    SecondaryFont: require("../assets/fonts/Barlow-Regular.ttf"),
    SecondaryFontBold: require("../assets/fonts/Barlow-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // useEffect(() => {
  //   // Check if the user is already authenticated
  //   const checkAuth = async () => {
  //     if (pb.authStore.isValid) {
  //       console.log("User is already authenticated:", pb.authStore.model);
  //       router.replace("/(app)/home"); // Navigate to home screen
  //     } else {
  //       router.replace("/(auth)/login");
  //     }
  //   };

  //   checkAuth();
  // }, []);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="bookSelection/[...slug]"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="addBook/addBook" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/register" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
        <Stack.Screen
          name="singleBookScreen/singleBookScreen"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="singleChallange/[challangeId]"
          options={{ headerShown: true }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
