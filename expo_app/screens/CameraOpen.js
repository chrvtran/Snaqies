import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
  Pressable,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Camera } from "expo-camera/legacy";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import uuid from "react-native-uuid";
import NextArrow from "../assets/icons/arrow-foward.svg";
import BackArrow from "../assets/icons/back-arrow.svg";
import CloseButton from "../assets/icons/close.svg";
import UploadButton from "../assets/icons/upload.svg";
import Slider from "../assets/slider.js";
import Alert from "../assets/alert.js";

// Imports from Location.js
import { getUserCurrentLocation } from "./Location.js";

function CameraOpen({ navigation }) {
  const { control, handleSubmit } = useForm();

  let key = useRef();
  let cameraRef = useRef();
  let photoList = useRef([]); // Set of photos taken so far
  let sliderRef = useRef();
  const [photoSet, setPhotoSet] = useState([]); // Current set of photos for post (pictures taken by camera and from camera roll)
  const [photos, setPhoto] = useState();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [pickedImages, setPickedImages] = useState(false); // Boolean to determine if user has picked images for post
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  

  const handleAlertState = () => {
    setShowAlert(false);
  };

  // On intial tab open...
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting Permissions...</Text>;
  } else if (!hasCameraPermission) {
    return <Text>Permission not granted. Please change in settings.</Text>;
  }

  // Lets user upload photos from camera roll
  const uploadPhoto = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      aspect: [1, 1],
      quality: 1,
    });
    delete result.cancelled;
    let i = 0;
    while (!result.canceled && i < result.assets.length) {
      setPhoto(result.assets[i]);
      photoList.current.push(result.assets[i]);
      const newPhotoList = [...photoList.current];
      setPhotoSet(newPhotoList);
      i++;
    }
  };

  // Takes photo
  let takePhoto = async () => {
    setDisableButton(true);
    let options = {
      quality: 1,
      base64: true,
      exif: false,
      imageType: "jpg",
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);

    photoList.current.push(newPhoto);
    const newPhotoList = [...photoList.current];
    setPhotoSet(newPhotoList);
    setDisableButton(false);
  };

  // Saves current photo to camera roll
  let savePhoto = async () => {
    var index = Number(sliderRef.current.getIndex());
    await MediaLibrary.saveToLibraryAsync(photoSet[index].uri);
    alert("Successfully saved to camera roll.");
  };

  // Removes current photo from photolist
  let deletePhoto = () => {
    var index = Number(sliderRef.current.getIndex());
    photoList.current.splice(index, 1);
    const newPhotoList = [...photoList.current];
    setPhotoSet(newPhotoList);
    alert("Successfully deleted photo.");
    if (photoList.current.length == 0) {
      setPickedImages(false);
    }
  };

  // Clears current photolist
  let resetPhotoList = () => {
    photoList.current = [];
    setPhotoSet([]);
    setPickedImages(false);
    alert("Sucessfully cleared photos.");
  };
  // Stores uuid and photolist to async location
  const storeData = async (published, locData) => {
    key = uuid.v1();
    const date = Date.now();

    // Create post JSON to store in async
    const postObj = {
      uuid: key,
      photos: photoSet.map((photo) => {
        return photo.uri;
      }),
      date: date,
      published: published // Mark this post as being published or if it is a draft
    };
    try {
      // Store initial post object
      const jsonValue = JSON.stringify(postObj);
      await AsyncStorage.setItem(key, jsonValue);

      // Check if saving as draft and location data is available
      if (!published && locData !== null) {
        const placeJsonStr = JSON.stringify(locData.place);
        await AsyncStorage.mergeItem(key, placeJsonStr);
      }

      getData(key);
      setPickedImages(false);
    } catch (e) {
      // saving error
    }
  };

  // Debugging function to print out uuid and stored content
  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      postObj = JSON.parse(value);
      if (value !== null) {
        console.log(`Stored at ${key}, ${postObj.photos.length} photo(s)`);
      }
    } catch (e) {
      console.log(`No key: ${key}`);
    }
  };

  const saveDraft = async () => {
    // Get location data
    const userLocData = await getUserCurrentLocation();

    // Save post as a draft with location data, if provided
    await storeData(false, userLocData);
  }

  const discardPost = async () => {
    // Clear photo set if any photos were taken or chosen
    if (photoList.current.length > 0 || photoSet.length > 0) {
      resetPhotoList();
    }

    navigation.navigate("Home");
  }

  const handleClosedPress = () => {
    if (photoList.current.length > 0 || photoSet.length > 0) {
      // Only show alert if photos were taken or chosen
      setShowAlert(true);
    } else {
      // No photos chosen or taken, so just navigate to home
      navigation.navigate("Home");
    }
  }

  const handleSaveDraft = async () => {
    // Clear photo set
    photoList.current = [];
    setPhotoSet([]);
    setPickedImages(false);

    navigation.navigate("Home");
    await saveDraft();
  }

  return (
    <>
      {/* Initial camera screen */}
      {!pickedImages && (
        <Camera style={styles.container} ref={cameraRef}>
          {/* Close Arrow Button */}
          <View style={styles.closeButton}>
            <TouchableOpacity onPress={() => handleClosedPress()}>
              <CloseButton style={{ fill: "white" }} />
            </TouchableOpacity>
          </View>

          {/* Forward Arrow Button */}
          {photoSet.length > 0 && (
            <View style={styles.nextButton}>
              <TouchableOpacity onPress={() => setPickedImages(true)}>
                <NextArrow style={{ fill: "white" }} />
              </TouchableOpacity>
            </View>
          )}

          {/* Other buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={takePhoto}
              disabled={disableButton}
            ></TouchableOpacity>
          </View>
          <View style={styles.uploadButton}>
            <TouchableOpacity onPress={uploadPhoto}>
              <UploadButton style={{ fill: "white" }} />
            </TouchableOpacity>
          </View>

          {/* Popup Alert upon pressing X */}
          <Alert
            showAlert={showAlert}
            onUpdate={handleAlertState}
            discardPost={discardPost}
            saveDraft={handleSaveDraft}
          />

          {/* Area towards the bottom */}
          <SafeAreaView style={styles.photoList}>
            <ScrollView horizontal={true}>
              {photoSet &&
                photoSet.map((photo, index) => (
                  <Pressable
                    key={index}
                    onPress={() => setSelectedPhotoIndex(index)}
                    style={[
                      styles.imageContainer,
                      selectedPhotoIndex === index &&
                        styles.selectedPhotoContainer,
                    ]}
                  >
                    <Image
                      style={[
                        styles.imageRoll,
                        selectedPhotoIndex === index && styles.selectedPhoto,
                      ]}
                      source={{ uri: photo.uri }}
                    />
                  </Pressable>
                ))}
            </ScrollView>
          </SafeAreaView>
          <StatusBar style="auto" />
        </Camera>
      )}

      {/* Select images screen */}
      {pickedImages && (
        <SafeAreaView style={styles.container}>
          <Slider ref={sliderRef} photos={photoSet} />

          {/* Back Arrow Button */}
          <View style={styles.backButton}>
            <TouchableOpacity onPress={() => {
              discardPost();
              navigation.navigate("Home");
            }}>
              <BackArrow />
            </TouchableOpacity>
          </View>

          {/* Forward Arrow Button */}
          <View style={styles.nextButton}>
            <TouchableOpacity
              onPress={() =>
                storeData(true, null) &&
                navigation.navigate("Location", {
                  key: key,
                  photoSet: photoSet,
                  setPhotoSet: setPhotoSet,
                  photoList: photoList,
                })
              }
            >
              <NextArrow />
            </TouchableOpacity>
          </View>

          {/* Other buttons */}
          <View style={styles.buttonContainer}>
            {/* Save Draft */}
            <TouchableOpacity
              style={styles.picButtons}
              onPress={async () => {await handleSaveDraft();}}
            >
              <Text>Save Draft</Text>
            </TouchableOpacity>
            
            {/* Save photos to camera roll */}
            <TouchableOpacity style={styles.picButtons} onPress={savePhoto}>
              <Text>Save to Roll</Text>
            </TouchableOpacity>
            
            {/* Tag Food */}
            <TouchableOpacity
              style={styles.picButtons}
              onPress={() =>
                navigation.navigate("TagFood", {
                  image: photoSet[0],
                })
              }
            >
              <Text>Tag Food</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.picButtons}
              title="Select photos to upload into your Snaq"
              onPress={uploadPhoto}
            >
              <Text>Upload Pic</Text>
            </TouchableOpacity>

            {/* Delete Picture */}
            <TouchableOpacity style={styles.picButtons} onPress={deletePhoto}>
              <Text>Delete Pic</Text>
            </TouchableOpacity>
          </View>

          {/* Area towards the bottom */}
          <SafeAreaView style={styles.photoList}>
            <ScrollView horizontal={true}>
              {photoSet &&
                photoSet.map((photo, index) => (
                  <Pressable
                    key={index}
                    onPress={() => setSelectedPhotoIndex(index)}
                    style={[
                      styles.imageContainer,
                      selectedPhotoIndex === index &&
                        styles.selectedPhotoContainer,
                    ]}
                  >
                    <Image
                      style={[
                        styles.imageRoll,
                        selectedPhotoIndex === index && styles.selectedPhoto,
                      ]}
                      source={{ uri: photo.uri }}
                    />
                  </Pressable>
                ))}
            </ScrollView>
          </SafeAreaView>
          <StatusBar style="auto" />
        </SafeAreaView>
      )}
    </>
  );
}

