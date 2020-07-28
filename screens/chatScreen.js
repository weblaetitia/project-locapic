import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { ListItem, Input, Button } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function ChatScreen() {

  const list = [
    {
      subtitle: 'Alex',
      name: 'Parfait et toi ?'
    },
    {
      subtitle: 'John',
      name: 'Coucou ça roule ?'
    }, {
      subtitle: 'Alex',
      name: 'Parfait et toi ?'
    },
    {
      subtitle: 'John',
      name: 'Coucou ça roule ?'
    }, {
      subtitle: 'Alex',
      name: 'Parfait et toi ?'
    },
    {
      subtitle: 'John',
      name: 'Coucou ça roule ?'
    }, {
      subtitle: 'Alex',
      name: 'Parfait et toi ?'
    },
    {
      subtitle: 'John',
      name: 'Coucou ça roule ?'
    }, {
      subtitle: 'Alex',
      name: 'Parfait et toi ?'
    },
    {
      subtitle: 'John',
      name: 'Coucou ça roule ?'
    }, {
      subtitle: 'Alex',
      name: 'Parfait et toi ?'
    },
    {
      subtitle: 'John',
      name: 'Coucou ça roule ?'
    }, 
  ]

  return (
    <View style={styles.container}>
      <ScrollView style={styles.fullWidth}>
      {
        list.map((l, i) => (
          <ListItem
            style={styles.fullWidth}
            key={i}
            title={l.name}
            subtitle={l.subtitle}
            bottomDivider
          />
        ))
      }
      </ScrollView>
      <KeyboardAvoidingView style={styles.fullWidth} >
        <Input placeholder='type your message here' style={styles.fullWidth} />
        <Button icon={ <MaterialCommunityIcons name="send" size={15} color="white" />}
                title="Send"
              />
      </KeyboardAvoidingView>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%'
  }

})
