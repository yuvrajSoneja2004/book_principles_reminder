import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";
import { ThemedText } from "./ThemedText";

interface LabeledInputProps extends TextInputProps {
  label: string;
  isTextArea?: boolean;
}

const LabeledInput: React.FC<LabeledInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  isTextArea,
  ...rest
}) => {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.label}>{label}</ThemedText>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        multiline={isTextArea}
        {...rest}
        className={`${
          isTextArea && "h-32 justify-start items-start flex align-top"
        }`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    fontFamily: "PrimaryFont",
    letterSpacing: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
    backgroundColor: "#fff",
    fontFamily: "SecondaryFont",
    letterSpacing: 0.2,
  },
});

export default LabeledInput;
