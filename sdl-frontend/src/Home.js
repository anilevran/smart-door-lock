import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight,
} from "react-native";
// import {
//   useFonts,
//   Poppins_700Bold,
//   Poppins_600SemiBold,
// } from "@expo-google-fonts/poppins";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export class Home extends Component {
  render() {
    return (
      <View>
        <Text>APP WORKING</Text>
      </View>
    );
  }
}
