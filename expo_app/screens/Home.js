import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import FlatButton from '../assets/button';
 


function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>This is the Home Screen!</Text>
      <Text> </Text>
      <FlatButton text='settings' onPress={() => navigation.navigate('Settings')}/>
      <Text> </Text>
      <FlatButton text='snaq' onPress={() => navigation.navigate('Post')}/>
      <StatusBar style="auto" />
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});