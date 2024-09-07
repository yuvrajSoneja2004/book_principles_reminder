import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { timeAgo } from "@/utils/timeAgo";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

interface Props {
  id: string;
  title: string;
  goalInDays: number;
  created: string;
  challangeDescription: string;
}

export default function ChallangeCard({
  id,
  title,
  goalInDays,
  created,
  challangeDescription,
}: Props) {
  return (
    <TouchableOpacity
      className="border-2 border-solid border-gray-400 p-4 my-2"
      onPress={() => router.push(`/singleChallange/${id}`)}
    >
      <ThemedText className="font-primary-regular text-2xl">{title}</ThemedText>
      <ThemedText className="font-secondary-regular">
        Started: {timeAgo(created)}
      </ThemedText>
      <View className="flex items-center  flex-row mt-3">
        <Feather name="target" size={20} color="#fff" />
        <ThemedText className="ml-2 font-secondary-regular">
          {goalInDays} Days
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
}
