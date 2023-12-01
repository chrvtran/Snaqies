import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, SafeAreaView, Button, Image, Pressable, TextInput, ScrollView, TouchableOpacity} from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';
import NextArrow from 'expo_app/assets/icons/next-arrow.svg'
import Slider from 'expo_app/assets/slider.js'
import styles from './screenStyles.js';

function CameraOpen({navigation}) {

  const { control, handleSubmit } = useForm();

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

  const isFocused = useIsFocused();

  let cameraRef = useRef();
  let photoList = useRef([]);
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

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      aspect: [1, 1],
      quality: 1,
    });

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

  let takePic = async () => {
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

  let resetPhotoList = () => {
    photoList.current = [];
    setPhotoSet([]);
    setPickedImages(false);
  }

  return  (
    <>
      {!pickedImages &&
        <Camera style={styles.COContainer} ref={cameraRef}>
          <View style={styles.CONextButton}>
            <TouchableOpacity onPress={() => setPickedImages(true)}>
              <NextArrow style={styles.COIcon}/>
            </TouchableOpacity>
          </View>
          <View style={styles.COButtonContainer}>
            <TouchableOpacity style={styles.COPicButtons} onPress={takePic}>
              <Text>Take Pic</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.COPicButtons} title="Pick an image from camera roll" onPress={pickImage}>
                <Text>Upload Pic</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.COPicButtons} onPress={resetPhotoList}>
                <Text>Reset Pics</Text>
            </TouchableOpacity>
          </View>
          <SafeAreaView style={styles.COPhotoList}> 
            <ScrollView horizontal={true}>
              {photoSet && photoSet.map((photo, index) =>
                <Image key={index} style={styles.COImageRoll} source={{uri: photo.uri}}></Image>
                )}
              </ScrollView>
          </SafeAreaView>
        <StatusBar style="auto" />
      </Camera>
    }
    {pickedImages &&
      <SafeAreaView style={styles.COContainer}>
        <Slider photos={photoSet}/>
        <View style={styles.CONextButton}>
          <TouchableOpacity onPress={() => setPickedImages(true)}>
            <NextArrow style={styles.COIcon}/>
          </TouchableOpacity>
        </View>
        <View style={styles.COButtonContainer}>
          <TouchableOpacity style={styles.COPicButtons} title="Pick an image from camera roll" onPress={pickImage}>
              <Text>Upload Pic</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.COPicButtons} onPress={resetPhotoList}>
              <Text>Reset Pics</Text>
          </TouchableOpacity>
        </View>
        <SafeAreaView style={styles.COPhotoList}> 
            <ScrollView horizontal={true}>
              {photoSet && photoSet.map((photo, index) =>
                <Image key={index} style={styles.COImageRoll} source={{uri: photo.uri}}></Image>
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