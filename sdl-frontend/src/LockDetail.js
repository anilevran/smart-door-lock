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
  const [isAuthed, setAuthed] = useState(false);
  const [keyName, setkeyName] = useState(null);
  const [isLocked, setLocked] = useState(false);
  const [lastEntry, setLastEntry] = useState("No entries yet");

  const getLock = async () => {
    const body = {
      id: props.route.params.lockId,
    };
    try {
      axios
        .post("http://192.168.1.57:9000/api/locks/getLock", body, {
          headers: {
            "auth-token": await getValueFor("auth-token"),
          },
        })
        .then(async (result) => {
          setAuthed(true);
          setkeyName(result.data.name);
          setLocked(result.data.isLocked);
        })
        .catch((err) => {
          console.log(err.response);
          console.log("Cannot Get Locks");
        });
    } catch (error) {
      console.log(error);
    }
  };

  const updateLockStatus = async (lockStatus) => {
    const body = {
      id: props.route.params.lockId,
      isLocked: lockStatus,
    };
    try {
      axios
        .post("http://192.168.1.57:9000/api/locks/updateLockStatus", body, {
          headers: {
            "auth-token": await getValueFor("auth-token"),
          },
        })
        .then(async (result) => {
          console.log("Updated Lock Status");
          setLocked(lockStatus);
        })
        .catch((err) => {
          console.log(err.response);
          console.log("Device action error");
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getLastEntry = async () => {
    const body = {
      id: props.route.params.lockId,
    };
    try {
      axios
        .post("http://192.168.1.57:9000/api/logs/getByLockId", body, {
          headers: {
            "auth-token": await getValueFor("auth-token"),
          },
        })
        .then(async (result) => {
          if (result.data == "cannot get logs") {
          } else {
            const updatedDate = new Date(result.data.updatedAt);
            const dateDay = updatedDate.getDate();
            const dateMonth = updatedDate.getMonth();
            const dateYear = updatedDate.getFullYear();
            const dateHours = updatedDate.getHours();
            const dateMinutes = updatedDate.getMinutes();
            setLastEntry(
              `${result.data.username} ${
                result.data.isLocked ? "Locked" : "Unlocked"
              } at ${dateDay}/${dateMonth}/${dateYear} - ${dateHours}:${dateMinutes}`
            );
          }
        })
        .catch((err) => {
          console.log("Cannot get last entry");
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLockAction = async () => {
    if (isLocked === false) {
      try {
        axios
          .get("http://192.168.1.125/lock")
          .then(async (result) => {
            console.log("device locked");
            updateLockStatus(true);
          })
          .catch((err) => {
            console.log(err.response);
            console.log("Device action error");
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        axios
          .get("http://192.168.1.125/unlock")
          .then(async (result) => {
            console.log("device unlocked");
            updateLockStatus(false);
          })
          .catch((err) => {
            console.log(err.response);
            console.log("Device action error");
          });
      } catch (error) {
        console.log(error);
      }
    }

    const body = {
      id: props.route.params.lockId,
    };
    try {
      axios
        .post("http://192.168.1.57:9000/api/logs/setLog", body, {
          headers: {
            "auth-token": await getValueFor("auth-token"),
          },
        })
        .then(async (result) => {
          console.log("Log Saved Successfully");
          setLocked(lockStatus);
        })
        .catch((err) => {
          console.log(err.response);
          console.log("Log error");
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
    getLock();
    getLastEntry();
  }, []);
  useEffect(() => {
    getLock();
    getLastEntry();
  }, [isLocked]);

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
                <FontAwesomeIcon size={35} icon={faCircleArrowLeft} />
              </TouchableHighlight>
            </View>
          </View>
          <View style={styles.body}>
            <View style={styles.keyNameContainer}>
              <Text style={styles.keyLabel}>{keyName}</Text>
            </View>
            <View style={styles.detailContainer}>
              <View style={styles.formLine}>
                <View style={styles.formLabel}>
                  <Text style={styles.textStyle}>Status: </Text>
                </View>
                <View style={styles.formValue}>
                  <Text style={styles.textStyle}>
                    {isLocked ? "Door Locked" : "Door Open"}
                  </Text>
                </View>
              </View>
              <View style={styles.formLine}>
                <View style={styles.formLabel}>
                  <Text style={styles.textStyle}>Last Entry:</Text>
                </View>
                <View style={styles.formValue}>
                  <Text style={styles.textStyle}>{lastEntry}</Text>
                </View>
              </View>
            </View>
            <View style={styles.optionsContainer}>
              <TouchableHighlight
                style={styles.optionLabel}
                onPress={handleLockAction}
              >
                <Text style={styles.optionText}>
                  {isLocked === false ? "Lock" : "Unlock"}
                </Text>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => {
                  props.navigation.navigate("ViewLogs", {
                    lockId: props.route.params.lockId,
                  });
                }}
                style={styles.optionLabel}
              >
                <Text style={styles.optionText}>MonitorLogs</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.optionLabel}
                onPress={() => {
                  props.navigation.navigate("AssignKey");
                }}
              >
                <Text style={styles.optionText}>Create key for guests</Text>
              </TouchableHighlight>
            </View>
          </View>
          <View style={styles.footer}></View>
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
    backgroundColor: "#1D94AD",
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
  detailContainer: {
    width: "80%",
    height: "45%",
    marginHorizontal: 10,
  },
  keyNameContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFA04D",
    borderRadius: 30,
    width: 300,
    height: "15%",
    marginLeft: 55,
  },
  keyLabel: {
    fontSize: 30,
    color: "#000",
  },
  formLine: {
    width: "100%",
    height: "25%",
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  textStyle: {
    fontSize: 20,
  },
  formLabel: {
    width: "35%",
    height: "100%",
    justifyContent: "center",
    fontSize: 20,
  },
  formValue: {
    width: "65%",
    height: "100%",
    justifyContent: "center",
  },
  optionsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    width: windowWidth,
    height: "25%",
  },
  optionLabel: {
    display: "flex",
    backgroundColor: "#FFA04D",
    alignItems: "center",
    justifyContent: "center",
    width: "70%",
    height: 50,
    marginVertical: 10,
    borderRadius: 15,
  },
  optionText: {
    fontSize: 20,
  },
  body: {
    backgroundColor: "#1D94AD",
    width: windowWidth,
    height: (windowHeight * 90) / 100,
    display: "flex",
    flexDirection: "column",
  },
  header: {
    paddingHorizontal: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#1D94AD",
    width: windowWidth,
    height: (windowHeight * 5) / 100,
    marginTop: 20,
  },
  footer: {
    width: windowWidth,
    height: (windowHeight * 5) / 100 - 20,
    backgroundColor: "#1D94AD",
    flexDirection: "row",
    alignItems: "center",
  },
});
