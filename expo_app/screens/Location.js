import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import * as GeoLocation from "expo-location";
import { useEffect, useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// import Geocoder from "react-native-geocoding";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NextArrow from "expo_app/assets/icons/arrow-foward.svg";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ScreenStackHeaderConfig } from "react-native-screens";

function Location({ route, navigation }) {
  const myApiKey = "AIzaSyCgk68Pqz4Jqfks8NqrR2kRXXeObK_z86U";
  // Geocoder.init("AIzaSyCgk68Pqz4Jqfks8NqrR2kRXXeObK_z86U");

  const { key } = route.params;
  let { photoSet, setPhotoSet, photoList } = route.params; // [photoSet, setPhotoSet] = CO.js photo slider state
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [location, setLocation] = useState({});
  const [place, setPlace] = useState({
    formatted_address: "",
    name: "",
    geometry: { location: { lat: 0, lng: 0 } },
  });

  // On intial tab open...
  useEffect(() => {
    (async () => {
      // Request access to device location (if not already)
      let { status } = await GeoLocation.requestForegroundPermissionsAsync();

      if (status === "granted") {
        console.log("Permission granted");
        // Gets current location
        const loc = await GeoLocation.getCurrentPositionAsync();
        setLocation(loc);
        const place = await findPlace(
          await reverseGeolocate(loc.coords.latitude, loc.coords.longitude),
        );
        setPlace(place);

        // Reassign initial lat,lng values for current location
        setLat(loc.coords.latitude)
        setLng(loc.coords.longitude)

      } else {
        console.log("Permission not granted");
      }
    })();
  }, []);

  // Gets address based on coordinates
  const reverseGeolocate = (latitude, longitude) => {
    return new Promise((resolve, reject) => {
      let url = `https://maps.googleapis.com/maps/api/geocode/json?fields=name`;
      url += `&address=${latitude},${longitude}`;
      url += `&key=${myApiKey}`;
      fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.status === "OK") {
            resolve(responseJson?.results?.[0]?.formatted_address);
          } else {
            reject("not found");
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  // Makes a Place search to find certain information about an input
  const findPlace = (input) => {
    return new Promise((resolve, reject) => {
      let url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?`;
      url += `fields=formatted_address,name,geometry`;
      url += `&input=point_of_interest ${input}`;
      url += `&inputtype=textquery`;
      url += `&key=${myApiKey}`;
      fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.status === "OK") {
            resolve(responseJson?.candidates?.[0]);
          } else {
            reject("not found");
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  clearPhotoSet = () => {
    setPhotoSet([]);
    photoList.current = [];
  };

  // Stores location data asynchronously
  const storeData = async () => {
    try {
      const jsonValue = JSON.stringify(place);
      await AsyncStorage.mergeItem(key, jsonValue);
      getData(key);
      clearPhotoSet();
    } catch (e) {
      // saving error
    }
  };

  // Debugging function to print out uuid and stored content
  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      let values = JSON.parse(value);
      if (value !== null) {
        console.log(
          `CREATING SNAQ POST\tKey: ${key}\tValue: ${Object.values(values)}`,
        );
      }
    } catch (e) {
      console.log(`No key: ${key}`);
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
          setPlace({
            formatted_address: details.formatted_address,
            name: details.name,
            geometry: details.geometry,
          });
          setLat(details.geometry.location.lat)
          setLng(details.geometry.location.lng)
        }}
        query={{
          key: myApiKey,
          language: "en",
          components: "country:us",
          types: "establishment",
          radius: 30000,
          location: `${lat}, ${lng}`,
        }}
        styles={{
          container: {
            flex: 0,
            position: "absolute",
            width: "100%",
            zIndex: 1,
          },
          listView: { backgroundColor: "white" },
        }}
      />

      {/* Post Button */}
      <TouchableOpacity
        style={styles.postButton}
        onPress={() => storeData() && navigation.navigate("Home")}
      >
        <Text
          style={{
            fontSize: 20,
            color: "#00A3FF",
          }}
        >
          Post
        </Text>
      </TouchableOpacity>

      {/* Map interface */}
      {JSON.stringify(location) !== "{}" ? (
        <MapView
          style={styles.map}
          provider="google"
          region={
            {
              latitude: lat,
              longitude: lng,
              latitudeDelta: 0.004757,
              longitudeDelta: 0.006866,
            }
          }
          onPress={(data) => {
            setLat(data.nativeEvent.coordinate.latitude)
            setLng(current = data.nativeEvent.coordinate.longitude)
            // Geocoder.from(data?.nativeEvent.coordinate)
            //   .then((json) => {
            //     new_formatted_address = json.results[0].formatted_address;
            //     new_short_name =
            //       json.results[0].address_components[1].short_name;
            //     setPlace({
            //       formatted_address: new_formatted_address,
            //       name: new_short_name,
            //       geometry: markerData,
            //     });
            //   })

            //   .catch((error) => console.warn(error));
          }}
          onPoiClick={(data) => {
            setLat(data.nativeEvent.coordinate.latitude)
            setLng(current = data.nativeEvent.coordinate.longitude)
            // Geocoder.from(data?.nativeEvent.coordinate)
            //   .then((json) => {
            //     POI_formatted_address = json.results[0].formatted_address;
            //     findPlace(POI_formatted_address)
            //       .then((place) => {
            //         POI_name = place.name;
            //         setPlace({
            //           formatted_address: POI_formatted_address,
            //           name: POI_name,
            //           geometry: markerData,
            //         });
            //       })
            //       .catch((error) => console.warn(error));
            //   })
            //   .catch((error) => console.warn(error));
          }}
        >
          {/* Marker for location */}
          <Marker coordinate={{latitude: lat, longitude: lng}} />

          {/* Marker for findPlace location */}
          {/*<Marker coordinate={{ latitude: place.geometry.location.lat, longitude: place.geometry.location.lng }}>
            <Callout>
              <Text>{place.name}</Text>
            </Callout>
          </Marker> *}

          {/* Recenter Button */}
          <TouchableOpacity
            style={styles.recenterButton}
            onPress={() => {
              print("recenter button pressed");
              if (location.coords) {
                setLat(location.coords.latitude)
                setLng(location.coords.longitude)
              }
            }}
          >
            <Icon name="my-location" size={24} color="black" />
          </TouchableOpacity>
        </MapView>
      ) : (
        // If location permission isn't granted
        <View>
          <MapView style={styles.map} provider="google" />
          <Text>Location Permission not Granted</Text>
        </View>
      )}
    </View>
  );
}

export default Location;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 90,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  postButton: {
    position: "absolute",
    right: 20,
    top: -40,
  },
  recenterButton: {
    position: "absolute",
    top: 60,
    right: 20,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    zIndex: 1, // Ensure the button is above the map
  },
});
