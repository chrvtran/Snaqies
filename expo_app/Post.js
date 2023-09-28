import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import FlatButton from './button';
 
export default function Post() {
  return (
    <View style={styles.container}>
      <Text>This is the Post Screen!</Text>
      <FlatButton text='Back to Home' onPress={() => navigation.navigate('Home')}/>
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