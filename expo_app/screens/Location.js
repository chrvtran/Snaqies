import React from 'react';
import { Text, View } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as GeoLocation from 'expo-location';
import { useEffect, useState } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import styles from './styleSheet';
 
function Location({ navigation }) {

  const [location, setLocation] = useState({});

  let lat = 0;
  let long = 0;

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
      }

    })();
  }, []);
  
  if (JSON.stringify(location) !== '{}') {
    lat = location.coords.latitude;
    long = location.coords.longitude;
  }

  const [ region, setRegion ] = React.useState({
    latitude: lat,
    longitude: long,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })

  return (
    <View style={{flex: 1}}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        fetchDetails={true}
        GooglePlacesSearchQuery={{
          rankby: "distance",
        }}
        onPress={(data, details = null) => {
          console.log(data, details)
          setRegion({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          })
        }}
        query={{
          key: "AIzaSyCgk68Pqz4Jqfks8NqrR2kRXXeObK_z86U",
          language: "en",
          components: "country:us",
          types: "establishment",
          radius: 30000,
          location: `${lat}, ${long}`
        }}
        styles={{
          container: { flex: 0, position: "absolute", width: "100%", zIndex: 1 },
          listView: { backgroundConolor: "white" }
        }}
      />
      { JSON.stringify(location) !== '{}' ?
        <MapView 
          style={styles.locationMap}
          provider='google'
          region={{
            latitude: lat,
            longitude: long,
            latitudeDelta: 0.004757,
            longitudeDelta: 0.006866,
          }}
        >
          <Marker coordinate={{latitude: region.latitude, longitude: region.longitude}} />
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
            style={styles.locationMap}
            provider='google'
          />
          <Text>Location Permission not Granted</Text>
        </View>
      }
    </View>
  );
}

export default Location;

