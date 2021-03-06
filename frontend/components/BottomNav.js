import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {View} from 'react-native'

import MapScreen from '../screens/mapScreen'
import ChatScreen from '../screens/chatScreen'
import poiScreen from '../screens/poiScreen'

import { FontAwesome } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 




const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
  <Tab.Navigator tabBarOptions={{
    activeTintColor: '#eb4d4b',
    inactiveTintColor: '#FFFFFF',
    activeBackgroundColor: '#130f40',
    inactiveBackgroundColor: '#130f40',
    safeAreaInset: { bottom: 'never', top: 'never' } ,
    style: {
      backgroundColor: '#130f40'
    }
  }}
  >
    <Tab.Screen name="Map" component={MapScreen} options={{
          tabBarLabel: 'Map',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="location-arrow" size={size} color={color} />
          ),
        }}/>
    <Tab.Screen name="Poi" component={poiScreen} options={{
          tabBarLabel: 'POI',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="heart" color={color} size={size} />
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
