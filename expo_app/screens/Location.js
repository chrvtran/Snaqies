import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import FlatButton from '../assets/button';
import * as GeoLocation from 'expo-location';
import { useEffect, useState } from 'react';
 
function Location({ navigation }) {

  const [location, setLocation] = useState({});

  let lat = 0;
  let long = 0;
  let flag = true

  useEffect(() => {
    (async() => {

      let {status} = await GeoLocation.requestForegroundPermissionsAsync()

      if (status === "granted") {
        console.log("Permission successful!");
        const loc = await GeoLocation.getCurrentPositionAsync(); 
        console.log(loc);
        setLocation(loc);
      } else {
        console.log("Permission not granted");
        flag = false;
      }

    })();
  }, []);

  // if (flag) {
  //   // lat = location.coords.latitude;
  //   // long = location.coords.longitude;
  // }
  lat = location.coords.latitude;
  long = location.coords.longitude;

  return (
    <View style={styles.container}>
      <Text>This is the Location Screen!</Text>
      <FlatButton text='Back to Home' onPress={() => navigation.navigate('Snaqies')}/>
      { JSON.stringify(location) !== '{}' ?
        <MapView 
          style={styles.map}
          provider='google'
          region={{
            latitude: lat,
            longitude: long,
            latitudeDelta: 0.004757,
            longitudeDelta: 0.006866,
          }}
        >
          <Marker 
            coordinate={{
              latitude: lat,
              longitude: long
            }}
          > 
            <Callout>
              <Text>I'm here</Text>
            </Callout>
          </Marker>
        </MapView> :
        <View>
          <MapView 
            style={styles.map}
            provider='google'
          />
          <Text>Location Permission not Granted</Text>
        </View>
      }
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
