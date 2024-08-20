import { View, Text, Image } from "react-native";
import React from "react";
import { ThemedView } from "./ThemedView";
import { Link } from "expo-router";
import { ThemedText } from "./ThemedText";
import { BASE_DB_URL } from "@/db/pb";

export default function BookCard() {
  return (
    <ThemedView>
      <Image
        source={{
          uri: "https://pbs.twimg.com/profile_images/1458464253850144768/MSrNebQx_400x400.jpg",
        }}
      />
      <ThemedText>lol</ThemedText>
    </ThemedView>
  );
}
