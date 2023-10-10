import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeScreen from './screens/Home'
import PostScreen from './screens/Post'
import SettingsScreen from './screens/Settings'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
 
function TabNavigator() {
  return(
    <Tab.Navigator
      initialRouteName="Home"
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Camera" component={HomeScreen /*gotta replace this with camera*/} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
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
};

function App(){
  return(
    <NavigationContainer>
      <MainStack/>
    </NavigationContainer>
  )
}

export default App;
