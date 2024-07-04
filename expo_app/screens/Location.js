import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import * as GeoLocation from "expo-location";
import { useEffect, useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NextArrow from "../assets/icons/arrow-foward.svg";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ScreenStackHeaderConfig } from "react-native-screens";

const myApiKey = "AIzaSyCgk68Pqz4Jqfks8NqrR2kRXXeObK_z86U";
// Gets address based on coordinates
export const reverseGeolocate = (latitude, longitude) => {
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
export const findPlace = (input) => {
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

export async function getUserCurrentLocation() {
  // Request access to device location
  let { status } = await GeoLocation.requestForegroundPermissionsAsync();

  if (status == "granted") {
    console.log("Permission granted");

    // Get user location data
    const loc = await GeoLocation.getCurrentPositionAsync();
    console.log(loc);
    const lat = loc.coords.latitude;
    const lng = loc.coords.longitude;

    // Use reverse geolocation to find address
    const place = await findPlace(await reverseGeolocate(lat, lng));

    return {
      location: loc,
      place: place,
      lat: lat,
      lng: lng
    }
  }

  // Permission not granted, so return null
  return null;
}

function Location({ route, navigation }) {
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
      const userLocData = await getUserCurrentLocation();
      if (userLocData !== null) {
        setLocation(userLocData.location);
        setPlace(userLocData.place);
        setLat(userLocData.lat);
        setLng(userLocData.lng);
      }
    })();
  }, []);

  clearPhotoSet = () => {
    setPhotoSet([]);
    photoList.current = [];
  };

  // Stores location data asynchronously
  const storeData = async (publish) => {
    try {
      // Fetch location data
      const jsonValue = JSON.stringify(place);
      
      // Fetch post from async storage
      const postStr = await AsyncStorage.getItem(key);
      let postObj = JSON.parse(postStr);

      // Set published flag for postObj
      postObj.published = publish;

      // Set item at the given key
      await AsyncStorage.setItem(key, JSON.stringify(postObj));

      // Merge location data with existing post object and clear photo list
      await AsyncStorage.mergeItem(key, jsonValue);
      getData(key);

      // Test if location is saved when saving a draft
      if (!publish) {
        const savedPost = await AsyncStorage.getItem(key);
        let values = JSON.parse(savedPost);

        if (values.hasOwnProperty("formatted_address")) {
          console.log("Location data saved successfully.");
          console.log("Address: " + values.formatted_address + "\nName: " + values.name);
        } else {
          console.log("Failed to save location data.");
          console.log("Saved data: " + savedPost);
        }
      }

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
        onPress={() => storeData(true) && navigation.navigate("Home")}
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
            reverseGeolocate(lat, lng).then(data => findPlace(data).then(place => setPlace(place)))
          }}
          onPoiClick={(data) => {
            setLat(data.nativeEvent.coordinate.latitude)
            setLng(current = data.nativeEvent.coordinate.longitude)
            reverseGeolocate(lat, lng).then(data => findPlace(data).then(place => setPlace(place)))
          }}
        >
          {/* Marker for location */}
          <Marker coordinate={{latitude: lat, longitude: lng}} />

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
          <MapView style={styles.map} />
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
  saveDraftButton: {
    position: "absolute",
    left: 20,
    top: -40
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
