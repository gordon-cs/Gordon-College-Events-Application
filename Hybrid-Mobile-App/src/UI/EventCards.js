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
      <Text>{props.event.title}</Text>
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
  const [likeBias, setLikeBias] = useState(["Afro", "Jazz", "Evening Chapel"]);
  const [dislikeBias, setDislikeBias] = useState(["Evening Chapel"]); // must not be blank, or will include all events in dislike
  const [loading, setLoading] = useState(true);
  
  // load events on render
  useEffect(() => {
    const loadEvents = async() => {
      setEvents(await eventMethods.getEvents());
      setLoading(false);
    }
    loadEvents();
  }, []);
  
  function handleYup(card) {
    console.log(`Yup for ${card.text}`);
    return true; // return false if you wish to cancel the action
  }
  function handleNope(card) {
    console.log(`Nope for ${card.text}`);
    return true;
  }
  function handleMaybe(card) {
    console.log(`Maybe for ${card.text}`);
    return true;
  }

  const filteredEvents = eventMethods.generateEventsFromBias(events, likeBias, dislikeBias);

  
  let content;
  
  if (loading) {
    content = <StatusCard text="Loading..." />
  } else {
    if (typeof filteredEvents === 'object') {
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
            maybe: { onAction: handleMaybe },
          }}
          hasMaybeAction={true}

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
    justifyContent: "center",
    alignItems: "center",
    width: 330,
    height: 500,
  },
  cardsText: {
    fontSize: 22,
  },
  loading: {flex: 0.3,
    fontWeight: "bold",
    fontSize: 22,
    textAlign: 'center',
  },
});