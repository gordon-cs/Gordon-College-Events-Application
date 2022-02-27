import { StyleSheet, View, Text, Image } from 'react-native';
import { BottomAppBar, TopAppBar } from './src/UI/AppBar.js';
import React, { Component, useEffect, useState } from 'react';
import EventCards from './src/UI/EventCards.js';
import UndoPreference from './src/UI/UndoPreference.js';
import {ReturnButton,AppButton} from './src/UI/UndoPreference.js';


const App = () => {
    return (
      <View style={styles.container}>
        <TopAppBar/>
        <View style={{bottom:15, justifyContent:'center',top: 20, paddingTop:10}}>
        <EventCards/>
        </View>
        <BottomAppBar/>
        <View style={{bottom:2, justifyContent:'center',paddingTop:10}}>
        <ReturnButton/>
        <AppButton/>
        </View>
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

  Buttoncontainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },


});

export default App;

