import { Appbar } from 'react-native-paper';
import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';



export const TopAppBar = () => {
	return (
	  <Appbar style={styles.top}>
      <Text style={styles.topNavText}>Gordon Events</Text>
    </Appbar>
	);
	}

  export const BottomAppBar = () => {
    return (
      <Appbar style={styles.bottom}>
      </Appbar>
    );
    }


const styles = StyleSheet.create({
  top: {
    flex: 1,
    backgroundColor: '#014983',
    position: 'absolute',
    justifyContent: "center",
    left: 0,
    right: 0,
    top: 0,
  },

  topNavText: {
    fontFamily: 'Gotham SSm 7r',
    fontWeight: '900',
    color: 'white',
    fontSize: 20,
    paddingTop: 16,
  },

  bottom: {
    flex: 1, 
    backgroundColor: '#014983',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});


const AppBars = {
  TopAppBar,
  BottomAppBar,
}

export default AppBars;
