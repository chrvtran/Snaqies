import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Image, Pressable, TextInput, ScrollView, TouchableOpacity} from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';
import NextArrow from 'expo_app/assets/icons/arrow-foward.svg'
import BackArrow from "expo_app/assets/icons/arrow-backward.svg"
import Slider from 'expo_app/assets/slider.js'

function CameraOpen({navigation}) {

  const { control, handleSubmit } = useForm();

  const isFocused = useIsFocused();

  let cameraRef = useRef();
  let photoList = useRef([]);
  let sliderRef = useRef();
  const [photoSet, setPhotoSet] = useState([]);
  const [post, setPost] = useState();
  const [photos, setPhoto] = useState();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [pickedImages, setPickedImages] = useState(false);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
      if (isFocused) {
        setPickedImages(false);
    }
    })();
  }, [isFocused]);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting Permissions...</Text>
  } else if (!hasCameraPermission) {
    return <Text>Permission not granted. Please change in settings.</Text>
  }

  const uploadPhoto = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      aspect: [1, 1],
      quality: 1,
    });
    delete result.cancelled;

    console.log(result);
    let i = 0;
    while (!result.canceled && i < result.assets.length) {
      setPhoto(result.assets[i]);
      photoList.current.push(result.assets[i])
      const newPhotoList = [...photoList.current];
      setPhotoSet(newPhotoList)
      i++;

    }
  };

  let takePhoto = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
      imageType: "jpg",
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
    photoList.current.push(newPhoto)
    const newPhotoList = [...photoList.current];
    setPhotoSet(newPhotoList)
  };

  let savePhoto = async () => {
    // TODO need to get index from slider.js
    console.log(sliderRef.current.getIndex())
    // await MediaLibrary.saveToLibraryAsync(pic.uri)
    alert("Successfully saved to camera roll.")
  }

  let deletePhoto = () => {
    // TODO need to get index from slider.js
    let index = 0
    photoList.current.splice(index, 1)
    const newPhotoList = [...photoList.current];
    setPhotoSet(newPhotoList)
    alert("Successfully deleted photo.")
  }

  let resetPhotoList = () => {
    photoList.current = [];
    setPhotoSet([]);
    setPickedImages(false);
    alert("Sucessfully cleared photos.")
  }

  const storeData = async () => {
    const newuuid = uuid.v1()
    const postObj = {
      uuid: newuuid,
      photos: photoSet.map((photo) => {return photo.uri})
    }
    try {
      const jsonValue = JSON.stringify(postObj)
      await AsyncStorage.setItem(newuuid, jsonValue);
      getData(newuuid)
      console.log(`Stored at ${uuid}, ${photoSet.length} photo(s)`)
    } catch (e) {
      // saving error
    }
  };

  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      postObj = JSON.parse(value);
      setPost(postObj);
      if (value !== null) {
        // value previously stored
      }
    } catch (e) {
      // error reading value
    }
  };

  var slider = <Slider ref={sliderRef} photos={photoSet} />

  return  (
    <>
      {!pickedImages &&
        <Camera style={styles.container} ref={cameraRef}>
          {(photoSet.length > 0) && <View style={styles.nextButton}>
            <TouchableOpacity onPress={() => setPickedImages(true)}>
              <NextArrow style={{fill: "white"}}/>
            </TouchableOpacity>
          </View>}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.picButtons} onPress={takePhoto}>
              <Text>Take Pic</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.picButtons} title="Pick an image from camera roll" onPress={uploadPhoto}>
                <Text>Upload Pic</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.picButtons} onPress={resetPhotoList}>
                <Text>Reset Pics</Text>
            </TouchableOpacity>
          </View>
          <SafeAreaView style={styles.photoList}> 
            <ScrollView horizontal={true}>
              {photoSet && photoSet.map((photo, index) =>
                <Image key={index} style={styles.imageRoll} source={{uri: photo.uri}}></Image>
                )}
              </ScrollView>
          </SafeAreaView>
        <StatusBar style="auto" />
      </Camera>
    }
    {pickedImages &&
      <SafeAreaView style={styles.container}>
        {slider}
        <View style={styles.backButton}>
            <TouchableOpacity onPress={() => setPickedImages(false)}>
                <BackArrow/>
              </TouchableOpacity>
        </View>
        <View style={styles.nextButton}>
          <TouchableOpacity onPress={storeData}>
            <NextArrow/>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.picButtons} onPress={savePhoto}>
            <Text>Save to Roll</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.picButtons} title="Select photos to upload into your Snaq" onPress={uploadPhoto}>
              <Text>Upload Pic</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.picButtons} onPress={deletePhoto}>
              <Text>Delete Pic</Text>
          </TouchableOpacity>
        </View>
        <SafeAreaView style={styles.photoList}> 
            <ScrollView horizontal={true}>
              {photoSet && photoSet.map((photo, index) =>
                <Image key={index} style={styles.imageRoll} source={{uri: photo.uri}}></Image>
                )}
              </ScrollView>
            </SafeAreaView>
        <StatusBar style="auto" />
    </SafeAreaView>
    }
    </>
  );

  
}

export default CameraOpen;

const styles = StyleSheet.create({
  headertext: {
    fontWeight: 'bold',
    fontSize: 17
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    // flex: 1,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    bottom: 100,
    width: '100%',
    position: 'absolute',
  },
  backButton: {
    position: 'absolute',
    top: 5,
    left: 5,
    height: 30,
    width: 40
  },
  nextButton: {
    position: 'absolute',
    top: 5,
    right: 0,
    height: 30,
    width: 40,
  },
  picButtons: {
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 20,
    width: 100,
    height: 30,
    backgroundColor: 'white',

  },
  photoList: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    height: 80,
    backgroundColor: 'white',
    width: '100%',
  },
  topButtons: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    // backgroundColor: '#008000',
    width: 60,
    // height: 40,
  },
  headerContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    // height: 40,
    // width: 100,
    
  },
  imageContainer: {
    flex: 3,
    backgroundColor: 'yellow',
    alignSelf: 'stretch',
    height: '30%',
    flexDirection: 'row',
  },
  imageInnerCont: {
    backgroundColor: 'red',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 25,
  }, 
  fullImageRoll: {
    height: 200,
    width: 100,
  },
  imageRoll: {
    height: 80,
    width: 50,
    borderRadius: 5,
    marginLeft: 5,
  }, 
  textInput: {
    flex: 2,
    borderWidth: 1,
    // alignContent: 'stretch',
  },
  bottomContainer: {
    width: '100%',
    flex: 7,
  },
  rateCont: {
    flex: 1,
    backgroundColor: 'red'
  }, 
  priceCont: {
    flex: 1,
    backgroundColor: 'green'
  },
  locationCont: {
    flex: 1,
    backgroundColor: 'blue'
  },
});
