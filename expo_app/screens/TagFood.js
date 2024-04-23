import { TouchableOpacity, Button, View, Image, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  Modal,
  TextInput,
} from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tag from "../assets/tag";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

function TagFood({ route, navigation }) {
  const { image } = route.params;
  const [visibleTag, setVisibleTag] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagInputText, setTagInputText] = useState("");
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const handleAddTag = () => {
    // Save the tag with coordinates
    const newTag = {
      text: tagInputText,
      x: x,
      y: y,
    };
    setTags([...tags, newTag]);
    // Close tag input modal or TextInput
    setVisibleTag(false);
    // Reset tag input text
    setTagInputText("");
    setX(0);
    setY(0);
  };

  const handleImagePress = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    setX(locationX);
    setY(locationY);
    setVisibleTag(true);
  };

  return (
    <>
      <SafeAreaView>
        <View
          style={{
            alignItems: "flex-end",
            paddingRight: 10,
            height: 38,
          }}
        >
          <Button
            title="Done"
            onPress={() =>
              navigation.navigate("TabNav", {
                screen: "Camera",
              })
            }
          />
        </View>
        <View>
          <Pressable onPress={handleImagePress}>
            <Image
              style={styles.image}
              source={{
                uri: image.uri,
              }}
            />
          </Pressable>
          <View
            style={{
              position: "absolute",
              bottom: 0,
              flexDirection: "row",
              height: "20%",
              backgroundColor: "white",
              width: "100%",
            }}
          >
            <Text>Hi</Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

export default TagFood;

const styles = StyleSheet.create({
  image: {
    alignItems: "center",
    resizeMode: "stretch",
    height: "100%",
    width: "100%",
  },
});
