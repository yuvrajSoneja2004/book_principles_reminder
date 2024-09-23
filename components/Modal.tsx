import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { ReactNode } from "react";
import { Modal as RNModal } from "react-native";
import SafeAreaScreen from "@/utils/SafeAreaScreen";
import { Colors } from "@/constants/Colors";

type ModalProps = {
  isOpen: boolean;
  children: ReactNode;
};

export default function Modal(props: ModalProps) {
  const { isOpen, children } = props;
  return (
    <RNModal
      visible={isOpen}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <SafeAreaScreen>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>{children}</View>
        </View>
      </SafeAreaScreen>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    // flex: 1,
    height: "100%",
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dim background
  },
  modalContent: {
    width: "80%", // Adjust width as necessary
    minHeight: "40%", // Ensure the modal has enough height
    padding: 20,
    backgroundColor: Colors.dark.background,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
  },
});
