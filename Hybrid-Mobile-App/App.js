import { StyleSheet, View, Text, SafeAreaView, Button, Image, Colors } from 'react-native';
import { BottomAppBar, TopAppBar } from './src/UI/AppBar.js';
import React, { Component, useEffect, useState } from 'react';
import EventMethods from './src/Services/EventsMethods.js'
import EventCards from './src/UI/EventCards.js';
import UndoPreference from './src/UI/UndoPreference.js';
import {UndoButton} from './src/UI/UndoPreference.js';
import UpcomingListView from './src/UI/UpcomingEventsView.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

/*
export const App = () => {
    return (
      <View style={styles.container}>
        <TopAppBar/>
        <View style={{bottom:15, justifyContent:'center',top: 20, paddingTop:10}}>
        <EventCards/>
        </View>
        <BottomAppBar/>
        <View style={{bottom:26.5,backgroundColor:'rgba(0,0,0, 0.4)',borderRadius:8,height: 50,fontWeight: "bold",}}>
        <UndoButton/>
        </View>
      </View>
    );
*/
function EventsSwipe({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{top: 5,bottom: 2, padding: 10}}>
        <Button
          title="Go to Upcoming"
          onPress={() => navigation.navigate('Upcoming')}
        />
        <View style={{bottom: 5}}>
        <EventCards/>
        </View>
      </View>  
    </View>
  );
}

function UpcomingList({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{padding: 10}}>
        <Button
          title="Go to Events"
          onPress={() => navigation.navigate('Home')}
        />
        <UpcomingListView/>
      </View>  
    </View>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={EventsSwipe}
          options={{ 
            headerStyle: {
              backgroundColor: '#014983',
            },
            headerTitleStyle: {
              fontFamily: 'Gotham SSm 7r',
              fontWeight: '900',
              color: 'white',
              fontSize: 20,
            },
          }}
        />
        <Stack.Screen 
          name="Upcoming" 
          component={UpcomingList}
          options={{
            headerStyle: {
              backgroundColor: '#014983',
            },
            headerTitleStyle: {
              fontFamily: 'Gotham SSm 7r',
              fontWeight: '900',
              color: 'white',
              fontSize: 20,
            },
          }}
        />
      </Stack.Navigator>
      <BottomAppBar/>
      <View style={{bottom:3,backgroundColor:'rgba(0,0,0, 0.4)',borderRadius:8,height: 50,fontWeight: "bold",}}>
        <UndoButton/>
      </View>
    </NavigationContainer>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  Buttoncontainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;