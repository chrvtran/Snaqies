import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import FlatButton from '../assets/button';
 
function Home({ navigation }) {
  return (
    <ScrollView>
      <View>
        <Text>This is the Home Screen!</Text>
          <View style={styles.container}>
            <FlatButton text='snaq' onPress={() => navigation.navigate('Post')}/>
            <FlatButton text='snaq' onPress={() => navigation.navigate('Post')}/>
            <FlatButton text='snaq' onPress={() => navigation.navigate('Post')}/>
            <FlatButton text='snaq' onPress={() => navigation.navigate('Post')}/>
            <StatusBar style="auto" />
          </View>
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
