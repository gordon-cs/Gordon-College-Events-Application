import { StyleSheet, View, SafeAreaView, Image } from 'react-native';
import { BottomAppBar, TopAppBar } from './src/UI/AppBar.js';
import React, { Component, useEffect, useState } from 'react';
import EventMethods from './src/Services/EventsMethods.js'
import EventCards from './src/UI/EventCards.js';
import UpcomingListView from './src/UI/UpcomingEventsView.js';
import { NavigationContainer } from '@react-navigation/native';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createBottomTabNavigator();

function EventsSwipe() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{padding: 10}}>
        <EventCards/>
      </View>  
    </View>
  );
}

function UpcomingList() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{padding: 10}}>
        <UpcomingListView/>
      </View>  
    </View>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
          tabBarActiveBackgroundColor: '#014983',
          tabBarActiveTintColor: '#014983',
        }}>
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
  bars: {
    backgroundColor: '#014983',
  },
});

export default App;

