import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SwipeCards from "react-native-swipe-cards-deck";




function Card({ data }) {
  return (
    <View style={[styles.card, { backgroundColor: data.backgroundColor }]}>
      <Text>{data.text}</Text>
    </View>
  );
}

function StatusCard({ text }) {
  return (
    <View>
      <Text style={styles.cardsText}>{text}</Text>
    </View>
  );
}

export default function App() {
  
  const [cards, setCards] = useState();

  // replace with real API data fetching
  useEffect(() => {
    setTimeout(() => {
      setCards([
        { text: "Afro Hamwe Party", backgroundColor: "blue" },
        { text: "Morning Chapel", backgroundColor: "purple" },
        { text: "ISO Chapel", backgroundColor: "green" },
        { text: "Senior Recital", backgroundColor: "blue" },
        { text: "Open Air Career Fair", backgroundColor: "cyan" },
        { text: "Night Chapel", backgroundColor: "orange" },
      ]);
    }, 3000);
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


  return (
    <View style={styles.container}>
      {cards ? (
        <SwipeCards
          cards={cards}
          renderCard={(cardData) => <Card data={cardData} />}
          keyExtractor={(cardData) => String(cardData.text)}
          renderNoMoreCards={() => <StatusCard text="No more cards..." />}
          loop={true} //When set to true, returns to first card after all cards have been swiped
          smoothTransition = {true}
          
          actions={{
            yup: { show: true, text: "Yup!", color: "green" },
            nope: { show: true, text: "Nope!", color: "red" },
            maybe: { show: true, text: "Maybe!", color: "orange" }
          }}
          hasMaybeAction={true}

          // activate stack mode and depth of stack instead of one-per-one view
          //stack={true}
          //stackDepth={3}
        />
      ) : (
        <StatusCard text="Loading..." />
      )}
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
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    width: 370,
    height: 550,
  },
  cardsText: {
    fontSize: 30,
  },
});