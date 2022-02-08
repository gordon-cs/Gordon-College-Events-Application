import React, { useState, useEffect, Component } from "react";
import { StyleSheet, Text, View } from 'react-native';

export default function Events(props) {

  let [events, setEvents] = useState();
  
  // todo
  async function getEvents() {
    
    // BEGIN API CODE
    
    const result = await fetch("https://360api.gordon.edu/api/events/25Live/Public");
    
    const eventJson = result.ok ? await result.json() : "";
    
    console.log("Event: "); //DBG
    console.log(eventJson); //DBG
    
    setEvents(eventJson); // Improper reference of JSON attribute, disregard
  }
  
  
  // END API CODE
    
  React.useEffect(() => {
    getEvents();
  }, []);
  
  return(
    <View>
      <EventName eventName={events} />
    </View>
  );
}

class EventName extends Component {
    render() {
        console.log("EventName this.props.eventName[0]");
        if (this.props.eventName) {
            console.log("Not loading");
            console.log(this.props.eventName[0]);
            return(
              <Text style={{flex: 0.3,
              fontWeight: "bold",
              fontSize: 20,
              textAlign: 'center'}}>
                   {this.props.eventName[0].Event_Name}
              </Text>
            );
        } else {
            console.log("loading");
            return(<Text>"Loading..."</Text>);
        }
    }
}
  

