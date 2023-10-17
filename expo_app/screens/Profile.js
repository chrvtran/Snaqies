import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import FlatButton from '../assets/button';
 
function Profile({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>This is the Profile Screen!</Text>
      <FlatButton text='Back to Home' onPress={() => navigation.navigate('Snaqies')}/>
      <StatusBar style="auto" />
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
