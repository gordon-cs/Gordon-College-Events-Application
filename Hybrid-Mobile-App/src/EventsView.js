import React, { useState, useEffect, Component } from "react";
import { StyleSheet, Text, View } from 'react-native';
import eventMethods from './EventsMethods.js';

export default function Events(props) {
  const [events, setEvents] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("Chapel");
  const [loading, setLoading] = useState(true);
  const [eventsLoaded, setEventsLoaded] = useState(false);
  
  useEffect(() => {
    const loadEvents = async() => {
      setEvents(await eventMethods.getEvents());
      setLoading(false);
    }
    loadEvents();
  }, []);
  
  const filteredEvent = eventMethods.getFilteredEvents(events, searchKeyword)[0];
    
  let content;
  
  if (loading) {
    content = <Text>loading...</Text>
  } else {
    if (typeof filteredEvent === 'object') {
      content = <Text>{filteredEvent.Event_Name}</Text>
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
