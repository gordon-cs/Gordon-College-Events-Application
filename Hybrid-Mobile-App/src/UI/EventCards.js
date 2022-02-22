import React, { useState, useEffect, Component } from "react";
import { StyleSheet, Text, View } from 'react-native';
import eventMethods from '../Services/EventsMethods.js';
import SwipeCards from "react-native-swipe-cards-deck";

/** Card component
 *
 * @param {prop} event The event to display on a cad
 * @returns {Event} A view component of the card layout
 */
const Card = (props) => {
  return (
    <View style={[styles.card]}>
      <View>
        <Text adjustsFontSizeToFit style={styles.cardsTextTitle}>{props.event.title}</Text>
        <View style={{paddingTop: 20, flexDirection:"row"}}>
          <View style={{flex:1}}><Text style={styles.cardsTextDate}>{props.event.date}</Text></View>
          <View style={{flex:1}}><Text style={styles.cardsTextTime}>{props.event.timeRange}</Text></View>
        </View> 
      </View>  
      <View style={{paddingTop: 10, flex: 1}}>
        <Text style={styles.cardsTextOrganization}>Organization: {props.event.organization}</Text>
        <Text style={styles.cardsTextLocation}>Location: {props.event.location}</Text> 
      </View>
      <Text adjustsFontSizeToFit numberOfLines={8} style={styles.cardsTextDescription}>"{props.event.Description}"</Text>
    </View>
  );
}

/** Status Card component displaying a simple status message
 *
 * @param text The text string to display on the status card
 * @returns A view component of the card layout
 */
function StatusCard({ text }) {
  return (
    <View>
      <Text style={styles.cardsText}>{text}</Text>
    </View>
  );
}

/** EventCards
 *
 * @returns A stack of swipable cards each with event data
 */
export default function EventCards() {
  const [events, setEvents] = useState([]);
  const [likeBias, setLikeBias] = useState([]);
  const [dislikeBias, setDislikeBias] = useState([]);
  const [savedEvents, setSavedEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // load events on render
  useEffect(() => {
    const loadEvents = async() => {
      setEvents(await eventMethods.getEvents());
      setLoading(false);
    }
    loadEvents();
  }, []);
 
  useEffect(() => {
    const loadFilteredEvents = async() => {
      setFilteredEvents(eventMethods.generateEventsFromBias(events, likeBias, dislikeBias));
    }
    loadFilteredEvents();

    const arr = [];
    // DBG
    console.log(events.length);
    console.log('\n');
    console.log("liked: ");
    console.log(likeBias);
    console.log('\n');
    console.log("disliked: ")
    console.log(dislikeBias);
    console.log('\n');
    console.log("saved: ")
    console.log(savedEvents);
    console.log('\n');
  }, [events, likeBias, dislikeBias, savedEvents]);

  function handleYup(card) {
    console.log(`Yup for ${card.title}\n`);
    if (dislikeBias.includes(card.organization)){
      setDislikeBias(eventMethods.removeValueFromArray(dislikeBias, card.organization));
    }
    // take likeBias array, add the liked ogranization, 
    // convert it to set to remove duplicates, 
    // convert it back to array and set likeBias to the new array
    setLikeBias([...new Set([...likeBias, card.organization])]); 
    return true; // return false if you wish to cancel the action
  }
  function handleNope(card) {
    console.log(`Nope for ${card.title}\n`);
    if (likeBias.includes(card.organization)){
      setLikeBias(eventMethods.removeValueFromArray(likeBias, card.organization));
    }
    // take dislikeBias array, add the disliked ogranization, 
    // convert it to set to remove duplicates, 
    // convert it back to array and set dislikeBias to the new array
    setDislikeBias([...new Set([...dislikeBias, card.organization])]); 
    return true;
  }
  
  let content;
  
  if (loading) {
    content = <StatusCard text="Loading..." />
  } else {
    if (typeof events === 'object') {
      content =
        <SwipeCards
          cards={filteredEvents}
          renderCard={(cardData) => <Card event={cardData} />}
          keyExtractor={(cardData) => String(cardData.text)}
          renderNoMoreCards={() => <StatusCard text="No more cards..." />}
          //loop={true} //Return to frst card after cards run out
          actions={{
            nope: { onAction: handleNope },
            yup: { onAction: handleYup },
          }}

          // If you want a stack of cards instead of one-per-one view, activate stack mode
          // stack={true}
          // stackDepth={3}
        />
    } else {
      content = <Text>No more Events for this keyword</Text>
    }
  }
  
  return(
    <View>
         <Text style={loading}>
            {content}
         </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    borderRadius: 15,
    backgroundColor: "rgba(0,0,0, 0.1)",
    flexDirection: "column",
    width: 330,
    height: 500,
  },
  cardsTextTitle: {
    fontFamily: 'Gotham SSm 7r',
    fontWeight: '700',
    paddingTop: 30,
    paddingLeft: 10,
    fontSize: 35,
  },
  cardsTextOrganization: {
    fontFamily: 'Gotham SSm 7r',
    fontWeight: '500',
    flexWrap: 'wrap',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 4,
    fontSize: 12,
  },
  cardsTextLocation: {
    fontFamily: 'Gotham SSm 7r',
    fontWeight: '500',
    flexWrap: 'wrap',
    paddingRight: 10,
    paddingLeft: 10,
    fontSize: 12,
  },
  cardsTextTime: {
    fontFamily: 'Gotham SSm 7r',
    fontWeight: '500',
    textAlign: "right",
    paddingRight: 10,
    fontSize: 14,
  },
  cardsTextDate: {
    fontFamily: 'Gotham SSm 7r',
    fontWeight: '500',
    textAlign: "left",
    paddingLeft: 10,
    fontSize: 14,
  },
  cardsTextDescription: {
    flex: 3,
    flexWrap: 'wrap',
    fontFamily: 'Gotham SSm 7r',
    fontWeight: '500',
    paddingLeft: 10,
    paddingRight: 10,
    fontStyle: "italic",
    fontSize: 18,
  },
  loading: {flex: 0.3,
    fontWeight: "bold",
    fontSize: 22,
    textAlign: 'center',
  },
});