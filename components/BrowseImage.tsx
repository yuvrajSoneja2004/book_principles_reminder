import {
  View,
  Text,
  FlatList,
  ImageBackground,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { UNSPLASH_API } from "@/utils/unsplashApi";
import SafeAreaScreen from "@/utils/SafeAreaScreen";
import { Image } from "expo-image";
import LabeledInput from "./LabeledInput";

const DEBOUNCE_DELAY = 1000; // Delay in milliseconds

export default function BrowseImage() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState<string>("dog");
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(async () => {
      try {
        const response = await axios.get(UNSPLASH_API(searchQuery));
        setData(response?.data?.results || []);
      } catch (error) {
        console.log(error);
      }
    }, DEBOUNCE_DELAY);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [searchQuery]);

  return (
    <SafeAreaScreen>
      <LabeledInput
        label=""
        value={searchQuery}
        onChange={(text) => setSearchQuery(text)}
      />
      <ScrollView>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Image source={{ uri: item?.urls?.full }} style={styles.image} />
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
        />
      </ScrollView>
    </SafeAreaScreen>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    margin: 5,
  },
  columnWrapper: {
    justifyContent: "space-around",
  },
});
