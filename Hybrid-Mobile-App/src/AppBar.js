import { Appbar } from 'react-native-paper';
import { View, Text, Image, StyleSheet,StatusBar } from 'react-native';



export const TopAppBar = () => {
	return (
	  <Appbar style={styles.top}>
    
    </Appbar>
	);
	}

  export const BottomAppBar = () => {
    return (
      <Appbar style={styles2.bottom}>
      
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
});

const styles2 = StyleSheet.create({
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
