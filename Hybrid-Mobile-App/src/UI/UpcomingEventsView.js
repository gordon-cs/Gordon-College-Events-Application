import React, { useEffect, useState } from 'react';
import { Dimensions, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import { BottomAppBar } from './AppBar.js';

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const UpcomingEvents = (props) => {
  const [savedEvents, setSavedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  // Load all events on reload
  useEffect(() => {
    const loadEvents = async() => {
      setSavedEvents(props.savedEvents);
      setLoading(false);

      console.log("Saved Ids from Upcoming: ") // DBG
      console.log(savedEvents);                // DBG
    }
    loadEvents();
  }, []);

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
    alignItems: 'center',
    justifyContent: 'center',
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

export default UpcomingEvents;