import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, Dimensions, TouchableOpacity, Animated} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import FlatButton from '../assets/button';
import BackArrow from 'expo_app/assets/icons/back-arrow.svg'
import { useHeaderHeight } from '@react-navigation/elements';

const HEADER_HEIGHT = Platform.OS == 'ios' ? 110 : 70 + StatusBar.currentHeight;
 
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
  
  // const uuid = string
  // const date = integer
  // const address = string
  // const restaurantname = string
  // const photos = [Array] of images
  
  // const foodtags = [Array] of food names, component?
  // const reviews = [Array] of review components

  const {uuid, date, address, name, photos} = route.params

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
        zIndex: 1000,
        elevation: 1000,
        transform:[{translateY: headerY}],
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.5,
        shadowRadius: 2.22,
        
        elevation: 3,
      }}>
        <View style={{
            height: 40,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-around',
        }}>
            <Text style={{
                fontSize: 30,
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
                nativeEvent:{contentOffset:{y: scrollY}},
            }
          ],{ useNativeDriver: true,})}
        >

      <SafeAreaView style={styles.container}>
        <View style={styles.scrollViewCont}>
          <ScrollView style={styles.scrollView}>
            <Image source={{uri: photos[0]}} style={styles.photo}/>
            <View style={styles.backButton}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                  <BackArrow style={styles.icon}/>
                </TouchableOpacity>
            </View>
            <SafeAreaView style={styles.bottomContainer}>
              <SafeAreaView style={styles.infoContainer}>
              <Text style={{fontSize: '20em', fontWeight: 'bold', textAlign: 'center'}}> {name} </Text>
              <Text style={{textAlign: 'center'}}> {address} </Text>

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
    top: 70,
    left: 10,
    height: 30,
    width: 30,
  },
  scrollViewCont: {
    height: '100%',
  },
  photo: {
    position: 'relative',
    width: '100%',
    height: Dimensions.get('window').height * .75,
  },
  bottomContainer: {
    margin: 10,
    display: "flex",
    flexDirection: "column",
    backgroundColor: 'white',
    height: Dimensions.get('window').height * .35,
  },
  infoContainer: {
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
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
