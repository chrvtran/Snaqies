import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as GeoLocation from 'expo-location';
import { useEffect, useState } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

 
function Location({ navigation }) {

  const myApiKey = "AIzaSyCgk68Pqz4Jqfks8NqrR2kRXXeObK_z86U"

  const [location, setLocation] = useState({});

  // On intial tab open...
  useEffect(() => {
    (async() => {
      // Request access to device location (if not already)
      let {status} = await GeoLocation.requestForegroundPermissionsAsync()

      if (status === "granted") {
        console.log("Permission granted");
        // Gets current location
        const loc = await GeoLocation.getCurrentPositionAsync(); 
        setLocation(loc);
        place = await findPlace(await reverseGeolocate(loc.coords.latitude, loc.coords.longitude))
        console.log(place)
      } else {
        console.log("Permission not granted");
      }

    })();
  }, []);


  // Reassign initial lat,long values for current location
  let lat = 0;
  let long = 0;
  if (JSON.stringify(location) !== '{}') {
    lat = location.coords.latitude;
    long = location.coords.longitude;
  }

  const [ flag, setFlag ] = useState(false);
  const [ post, setPost ] = useState();
  const [ region, setRegion ] = React.useState({
    latitude: lat,
    longitude: long,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // Gets address based on coordinates
  const reverseGeolocate = (latitude, longitude) => {
    return new Promise((resolve, reject) => {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?fields=name&address=${latitude},${longitude}&key=${myApiKey}`
      fetch(url)
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.status === 'OK') {
            resolve(responseJson?.results?.[0]?.formatted_address);
          } else {
            reject('not found');
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  // Makes a Place search to find certain information about an input
  const findPlace = (input) => {
    return new Promise((resolve, reject) => {
        const find = `formatted_address,name`
        const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=${find}&input=establishment%20${input}&inputtype=textquery&key=${myApiKey}`
        fetch(url)
          .then(response => response.json())
          .then(responseJson => {
            if (responseJson.status === 'OK') {
              resolve(responseJson?.candidates?.[0]);
            } else {
              reject('not found');
            }
          })
          .catch(error => {
            reject(error);
          });
      });
  };    

  // Stores location data asynchronously
  const storeData = async (details) => {
    const newuuid = uuid.v1()
    const postObj = {
      uuid: newuuid,
      name: details.name,
      address: details.formatted_address,
    }
    try {
      const jsonValue = JSON.stringify(postObj)
      await AsyncStorage.setItem(newuuid, jsonValue)
      getData(newuuid)
      console.log(`Stored at ${uuid}, Value: ${jsonValue}`)
    } catch (e) {
      // saving error
    }
  }

  const getData = async(key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      postObj = JSON.parse(value);
      setPost(postObj);
      if (value !== null) {
        // value previously stored
      }
    } catch (e) {
      //error reading value
    }
  }

  return (
    <View style={{flex: 1}}>
      {/* Search Bar */}
      <GooglePlacesAutocomplete
        placeholder="Search"
        fetchDetails={true}
        GooglePlacesSearchQuery={{
          rankby: "distance",
        }}
        onPress={(data, details = null) => {
          // console.log(data, details)
          console.log("Formatted Address", details.formatted_address)
          console.log("Name", details.name)
          setFlag(true)
          storeData(details)
          setRegion({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.004757,
            longitudeDelta: 0.006866,
          })
        }}
        query={{
          key: myApiKey,
          language: "en",
          components: "country:us",
          types: "establishment",
          radius: 30000,
          location: `${region.latitude}, ${region.longitude}`
        }}
        styles={{
          container: { flex: 0, position: "absolute", width: "100%", zIndex: 1 },
          listView: { backgroundColor: "white" }
        }}
      />

      {/* Map interface */}
      { JSON.stringify(location) !== '{}' ?
        <MapView 
          style={styles.map}
          provider='google'
          region= { flag ? region : {
            latitude: lat,
            longitude: long,
            latitudeDelta: 0.004757,
            longitudeDelta: 0.006866,
          }}
        >
          {/* Marker for the searched location */}
          <Marker coordinate={{latitude: region.latitude, longitude: region.longitude}} />

          {/* Marker for the current location */}
          <Marker coordinate={{latitude: lat, longitude: long}}> 
            <Callout>
              <Text>I'm here</Text>
            </Callout>
          </Marker>
        </MapView> :

        // If location permission isn't granted
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
    height: '100%'
  },
});
