import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, Dimensions, TouchableOpacity, Animated} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import FlatButton from '../assets/button';
import BackArrow from 'expo_app/assets/icons/back-arrow.svg'
import { useHeaderHeight } from '@react-navigation/elements';
import { AnimatedHeader } from '../assets/AnimateHeader';

 
function Post({ route, navigation }) {

  const scrollY = new Animated.Value(0);
  const translateY = scrollY.interpolate({
  inputRange: [0, 80],
  outputRange: [0, -80],
  extrapolateLeft: 'clamp',
  });


  const { width, height } = Dimensions.get("window"); 
  const headerHeight = useHeaderHeight();

  console.log(headerHeight);
  
  // const key = props.uuid;
  // const photos = props.photos; // list of images
  // const foodtags = props.foodtags; // list of food names
  // const restaurantname = props.restaurantname;
  // const address = props.address; // address
  // const reviews = [];

  const {photos} = route.params

  return (  
    <SafeAreaView style={styles.container}>
            {AnimatedHeader(translateY)}
        <ScrollView 
          style={styles.container}
          scrollEventThrottle={16}
          onScroll={(e)=>{
            scrollY.setValue(e.nativeEvent.contentOffset.y)
          }}
        >
      <View style={styles.scrollViewCont}>
        <ScrollView style={styles.scrollView}>
          <Image source={{uri: photos[0]}} style={[styles.photo, {height: height - headerHeight}]}/>
          <View style={styles.backButton}>
              <TouchableOpacity onPress={() => navigation.navigate('Snaqies')}>
                <BackArrow style={styles.icon}/>
              </TouchableOpacity>
          </View>
          <SafeAreaView style={styles.bottomContainer}>
            <SafeAreaView style={styles.infoContainer}>

            </SafeAreaView>
            <SafeAreaView style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Map</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Review</Text>
              </TouchableOpacity>
            </SafeAreaView>
          </SafeAreaView>
          <StatusBar style="auto" />
        </ScrollView>
      </View>
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
  scrollViewCont: {
    height: '100%',
  },
  scrollView: {
    backgroundColor: "green",
  },
  photo: {
    width: '100%',
  },
  bottomContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: Dimensions.get('window').height * .15,
    width: '100%',
  },
  infoContainer: {
    flex: 2,
    backgroundColor: 'yellow',
  },
  buttonsContainer: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  button: {
    borderWidth: 1,
    borderRadius: 13,
    width: 60,
    height: 30,
    padding: 5,
    margin: 5,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    overflow: 'hidden',
  },
  buttonText: {
    color: '#24a7ff'
  }

});
