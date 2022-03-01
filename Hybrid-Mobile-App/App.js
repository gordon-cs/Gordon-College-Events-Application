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
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio';


const Stack = createNativeStackNavigator();

const App = () => {

  const Events = ({ navigation }) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{padding: 10}}>
          <EventCards navigation={navigation}/>
        </View>  
      </View>
    )
  }

  const UpcomingList = ({ navigation, route }) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{padding: 10}}>
          <UpcomingListView savedEvents={route.params.savedEvents }/>
        </View>  
      </View>
    );
  }
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Events"
          component={Events}
          options={{ 
            headerShown: true, 
            // I think should be false because button cannot be
            // placed in header from EventCards right? 
            // maybe use app bar? 
            headerStyle: {
              backgroundColor: '#014983',
            },
            headerTitleStyle: {
              //fontFamily: 'Gotham SSm 7r',
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
              //fontFamily: 'Gotham SSm 7r',
              fontWeight: '900',
              color: 'white',
              fontSize: 20,
            },
          }}
        />
      </Stack.Navigator>
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