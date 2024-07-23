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
  Dimensions
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
import DownloadButton from '../assets/icons/download.svg';
import TrashCanButton from '../assets/icons/trashcan.svg';
import CloseButton from "../assets/icons/close.svg";
import UploadButton from "../assets/icons/upload.svg";
import Slider from "../assets/slider.js";
import Alert from "../assets/alert.js";

const { width: screenWidth } = Dimensions.get('window');

function CameraOpen({ navigation }) {
  const { control, handleSubmit } = useForm();

  let key = useRef();
  let cameraRef = useRef();
  let photoList = useRef([]);
  let sliderRef = useRef(null);
  const [photoSet, setPhotoSet] = useState([]);
  const [photos, setPhoto] = useState();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [pickedImages, setPickedImages] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleAlertState = () => {
    setShowAlert(false);
  };
  const handlePhotoSelect = (index) => {
    setSelectedPhotoIndex(index); 
    if (sliderRef.current) {
        sliderRef.current.setIndex(index);
    }
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
  const storeData = async () => {
    key = uuid.v1();
    const date = Date.now();
    const postObj = {
      uuid: key,
      photos: photoSet.map((photo) => {
        return photo.uri;
      }),
      date: date,
    };
    try {
      const jsonValue = JSON.stringify(postObj);
      await AsyncStorage.setItem(key, jsonValue);
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

  return (
    <>
      {/* Initial camera screen */}
      {!pickedImages && (
        <Camera style={styles.container} ref={cameraRef}>
          {/* Close Arrow Button */}
          <View style={styles.closeButton}>
            <TouchableOpacity onPress={() => setShowAlert(true)}>
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
            resetPhotoList={resetPhotoList}
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
            {/*
            <Slider ref={sliderRef} photos={photoSet} style={styles.sliderContainer} />
            */}
          {photoSet[selectedPhotoIndex] && (
            <Image
              style={styles.selectedImage}
              source={{ uri: photoSet[selectedPhotoIndex].uri }}
            />
          )}


          {/* Back Arrow Button */}
          <View style={styles.backButton}>
            <TouchableOpacity 
              onPress={() => setPickedImages(false)}
              style={styles.touchableBackButtonArea}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} 
              activeOpacity={0.7}
            >
              <BackArrow style={{ fill: 'black' }} />
            </TouchableOpacity>
          </View>





          {/* Forward Arrow Button */}
          <View style={styles.selectNextButton}>
          <TouchableOpacity
            style={styles.selectNextButton}
            onPress={() => {
              storeData();
              navigation.navigate("Location", {
                key: key,
                photoSet: photoSet,
                setPhotoSet: setPhotoSet,
                photoList: photoList,
              });
            }}
          >
            <Text style={styles.selectNextButtonText}>Next</Text>
          </TouchableOpacity>
          </View>

          <View style={styles.titleContainer}>
                <Text style={styles.title}>New Post</Text>
                <Text style={[styles.subtitle, { marginTop: 10 }]}>Which photos do you want to Snaq?</Text>
            </View>

          {/* Bar */}
          <View style={styles.bar}>
            <View style={styles.barRight}>
              <TouchableOpacity style={styles.iconButton} onPress={uploadPhoto}>
                <UploadButton width={24} height={24} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.barButton} onPress={() => navigation.navigate('Home')}>
              <Text>Save Draft</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.barButton} onPress={() =>
              navigation.navigate("TagFood", {
                image: photoSet[0],
              })
            }>
              <Text>Tag Food</Text>
            </TouchableOpacity>
            <View style={styles.barRight}>
              <TouchableOpacity style={styles.iconButton}  onPress={savePhoto}>
                <DownloadButton />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton} onPress={deletePhoto}>
                <TrashCanButton />
              </TouchableOpacity>
            </View>
          </View>

          {/* Area towards the bottom */}
          <SafeAreaView style={styles.photoList}>
            <ScrollView horizontal={true}>
              {photoSet && photoSet.map((photo, index) => (
                <Pressable
                  key={index}
                  onPress={() => handlePhotoSelect(index)} 
                  style={[
                    styles.imageContainer,
                    selectedPhotoIndex === index && styles.selectedPhotoContainer,
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
  sliderContainer: {
    height: '33%', 
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
},
selectedImage: {
  width: screenWidth,
  height: '75%', 
  resizeMode: 'contain',
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
  backButton: {
    position: 'absolute',
    top: 40,
    left: 25,
    height: 40,
    width: 40,
  },
  touchableBackButtonArea: {
    height: 50, 
    width: 50,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButton: {
    position: "absolute",
    top: 40,
    right: 0,
    height: 30,
    width: 40,
  },
  selectNextButton: {
    position: 'absolute',
    top: 20,
    right: 5,
    height: 40,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectNextButtonText: {
      color: '#00aaff',
      fontSize: 20,
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
  titleContainer: {
    position: 'absolute',
    top: 25,
    alignItems: 'center',
    width: '100%',
  },
  title: {
      fontWeight: 'bold',
      fontSize: 20,
  },
  subtitle: {
      fontSize: 16,
      color: '#555',
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
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: '15%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
  },
  barButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
  },
  barRight: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 10,
  },

});
