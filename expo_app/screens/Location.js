import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as GeoLocation from 'expo-location';
import { useEffect, useState } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NextArrow from 'expo_app/assets/icons/arrow-foward.svg'
import Icon from 'react-native-vector-icons/MaterialIcons'; 

function Location({ route, navigation }) {

  const myApiKey = "AIzaSyCgk68Pqz4Jqfks8NqrR2kRXXeObK_z86U"

  const {key} = route.params
  let {photoSet, setPhotoSet, photoList} = route.params // [photoSet, setPhotoSet] = CO.js photo slider state
  const [location, setLocation] = useState({});
  const [place, setPlace] = useState('{}')
  
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
        const place = await findPlace(await reverseGeolocate(loc.coords.latitude, loc.coords.longitude))
        setPlace(place)
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

  clearPhotoSet = () => {
    console.log('Clearing PhotoSet');
    setPhotoSet([]);
    photoList.current = [];
  }

  // Stores location data asynchronously
  const storeData = async () => {
    try {
      const jsonValue = JSON.stringify(place)
      await AsyncStorage.mergeItem(key, jsonValue)
      getData(key)
      clearPhotoSet();
    } catch (e) {
      // saving error
    }
  }

  // Debugging function to print out uuid and stored content
  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      let values = JSON.parse(value)
      if (value !== null) {
        console.log(`CREATING SNAQ POST\tKey: ${key}\tValue: ${Object.values(values)}`)
      }
    } catch (e) {
      console.log(`No key: ${key}`)
    }
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <GooglePlacesAutocomplete
        placeholder="Search"
        fetchDetails={true}
        GooglePlacesSearchQuery={{
          rankby: "distance",
        }}
        onPress={(data, details = null) => {
          // console.log(data, details)
          setFlag(true)
          setPlace({formatted_address: details.formatted_address, name: details.name})
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

      {/* Post Button */}
      <TouchableOpacity 
            style={styles.postButton}
            onPress={() => storeData() && navigation.navigate('Home')}>
            <Text style={{
              fontSize: 20,
              color: '#00A3FF'
            }}>Post
            </Text>
      </TouchableOpacity>

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
              <Text>{place.name}</Text>
            </Callout>
          </Marker>

          {/* Recenter Button */}
          <TouchableOpacity
            style={styles.recenterButton}
            onPress={() => {
              print("recenter button pressed")
              if (location.coords) {
                setRegion({
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                  latitudeDelta: 0.004757,
                  longitudeDelta: 0.006866,
                });
              }
            }}
          >
            <Icon name="my-location" size={24} color="black" />
          </TouchableOpacity>
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
    top: 90
  },
  map: {
    width: '100%',
    height: '100%'
  },
  postButton: {
    position: 'absolute',
    right: 20,
    top: -40
  },
  recenterButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    zIndex: 1, // Ensure the button is above the map
  },
});
