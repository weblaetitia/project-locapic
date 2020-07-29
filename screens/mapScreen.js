import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, {Marker} from 'react-native-maps'

 function MapScreen({navigation}) {
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
        </MapView>
      </View>
  );
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