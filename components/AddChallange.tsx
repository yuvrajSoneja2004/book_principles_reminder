import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import SafeAreaScreen from "@/utils/SafeAreaScreen";
import LabeledInput from "./LabeledInput";
import { ThemedText } from "./ThemedText";
import { BASE_DB_URL, pb } from "@/db/pb";
import { Image } from "expo-image";
import { ThemedView } from "./ThemedView";
import Checkbox from "expo-checkbox";

export default function AddChallange() {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchInfo = () => {
    setIsLoading(true);
    pb.collection("Categories")
      .getList()
      .then((res) => {
        console.log(res.items[0].collectionId);
        setCategories(res.items);
        // Initialize selectedCategories with all items set to false
        const initialSelected = res.items.reduce((acc, item) => {
          acc[item.id] = false;
          return acc;
        }, {});
        setSelectedCategories(initialSelected);
      })
      .catch((er) => {
        console.error("Error fetching categories:", er);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleCheckboxChange(item.id)}
      className="flex justify-start flex-row items-center my-2"
      style={{
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "gray",
        padding: 13,
      }}
    >
      <Image
        source={{
          uri: `${BASE_DB_URL}/api/files/${item.collectionName}/${item.id}/${item.iconURI}`,
        }}
        style={{ width: 30, height: 30, marginRight: 10 }}
      />
      <ThemedText style={{ flex: 1 }}>{item.title}</ThemedText>
      <Checkbox
        value={selectedCategories[item.id]}
        onValueChange={() => handleCheckboxChange(item.id)}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaScreen givePadding>
      <LabeledInput
        label="Enter name of the challenge"
        placeholder="Enter here."
      />
      <ThemedText>Select Categories</ThemedText>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {isLoading ? (
          <ThemedText>Loading categories...</ThemedText>
        ) : (
          <FlatList
            data={categories}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={1}
            scrollEnabled={false}
          />
        )}
      </ScrollView>
      <ThemedText>Selected Categories:</ThemedText>
      {/* {Object.entries(selectedCategories).map(
        ([id, isSelected]) =>
          isSelected && (
            <ThemedText key={id}>
              {categories.find((cat) => cat.id === id)?.title}
            </ThemedText>
          )
      )} */}
    </SafeAreaScreen>
  );
}
