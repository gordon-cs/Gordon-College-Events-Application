import React, { useEffect, useState } from 'react';
import { Dimensions, TouchableHighlight, View, FlatList, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

const Item = ({ title, date, location, timeRange }) => (
  <View style={styles.item}>
    <View style={{flexDirection: "row"}}>
      <Text numberOfLines={1} style={styles.title}>{title}</Text>
      <Text numberOfLines={1} style={styles.text}>{location}</Text>
    </View>
    <View style={{flexDirection: "row", marginVertical: 8}}>
      <Text style={styles.text, {textAlign: "left"}}>{date}</Text>
      <Text style={styles.text, {textAlign: "right"}}>{timeRange}</Text>
    </View>
  </View>
);

const UpcomingEvents = ({navigation}) => {
  const [savedEvents, setSavedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  // Load all events on reload
  useEffect(() => {
    const loadEvents = async() => {
      setSavedEvents(props.savedEvents);
      setLoading(false);

      console.log("Saved Ids from Upcoming: ") // DBG
      console.log(props.savedEvents);          // DBG
    }
    loadEvents();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableHighlight onPress={() => 
      navigation.navigate('SingleEvent', { name: "Jake" })}>
      <Item 
        title={item.title} 
        location={item.location} 
        date={item.date} 
        timeRange={item.timeRange}
      />
    </TouchableHighlight>
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
        ListEmptyComponent={
        <View style={{
            fontSize: 20, 
            fontWeight: '500',
            flex: 1, 
            alignItems: 'center', 
            justifyContent: 'center'
          }}
        >
          <Text style={{
            fontSize: 20, 
            fontWeight: '700',
            marginVertical: Dimensions.get('window').height * 0.3,
          }}>No Saved Events</Text>
        </View>  
        }
      />
    } else {
      content = <Text>No Saved Events Yet</Text>
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
    flex: 1,
    flexDirection: 'column',
    borderRadius: 15,
    backgroundColor: "rgb(200,200,200)",
    padding: 20,
    marginVertical: 8,
    width: Dimensions.get('window').width * 0.88,
  },
  
  title: {
    flex: 1,
    fontWeight: '700',
    fontSize: 18,
  },
  text: {
    flex: 1,
    fontWeight: '500',
    fontSize: 12,
  },
});

export default UpcomingEvents;