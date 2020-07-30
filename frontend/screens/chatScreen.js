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

  // messages loop
  var messageLoop = listMessage.map(function(element, i) {
    // moderate messages' text
    var smile = ':)';
    var unsmile = ':(';
    var tongue = ':p';
    var fuck = /(fuck\S+)|(fuck)/ig;
    var modifyMessage = element.message.replace(smile, "\u263A")
    modifyMessage = modifyMessage.replace(unsmile, "\u2639")
    modifyMessage = modifyMessage.replace(tongue, "\uD83D\uDE1B")
    modifyMessage = modifyMessage.replace(fuck, "\u2022\u2022\u2022")
    return (<ListItem
      style={styles.fullWidth}
      key={i}
      title={modifyMessage}
      subtitle={element.pseudo}
      bottomDivider
    />)
  })

  
  return (
    <View style={styles.container}>
      <ScrollView style={styles.chat}>
      {messageLoop
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