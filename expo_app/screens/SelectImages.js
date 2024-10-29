import React from "react";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import { StatusBar } from "expo-status-bar";

// UI Buttons
import BackArrow from "../assets/icons/back-arrow.svg";
import NextArrow from "../assets/icons/arrow-foward.svg";
import UploadButton from "../assets/icons/upload.svg";
import DownloadButton from '../assets/icons/download.svg';
import TrashCanButton from '../assets/icons/trashcan.svg';

import * as ImagePicker from "expo-image-picker";

const { width: screenWidth } = Dimensions.get('window');

function SelectImages({route, navigation}) {
    const [photos, setPhotos] = useState(route.params.photos);
    const [locationData, setLocationData] = useState(route.params.locationData);
    const [selectedIndex, setIndex] = useState(null);
    
    const uploadPhotos = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsMultipleSelection: true,
        aspect: [1, 1],
        quality: 1,
      });

      let i = 0;
      let tmp = [...photos]
      while (!result.canceled && i < result.assets.length) {
        tmp.push(result.assets[i].uri);
        i++;
      }

      setPhotos(tmp);
    };

    return (
        <SafeAreaView style={styles.container}>
            {photos[selectedIndex] && (
                <Image 
                style={styles.selectedImage}
                source={ {uri: photos[selectedIndex]} }
            />)}

            {/* Back Arrow Button */}
            <View style={styles.touchableBackButtonArea}>
              <TouchableOpacity 
                onPress={() => console.log("Go to home screen")}
                style={styles.touchableBackButtonArea}
                hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }} 
                activeOpacity={0.7}
              >
                <BackArrow style={{ fill: 'black' }} />
              </TouchableOpacity>
            </View>
          
          {/* Forward Arrow Button */}
          <View style={styles.nextButton}>
          <TouchableOpacity
            style={styles.selectNextButton}
            onPress={() => console.log("Go to location screen")}
            >
              <NextArrow />
            </TouchableOpacity>
          </View>
          
          {/* Title Card */}
          <View style={styles.titleContainer}>
                <Text style={styles.title}>New Post</Text>
                <Text style={[styles.subtitle, { marginTop: 10 }]}>Which photos do you want to Snaq?</Text>
            </View>

            {/* Bar */}
            <View style={styles.bar}>
              {/* Upload Button */}
              <View style={styles.barRight}>
                <TouchableOpacity style={styles.iconButton} onPress={uploadPhotos}>
                  <UploadButton width={24} height={24} />
                </TouchableOpacity>
              </View>

              {/* Save Draft */}
              <TouchableOpacity style={styles.barButton} onPress={() => console.log("Save Draft")}>
                <Text>Save Draft</Text>
              </TouchableOpacity>
              
              {/* Tag Food */}
              <TouchableOpacity style={styles.barButton} onPress={() => console.log("Go to Tag Food")}>
                <Text>Tag Food</Text>
              </TouchableOpacity>

              {/* Download Button */}
              <View style={styles.barRight}>
                <TouchableOpacity style={styles.iconButton}  onPress={() => console.log("Download Photo")}>
                  <DownloadButton />
                </TouchableOpacity>

                {/* Delete Button */}
                <TouchableOpacity style={styles.iconButton} onPress={() => console.log("Delete Photo")}>
                  <TrashCanButton />
                </TouchableOpacity>
              </View>
            </View>

            {/* Scrollable photo list */}
            <SafeAreaView style={styles.photoList}>
                <ScrollView horizontal={true}>
                    {photos.map((photo, index) => (
                        <Pressable
                          key={index}
                          onPress={() => setIndex(index)}
                          style={[styles.imageContainer, styles.selectedPhotoContainer]}
                        >
                            <Image
                              style={[
                                styles.imageRoll, 
                                selectedIndex === index && styles.selectedPhoto
                              ]}
                              source={ {uri: photo} }
                             />
                        </Pressable>
                    ))}
                </ScrollView>
            </SafeAreaView>
            <StatusBar style="auto" />
        </SafeAreaView>
    )
}

export default SelectImages;

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
      top: 20,
      left: 0,
      height: 40,
      width: 40,
    },
    touchableBackButtonArea: {
      position: 'absolute',
      top: 15,
      left: 0,
      height: 40,
      width: 40,
      height: 50,
      width: 100,
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10,
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
      top: 10,
      right: 5,
      height: 70,
      width: 70,
      backgroundColor: "transparent",
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10
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
  