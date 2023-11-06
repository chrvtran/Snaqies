import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import FlatButton from '../assets/button';
import * as GeoLocation from 'expo-location';
import { useEffect, useState } from 'react';
 
function Location({ navigation }) {

  const [location, setLocation] = useState({});

  useEffect(() => {
    (async() => {

      let {status} = await GeoLocation.requestForegroundPermissionsAsync()

      if (status === "granted") {
        console.log("Permission successful!");

        const loc = await GeoLocation.getCurrentPositionAsync() 

        console.log(loc)
  
        setLocation(loc)
      } else {
        console.log("Permission not granted");
      }

      // const loc = await GeoLocation.getCurrentPositionAsync() 

      // console.log(loc)

      // setLocation(loc)

    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text>This is the Location Screen!</Text>
      <FlatButton text='Back to Home' onPress={() => navigation.navigate('Snaqies')}/>
      <MapView 
        style={styles.map}
        // provider='google'
      />
      <Text>{JSON.stringify(location)}</Text>
    </View>
  );
}

export default Location;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '70%'
  }
});
