import { View, Text, Dimensions, StyleSheet, Platform } from "react-native";
import Skeleton from "@hamidfzm/react-native-skeleton-loader";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";

const { width } = Dimensions.get("window");
const itemWidth = width / 2 - 15; // Subtracting for margins
export default function CategoryCardLoader() {
  return (
    <>
      <Skeleton loading color={Colors.dark.background}>
        <View className="w-full justify-center items-center">
          <View style={{ height: 100, width: itemWidth }}></View>
        </View>
      </Skeleton>
    </>
  );
}