export default CameraOpen;

const styles = StyleSheet.create({
  headertext: {
    fontWeight: "bold",
    fontSize: 17,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    // flex: 1,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 100,

    bottom: 100,
    width: "100%",
    position: "absolute",
  },

  closeButton: {
    position: "absolute",
    top: 35,
    left: 5,
    height: 40,
    width: 40,
  },
  nextButton: {
    position: "absolute",
    top: 40,
    right: 0,
    height: 30,
    width: 40,
  },
  uploadButton: {
    position: "absolute",
    bottom: 130,
    left: 15,
    height: 30,
    width: 30,
  },
  captureButton: {
    borderColor: "white",
    borderWidth: 4,
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: "#d3d3d3",
  },
  picButtons: {
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderRadius: 20,
    width: 100,
    height: 30,
    backgroundColor: "white",
  },
  photoList: {
    position: "absolute",
    alignItems: "center",
    bottom: 0,
    flexDirection: "row",
    height: 115,
    backgroundColor: "white",
    width: "100%",
  },
  topButtons: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    // backgroundColor: '#008000',
    width: 60,
    // height: 40,
  },
  headerContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    // height: 40,
    // width: 100,
  },
  imageContainer: {
    flex: 3,
    // backgroundColor: 'yellow',
    alignSelf: "stretch",
    height: "30%",
    flexDirection: "row",
  },
  imageInnerCont: {
    backgroundColor: "red",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 25,
  },
  fullImageRoll: {
    height: 100,
    width: 100,
  },
  imageRoll: {
    height: 70,
    width: 45,
    borderRadius: 5,
    marginLeft: 5,
  },
  textInput: {
    flex: 2,
    borderWidth: 1,
    // alignContent: 'stretch',
  },
  bottomContainer: {
    width: "100%",
    flex: 7,
  },
  rateCont: {
    flex: 1,
    backgroundColor: "red",
  },
  priceCont: {
    flex: 1,
    backgroundColor: "green",
  },
  locationCont: {
    flex: 1,
    backgroundColor: "blue",
  },
  selectedPhotoContainer: {
    // borderWidth: 2,
    borderColor: "transparent",
  },

  selectedPhoto: {
    borderWidth: 2,
    borderColor: "#339BFF",
  },
});
