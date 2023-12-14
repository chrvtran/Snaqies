import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, Animated, SafeAreaView } from 'react-native';
import Snaq from '../assets/snaq';
import FlatButton from '../assets/button';
import RatingsScreen from './Ratings';
import PriceScreen from './Price';
import { AnimatedHeader } from '../assets/AnimateHeader';
import { useHeaderHeight, headerBackground } from '@react-navigation/elements';
 
function Home({ navigation }) {
  const headerHeight = useHeaderHeight();
  const scrollY = new Animated.Value(0);
  const translateY = scrollY.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -1],
    extrapolateLeft: 'clamp',
  });

  return (
    <View style={{flex: 1}}>
      {AnimatedHeader(translateY)}
      <ScrollView 
        style={styles.container}
        scrollEventThrottle={16}
        onScroll={(e)=>{
          scrollY.setValue(e.nativeEvent.contentOffset.y)
        }}
      >
        <Text style={styles.headertext}>↓ Recent</Text>
        <View style={styles.snaqcontainer}>
            <Snaq onPress={() => navigation.navigate('Post')}/>
            <Snaq onPress={() => navigation.navigate('Post')}/>
            <Snaq onPress={() => navigation.navigate('Post')}/>
            <Snaq onPress={() => navigation.navigate('Post')}/>
            <Snaq onPress={() => navigation.navigate('Post')}/>
            <Snaq onPress={() => navigation.navigate('Post')}/>
            <StatusBar style="auto" />
        </View>
        <FlatButton text='Ratings Screen' onPress={() => navigation.navigate('Ratings')}/>
        <FlatButton text='Price Screen' onPress={() => navigation.navigate('Price')}/>
      </ScrollView>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  snaqcontainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  headertext: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 20,
    marginTop: 15,
    marginBottom: 5
  }
});
