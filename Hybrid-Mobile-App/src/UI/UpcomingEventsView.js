import React, { useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import EventCards, { savedIds, events } from './EventCards.js';
import eventMethods from '../Services/EventsMethods.js';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Morning Chapel',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Afro Hamwe Party',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Evening Chapel',
  },
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const App = () => {
  const [savedEvents, setSavedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  // Load all events on reload
  useEffect(() => {
    const loadSavedEvents = async() => {
      setSavedEvents(eventMethods.getFilteredEvents(events, savedIds));
      setLoading(false);
      console.log("Saved Ids from Upcoming: ")
      console.log(EventCards.savedIds);
    }
    loadSavedEvents();
  }, [savedIds, events]);

  const renderItem = ({ item }) => (
    <Item title={item.title}/>
  );

  let content;

  if (loading) {
    content = <Text>Loading...</Text>
  } else {
    if(savedEvents != []){
      content = 
      <FlatList
        data={savedEvents}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    } else {
      content = <Text>No Saved Events</Text>
    }  
  }

  return (
    <View style={styles.container}>
      {content}
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(242, 242, 242)",
    height: Dimensions.get('window').height,
  },
  item: {
    borderRadius: 15,
    backgroundColor: "rgb(200,200,200)",
    padding: 20,
    marginVertical: 8,
    width: Dimensions.get('window').width * 0.88,
  },
  title: {
    flexWrap: 'wrap',
    fontFamily: 'Gotham SSm 7r',
    fontWeight: '700',
    fontSize: 18,
  },
});

export default App;