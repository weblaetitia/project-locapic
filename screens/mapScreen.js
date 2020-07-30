import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Button, Overlay, Input } from 'react-native-elements';
import MapView, {Marker} from 'react-native-maps'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { FontAwesome5 } from '@expo/vector-icons'; 
import {connect} from 'react-redux'


 function MapScreen({onSubmitPoi, poi}) {

  const [position, setPosition] = useState(null)
  const [overlayVisibility, setOverlayVisibility] = useState(false)
  const [addPoi, setAddPoi] = useState(false)
  const [poiCoord, setPoiCoord] = useState(null)
  const [poiTitle, setPoiTitle] = useState('')
  const [poiDescription, setPoiDescription] = useState('')
  const [poiList, setPoiList] = useState([])

  // // mettre liste des poi à jour 
  // useEffect(() => {
  //   function updatePoi() {
  //     setPoiList(poi)
  //   }
  //   updatePoi()
  // }, [poiList])

  
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

  // add poi when press
  const addCoordinates = (coord) => {
    if (addPoi == true) {
      setOverlayVisibility(true)
      setPoiCoord(coord)
      setAddPoi(false)
    } 
    console.log(poiList)
  } 

  // click sur modal btn
  const addNewPoi = () => {
    var newPoi = {
      title: poiTitle,
      description: poiDescription,
      latitude: poiCoord.latitude,
      longitude: poiCoord.longitude
    }
    setPoiList([...poiList, newPoi])
    console.log(newPoi)
    setOverlayVisibility(false)
    onSubmitPoi(poiList)
  }
  
  // wait for poilList update tend to props
  useEffect(() => {
    async function sendToProp() {
      onSubmitPoi(poiList)
    }
    sendToProp()
  }, [poiList])

  // set Markers
  if (poi != null) {
    var markerList = poi.map((poi, i) => {
    return (
      <Marker key={i} coordinate={{ latitude: poi.latitude, longitude: poi.longitude }}
                    title={poi.title}
                    description={poi.description}
                    pinColor='#130f40'
                    />
    )
  })
  }
  
 

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
                  onPress={(coord) => addCoordinates(coord.nativeEvent.coordinate)}
                  >
            <Marker coordinate={{ latitude: position.coords.latitude, longitude: position.coords.longitude }}
                    title='hello'
                    description='I am here!'
                    pinColor='#eb4d4b'
                    // icon={<FontAwesome5 name="map-marker-alt" size={24} color="red" />}
                    />   
            {markerList}             
          </MapView>
          <View style={styles.btnPoiContainer}>
            <Button onPress={ () => setAddPoi(true)}
                    title='Add point of interest' 
                    buttonStyle={{backgroundColor:'#eb4d4b'}} 
                    icon={
                    <FontAwesome5
                      name="plus-square"
                      size={20}
                      color="white"
                      style={{marginLeft:10}}
                    /> }
                    iconRight/> 
          </View>
          <Overlay
            isVisible={overlayVisibility}
            onBackdropPress={() => setOverlayVisibility(false)}
            windowBackgroundColor="rgba(255, 255, 255, .8)"
            overlayBackgroundColor="#ffffff"
            width="auto"
            height="auto"
          >
            <View>
               <Input placeholder='Titre' onChangeText={(e) => setPoiTitle(e)}/>
                <Input placeholder='Description' onChangeText={(e) => setPoiDescription(e)}/>
                <Button title='Add point of interest' 
                        buttonStyle={{backgroundColor:'#eb4d4b'}} 
                        onPress={() =>addNewPoi()}
                        />
            </View>
           
          </Overlay>
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
  btnPoiContainer: {
    width: (Dimensions.get('window').width) -20,
    position: 'absolute',
    bottom: 15, 
    alignSelf: 'center'
  }
})


/* REDUX */
// get list from store
function mapStateToProps(state) {
  return { poi: state.poi }
}

function mapDispatchToProps(dispatch) {
  return{
    onSubmitPoi: function(poi) {
      dispatch( {type: 'savePoi', poi: poi})
    }
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(MapScreen);

/* REDUX  */
