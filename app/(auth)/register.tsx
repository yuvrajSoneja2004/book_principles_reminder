import { View, Text, Alert, ToastAndroid } from "react-native";
import React, { useEffect, useState } from "react";
import SafeAreaScreen from "@/utils/SafeAreaScreen";
import LabeledInput from "@/components/LabeledInput";
import { pb } from "@/db/pb";
import GlobalButton from "@/components/GlobalButton";
import Login from "./login";
import { Link, router } from "expo-router";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showLogin, setShowLogin] = useState<boolean>(true);

  const handleSignUp = async () => {
    try {
      const data = {
        username,
        email,
        password,
        passwordConfirm,
      };

      // Use the create method on the 'users' collection
      const createdUser = await pb.collection("users").create(data);

      // Optionally, log in the user immediately after creation
      const authData = await pb
        .collection("users")
        .authWithPassword(email, password);

      Alert.alert("Success", "User created and logged in successfully");
      // You might want to navigate to another screen here
    } catch (error) {
      console.error("Error signing up:", error.response.data);
      Alert.alert("Error", error.response.title.message || "Failed to sign up");
    }
  };

  useEffect(() => {
    console.log("haary khan", pb.authStore.isValid);
    if (pb.authStore.isValid) {
      router.replace("/");
    }
  }, [pb.authStore]);

  // if (showLogin) return <Login />;

  return (
    <SafeAreaScreen>
      <View className="w-full h-full justify-center items-center flex">
        <Text className="text-white text-4xl font-primary-regular">
          Welcome!
        </Text>
        <View className="w-full">
          <LabeledInput
            label="Username"
            value={username}
            onChangeText={setUsername}
            placeholder="Enter username here."
          />
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
          <LabeledInput
            label="Confirm Password"
            value={passwordConfirm}
            onChangeText={setPasswordConfirm}
            placeholder="Confirm your password here."
            secureTextEntry={true}
          />
          <GlobalButton title="Register" styles="mt-4" onPress={handleSignUp} />
          <Text className="font-primary-regular text-white mt-3 text-center">
            Already have an account?{" "}
            <Link
              className="underline text-white font-primary-regular"
              href={"(auth)/login"}
            >
              Click here.
            </Link>
          </Text>
        </View>
      </View>
    </SafeAreaScreen>
  );
}
