import React, { useState, useEffect, Component } from "react";
import { StyleSheet, Text, View } from 'react-native';
import eventMethods from './EventsMethods.js';


export default function Events(props) {
  const [events, setEvents] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("Chapel");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eventsLoaded, setEventsLoaded] = useState(false);
  
  useEffect(() => {
    const loadEvents = async() => {
      setLoading(true);
      setEvents(await eventMethods.getEvents()); // Not working, returning 'undefined'
      setLoading(false);
    }
    loadEvents();
  }, []);
  
  useEffect (() => {
    setLoading(true);
    setFilteredEvents(eventMethods.getFilteredEvents(events, searchKeyword));
    setLoading(false);
  }, [events, searchKeyword]);
  
  let content;
  
    if (loading) {
      content = <Text>loading...</Text>
    } else {
      content = <Text>{events[0].Event_Name}</Text>
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
