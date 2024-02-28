import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
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
  const [location, setLocation] = useState({});
  const [place, setPlace] = useState('{}')
<<<<<<< Updated upstream
  const distance_threshold = 0.01

  const calculateDistance = (coord1, coord2) => {
    return Math.sqrt(
      Math.pow(coord1.latitude - coord2.latitude, 2) +
      Math.pow(coord1.longitude - coord2.longitude, 2)
    );
  };
  const findClosestIcon = (pressedCoordinate) => {
    // Replace this with your logic to find the closest labeled icon
    const labeledIcons = [
      { latitude: 37.7749, longitude: -122.4194, description: "Example Icon 1" },
      { latitude: 37.7858, longitude: -122.4016, description: "Example Icon 2" },
      // Add more labeled icons as needed
    ];
  
    // Placeholder logic to find the closest icon based on distance
    const closestIcon = labeledIcons.reduce((closest, icon) => {
      const distance = calculateDistance(pressedCoordinate, icon);
  
      if (!closest || distance < closest.distance) {
        return { icon, distance };
      }
  
      return closest;
    }, null);
  
    return closestIcon ? closestIcon.icon : null;
  };
=======
  const distance_threshold = 0.01;
>>>>>>> Stashed changes
  // On intial tab open...

  const calculateDistance = (coord1, coord2) => {
    return Math.sqrt(
      Math.pow(coord1.latitude - coord2.latitude, 2) +
      Math.pow(coord1.longitude - coord2.longitude, 2)
    );
  };
  
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

  // Stores location data asynchronously
  const storeData = async () => {
    try {
      const jsonValue = JSON.stringify(place)
      await AsyncStorage.mergeItem(key, jsonValue)
      getData(key)
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
        console.log(`Key: ${key}, Value: ${Object.values(values)}`)
      }
    } catch (e) {
      console.log(`No key: ${key}`)
    }
  };

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

      {/* TEMPORARY: Blue button to go back to home if stuck */}
      <View style={styles.nextButton}>
        <TouchableOpacity onPress={() => storeData() && navigation.navigate('Home')}>
          <NextArrow/>
        </TouchableOpacity>
      </View>

      {/* Map interface */}
      { JSON.stringify(location) !== '{}' ?
<<<<<<< Updated upstream
        <MapView 
        style={styles.map}
        provider='google'
        region={flag ? region : {
          latitude: lat,
          longitude: long,
          latitudeDelta: 0.004757,
          longitudeDelta: 0.006866,
        }}
        onPress={(event) => {
          const { coordinate } = event.nativeEvent;
          // Set the region to the pressed coordinate
          setRegion({
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
            latitudeDelta: 0.004757,
            longitudeDelta: 0.006866,
          });
        }}
      >
        {/* Marker for the current location */}
        {region.latitude && !region.longitude && (
          <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }}>
            <Callout>
              <View>
                <Text>I'm here</Text>
              </View>
            </Callout>
          </Marker>
        )}
      
        {/* Marker for the pressed location */}
        {region.latitude && region.longitude && (
          <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }}>
            <Callout>
              <View>
                <Text>Pressed Location</Text>
              </View>
            </Callout>
          </Marker>
        )}
      
        {/* Recenter Button */}
        <TouchableOpacity
          style={styles.recenterButton}
          onPress={() => {
            if (location.coords) {
              // Update the current location marker's coordinate to the device's location
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
=======
            <MapView 
            style={styles.map}
            provider='google'
            region={flag ? region : {
              latitude: lat,
              longitude: long,
              latitudeDelta: 0.004757,
              longitudeDelta: 0.006866,
            }}
            onPress={(event) => {
              const { coordinate } = event.nativeEvent;
              alert(`Selected Location - Lat: ${coordinate.latitude}, Lng: ${coordinate.longitude}`);
            }}
          >
            {/* Marker for the current location */}
            {region.latitude && region.longitude && (
              <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }}>
                <Callout>
                  <Text>I'm here</Text>
                </Callout>
              </Marker>
            )}
          
            {/* Recenter Button */}
            <TouchableOpacity
              style={styles.recenterButton}
              onPress={() => {
                if (location.coords) {
                  // Update the current location marker's coordinate to the device's location
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
>>>>>>> Stashed changes

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
  nextButton: {
    height: 90,
    width: 65,
    right: 0,
    left: 320,
  },
  recenterButton: {
    position: 'absolute',
    top: '5%',
    right: '5%',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    zIndex: 1, // Ensure the button is above the map
  },
});
