import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import CloseButton from 'expo_app/assets/icons/close.svg';
import NextArrow from 'expo_app/assets/icons/arrow-foward.svg';
import BackArrow from "expo_app/assets/icons/back-arrow.svg"

import DownloadButton from 'expo_app/assets/icons/download.svg';
import TrashCanButton from 'expo_app/assets/icons/trashcan.svg';
import UploadButton from 'expo_app/assets/icons/upload.svg';


function SelectPhoto({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Close Arrow Button */}
      <View style={styles.backButton}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <BackArrow style={{ fill: 'black' }} />
        </TouchableOpacity>
      </View>

      <View style={styles.nextButton}>
        <TouchableOpacity onPress={() => navigation.navigate('Location')}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>


      {/* Title and Subtitle at the top */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>New Post</Text>
        <Text style={[styles.subtitle, { marginTop: 10 }]}>Which photos do you want to Snaq?</Text>
      </View>

      {/* Bar */}
      <View style={styles.bar}>
      <View style={styles.barRight}>
          <TouchableOpacity style={styles.iconButton}>
            <UploadButton />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.barButton} onPress={() => navigation.navigate('Home')}>
          <Text>Save Draft</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.barButton}>
          <Text>Tag Food</Text>
        </TouchableOpacity>
        <View style={styles.barRight}>
          <TouchableOpacity style={styles.iconButton}>
            <DownloadButton />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <TrashCanButton />
          </TouchableOpacity>
        </View>
      </View>

      {/* Image Row */}
      <View style={styles.imageRow}>
        {/* Render your images here */}
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

export default SelectPhoto;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 5,
    height: 40,
    width: 40,
  },
  nextButton: {
    position: 'absolute',
    top: 35,
    right: 5,
    height: 40,
    width: 40,
  },
  titleContainer: {
    position: 'absolute',
    top: 20, 
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
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    backgroundColor: '#eee',
    position: 'absolute',
    bottom: '15%',
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
  nextButton: {
    position: 'absolute',
    top: 20,
    right: 5,
    height: 40,
    width: 60,
    justifyContent: 'center', // Center text within the view
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#00aaff', // Change text color to blue
    fontSize: 20
  },
  imageRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    padding: 20,
  },
});
