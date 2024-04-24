import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NextArrow from 'expo_app/assets/icons/arrow-forward.svg';
import BackArrow from 'expo_app/assets/icons/back-arrow.svg';
import CloseButton from 'expo_app/assets/icons/close.svg';
import DownloadButton from 'expo_app/assets/icons/download.svg';
import TrashCanButton from 'expo_app/assets/icons/trashcan.svg';

function SelectPhoto({ navigation }) {
  // const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Close Arrow Button */}
      <View style={styles.closeButton}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <CloseButton style={{ fill: 'white' }} />
        </TouchableOpacity>
      </View>

      {/* Forward Arrow Button */}
      <View style={styles.nextButton}>
        <TouchableOpacity onPress={() => navigation.navigate('Location')}>
          <NextArrow style={{ fill: 'white' }} />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.title}>New Post</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>which photos do you want to Snaq?</Text>

      {/* Main Image */}
      <Image
        source={require('./assets/main_image.jpg')}
        style={styles.mainImage}
        resizeMode="cover"
      />

      {/* Bar */}
      <View style={styles.bar}>
        <TouchableOpacity style={styles.barButton} onPress={() => navigation.navigate('Home')}>
          <Text>Continue Later</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.barButton}>
          <Text>Food</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 35,
    left: 5,
    height: 40,
    width: 40,
    zIndex: 1,
  },
  nextButton: {
    position: 'absolute',
    top: 35,
    right: 5,
    height: 40,
    width: 40,
    zIndex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 20,
  },
  subtitle: {
    marginTop: 10,
    marginBottom: 20,
  },
  mainImage: {
    width: '100%',
    height: '40%',
  },
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    backgroundColor: '#eee',
    position: 'absolute',
    bottom: 0,
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
  imageRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    height: '15%',
    paddingTop: 20,
  },
});
