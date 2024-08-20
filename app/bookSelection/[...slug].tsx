import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import SafeAreaScreen from "@/utils/SafeAreaScreen";
import BookCard from "@/components/BookCard";

const { width, height } = Dimensions.get("window");

export default function BookSelection() {
  const { slug } = useLocalSearchParams();

  return (
    <SafeAreaScreen>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text className="text-white" style={styles.headerText}>
          Books containing {slug[1]} principles.
        </Text>
        <BookCard />
        {/* Add more content here as needed */}
      </ScrollView>
      <TouchableOpacity
        style={styles.fixedButton}
        onPress={() => console.log("Fixed button pressed")}
      >
        <Link
          style={styles.fixedButtonText}
          href={{
            pathname: "/addBook/addBook",
            params: { booksType: slug[0] },
          }}
        >
          +
        </Link>
      </TouchableOpacity>
    </SafeAreaScreen>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingBottom: 100, // Add padding to avoid content being hidden behind the button
  },
  headerText: {
    fontSize: 30,
    marginBottom: 20,
  },
  fixedButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#007AFF",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  fixedButtonText: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
  },
});
