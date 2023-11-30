import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import FlatButton from '../assets/button';

import styles from './screenStyles';
 
function Saved({ navigation }) {
  return (
    <View style={styles.savedContainer}>
      <Text>This is the Saved Screen!</Text>
      <FlatButton text='Back to Home' onPress={() => navigation.navigate('Snaqies')}/>
      <StatusBar style="auto" />
    </View>
  );
}

export default Saved;

