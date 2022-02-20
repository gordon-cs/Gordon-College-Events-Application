import { StyleSheet, View, Text, Image } from 'react-native';
import Events from './src/EventsView.js';
import { BottomAppBar, TopAppBar } from './src/AppBar.js';
import React, { Component } from 'react';
import SwipeAllCards from './src/SwipeCards';


export default function App() {
  return (
    <View style={styles.container}>
      <TopAppBar/>
      <SwipeAllCards/>
      <BottomAppBar/>
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
});


