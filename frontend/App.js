// disable borring yellow alerts
console.disableYellowBox = true;


// import components
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

// import des composants
import HomeScreen from './screens/homeScreen'
import BottomTabNavigator from './components/BottomNav'

// modules
import { createStackNavigator } from '@react-navigation/stack';

// redux
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import pseudo from './reducers/pseudo.reducer'
import poi from './reducers/poi.reducer'

const store = createStore(combineReducers({ pseudo, poi }));


function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyStack headerMode='none' />
      </NavigationContainer>
    </Provider>
  );
}

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Map" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
}



// keep export at the end
export default App;