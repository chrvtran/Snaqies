import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/Home";
import PostScreen from "./screens/Post";
import CameraOpen from "./screens/CameraOpen";
import LocationScreen from "./screens/Location";
import RatingsScreen from "./screens/Ratings";
import PriceScreen from "./screens/Price";
import TestingScreen from "./screens/Testing";
import ReviewScreen from "./screens/Review";
import HomeIcon from "./assets/icons/home.svg";
import LocationIcon from "./assets/icons/location.svg";
import CameraIcon from "./assets/icons/camera.svg";
import SavedIcon from "./assets/icons/saved.svg";
import ReviewIcon from "./assets/icons/review.svg";
import TagFood from "./screens/TagFood";
import SelectPhotoScreen from './screens/SelectPhoto';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Snaqies"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {},
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        initialParams={{ photoList: 0 }}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <HomeIcon
                style={{
                  fill: focused ? "#e32f45" : "#748c94",
                }}
              />
            </View>
          ),
        }}
      />
      {/* <Tab.Screen 
        name="Location" 
        component={LocationScreen} 
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <LocationIcon
                style={{
                  fill: focused ? '#e32f45' : '#748c94'
                }}
              />
            </View>
          )
        }}
      />  */}

      <Tab.Screen
        name="Camera"
        component={CameraOpen}
        options={{
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <CameraIcon
                style={{
                  fill: focused ? "#e32f45" : "#748c94",
                }}
              />
            </View>
          ),
        }}
      />

      {/* <Tab.Screen 
        name="Review"
        component={ReviewScreen} 
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <ReviewIcon
                style={{
                  fill: focused ? '#e32f45' : '#748c94'
                }}
              />
            </View>
          )
        }}
      /> */}
      <Tab.Screen
        name="Testing"
        component={TestingScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <ReviewIcon
                style={{
                  fill: focused ? "#e32f45" : "#748c94",
                }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: () => <></>,
        headerTitleAlign: "center",
        headerBackVisible: false,
        headerShown: false,
      }}
    >
      <Stack.Screen name="TabNav" component={TabNavigator} />
      <Stack.Screen name="Post" component={PostScreen} />
      <Stack.Screen name="Ratings" component={RatingsScreen} />
      <Stack.Screen name="Price" component={PriceScreen} />
      <Stack.Screen name="Location" component={LocationScreen} />
      <Stack.Screen name="TagFood" component={TagFood} />
      <Stack.Screen name="SelectPhoto" component={SelectPhotoScreen} />
      <Stack.Screen name="Camera" component={CameraOpen} />


    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}

export default App;
