import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import axios from "axios";
import { save, getValueFor, deleteItem } from "../storage.js";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

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

export function LockDetail(props) {
  var [isAuthed, setAuthed] = useState(true);
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

  

  return (
    <>
      {isAuthed ? (
        <View style={styles.container}>
          <View style={styles.header}>
          <View style={styles.iconContainer}>
            <TouchableHighlight
              underlayColor="none"
              onPress={() => {
                props.navigation.navigate("MainApp");
              }}
            >
              <FontAwesomeIcon size={40} icon={faCircleArrowLeft} />
            </TouchableHighlight>
          </View>
          </View>
          <View style={styles.body}>
          <View style={styles.keyNameContainer}>
            <Text style={styles.keyLabel}>Key Name Here</Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.batteryLabel}>Battery</Text>
            <Text style={styles.batteryLabel}>Battery</Text>
          </View>
          </View>
          <View style={styles.footer}>
          <View style={styles.optionsContainer}>
            <Text style={styles.optionLabel}>Unlock</Text>
            <Text style={styles.optionLabel}>MonitorLogs</Text>
            <Text style={styles.optionLabel}>Create key for guests</Text>
          </View>
        </View>
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
  keyNameContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 30,
    width: 300,
    height: 100,
    marginLeft: 55,
  },
  keyLabel: {
    fontSize: 30,
  },
  optionsContainer: {
    display: "flex",
    backgroundColor: "white",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    width: windowWidth,
    marginTop: 350,
    height: 150,
  },
  optionLabel: {
    display: "flex",
    fontSize: 20,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    width: 200,
  },
  iconContainer: {
    marginTop: 30,
    marginLeft: 10,
  },
  body: {
    backgroundColor: "blue",
    width: windowWidth,
    height: windowHeight * 75 /100,
    display: "flex",
    flexDirection: "column",
    
  },
  header: {
    paddingHorizontal: 10,
    justifyContent:"flex-end",
    alignItems:"center",
    flexDirection: "row",
    width: windowWidth,
    height:windowHeight* 5 / 100,
    marginTop: 20,
    
    
  },
  footer: {
    width: windowWidth,
    height: (windowHeight * 20 /100)-20 ,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems:"center",

    

  }
});
