import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Image, Pressable, TextInput, ScrollView, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';

function CameraOpen({navigation}) {

  const { control, handleSubmit } = useForm();

  const storeData = async () => {
    const newuuid = uuid.v1()
    const postObj = {
      uuid: newuuid,
      photo: photo.uri,
      caption: caption,
    }
    try {
      const jsonValue = JSON.stringify(postObj)
      await AsyncStorage.setItem(newuuid, jsonValue);
      getData(newuuid)
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


  let cameraRef = useRef();
  let photoList = useRef([]);
  const [post, setPost] = useState();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();
  const [photoSet, setPhotoSet] = useState([]);
  const [caption, setCaption] = useState("");


  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting Permissions...</Text>
  } else if (!hasCameraPermission) {
    return <Text>Permission not granted. Please change in settings.</Text>
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setPhoto(result.assets[0]);
      photoList.current.push(result.assets[0])
      const newPhotoList = [...photoList.current];
      setPhotoSet(newPhotoList)

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
  }

  return (
    <Camera style={styles.container} ref={cameraRef}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.picButtons} onPress={takePic}>
          <Text>Take Pic</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.picButtons} title="Pick an image from camera roll" onPress={pickImage}>
            <Text>Upload Pic</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.picButtons} onPress={resetPhotoList}>
            <Text>Reset Pics</Text>
        </TouchableOpacity>
          {/* {photoList && photoList.map((photo, index) => <Image key={index} source={{uri: photo.uri}}/>)} */}
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
  }
});
