import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import SafeAreaScreen from "@/utils/SafeAreaScreen";
import BookCard from "@/components/BookCard";
import { pb } from "@/db/pb";
import { RecordModel } from "pocketbase";

export default function BookSelection() {
  const { slug } = useLocalSearchParams();
  const [books, setBooks] = useState<RecordModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { height } = Dimensions.get("window");

  useEffect(() => {
    // Fetch Books data from the db.
    pb.collection("Books")
      .getList(1, 50, {
        filter: `type = '${slug[0]}'`,
      })
      .then((res) => {
        console.log(res.items);

        setBooks(res.items);
      })
      .catch((er) => {
        console.error(er.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return (
    <SafeAreaScreen>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text className="text-white" style={styles.headerText}>
          Books containing {slug[1]} principles.
        </Text>

        {books.length === 0 && !isLoading ? (
          <Text className="text-white">Jagan :C</Text>
        ) : isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color={"#fff"} size={50} />
          </View>
        ) : (
          books?.map((book, i) => {
            return <BookCard key={i} book={book} />;
          })
        )}
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
    paddingHorizontal: 7,
  },
  headerText: {
    fontSize: 30,
    marginBottom: 20,
    fontFamily: "PrimaryFont",
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
  loadingContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // semi-transparent background
  },
});
