import React from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView } from 'react-native';
import { ListItem, Input, Button } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons'; 

import {connect} from 'react-redux'


function poiScreen(props) {
  
  console.log('poiScreen: ', props.poi)
  return (
    <View style={styles.container}>
      <ScrollView style={styles.list}>
      {
        props.poi.map((l, i) => (
          <ListItem key={i}
            title={l.title}
            subtitle={l.description}
            rightIcon={<FontAwesome5 name="trash-alt" size={20} color="grey" onPress={() => props.deletePoi(i)}
              />}
            bottomDivider
          />
        ))
      }
      </ScrollView>
      
     
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    list :{
        width: '100%',
        marginTop: 30
    }
  })

/* REDUX */

// get list from mapScreen
function mapStateToProps(state) {
    return { poi: state.poi }
}

// delete poi from list
function mapDispatchToProps(dispatch) {
    return {
        deletePoi: function(num) {
            console.log(num)
            dispatch( {type: 'removePoi', num: num})
        }
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(poiScreen);