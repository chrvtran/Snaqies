import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './screens/Home'
import PostScreen from './screens/Post'
import CameraOpen from './screens/CameraOpen'
import SettingsScreen from './screens/Settings'
import ProfileScreen from './screens/Profile'
import Bookmarks from './screens/Bookmarks';

import HomeIcon from './assets/icons/home.svg';
import SettingsIcon from './assets/icons/settings.svg';
import CameraIcon from './assets/icons/camera.svg';
import BookmarkIcon from './assets/icons/bookmark.svg';
import ProfileIcon from './assets/icons/profile.svg';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
 
function TabNavigator() {
  return(
    <Tab.Navigator 
      initialRouteName="Snaqies"
      tabBarOptions={{showLabel: false}}
    >
      <Tab.Screen 
        name="Snaqies" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image 
                source={require('./assets/icons/home.png')}
                resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#e32f45' : '#748c94'
                }}
              />
            </View>
          )
        }} 
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image 
                source={require('./assets/icons/settings.png')}
                resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#e32f45' : '#748c94'
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
              <Image 
                source={require('./assets/icons/camera.png')}
                resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#e32f45' : '#748c94'
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
              <Image 
                source={require('./assets/icons/bookmark.png')}
                resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#e32f45' : '#748c94'
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
              <Image 
                source={require('./assets/icons/profile.png')}
                resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#e32f45' : '#748c94'
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
    </Stack.Navigator>
  );
}

function App(){
  return(
    <NavigationContainer>
      <MainStack/>
    </NavigationContainer>
  );
}

export default App;
