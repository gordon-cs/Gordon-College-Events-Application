import React, { useState, useEffect, Component } from "react";
import { Dimensions, StyleSheet, Text, View, Button } from 'react-native';

/** EventCards
 *
 * @returns A stack of swipable cards each with event data
 */
const SingleEvent = (props) => {
  return(
    <View>
      My name is {props.name}
    </View>
  );
}

export default SingleEvent;

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
