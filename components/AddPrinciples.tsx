import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
import React, { useState } from "react";
import SafeAreaScreen from "@/utils/SafeAreaScreen";
import { ThemedText } from "./ThemedText";
import LabeledInput from "./LabeledInput";
import GlobalButton from "./GlobalButton";
import Entypo from "@expo/vector-icons/Entypo";
import { pb } from "@/db/pb";
import { router } from "expo-router";

interface Principle {
  title: string;
  description: string;
}

export default function AddPrinciples({ documentId }) {
  const [inputs, setInputs] = useState<Principle>({
    title: "",
    description: "",
  });

  const [principleCount, setPrincipleCount] = useState<number>(1);
  const [principlesList, setPrinciplesList] = useState<Principle[]>([]);

  const handleInputChange = (name: string, value: string) => {
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddMore = () => {
    // Check if both title and description are provided before adding
    if (inputs.title && inputs.description) {
      // Add the current inputs to the principles list
      setPrinciplesList((prevList) => [
        ...prevList,
        { title: inputs.title, description: inputs.description },
      ]);

      // Increment principle count
      setPrincipleCount(principleCount + 1);

      // Clear the inputs
      setInputs({
        title: "",
        description: "",
      });
    } else {
      alert("Please fill out both the title and description.");
    }
  };

  const handleSavePrinciples = async () => {
    try {
      // const formData = new FormData();
      // formData.append("principles", principlesList);
      const createdBook = await pb
        .collection("Books")
        .update(documentId, { principles: principlesList });
      console.log("Book added:", createdBook);
      Alert.alert("Success", "Book added successfully!");
      router.push("..");
    } catch (error) {
      console.log(error);
      Alert.alert(error?.message);
    }
  };
  return (
    <SafeAreaScreen>
      <View className="w-full p-3">
        <ThemedText className="text-white font-primary-regular text-4xl mb-4">
          Principle {principleCount}
        </ThemedText>

        <LabeledInput
          label="Title"
          value={inputs.title}
          onChangeText={(value) => handleInputChange("title", value)}
          placeholder="Title of the principle"
          keyboardType="default"
        />

        <LabeledInput
          label="Description"
          value={inputs.description}
          onChangeText={(value) => handleInputChange("description", value)}
          placeholder="Description about principle"
          keyboardType="default"
          isTextArea={true}
        />

        <GlobalButton
          title="Add More"
          icon={
            <Entypo
              name="plus"
              size={24}
              color="#fff"
              style={{ marginRight: 10 }}
            />
          }
          onPress={handleAddMore}
          onLongPress={handleSavePrinciples}
          styles="mt-4"
        />

        {principlesList.length > 0 && (
          <View className="mt-5">
            <ThemedText className="text-white font-primary-regular text-2xl mb-2">
              Added Principles
            </ThemedText>
            <ScrollView
              style={{ maxHeight: 300 }} // Set a maximum height for the scrollable area
              contentContainerStyle={{ paddingBottom: 10 }}
            >
              {principlesList.map((principle, index) => (
                <View key={index} className="mb-2">
                  <Text className="text-lg text-white">
                    Title: {principle.title}
                  </Text>
                  <Text className="text-md text-white">
                    Description: {principle.description}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    </SafeAreaScreen>
  );
}
