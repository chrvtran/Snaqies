import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import FlatButton from '../assets/button';

import styles from './screenStyles';
 
function Review({ navigation }) {
  return (
    <View style={styles.reviewContainer}>
      <Text>This is the Review Screen!</Text>
      <FlatButton text='Back to Home' onPress={() => navigation.navigate('Snaqies')}/>
      <StatusBar style="auto" />
    </View>
  );
}

export default Review;


