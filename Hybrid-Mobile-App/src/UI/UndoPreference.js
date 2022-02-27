import React from "react";
import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";

export const ReturnButton = () => {
  return (
    <View style={styles.screenContainer}>
      <Button title="Undo!" />
    </View>
  );
};


export const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );
  

const styles = StyleSheet.create({
  screenContainer: {
    
    justifyContent: "center",
    padding: 0,
    bottom: 20,
  }
});


const UndoButton = {
    ReturnButton,
    AppButton,
  }

export default UndoButton;