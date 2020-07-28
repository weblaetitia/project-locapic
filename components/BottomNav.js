import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MapScreen from '../screens/mapScreen'
import ChatScreen from '../screens/chatScreen'

import { FontAwesome } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 


const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator tabBarOptions={{
        activeTintColor: '#eb4d4b',
        inactiveTintColor: '#FFFFFF',
        activeBackgroundColor: '#130f40',
        inactiveBackgroundColor: '#130f40'
      }}
      >
    <Tab.Screen name="Map" component={MapScreen} options={{
          tabBarLabel: 'Map',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="location-arrow" size={size} color={color} />
          ),
        }}/>
    <Tab.Screen name="Chat" component={ChatScreen} options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="chat" color={color} size={size} />
          ),
        }}/>
  </Tab.Navigator>
  )
}
