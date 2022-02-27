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
        <EventCards/>
        <BottomAppBar/>
        <ReturnButton/>
        <AppButton/>
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

export default App;

