import * as React from "react";
import {
  TouchableOpacity,
  Button,
  View,
  Image,
  Text,
  PlatformColor,
  PanResponder
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
import { useState, useRef } from "react";

//#TODO Styling
function TagFood({ route, navigation }) {
  //Recieve selected image URI
  const { imageURI } = route.params;

  //tag object list
  const [tags, setTags] = useState([]);
  const tagsRef = useRef(tags);
  tagsRef.current = tags;

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  //checks input
  const [tagView, setTagView] = useState(false);

  //for Tagview searchbar
  const [text, onChangeText] = useState("");

  //for edit specific tag
  const [editTextIndex, setTextIndex] = useState(null);

  const dragIndex = useRef(null);

  const handleAddTag = () => {
    //check empty tagHandle
    if (text === "") {
      setTagView(false);
      return;
    }
    else if(editTextIndex !== null) { //edit the current tag text with the the new text
      const tagsCopy = [...tags];
      tagsCopy[editTextIndex].foodHandle = text;
      setTags(tagsCopy);
      setTextIndex(null);
    }
    else {
      // Save the tag with coordinates
      const newTag = {
        foodHandle: text,
        x: x,
        y: y,
      };
      setTags([...tags, newTag]);
    }
    onChangeText("");
    setTagView(false);
  };

  //Grab the text on the Tag onto the Input Tag View
  const handleEditTag = (index) => {
    const editTag = tags[index];
    onChangeText(editTag.foodHandle);
    setTextIndex(index);
    setTagView(true);
  };

  //Grab coords && open tagview
  const handleImagePress = (data) => {
    const { locationX, locationY } = data.nativeEvent;
    setX(locationX);
    setY(locationY);
    setTagView(true);
  };

const setDragIndex = (index) => { dragIndex.current = index; };

const dragAndMove = useRef(
  PanResponder.create({
    onPanResponderMove: (e, gestureState) => {
      if (dragIndex.current !== null) {
        const tagsCopy = [...tagsRef.current];
        tagsCopy[dragIndex.current].x = Math.min(Math.max(2, gestureState.moveX), 388);
        tagsCopy[dragIndex.current].y = Math.max(0, gestureState.moveY-100);
        setTags(tagsCopy);
      }
    },
    onPanResponderRelease: () => { dragIndex.current = null; }
  })
).current;


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
      const jsonStoredTags = await AsyncStorage.getItem(imageURI);
      storedTags = jsonStoredTags != null ? JSON.parse(jsonStoredTags) : null;
      if (storedTags !== null) {
        // value previously stored
        setTags(storedTags);
      }
    } catch (e) {
      // error reading value
    }
  }

  //Gets Saved Tags on Image Load
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
                saveTags(imageURI) &&
                navigation.navigate("TabNav", {
                  screen: "Camera",
                })
              }
            />
          </View>
          {/* Pressable Image to Place Tags */}
          <View>
            <Pressable onPress={(data) => {
              if(dragIndex.current === null) {
                handleImagePress(data)
            }}}>
              <Image
                style={styles.image}
                source={{
                  uri: imageURI,
                }}
              />
            </Pressable>
            {/* Add Tags onto Pressable Image with Top and Left Shift to make Tags not go Off Screen */}
            {tags.map((tag, index) => ( 
              <View key={index} style={{
                position: "absolute",
                left: tag.x >= 9*Dimensions.get("window").width/10 ? tag.x-(9*tag.foodHandle.length)-15 : 
                      tag.x < Dimensions.get("window").width/10 ? tag.x-5 : tag.x-25,
                top: tag.y >= Dimensions.get("window").height/10 ? tag.y-40 : tag.y-15,
              }}
              {...dragAndMove.panHandlers}
              onMoveShouldSetResponderCapture={() => {
                setDragIndex(index)
                return true;
              }}
              >
                {/* Triangle */}
                <View style={styles.triangle}/>
                {/* Rect with Tag Text and Close Icon */}
                <View style={{
                  height: 30,
                  borderRadius: "10.98",
                  backgroundColor: "#D9D9D9",
                  top: "30%",
                }}> 
                  <Text onPress={() => handleEditTag(index)}
                  style={{
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
        {/* Input Tag View */}
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              marginHorizontal: 20,
            }}
          >
            <Button title="Cancel" onPress={() => {
              setTagView(false);
              setTextIndex(null);
              onChangeText("");
            }}></Button>
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
              style={styles.input}
              onChangeText={onChangeText}
              autoFocus={true}
              maxLength={20}
              value={text}>
            </TextInput>
            {/* Added a Clear Button for TextBox */}
            <TouchableOpacity onPress={() => onChangeText('')} style={styles.inputX}>
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
  triangle: {
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
  },
  input: {
    fontSize: "20",
    height: "33",
    width: "80%",
    margin: "auto",
    textAlign: "center",
    borderColor: "black",
    backgroundColor: "lightgrey",
    borderRadius: "25",
  },
  inputX: {
    height: 20,
    width: 20,
    top: 2,
    right: 24
  }
});
