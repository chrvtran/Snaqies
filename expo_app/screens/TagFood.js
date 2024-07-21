import * as React from "react";
import {
  TouchableOpacity,
  Button,
  View,
  Image,
  Text,
  PlatformColor,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  TextInput,
} from "react-native";
import CloseIcon from "../assets/icons/close.svg";
import { useState } from "react";

//#TODO Styling
function TagFood({ route, navigation }) {
  //Recieve selected image
  const { image } = route.params;

  //tag object list
  const [tags, setTags] = useState([]);

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  //checks input
  const [tagView, setTagView] = useState(false);

  //for Tagview searchbar
  const [text, onChangeText] = useState("");

  const handleAddTag = () => {
    //check empty tagHandle
    if (text === "") {
      setTagView(false);
      return;
    } else {
      // Save the tag with coordinates
      const newTag = {
        foodHandle: text,
        x: x,
        y: y,
      };
      setTags([...tags, newTag]);
      onChangeText("");
      setTagView(false);
    }
  };

  //Grab coords && open tagview
  const handleImagePress = (data) => {
    const { locationX, locationY } = data.nativeEvent;
    setX(locationX);
    setY(locationY);
    setTagView(true);
  };

  //Removes tags from TagList
  const handleRemoveTag = (index) => {
    const tagsCopy = [...tags];
    tagsCopy.splice(index, 1);
    setTags(tagsCopy);
  }

  //Saves Tags onto Async storage
  const saveTags = async (uri) => {
    if(!tags.length) { return; }
    try {
      const jsonTags = JSON.stringify(tags);
      await AsyncStorage.setItem(uri, jsonTags);
    } catch (e) {

    }
  }
  
  //Retrieves the Saved Tags
  const getData = async () => {
    try {
      const jsonStoredTags = await AsyncStorage.getItem(image.uri);
      storedTags = jsonStoredTags != null ? JSON.parse(jsonStoredTags) : null;
      if (storedTags !== null) {
        // value previously stored
        setTags(storedTags);
      }
    } catch (e) {
      // error reading value
    }
  }

  React.useEffect(() => {
    getData();
  }, []);

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
          {/* Top Right Done Button */}
            <Button
              title="Done"
              onPress={() => 
                saveTags(image.uri) &&
                navigation.navigate("TabNav", {
                  screen: "Camera",
                })
              }
            />
          </View>
          {/* Pressable Image to Place Tags */}
          <View>
            <Pressable onPress={(data) => handleImagePress(data)}>
              <Image
                style={styles.image}
                source={{
                  uri: image.uri,
                }}
              />
            </Pressable>
            {tags.map((tag, index) => ( 
              <View key={index} style={{
                position: "absolute",
                width: "auto",
                left: tag.x,
                top: tag.y
              }}>
                <View style={{
                  width: 0,
                  height: 0,
                  backgroundColor: "transparent",
                  borderStyle: "solid",
                  borderLeftWidth: 10,
                  borderRightWidth: 10,
                  borderBottomWidth: 10,
                  borderLeftColor: "transparent",
                  borderRightColor: "transparent",
                  borderBottomColor: "#D9D9D9",
                  top: 16,
                  alignSelf: "center"
                }}>
                </View>
                <View style={{
                  height: 30,
                  borderRadius: "10.98",
                  backgroundColor: "#D9D9D9",
                  top: "30%",
                }}> 
                  <Text style={{
                    fontSize: "19.2",
                    color: "#737373",
                    fontWeight: "400",
                    top:"10%",
                  }}>
                  {tag.foodHandle}      
                  <View style={styles.closeIcon}>
                    <TouchableOpacity onPress={() => handleRemoveTag(index)}>
                      <CloseIcon/>
                    </TouchableOpacity>
                  </View>
                  </Text>
                </View> 
              </View>
            ))}
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
            <Button title="DONE" onPress={handleAddTag}></Button>
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
          <View style={{
            flexDirection: "row",
            alignSelf: "center"
          }}>
            <TextInput
              style={{
                fontSize: "20",
                height: "33",
                width: "80%",
                margin: "auto",
                textAlign: "center",
                borderColor: "black",
                backgroundColor: "lightgrey",
                borderRadius: "25",
              }}
              onChangeText={onChangeText}
              autoFocus={true}
              value={text}>
            </TextInput>
            {/* Added a Clear Button for TextBox */}
            <TouchableOpacity onPress={() => onChangeText('')} style={{
                  height: 20,
                  width: 20,
                  top: 2,
                  right: 24
              }}>
              <CloseIcon/>
            </TouchableOpacity>
          </View>
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
  closeIcon: {
    height: 20,
    width: 20,
  },
});
