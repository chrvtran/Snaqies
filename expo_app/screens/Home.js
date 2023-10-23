import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Snaq from '../assets/snaq';
import FlatButton from '../assets/button';
import PriceScreen from './Price';
 
function Home({ navigation }) {
  return (
     <ScrollView>
       <Text>This is the Home Screen!</Text>
       <FlatButton text='Price Screen' onPress={() => navigation.navigate('Price')}/>
       <View style={styles.container}>
          <Snaq onPress={() => navigation.navigate('Post')}/>
          <Snaq onPress={() => navigation.navigate('Post')}/>
          <Snaq onPress={() => navigation.navigate('Post')}/>
          <Snaq onPress={() => navigation.navigate('Post')}/>
          <StatusBar style="auto" />
       </View>
     </ScrollView>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
