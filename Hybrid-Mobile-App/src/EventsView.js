import React, { useState, useEffect, Component } from "react";
import { StyleSheet, Text, View } from 'react-native';
import eventMethods from './EventsMethods.js';


export default function Events(props) {
  const [events, setEvents] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // END API CODE
  useEffect(() => {
    const loadEvents = async () => {
      const result = await fetch("https://360api.gordon.edu/api/events/25Live/Public");
      
      const eventJson = result.ok ? await result.json() : '';
  
      setEvents(eventJson);
      setSearchKeyword("Chapel");
      setLoading(true);
      setFilteredEvents(eventMethods.getFilteredEvents(events, searchKeyword));
      setLoading(false);
    }
    
    loadEvents();
  }, []);
  
  let content;
  
    if (loading) {
      content = <Text>loading...</Text>
    } else {
      content = <Text>{filteredEvents[0].Event_Name}</Text>
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
