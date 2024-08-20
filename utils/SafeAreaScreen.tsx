import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SafeAreaScreen({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SafeAreaView style={{ width: "100%" }}>
      <View style={{ padding: 10, width: "100%" }}>{children}</View>
    </SafeAreaView>
  );
}
