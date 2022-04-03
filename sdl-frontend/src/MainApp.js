import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import axios from "axios";
import { save, getValueFor, deleteItem } from "../storage.js";

import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  Dimensions,
  Text,
  TouchableHighlight,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export function MainApp(props) {
  var [isAuthed, setAuthed] = useState(false);
  const getlocks = async () => {
    try {
      axios
        .get("http://192.168.1.22:9000/api/locks", {
          headers: {
            "auth-token": await getValueFor("auth-token"),
          },
        })
        .then(async (result) => {
          console.log(result.data);
          setAuthed(true);
        })
        .catch((err) => {
          console.log(err.response);
          console.log("Cannot Get Locks");
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    setAuthed(false);
    await deleteItem("auth-token");
    props.navigation.navigate("Home");
  };

  useEffect(() => {
    getlocks();
  }, []);

  return (
    <>
      {isAuthed ? (
        <View style={styles.container}>
          <View style={styles.inner}>
            <Text style={styles.text}>Authorized</Text>
          </View>

          <TouchableHighlight underlayColor="none" onPress={handleLogout}>
            <View style={styles.logoutContainer}>
              <Text style={styles.text}>Logout</Text>
            </View>
          </TouchableHighlight>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.inner}>
            <Text style={styles.text}>Not Authorized</Text>
          </View>
          <TouchableHighlight underlayColor="none" onPress={handleLogout}>
            <View style={styles.logoutContainer}>
              <Text style={styles.text}>Logout</Text>
            </View>
          </TouchableHighlight>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: "red",
  },
  inner: {
    width: 100,
    height: 100,
    marginTop: 20,
    marginLeft: 20,
  },
  text: {
    color: "white",
  },
  logoutContainer: {
    width: 200,
    height: 200,
    backgroundColor: "blue",
    marginTop: 50,
    marginLeft: 50,
  },
});
