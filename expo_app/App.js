import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeScreen from './screens/Home'
import PostScreen from './screens/Post'
import SettingsScreen from './screens/Settings'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
 
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{headerShown: false}}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{title: 'Home'}} 
        />
        <Stack.Screen name="Post" component={PostScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;