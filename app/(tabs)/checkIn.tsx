import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ToastAndroid,
  Text,
} from "react-native";
import { pb } from "@/db/pb";
import SafeAreaScreen from "@/utils/SafeAreaScreen";
import { ThemedText } from "@/components/ThemedText";
import { Checkbox } from "expo-checkbox";
import { Audio } from "expo-av";
import { shuffleArray } from "@/utils/shuffleArray";
import { getRandomInt } from "@/utils/randomInt";
import Modal from "@/components/Modal";
import GlobalButton from "@/components/GlobalButton";
import { Image } from "expo-image";
import { AntDesign } from "@expo/vector-icons";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function CheckIn() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [challenges, setChallenges] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [checkedCount, setCheckedCount] = useState(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [checkBorderColor, setCheckBorderColor] = useState("red");
  const [sound, setSound] = useState();

  const STAR_ICON_SIZE = 100;

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sounds/notification/default.wav")
    );

    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  const fetchChallenges = async () => {
    try {
      const res = await pb.collection("Challanges").getList(0, 3);
      setChallenges(res.items);

      const allCategories = res.items.flatMap(
        (item) => item.categoriesIncluded
      );
      const uniqueCategories = [...new Set(allCategories)];

      if (uniqueCategories.length > 0) {
        const categoryResults = [];

        for (const category of uniqueCategories) {
          const result = await fetchCategoryData(category);
          if (result) {
            // Take only up to 3 items from each category
            console.log(
              "That's how we do it.",
              ...result[0].principles?.slice(0, 3)
            );
            categoryResults.push(...result[0].principles?.slice(0, 3));
          }
          await delay(0);
        }
        const principles = categoryResults
          .flatMap((item) => item)
          .filter((item) => item != null);

        setCategoryData(principles);

        // Initialize checked state for each principle using title as key
        const initialCheckedState = principles.reduce((acc, principle) => {
          acc[principle.title] = false;
          return acc;
        }, {});
        setCheckedItems(initialCheckedState);
      }
    } catch (error) {
      console.error("Error fetching challenges:", error);
    }
  };
  const handleSaveProgress = () => {
    // alert("Congrats! Successfully completed today's tasks.");
    setShowModal(true);

    playSound();
  };
  const handleThreeChecked = useCallback(() => {
    console.log("At least three items are checked!");
    // Add your function call here
    handleSaveProgress();
  }, []);
  const fetchCategoryData = async (category) => {
    try {
      console.log(`Fetching data for category: ${category}`);
      const categoryRecord = await pb
        .collection("Books")
        .getList(0, 2, { filter: `type = '${category}'` });
      // console.log(`Fetched data for ${category}:`, categoryRecord);/
      return categoryRecord.items;
      // return shuffleArray(categoryRecord);
    } catch (error) {
      console.error(`Error fetching category data for ${category}:`, error);
      return null;
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, [refreshTrigger]);

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const toggleCheckbox = (title) => {
    setCheckedItems((prevState) => {
      const newState = {
        ...prevState,
        [title]: !prevState[title],
      };

      const newCount = Object.values(newState).filter(Boolean).length;
      console.log(newCount);
      setCheckedCount(newCount);

      if (newCount >= 3) {
        handleThreeChecked();
      }

      if (newState[title]) {
        // Item was checked
        const checksLeft = Math.max(3 - newCount, 0);
        if (checksLeft > 0) {
          ToastAndroid.show(
            `${checksLeft} check${checksLeft !== 1 ? "s" : ""} left`,
            ToastAndroid.SHORT
          );
        } else {
          ToastAndroid.show("All checks complete!", ToastAndroid.SHORT);
          setCheckBorderColor("green");
        }
      }

      return newState;
    });
  };
  const renderCategoryItem = ({ item }) => {
    // console.log("Bhoolte", item);
    return (
      <TouchableOpacity
        key={item.title}
        onPress={() => toggleCheckbox(item.title)}
        className="flex justify-start flex-row items-center my-2 "
        style={{
          borderStyle: "solid",
          borderWidth: 1,
          borderColor: checkBorderColor,
          padding: 13,
        }}
      >
        <ThemedText style={{ flex: 1 }}>{item.title}</ThemedText>
        <Checkbox
          value={checkedItems[item.title]}
          onValueChange={() => toggleCheckbox(item.title)}
          color="#bf9b30"
        />
      </TouchableOpacity>
    );
  };
  // const renderCategoryItem = ({ item }) => {
  //   console.log("Bhoolte", item);
  //   return (
  //     <View style={styles.item}>
  //       <View style={styles.checkboxContainer}>
  //         <Checkbox
  //           value={checkedItems[item.title]}
  //           onValueChange={() => toggleCheckbox(item.title)}
  //         />
  //         <View style={styles.textContainer}>
  //           <ThemedText style={styles.title}>{item.title}</ThemedText>
  //           <ThemedText>{item.description}</ThemedText>
  //         </View>
  //       </View>
  //     </View>
  //   );
  // };
  // !lllllllllllllllllllllllllll
  // <TouchableOpacity
  //   key={item.title}
  //   onPress={() => toggleCheckbox(item.title)}
  //   className="flex justify-start flex-row items-center my-2"
  //   style={{
  //     borderStyle: "solid",
  //     borderWidth: 1,
  //     borderColor: "gray",
  //     padding: 13,
  //   }}
  // >
  //   <ThemedText style={{ flex: 1 }}>{item.title}</ThemedText>
  //   <Checkbox
  //     value={checkedItems[item.title]}
  //     onValueChange={() => toggleCheckbox(item.title)}
  //     color="#bf9b30"
  //   />
  // </TouchableOpacity>;
  // !lllllllllllllllllllllllllllllll

  return (
    <SafeAreaScreen>
      <TouchableOpacity
        onPress={() => {
          setRefreshTrigger((prev) => prev + 1);
          console.log("Reloading...");
        }}
        style={styles.button}
      >
        <ThemedText>Reload</ThemedText>
      </TouchableOpacity>
      <FlatList
        data={categoryData}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.title}
        style={styles.list}
      />
      <Modal isOpen={showModal}>
        <View className=" w-full h-full flex justify-center items-center">
          <TouchableOpacity
            className="flex justify-end items-end w-full"
            onPress={() => setShowModal(false)}
          >
            <AntDesign name="close" color={"#fff"} size={20} />
          </TouchableOpacity>
          <Image
            source={require("../../assets/images/tasks-completed.png")}
            style={{ width: STAR_ICON_SIZE, height: STAR_ICON_SIZE }}
          />
          <Text className="text-2xl text-white font-primary-regular text-center py-2">
            Today's Challanges Completed!
          </Text>
          <GlobalButton title="Check Stats" styles="mt-3 px-12 rounded-md" />
        </View>
      </Modal>
    </SafeAreaScreen>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
    marginBottom: 10,
  },
  list: {},
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
