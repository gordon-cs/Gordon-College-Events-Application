import React, { useState, useEffect, Component } from "react";
import { Dimensions, StyleSheet, Text, View, Button,  } from 'react-native';
import eventMethods from '../Services/EventsMethods.js';
import SwipeCards from "react-native-swipe-cards-deck";
import { TopAppBar, BottomAppBar } from './AppBar.js';
import { NavigationContainer } from '@react-navigation/native';


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
      <Text adjustsFontSizeToFit numberOfLines={50} style={styles.cardsTextDescription}>"{props.event.Description}"</Text>
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
const EventCards = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [likeBias, setLikeBias] = useState([]);
  const [dislikeBias, setDislikeBias] = useState(["Registrar"]); // Ignore all registrar events by default
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Load all events on reload
  useEffect(() => {
    const loadEvents = async() => {
      setEvents(await eventMethods.getEvents());
      setLoading(false);
    }
    loadEvents();
  }, []);
 
  // Load new Filter data on event or bias updates
  useEffect(() => {
    const loadFilteredEvents = async() => {
      setFilteredEvents(eventMethods.generateEventsFromBias(events, likeBias, dislikeBias, saved));
    }
    loadFilteredEvents();

    // DBG
    console.log('\n');
    console.log("liked: ");
    console.log(likeBias);
    console.log('\n');
    console.log("disliked: ")
    console.log(dislikeBias);
    console.log('\n');
    console.log("saved: ")
    console.log(saved);
    console.log('\n');
    // /DBG

  }, [events, likeBias, dislikeBias, saved]);

  function handleYup(card) {
    console.log(`Yup for ${card.title}\n`);

    // add event to ID's to save and hide from view
    setSaved([...new Set([...saved, card])]); 

    // if organization is in dislike remove it then add it to liked 
    if (dislikeBias.includes(card.organization)){
      setDislikeBias(eventMethods.removeValueFromArray(dislikeBias, card.organization));
    }

    // take likeBias array, add the liked ogranization, 
    // convert it to set to remove duplicates, 
    // convert it back to array and set likeBias to the new array

    // setLikeBias([...new Set([...likeBias, card.organization])]); 

    // READ ME:
    // Is there a purpose in a like bias? The point of the program is to expose users to events
    // If we return all events but prioritize events liked, we just get the regular events array
    // out of order
    return true; // return false if you wish to cancel the action
  }

  function handleNope(card) {
    // READ ME:
    // Should we have an alert that asks for all events under organization
    // or just the ones with this title for better user involvement?
    
    console.log(`Nope for ${card.title}\n`);

    // if disliked event is in saved, remove it
    if (saved.includes(card.Event_ID)){
      setSaved(eventMethods.removeValueFromArray(saved, card.Event_ID));
    }

    // if organization is in like remove it then add it to disliked 
    if (likeBias.includes(card.organization)){
      setLikeBias(eventMethods.removeValueFromArray(likeBias, card.organization));
    }
    
    // take dislikeBias array, add the disliked ogranization, 
    // convert it to set to remove duplicates, 
    // convert it back to array and set dislikeBias to the new array
    setDislikeBias([...new Set([...dislikeBias, card.organization])]); 
    return true; // return false if you wish to cancel the action
  }

  console.log(Dimensions.get('window').height);

  let content;
  
  if (loading) {
    content = <Text style={styles.loading}>Loading...</Text>
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
        />
    } else {
      content = <Text style={styles.loading}>No More Cards</Text>
    }
  }
  
  return(
    
    <View style={{alignItems:'flex-end', }}>
      <Button
        title="Saved 》"
        onPress={() => 
          navigation.navigate('Saved', { savedEvents: saved })
        }
      />
      {content}
    </View>
  );
}

export default EventCards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    bottom: 20,
    alignSelf: "center",
    borderRadius: 15,
    backgroundColor: "rgb(200,200,200)",
    flexDirection: "column",
    width: Dimensions.get('window').width * 0.88,
    height: Dimensions.get('window').height * 0.75,
  },
  cardsTextTitle: {
    //fontFamily: 'Gotham SSm 7r',
    fontWeight: '700',
    paddingTop: 30,
    paddingLeft: 10,
    fontSize: 35,
  },
  cardsTextOrganization: {
    //fontFamily: 'Gotham SSm 7r',
    fontWeight: '500',
    flexWrap: 'wrap',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 4,
    fontSize: 12,
  },
  cardsTextLocation: {
    //fontFamily: 'Gotham SSm 7r',
    fontWeight: '500',
    flexWrap: 'wrap',
    paddingRight: 10,
    paddingLeft: 10,
    fontSize: 12,
  },
  cardsTextTime: {
    //fontFamily: 'Gotham SSm 7r',
    fontWeight: '500',
    textAlign: "right",
    paddingRight: 10,
    fontSize: 14,
  },
  cardsTextDate: {
    //fontFamily: 'Gotham SSm 7r',
    fontWeight: '500',
    textAlign: "left",
    paddingLeft: 10,
    fontSize: 14,
  },
  cardsTextDescription: {
    flex: 3,
    flexWrap: 'wrap',
    //fontFamily: 'Gotham SSm 7r',
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
