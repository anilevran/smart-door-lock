import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCodeFork } from "@fortawesome/free-solid-svg-icons";

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
      <View style={styles.container}>
        <View style={styles.appTitle}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.iconStyle}
              source={require("../assets/Logo.jpeg")}
            />
          </View>

          <Text style={styles.text}>Smart Door Lock</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableHighlight
            underlayColor="none"
            onPress={() => this.props.navigation.navigate("SignIn")}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>Giriş Yap</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="none"
            onPress={() => this.props.navigation.navigate("SignUp")}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>Kayıt Ol</Text>
            </View>
          </TouchableHighlight>
        </View>

        <StatusBar style="auto" />
        <View style={styles.container}>
          <FontAwesomeIcon icon={faCodeFork} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: "#FF6600",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 30,
  },
  appTitle: {
    width: 300,
    height: 200,
    padding: 10,
    marginTop: 100,
    display: "flex",
    alignItems: "center",
  },
  imageContainer: {
    width: 120,
    height: 120,
    marginBottom: 30,
    borderWidth: 2,
    borderRadius: 10,
  },
  iconStyle: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  text: {
    color: "#FFF",
    // fontFamily: "Poppins_600SemiBold",
    fontSize: 25,
  },

  buttonContainer: {
    width: 350,
    height: 200,
    display: "flex",
    flexDirection: "column",
    padding: 10,
    marginTop: 50,
  },
  button: {
    width: "100%",
    height: "55%",
    borderWidth: 2,
    borderColor: "#FFF",
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    // fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "#FFF",
  },
});
