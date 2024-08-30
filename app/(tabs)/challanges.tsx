import { View, Text } from "react-native";
import React, { useState } from "react";
import SafeAreaScreen from "@/utils/SafeAreaScreen";
import GlobalButton from "@/components/GlobalButton";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import AddChallange from "@/components/AddChallange";

export default function Challanges() {
  const [showAddChallangeComp, setAddChallangeComp] = useState<boolean>(false);

  if (showAddChallangeComp) return <AddChallange />;
  return (
    <SafeAreaScreen>
      <GlobalButton
        title="Create Challange"
        onPress={() => setAddChallangeComp(true)}
        icon={
          <Ionicons
            name="add"
            size={24}
            color="#fff"
            style={{ paddingRight: 20 }}
          />
        }
      />
      <View className="h-full w-full flex justify-center items-center">
        <Ionicons name="sad-outline" size={84} color="#fff" />
        <ThemedText className="mt-4">No challanges as of now.</ThemedText>
      </View>
    </SafeAreaScreen>
  );
}
