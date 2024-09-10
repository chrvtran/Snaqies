import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View, Image, ScrollView, SafeAreaView, Dimensions, TouchableOpacity, Animated} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import BackArrow from '../assets/icons/back-arrow.svg';
import { useHeaderHeight } from '@react-navigation/elements';

const HEADER_HEIGHT = Platform.OS === 'ios' ? 110 : 70 + StatusBar.currentHeight;

function Post() {
  const navigation = useNavigation();
  const route = useRoute();
  
  // animation of the header
  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT);
  const headerY = diffClamp.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
  });

  const { width, height } = Dimensions.get('window'); 
  const headerHeight = useHeaderHeight();

  const { uuid = '', date = '', address = '', name = '', photos = [] } = route.params || {};

  return (  
    <SafeAreaView style={{ flex: 1 }}>
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
        transform: [{ translateY: headerY }],
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
          <Text style={{ fontSize: 30 }}>Snaqies</Text>
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
            nativeEvent: { contentOffset: { y: scrollY } },
          }
        ], { useNativeDriver: true })}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.scrollViewCont}>
            <ScrollView style={styles.scrollView}>
              <SafeAreaView style={styles.horizontalScroll}>
                <ScrollView horizontal={true}>
                  {photos && photos.map((photo, index) => (
                    <Image key={index} source={{ uri: photo }} style={styles.photo} />
                  ))}
                </ScrollView>
              </SafeAreaView>
              <View style={styles.backButton}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                  <BackArrow style={styles.icon}/>
                </TouchableOpacity>
              </View>
              <SafeAreaView style={styles.bottomContainer}>
                <SafeAreaView style={styles.infoContainer}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}> {name} </Text>
                  <Text style={{ textAlign: 'center' }}> {address} </Text>
                </SafeAreaView>
              </SafeAreaView>
              <StatusBar style="auto" />
            </ScrollView>
          </View>
        </SafeAreaView>
      </Animated.ScrollView>
    </SafeAreaView>
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
  horizontalScroll: {
    top: 0,
    flexDirection: 'row',
  },
  photo: {
    position: 'relative',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.75,
  },
  bottomContainer: {
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    height: Dimensions.get('window').height * 0.35,
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
    color: '#24a7ff',
  }
});
