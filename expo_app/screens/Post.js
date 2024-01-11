import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, Dimensions, TouchableOpacity, Animated} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import FlatButton from '../assets/button';
import BackArrow from 'expo_app/assets/icons/back-arrow.svg'
import { useHeaderHeight } from '@react-navigation/elements';

const HEADER_HEIGHT = Platform.OS == 'ios' ? 100 : 70 + StatusBar.currentHeight;
 
function Post({ route, navigation }) {

  // animation of the header
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT)
  const headerY = diffClamp.interpolate({
      inputRange: [0, HEADER_HEIGHT],
      outputRange: [0, -HEADER_HEIGHT]
  })

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
    <View style={{flex: 1}}>
      {/* header part itself including styling */}
      <Animated.View style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: HEADER_HEIGHT,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        zIndex: 1000,
        elevation: 1000,
        transform:[{translateY: headerY}],
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30,
      }}>
        <View style={{
            height: 40,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-around',
        }}>
            <Text style={{
                fontSize: '30',
            }}>Snaqies
            </Text>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',

            }}>
                <View style={{
                    borderWidth: 2,
                    height: 40,
                    width: 40,
                    marginRight: 10,
                }}>
                </View>

                <View style={{
                    borderWidth: 2,
                    height: 40,
                    width: 40,
                    marginLeft: 10,
                }}>
                </View>
            </View>

        </View>
        </Animated.View>
        {/* animates header on scrollEvent (going up or down) */}
        <Animated.ScrollView 
          bounces={false}
          scrollEventThrottle={16}
          style={styles.container}
          onScroll={Animated.event([
            {
                nativeEvent:{contentOffset:{y: scrollY}}
            }
          ],)}
        >

      <SafeAreaView style={styles.container}>
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
      </SafeAreaView>
      </Animated.ScrollView>
    </View>
  );
}

export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight,
  },
  backButton: {
    position: 'absolute',
    top: 3,
    left: 5,
    height: '200',
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
