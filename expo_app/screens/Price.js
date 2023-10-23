import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Picker from 'react-native-picker';
import FlatButton from '../assets/button';
 
function Price({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>This is the Price Screen!</Text>
      <FlatButton text='Back to Home' onPress={() => navigation.navigate('Snaqies')}/>
        <Picker>
            <Picker.Item label="Testing" value="1"/>
        </Picker>
      <StatusBar style="auto" />
    </View>
  );
}

export default Price;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
