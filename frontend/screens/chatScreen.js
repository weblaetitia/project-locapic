import React, {useState, useEffect} from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { ListItem, Input, Button } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// import socket.io
import socketIOClient from "socket.io-client"
// test avec 	inet 10.2.3.55 netmask 0xffff0000 broadcast 10.2.255.255
var socket = socketIOClient("http://10.2.3.55:3000/")


export default function ChatScreen() {
  const [currentMessage, setCurrentMessage] = useState('')
  const [listMessage, setListMessage] = useState([])

  useEffect(() => { 
    socket.on('sendMessageToAll', (message)=> {
      setListMessage([...listMessage, message])
    });
    
  }, [listMessage]);


  return (
    <View style={styles.container}>
      <ScrollView style={styles.fullWidth}>
      {
        listMessage.map((l, i) => (
          <ListItem
            style={styles.fullWidth}
            key={i}
            title={l}
            subtitle='John'
            bottomDivider
          />
        ))
      }
      </ScrollView>
      <KeyboardAvoidingView behavior="padding" enabled style={styles.fullWidth} >
        <Input placeholder='type your message here' containerStyle={{width:'80%',marginVertical:10, marginHorizontal:'auto'}} 
                onChangeText={(e) => setCurrentMessage(e)}
        />
        <Button icon={ <MaterialCommunityIcons name="send" size={15} color="white" style={{marginLeft:8}} />}
                title="Send"
                iconRight
                onPress={()=> socket.emit('sendMessage', currentMessage) }
              />
       
      </KeyboardAvoidingView>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  fullWidth: {
    width: '100%'
  }

})
