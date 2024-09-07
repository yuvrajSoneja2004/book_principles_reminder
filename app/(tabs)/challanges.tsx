import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import SafeAreaScreen from "@/utils/SafeAreaScreen";
import GlobalButton from "@/components/GlobalButton";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import AddChallange from "@/components/AddChallange";
import { pb } from "@/db/pb";
import ChallangeCard from "@/components/ChallangeCard";

export default function Challanges() {
  const [showAddChallangeComp, setAddChallangeComp] = useState<boolean>(false);
  const [challanges, setChallanges] = useState([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const fetchInfo = () => {
    pb.collection("Challanges")
      .getList()
      .then((res) => {
        console.log(res.items);
        setChallanges(res.items);
      })
      .catch((er) => {
        console.error("Error fetching categories:", er);
      })
      .finally(() => setRefreshing(false));
  };
  useEffect(() => {
    fetchInfo();
  }, []);

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
        styles="mb-3"
      />
      {challanges.map((challange, _) => {
        return <ChallangeCard {...challange} />;
      })}
    </SafeAreaScreen>
  );
}
