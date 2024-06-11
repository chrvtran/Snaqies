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
import {
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  TextInput,
} from "react-native";
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
  const [text, onChangeText] = React.useState("");

  const handleAddTag = () => {
    //check empty tagHandle
    if (text === "") {
      setTagView(false);
      console.log(tags);
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
      console.log(tags);
    }
  };

  //Grab coords && open tagview
  const handleImagePress = (data) => {
    const { locationX, locationY } = data.nativeEvent;
    setX(locationX);
    setY(locationY);
    setTagView(true);
  };

  const handleRemoveTag = (index) => {
    const tagsCopy = [...tags];
    tagsCopy.splice(index, 1);
    setTags(tagsCopy);
  }

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

            {/* TODO
            {tags.map((i) => {
              <View>
                <Text styles={{ display: "absolute", color: "blue" }}>
                  {i.foodHandle}
                </Text>
              </View>;
            })} */}

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
              {/*#TODO area for tag list rendered*/}
              <Text style={{
                top: "2.5%",
                left: 10,
                textAlign: "center",
                fontSize: "16",
                fontWeight: "400",
              }}>
              Tags
              </Text>
              {tags.map((tag, index) => ( 
                <View key={index}  style={{
                  width: 'auto',
                  height: '20%',
                  borderRadius: "10.98",
                  backgroundColor: "#D9D9D9",
                  top: "7.5%",
                  right: 25,
                  marginRight: 10,
                }}> 
                <Text style={{
                  fontSize: "19.2",
                  color: "#737373",
                  fontWeight: "400",
                  top:"10%",
                }}>
                {tag.foodHandle} <Text style={{color: "black"}} onPress={() => handleRemoveTag(index)}>&times;</Text>
                </Text>
              </View> 
              ))} 
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
