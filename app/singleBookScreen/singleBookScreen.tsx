import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import SafeAreaScreen from "@/utils/SafeAreaScreen";
import { useLocalSearchParams } from "expo-router";
import { pb } from "@/db/pb";
import { ThemedText } from "@/components/ThemedText";
import GlobalButton from "@/components/GlobalButton";
import { AntDesign } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function SingleBookScreen() {
  const { bookId } = useLocalSearchParams();
  const [bookInfo, setBookInfo] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const getData = async () => {
    try {
      const res = await pb
        .collection("Books")
        .getList(0, 5, { filter: `id = '${bookId}'` });
      console.log(res.items[0]?.principles);
      setBookInfo(res.items[0]?.principles);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < bookInfo.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  return (
    <SafeAreaScreen givePadding={false}>
      <View style={styles.container}>
        <GlobalButton
          title=""
          onPress={goToPrevious}
          icon={<AntDesign name="leftcircleo" size={24} color="black" />}
        />

        <View style={styles.contentContainer}>
          {bookInfo.length > 0 && (
            <>
              <ThemedText style={styles.title} className="text-white text-2xl">
                {currentIndex + 1}. {bookInfo[currentIndex].title}
              </ThemedText>
              <ThemedText
                style={styles.description}
                numberOfLines={6}
                ellipsizeMode="tail"
              >
                {bookInfo[currentIndex].description}
              </ThemedText>
            </>
          )}
        </View>

        <GlobalButton
          title=""
          onPress={goToNext}
          icon={<AntDesign name="rightcircleo" size={24} color="black" />}
        />
      </View>
    </SafeAreaScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start", // Center content vertically
    paddingHorizontal: 5, // Add horizontal padding for spacing
  },
  title: {
    fontSize: 32, // Adjusted size
    marginBottom: 10,
    color: "#fff",
    fontFamily: "PrimaryFont",
    textAlign: "center", // Center title text
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#fff",
    fontFamily: "SecondaryFont",
    flexWrap: "wrap", // Ensure text wraps
    paddingHorizontal: 10, // Add padding for better readability
  },
});
