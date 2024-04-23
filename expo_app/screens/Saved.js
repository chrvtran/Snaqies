import { useState } from "react";
import {
  View,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  Image,
  TextInput,
  Button,
  Dimensions,
  Text,
} from "react-native";

export default function Saved() {
  const [tagInputVisible, setTagInputVisible] = useState(false);
  const [tagInputText, setTagInputText] = useState("");
  const [tags, setTags] = useState([]);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

  const handleImagePress = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    // Calculate position to center the modal on the screen
    const screenWidth = Dimensions.get("window").width;
    const screenHeight = Dimensions.get("window").height;
    const modalX = (screenWidth - 200) / 2; // Assuming modal width is 200
    const modalY = (screenHeight - 100) / 2; // Assuming modal height is 100
    setModalPosition({ x: modalX, y: modalY });
    // Show tag input modal or TextInput
    setTagInputVisible(true);
  };

  const handleAddTag = () => {
    // Save the tag with coordinates
    const newTag = {
      text: tagInputText,
      x: modalPosition.x,
      y: modalPosition.y,
    };
    setTags([...tags, newTag]);
    // Close tag input modal or TextInput
    setTagInputVisible(false);
    // Reset tag input text
    setTagInputText("");
  };

  return (
    <View>
      <TouchableOpacity onPress={handleImagePress}>
        <Image
          source={"https://via.placeholder.com/300.png"}
          style={{ width: "100%", height: 300 }}
        />
      </TouchableOpacity>

      {/* Tag input modal or TextInput */}
      <Modal visible={tagInputVisible} animationType="slide" transparent>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              width: 200,
              height: 100,
              backgroundColor: "white",
              borderRadius: 10,
            }}
          >
            <TextInput
              placeholder="Enter tag"
              value={tagInputText}
              onChangeText={setTagInputText}
            />
            <Button title="Add Tag" onPress={handleAddTag} />
          </View>
        </View>
      </Modal>

      {/* Render tags */}
      {tags.map((tag, index) => (
        <View
          key={index}
          style={{ position: "absolute", left: tag.x, top: tag.y }}
        >
          <Text>{tag.text}</Text>
        </View>
      ))}
    </View>
  );
}
