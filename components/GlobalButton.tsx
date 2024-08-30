import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import { ThemedText } from "./ThemedText";

interface Props {
  title: string;
  onPress: () => void;
  icon?: React.ReactNode;
  onLongPress?: () => void;
  isLoading?: boolean;
  styles?: string;
}
export default function GlobalButton({
  title = "Insert Title",
  onPress,
  icon,
  onLongPress,
  isLoading,
  styles,
}: Props) {
  return (
    <TouchableOpacity
      className={`bg-[#bf9b30] px-3 inline py-3 flex-row ${styles && styles}`}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      {icon && icon}
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ThemedText className="font-primary-regular">{title}</ThemedText>
      )}
    </TouchableOpacity>
  );
}
