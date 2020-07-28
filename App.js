import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

// import des composants
import HomeScreen from './screens/homeScreen'
import MapScreen from './screens/mapScreen'
import ChatScreen from './screens/chatScreen'

// modules
import { createStackNavigator } from '@react-navigation/stack';

function App() {
  return (
    <NavigationContainer>
      <MyStack headerMode='none' />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
    </Stack.Navigator>
  );
}



// keep export at the end
export default App;