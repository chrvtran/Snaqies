import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, Dimensions, TouchableOpacity,} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import FlatButton from '../assets/button';
import BackArrow from 'expo_app/assets/icons/back-arrow.svg'
 
function Post({ route, navigation }) {

  const { width, height } = Dimensions.get("window"); 
  
  // const key = props.uuid;
  // const photos = props.photos; // list of images
  // const foodtags = props.foodtags; // list of food names
  // const restaurantname = props.restaurantname;
  // const address = props.address; // address
  // const reviews = [];

  const {photos } = route.params

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Image source={{uri: photos[0]}} style={styles.photo}/>
        <View style={styles.backButton}>
            <TouchableOpacity onPress={() => navigation.navigate('Snaqies')}>
              <BackArrow style={styles.icon}/>
            </TouchableOpacity>
        </View>
        <FlatButton text='test' onPress={() => console.log(photos)}/>
        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}

export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 3,
    left: 5,
    height: '200',
    // backgroundColor: 'green'
  },
  scrollView: {
    height: 'auto',
    backgroundColor: "green",
  },
  photo: {
    width: '100%',
    height: Dimensions.get('window').height * .65
  }

});
