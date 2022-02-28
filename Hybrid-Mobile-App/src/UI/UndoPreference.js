import React, { useState } from "react";
import { ActionSheetIOS, Button, StyleSheet, Text, View, } from "react-native";

export const UndoButton = () => {
  const [result, setResult] = useState("");

  const onPress = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "Yes", "No"],
        destructiveButtonIndex: 2,
        cancelButtonIndex: 0,
        userInterfaceStyle: 'dark'
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          setResult("hello");
        } else if (buttonIndex === 2) {
          setResult("");
        }
      }
    );

  return (
    <View style={styles.container}>
      <Text style={styles.result}>{result}</Text>
      <Button onPress={onPress} title="↩️Undo" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    bottom: 5,
    borderRadius: 20,
    borderBottomLeftRadius: 20,
    justifyContent: "center",
    fontWeight: "bold",

  },
  result: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  }
});

  


export default UndoButton;