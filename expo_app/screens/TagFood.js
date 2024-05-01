import * as React from "react";
import { TouchableOpacity, Button, View, Image, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  TextInput,
} from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

function TagFood({ route, navigation }) {
  const { image } = route.params;
  const [tags, setTags] = useState([]);
  const [tagInputText, setTagInputText] = useState("");
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [tagView, setTagView] = useState(false);
  const [text, onChangeText] = React.useState("#TODO");

  const handleAddTag = () => {
    // Save the tag with coordinates
    const newTag = {
      text: tagInputText,
      x: x,
      y: y,
    };
    setTags([...tags, newTag]);
  };

  const handleImagePress = (data) => {
    const { locationX, locationY } = data.nativeEvent;
    console.log(locationX, locationY);
    setX(locationX);
    setY(locationY);
    setTagView(true);
  };

  return (
    <>
      {!tagView && (
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
            <Pressable onPress={(data) => handleImagePress(data)}>
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
      )}
      {tagView && (
        <SafeAreaView>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              marginHorizontal: 20,
            }}
          >
            <Button title="Cancel" onPress={() => setTagView(false)}></Button>
            <Text
              style={{
                fontWeight: "bold",
                margin: "auto",
                textAlign: "center",
              }}
            >
              Edit Tags
            </Text>
            <Button title="#TODO DONE"></Button>
          </View>
          <View>
            <Text
              style={{
                textAlign: "center",
              }}
            >
              What did you Snaq on?
            </Text>
          </View>
          <TextInput
            style={{
              fontSize: "20",
              height: "33",
              margin: "auto",
              textAlign: "center",
              borderColor: "black",
              backgroundColor: "grey",
              borderRadius: "20",
            }}
            onChangeText={onChangeText}
            value={text}
          ></TextInput>
        </SafeAreaView>
      )}
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
