import { Alert, StyleSheet, View } from 'react-native';
import React from 'react';
import EventCards from './src/UI/EventCards.js';
import UpcomingListView from './src/UI/UpcomingEventsView.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const Tutorial = () => {
  return(
  Alert.alert(
    "Tutorial",
    "• Swipe right like and left to dislike \n • Select 'Saved' to view liked events",
    [
      { text: "OK"}
    ]
  ));
  }

const App = () => {

  Tutorial();
  
  const Events = ({ navigation }) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{padding: 10}}>
          <EventCards navigation={navigation}/>
        </View>  
      </View>
    )
  }

  const UpcomingList = ({ navigation, route }) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{padding: 10}}>
          <UpcomingListView savedEvents={route.params.savedEvents }/>
        </View>  
      </View>
    );
  }
  
  return (   
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Events"
          component={Events}
          options={{ 
            headerShown: true, 
            headerStyle: {
              backgroundColor: '#014983',
            },
            headerTitleStyle: {
              fontWeight: '900',
              color: 'white',
              fontSize: 20,
            },
          }}
        />
        <Stack.Screen 
          name="Saved" 
          component={UpcomingList}
          options={{
            headerStyle: {
              backgroundColor: '#014983',
            },
            headerTitleStyle: {
              fontWeight: '900',
              color: 'white',
              fontSize: 20,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  Buttoncontainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;