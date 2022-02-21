import { Appbar } from 'react-native-paper';
import { View, Text, Image, StyleSheet,StatusBar } from 'react-native';



export const TopAppBar = () => {
	return (
	  <Appbar style={styles.top}>
    <Text style={styles.topNavText}>GCSA</Text>
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
    backgroundColor: 'blue',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },

  topNavText: {
    fontFamily: 'AppleSDGothicNeo-SemiBold',
    fontWeight: 'bold',
    fontSize: 20,
    backgroundColor: 'blue',
    position: 'absolute',
    left: 10,
    right: 0,
    bottom: 0,
  },

  bottom: {
    backgroundColor: 'blue',
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
