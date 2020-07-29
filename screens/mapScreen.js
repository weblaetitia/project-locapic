import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, {Marker} from 'react-native-maps'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { FontAwesome5 } from '@expo/vector-icons'; 

 function MapScreen({navigation}) {

  const [position, setPosition] = useState(null)

  useEffect(() => {
    async function askPermisions() {
      var {status} = await Permissions.askAsync(Permissions.LOCATION)
      if (status === 'granted') {
        Location.watchPositionAsync({distanceInterval:2},
          (location) => {
            setPosition(location)
          })
      }
    }
    askPermisions()
  }, [])

  if (position == null) {
    return (
      <View style={styles.container} />
    )
  } else {
    return (
      <View style={styles.container}>
          <MapView style={styles.mapStyle}
                   initialRegion={{
                    latitude: 48.866667,
                    longitude: 2.333333,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                  >
            <Marker coordinate={{ latitude: position.coords.latitude, longitude: position.coords.longitude }}
                    title='hello'
                    description='I am here!'
                    pinColor='pink'
                    // icon={<FontAwesome5 name="map-marker-alt" size={24} color="red" />}
                    />          
          </MapView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
})




// keep export at the end
export default MapScreen