import React, {useState, useEffect} from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { ListItem, Input, Button } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {connect} from 'react-redux'

// import socket.io
import socketIOClient from "socket.io-client"
// test avec 	inet 10.2.3.55 netmask 0xffff0000 broadcast 10.2.255.255
var socket = socketIOClient("http://10.2.3.55:3000/")


function ChatScreen({pseudo}) {
  const [currentMessage, setCurrentMessage] = useState('')
  const [listMessage, setListMessage] = useState([])

  useEffect(() => { 
    socket.on('sendMessageToAll', (message)=> {
      setListMessage([...listMessage, message])
    });
    
  }, [listMessage]);

  const sendMessageToBack = () => {
    var message = {
      message: currentMessage,
      pseudo: pseudo
    }
    console.log(message)
    socket.emit('sendMessage', message)
    setCurrentMessage('')
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chat}>
      {
        listMessage.map((element, i) => (
          <ListItem
            style={styles.fullWidth}
            key={i}
            title={element.message}
            subtitle={element.pseudo}
            bottomDivider
          />
        ))
      }
      </ScrollView>
      <KeyboardAvoidingView behavior="padding" enabled style={styles.fullWidth} >
        <Input placeholder='type your message here' 
        value={currentMessage} 
        containerStyle={{width:'80%',marginVertical:10, marginHorizontal:'auto'}} 
                onChangeText={(e) => setCurrentMessage(e)}
        />
        <Button icon={ <MaterialCommunityIcons name="send" size={15} color="white" style={{marginLeft:8}} />}
                title="Send"
                iconRight
                onPress={()=> sendMessageToBack() }
              />
       
      </KeyboardAvoidingView>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  fullWidth: {
    width: '100%'
  }, 
  chat: {
    width: '100%',
    paddingTop: 75
  }

})


/* REDUX */

// get pseudo from store
function mapStateToProps(state) {
  return { pseudo: state.pseudo }
}



export default connect(
  mapStateToProps, null
  )(ChatScreen)