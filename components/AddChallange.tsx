import React, { useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity, ToastAndroid } from "react-native";
import SafeAreaScreen from "@/utils/SafeAreaScreen";
import LabeledInput from "./LabeledInput";
import { ThemedText } from "./ThemedText";
import { BASE_DB_URL, pb } from "@/db/pb";
import { Image } from "expo-image";
import Checkbox from "expo-checkbox";
import GlobalButton from "./GlobalButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";

// Define types for the form inputs and category item
type FormInputs = {
  challengeName: string;
  challengeDesc: string;
  challengeReward: string;
  challengeDays: string;
  reminderTime: Date;
};

type CategoryItem = {
  id: string;
  collectionName: string;
  iconURI: string;
  title: string;
  type: string;
};

export default function AddChallenge() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<
    Record<string, boolean>
  >({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isBeingSubmitted, setIsBeingSubmitted] = useState<boolean>(false);
  const [formInputs, setFormInputs] = useState<FormInputs>({
    challengeName: "",
    challengeDesc: "",
    challengeReward: "",
    challengeDays: "",
    reminderTime: new Date(),
  });
  const [showDateModel, setShowModel] = useState<boolean>(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormInputs | "categories", string>>
  >({});

  // TODO: Make the following fetch function a reusable utility function.
  const fetchInfo = () => {
    setIsLoading(true);
    pb.collection("Categories")
      .getList<CategoryItem>() // Specify the expected type for the API response
      .then((res) => {
        setCategories(res.items);
        const initialSelected: Record<string, boolean> = res.items.reduce(
          (acc, item) => {
            acc[item.type] = false;
            return acc;
          },
          {} as Record<string, boolean>
        );
        setSelectedCategories(initialSelected);
      })
      .catch((er) => {
        console.error("Error fetching categories:", er);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  // Use a generic type parameter to ensure type safety
  const handleInputChange = <T extends keyof FormInputs>(
    name: T,
    value: FormInputs[T]
  ) => {
    setFormInputs((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCheckboxChange = (id: string) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const validateForm = (): boolean => {
    let newErrors: Partial<Record<keyof FormInputs | "categories", string>> =
      {};
    if (!formInputs.challengeName.trim()) {
      newErrors.challengeName = "Challenge name is required";
    }
    if (!formInputs.challengeDesc.trim()) {
      newErrors.challengeDesc = "Challenge description is required";
    }
    if (
      !formInputs.challengeDays ||
      isNaN(Number(formInputs.challengeDays)) ||
      parseInt(formInputs.challengeDays) < 1
    ) {
      newErrors.challengeDays = "Please enter a valid number of days";
    }
    if (Object.values(selectedCategories).filter(Boolean).length === 0) {
      newErrors.categories = "Please select at least one category";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // TODO: Make this save function a utility reusable function
  const handleSave = async () => {
    if (!validateForm()) {
      ToastAndroid.show(
        "Please correct the errors in the form",
        ToastAndroid.SHORT
      );
      return;
    }

    setIsBeingSubmitted(true);
    try {
      const formData = new FormData();
      formData.append("title", formInputs.challengeName);
      formData.append("goalInDays", formInputs.challengeDays);
      formData.append("reminderTime", formInputs.reminderTime.toISOString());
      formData.append(
        "categoriesIncluded",
        JSON.stringify(
          Object.keys(selectedCategories).filter(
            (key) => selectedCategories[key]
          )
        )
      );
      formData.append("challangeReward", formInputs.challengeReward);
      formData.append("challangeDescription", formInputs.challengeDesc);

      await pb.collection("Challanges").create(formData);

      ToastAndroid.show("Challenge saved successfully", ToastAndroid.SHORT);
      // Optionally, reset form or navigate away
      router.replace("/(tabs)/challanges");
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        ToastAndroid.show(error.message, ToastAndroid.LONG);
      }
    } finally {
      setIsBeingSubmitted(false);
    }
  };

  const renderCategory = (item: CategoryItem) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => handleCheckboxChange(item.type)}
      className="flex justify-start flex-row items-center my-2"
      style={{
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "gray",
        padding: 13,
      }}
    >
      <Image
        source={{
          uri: `${BASE_DB_URL}/api/files/${item.collectionName}/${item.id}/${item.iconURI}`,
        }}
        style={{ width: 30, height: 30, marginRight: 10 }}
      />
      <ThemedText style={{ flex: 1 }}>{item.title}</ThemedText>
      <Checkbox
        value={selectedCategories[item.type]}
        onValueChange={() => handleCheckboxChange(item.type)}
        color="#bf9b30"
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaScreen givePadding>
      <ScrollView>
        <LabeledInput
          label="Enter name of the challenge"
          placeholder="Enter here."
          onChangeText={(text) => handleInputChange("challengeName", text)}
          value={formInputs.challengeName}
          error={errors.challengeName}
        />
        <LabeledInput
          label="Enter description"
          placeholder="Enter here."
          onChangeText={(text) => handleInputChange("challengeDesc", text)}
          value={formInputs.challengeDesc}
          error={errors.challengeDesc}
        />
        <LabeledInput
          label="Enter Days Target"
          placeholder="Enter here."
          onChangeText={(text) => handleInputChange("challengeDays", text)}
          value={formInputs.challengeDays}
          keyboardType="numeric"
          error={errors.challengeDays}
        />
        <LabeledInput
          label="Enter Reward (optional)"
          placeholder="Enter here."
          onChangeText={(text) => handleInputChange("challengeReward", text)}
          value={formInputs.challengeReward}
        />
        <View>
          <ThemedText>Set Reminder Time</ThemedText>
          {showDateModel && (
            <DateTimePicker
              value={formInputs.reminderTime || new Date()}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={(event: any, selectedDate?: Date) => {
                setShowModel(false); // Close the modal
                if (selectedDate) {
                  handleInputChange("reminderTime", selectedDate); // Update state with selected date
                }
              }}
            />
          )}

          <TouchableOpacity onPress={() => setShowModel(!showDateModel)}>
            <ThemedText>
              {formInputs.reminderTime
                ? formInputs.reminderTime.toLocaleString()
                : new Date().toLocaleString()}
            </ThemedText>
          </TouchableOpacity>
        </View>
        <ThemedText className="mt-3">Select Categories</ThemedText>
        {isLoading ? (
          <ThemedText>Loading categories...</ThemedText>
        ) : (
          <View>
            {categories.map((item) => renderCategory(item))}
            {errors.categories && (
              <ThemedText style={{ color: "red" }}>
                {errors.categories}
              </ThemedText>
            )}
            <GlobalButton
              title="Save"
              isLoading={isBeingSubmitted}
              onPress={handleSave}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaScreen>
  );
}
