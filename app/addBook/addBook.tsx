import {
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState } from "react";
import SafeAreaScreen from "@/utils/SafeAreaScreen";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import LabeledInput from "@/components/LabeledInput";
import * as ImagePicker from "expo-image-picker";
import Entypo from "@expo/vector-icons/Entypo";
import AddPrinciples from "@/components/AddPrinciples";
import { pb } from "@/db/pb";
import { useLocalSearchParams } from "expo-router";

export default function AddBook() {
  const { booksType } = useLocalSearchParams();
  const { width } = Dimensions.get("window");

  const [bookDetails, setBookDetails] = useState({
    title: "",
    author: "",
    source: "",
    coverImage: "", // State to store the selected image URI
  });
  const [allowPrinciplesEditing, setAllowPrinciplesEditing] =
    useState<boolean>(false);

  const handleInputChange = (name: string, value: string) => {
    setBookDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setBookDetails((prevState) => ({
        ...prevState,
        coverImage: result.assets[0].uri,
      }));
    }
  };

  const handleBookSave = async () => {
    try {
      const formData = new FormData();
      formData.append("title", bookDetails.title);
      formData.append("author", bookDetails.author);
      formData.append("readLearnedFrom", bookDetails.source);
      formData.append("type", booksType);

      if (bookDetails.coverImage) {
        const imageUri = bookDetails.coverImage;
        const filename = imageUri.split("/").pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;

        formData.append("coverImg", {
          uri: imageUri,
          name: filename,
          type,
        });
      }

      const createdBook = await pb.collection("Books").create(formData);
      console.log("Book added:", createdBook);
      Alert.alert("Success", "Book added successfully!");
      setAllowPrinciplesEditing(true);
    } catch (error) {
      console.error("Error adding book:", error);
      Alert.alert("Error", "Failed to add book. Please try again.");
    }
  };

  if (allowPrinciplesEditing) return <AddPrinciples />;

  return (
    <SafeAreaScreen>
      <ThemedText className="text-3xl">Preview</ThemedText>
      <ThemedView className="flex flex-row h-40 rounded-lg">
        <TouchableOpacity onPress={handleImagePick} style={styles.imagePicker}>
          {bookDetails.coverImage ? (
            <Image
              source={{ uri: bookDetails.coverImage }}
              style={{
                width: width / 3,
                height: "100%",
              }}
              resizeMode="cover"
              className="h-full rounded-s-lg"
            />
          ) : (
            <View style={styles.placeholderContainer}>
              <Entypo name="camera" size={32} color="black" />
              <ThemedText className="text-md mt-2 text-black">
                Select cover
              </ThemedText>
            </View>
          )}
        </TouchableOpacity>
        <View className="ml-3">
          <ThemedText className="text-2xl">{bookDetails.title}</ThemedText>
          <ThemedText className="text-lg">{bookDetails.author}</ThemedText>
          <ThemedText className="text-md">4 days ago</ThemedText>
        </View>
      </ThemedView>
      <LabeledInput
        label="Title"
        value={bookDetails.title}
        onChangeText={(value) => handleInputChange("title", value)}
        placeholder="Enter the title"
        keyboardType="default"
      />
      <LabeledInput
        label="Author"
        value={bookDetails.author}
        onChangeText={(value) => handleInputChange("author", value)}
        placeholder="Enter the author"
        keyboardType="default"
      />
      <LabeledInput
        label="Read/Learned from"
        value={bookDetails.source}
        onChangeText={(value) => handleInputChange("source", value)}
        placeholder="Enter where you read/learned from"
        keyboardType="default"
      />
      <View className="flex justify-end items-end">
        <TouchableOpacity className="p-2 bg-red-300" onPress={handleBookSave}>
          <ThemedText>Next</ThemedText>
        </TouchableOpacity>
      </View>
    </SafeAreaScreen>
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
});
