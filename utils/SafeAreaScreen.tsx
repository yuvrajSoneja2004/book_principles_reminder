import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";


interface Props {
  children: React.ReactNode;
  givePadding?: boolean;
}
export default function SafeAreaScreen({
  children,
  givePadding = true,
}: Props) {
  return (
    <SafeAreaView style={{ width: "100%" }}>
      <View style={{ padding: givePadding ? 20 : 0, width: "100%" }}>
        {children}
      </View>
    </SafeAreaView>
  );
}
