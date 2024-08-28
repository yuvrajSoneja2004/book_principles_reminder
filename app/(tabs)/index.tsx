import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Platform,
  FlatList,
  ScrollView,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BASE_DB_URL, pb } from "@/db/pb";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";
import Register from "../(auth)/register";

const { width } = Dimensions.get("window");
const itemWidth = width / 2 - 15; // Subtracting for margins

export default function HomeScreen() {
  const [categories, setCategories] = useState([]);
  const [lol, setLol] = useState(0);
  const [refreshing, setRefreshing] = React.useState(false);

  // TODO: Turn the below code to recusable 'useFetch' custom hook.
  const fetchInfo = () => {
    pb.collection("Categories")
      .getList()
      .then((res) => {
        console.log(res.items[0].collectionId);
        setCategories(res.items);
      })
      .catch((er) => {
        console.error("Error fetching categories:", er);
      })
      .finally(() => setRefreshing(false));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchInfo();
  }, []);

  useEffect(() => {
    // Fetch Categories data from the db.
    fetchInfo();
  }, [lol]);

  const renderItem = ({ item }) => (
    <Link href={`/bookSelection/${item.type}/${item.title}`} className="m-2">
      <ThemedView style={styles.itemContainer}>
        <Image
          source={{
            uri: `${BASE_DB_URL}/api/files/${item.collectionName}/${item.id}/${item.iconURI}`,
          }}
          style={styles.icon}
        />
        <ThemedText style={styles.title}>{item.title}</ThemedText>
      </ThemedView>
    </Link>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text className="text-white font-primary-regular text-4xl px-4 py-4">
        Hi {pb.authStore?.baseModel?.username || "User"}.
      </Text>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <FlatList
          data={categories}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          scrollEnabled={false}
        />
      </ScrollView>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => console.log("Add pressed")}
      >
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 80, // Add some bottom padding to avoid overlap with the Add button
  },
  row: {
    flex: 1,
    justifyContent: "space-around",
  },
  itemContainer: {
    width: itemWidth,
    alignItems: "center",
    margin: 5,
    padding: 10,
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#007AFF",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
