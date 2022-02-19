import React, { useState, useEffect, Component } from "react";
import { StyleSheet, Text, View } from 'react-native';
import eventMethods from './EventsMethods.js';

export default function Events(props) {
  const [events, setEvents] = useState([]);
  const [keywords, setKeywords] = useState(["Jazz", "Afro", "Evening Chapel"]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadEvents = async() => {
      setEvents(await eventMethods.getEvents());
      setLoading(false);
    }
    loadEvents();
  }, []);
  
  const filteredEvent = eventMethods.getFilteredEvents(events, keywords);
    
  let content;
  
  if (loading) {
    content = <Text>loading...</Text>
  } else {
    if (typeof filteredEvent === 'object') {
      console.log("NEW EVENTS: ")
      console.log(filteredEvent)
      content = <Text>{filteredEvent[0].Event_Name}</Text>
    } else {
      content = <Text>There are no events that match your search</Text>
    }
  }
  
  return(
    <View>
         <Text style={{flex: 0.3,
         fontWeight: "bold",
         fontSize: 20,
         textAlign: 'center'}}>
            {content}
         </Text>
    </View>
  );
}
