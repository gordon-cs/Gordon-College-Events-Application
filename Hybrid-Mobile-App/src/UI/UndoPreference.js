import React from "react";
import {Alert,StyleSheet,Text,View,Button,} from 'react-native';


export const UndoButton = () => {
	return (
    
	  <Button 
      title = {"Undo!"} onPress={simpleDialog}> 
    </Button>
    
	);
	}

  export const simpleDialog = () =>
  Alert.alert(
    "Undo!",
    "Are you sure you want to undo your preference?",
    [
      { text: "Yes" },
      { text: "No" }
    ]
  );
  const styles = StyleSheet.create({
    undobutton: {
      backgroundColor: 'yellow',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });
  


export default UndoButton;