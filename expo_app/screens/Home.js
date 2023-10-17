import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import FlatButton from '../assets/button';

import Snaq from '../assets/snaq'
 
function Home({ navigation }) {
  return (
    <View>
      <Text>This is the Home Screen!</Text>
      <ScrollView>
        <View style={styles.container}>
          <Snaq onPress={() => navigation.navigate('Post')}/>
          <Snaq onPress={() => navigation.navigate('Post')}/>
          <Snaq onPress={() => navigation.navigate('Post')}/>
          <Snaq onPress={() => navigation.navigate('Post')}/>
          <StatusBar style="auto" />
        </View>
      </ScrollView>
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;