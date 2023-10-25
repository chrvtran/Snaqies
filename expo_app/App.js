import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/Home';
import PostScreen from './screens/Post';
import CameraOpen from './screens/CameraOpen';
import LocationScreen from './screens/Location';
import RatingsScreen from './screens/Ratings';
import PriceScreen from './screens/Price';
import ProfileScreen from './screens/Profile';
import TestingScreen from './screens/Testing';
import Bookmarks from './screens/Bookmarks';
import HomeIcon from './assets/icons/home.svg';
import LocationIcon from './assets/icons/location.svg';
import CameraIcon from './assets/icons/camera.svg';
import BookmarkIcon from './assets/icons/bookmark.svg';
import ProfileIcon from './assets/icons/profile.svg';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return(
    <Tab.Navigator 
      initialRouteName="Snaqies"
      screenOptions={{headerShown: false, tabBarShowLabel: false}}
    >
      <Tab.Screen 
        name="Snaqies" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <HomeIcon 
                style={{
                  fill: focused ? '#e32f45' : '#748c94'
                }}
              />
            </View>
          )
        }} 
      />
      <Tab.Screen 
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
      /> 
      <Tab.Screen 
        name="Camera" 
        component={CameraOpen} 
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <CameraIcon
                style={{
                  fill: focused ? '#e32f45' : '#748c94'
                }}
              />
            </View>
          )
        }}
      />
      <Tab.Screen 
        name="Bookmarks" 
        component={Bookmarks} 
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <BookmarkIcon
                style={{
                  fill: focused ? '#e32f45' : '#748c94'
                }}
              />
            </View>
          )
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <ProfileIcon 
                style={{
                  fill: focused ? '#e32f45' : '#748c94'
                }}
              />
            </View>
          )
        }}
      />
      <Tab.Screen 
        name="Testing" 
        component={TestingScreen} 
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <ProfileIcon 
                style={{
                  fill: focused ? '#e32f45' : '#748c94'
                }}
              />
            </View>
          )
        }}
      />
    </Tab.Navigator>
  );
}

function MainStack() {
  return (
    <Stack.Navigator 
      screenOptions={{headerShown: false}}
    >
      <Stack.Screen name="TabNav" component={TabNavigator} />
      <Stack.Screen name="Post" component={PostScreen} />
      <Stack.Screen name="Ratings" component={RatingsScreen} />
      <Stack.Screen name="Price" component={PriceScreen}/>
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
