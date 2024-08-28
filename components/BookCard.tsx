import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { BASE_DB_URL } from "@/db/pb";
import { timeAgo } from "@/utils/timeAgo";

interface Props {
  book: {
    coverImg: string;
    created: string;
    title: string;
    author: string;
  };
}

export default function BookCard({ book }: Props) {
  const { width } = Dimensions.get("window");
  const { coverImg, created, title, author, collectionName, id } = book;

  return (
    <ThemedView className="flex flex-row h-40 rounded-lg  p-3">
      <TouchableOpacity style={styles.imagePicker}>
        <View style={styles.placeholderContainer}>
          <Image
            source={{
              uri: `${BASE_DB_URL}/api/files/${collectionName}/${id}/${coverImg}`,
            }}
            style={{
              width: width / 3,
              height: "100%",
              resizeMode: "cover",
            }}
            resizeMode="cover"
            className="h-full rounded-s-lg"
          />
        </View>
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <ThemedText
          className="text-xl font-secondary-regular w-auto"
          numberOfLines={2} // Limits to one line
          ellipsizeMode="tail" // Adds '...' if text overflows
        >
          {title}
        </ThemedText>
        <ThemedText className="font-secondary-bold text-md">
          {author}
        </ThemedText>
        <ThemedText className="text-md mt-5 font-primary-regular">
          {timeAgo(created)}
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  imagePicker: {
    width: Dimensions.get("window").width / 3,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  placeholderContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  textContainer: {
    flex: 1, // Allow the text container to take up remaining space
    marginLeft: 12,
    justifyContent: "space-between",
  },
});
