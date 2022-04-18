import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import axios from "axios";
import { save, getValueFor, deleteItem } from "../storage.js";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { delay } from "../delay.js";

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
  Button,
} from "react-native";
import { StatusBar } from "expo-status-bar";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export function MainApp(props) {
  var [isAuthed, setAuthed] = useState(false);
  var [locks, setLocks] = useState([]);

  const getLocks = async () => {
    try {
      const result = await axios.get(
        "http://192.168.1.33:9000/api/locks/getLocks",
        {
          headers: {
            "auth-token": await getValueFor("auth-token"),
          },
        }
      );
      setAuthed(true);
      setLocks(result.data);
      await delay(1000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    setAuthed(false);
    await deleteItem("auth-token");
    props.navigation.navigate("Home");
  };

  const KeyButton = (props) => {
    return (
      <View style={styles.keyButton}>
        <Text style={styles.keyText}>{props.name}</Text>
      </View>
    );
  };

  useEffect(() => {
    getLocks();
  }, []);

  return (
    <>
      {isAuthed ? (
        <View style={styles.container}>
          <TouchableHighlight underlayColor="none" onPress={handleLogout}>
            <View style={styles.logoutContainer}>
              <Text style={styles.logoutText}>Logout</Text>
            </View>
          </TouchableHighlight>
          <View style={styles.keyContainer}>
            {locks.map((lock, index) => {
              return <KeyButton key={index} name={lock.name} />;
            })}
          </View>
          <TouchableHighlight>
            <View style={styles.newLockContainer}>
              <Text style={styles.newLockButton}>Attach New Lock</Text>
            </View>
          </TouchableHighlight>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.inner}>
            <Text style={styles.text}>Not Authorized</Text>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: "#FF4500",
    display: "flex",
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
  logoutText: {
    fontSize: 15,
    color: "white",
  },
  logoutContainer: {
    width: 70,
    height: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#000",
    marginTop: 30,
    marginLeft: 340,
  },
  keyContainer: {
    backgroundColor: "blue",
    width: windowWidth,
    height: 550,
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  keyButton: {
    backgroundColor: "black",
    width: 100,
    height: 100,
    display: "flex",
    marginLeft: 30,
    marginTop: 30,
    borderRadius: 20,
    alignItems: "center",
  },
  keyText: {
    color: "white",
    marginTop: 10,
  },
  newLockContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    height: 100,
    marginLeft: 55,
    borderRadius: 100,
    backgroundColor: "#000",
  },
  newLockButton: {
    color: "white",
    fontSize: 30,
  },
});
