import React, { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PocketBase, { AsyncAuthStore } from "pocketbase";
import { Link, useRouter } from "expo-router";
import SafeAreaScreen from "@/utils/SafeAreaScreen";
import LabeledInput from "@/components/LabeledInput";
import GlobalButton from "@/components/GlobalButton";
import { pb } from "@/db/pb";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Check if the user is already authenticated
    const checkAuth = async () => {
      if (pb.authStore.isValid) {
        console.log("User is already authenticated:", pb.authStore.model);
        router.replace("/(app)/home"); // Navigate to home screen
      }
    };

    checkAuth();
  }, []);

  const handleSignUp = async () => {
    try {
      const data = {
        email,
        password,
        passwordConfirm: password, // PocketBase requires password confirmation
      };

      // Create the user
      const createdUser = await pb.collection("users").create(data);

      // Log in the user immediately after creation
      await pb.collection("users").authWithPassword(email, password);

      Alert.alert("Success", "User registered and logged in successfully");
      router.replace("/(app)/home"); // Navigate to home screen
    } catch (error) {
      console.error("Error signing up:", error);
      Alert.alert("Error", error.message || "Failed to sign up");
    }
  };

  const handleLogin = async () => {
    try {
      await pb.collection("users").authWithPassword(email, password);

      Alert.alert("Success", "User logged in successfully");
      router.replace("/(app)/home"); // Navigate to home screen
    } catch (error) {
      console.error("Error logging in:", error);
      Alert.alert("Error", error.message || "Failed to log in");
    }
  };

  return (
    <SafeAreaScreen>
      <View className="w-full h-full justify-center items-center flex">
        <Text className="text-white text-4xl font-primary-regular">
          Welcome back!
        </Text>
        <View className="w-full">
          <LabeledInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email here."
          />
          <LabeledInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter password here."
            secureTextEntry={true}
          />
          <GlobalButton title="Login" styles="mt-4" onPress={handleLogin} />
          <Text className="font-primary-regular text-white mt-3 text-center">
            Don't have an account? <Link href="/register">Click here.</Link>
          </Text>
        </View>
      </View>
    </SafeAreaScreen>
  );
}
