import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import FlatButton from './button';
 
export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>This is the Home Screen!</Text>
      <FlatButton text='snaq' onPress={() => navigation.navigate('Post')}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});