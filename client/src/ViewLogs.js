import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useEffect, useState } from "react";
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
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { save, getValueFor, deleteItem } from "../storage.js";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export function ViewLogs(props) {
  const [isAuthed, setAuthed] = useState(false);
  var [keyName, setkeyName] = useState(null);
  const [allLogs, setAllLogs] = useState([]);
  const [allLogsFormattedKey, setallLogsFormattedKey] = useState([]);

  const getLocks = async () => {
    const body = {
      id: props.route.params.lockId,
    };
    try {
      axios
        .post("http://192.168.1.91:9000/api/locks/getLock", body, {
          headers: {
            "auth-token": await getValueFor("auth-token"),
          },
        })
        .then(async (result) => {
          setAuthed(true);
          setkeyName(result.data.name);
        })
        .catch((err) => {
          console.log(err.response);
          console.log("Cannot Get Locks");
        });
    } catch (error) {
      console.log(error);
    }
    setAuthed(true);
  };

  const getLastEntry = async () => {
    const body = {
      id: props.route.params.lockId,
    };
    try {
      axios
        .post("http://192.168.1.91:9000/api/logs/getByLockIdAll", body, {
          headers: {
            "auth-token": await getValueFor("auth-token"),
          },
        })
        .then(async (result) => {
          if (result.data == "cannot get logs") {
          } else {
            result.data.forEach((log) => {
              const updatedDate = new Date(log.updatedAt);
              const dateDay = updatedDate.getDate();
              const dateMonth = updatedDate.getMonth();
              const dateYear = updatedDate.getFullYear();
              const dateHours = updatedDate.getHours();
              const dateMinutes = updatedDate.getMinutes();
              const newLogElement = `${dateDay}/${dateMonth}/${dateYear} - ${dateHours}:${dateMinutes} - ${log.username}`;
              console.log(newLogElement);
              setAllLogs((oldArray) => [...oldArray, newLogElement]);
            });
          }
        })
        .catch((err) => {
          console.log("Cannot get last entry");
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLocks();
    getLastEntry();
  }, []);

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
            <View style={styles.logLabel}></View>
            <View style={styles.table}>
              <View style={styles.tableDesc}>
                <Text style={styles.tableDescText}>Date</Text>
                <Text style={styles.tableDescText}>User</Text>
              </View>
              <View style={styles.tableRows}>
                <FlatList
                  data={allLogs.map((e, index) => {
                    return { key: `${index} - ${e}` };
                  })}
                  renderItem={({ item }) => (
                    <>
                      <View style={styles.row}>
                        <View style={styles.rowLabel}>
                          <Text style={styles.tableDescText}>
                            {item.key.split("-")[1]} - {item.key.split("-")[2]}
                          </Text>
                        </View>
                        <View style={styles.rowValue}>
                          <Text style={styles.tableDescText}>
                            {item.key.split("-")[3]}
                          </Text>
                        </View>
                      </View>
                    </>
                  )}
                />
              </View>
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
  keyNameContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFA04D",
    borderRadius: 30,
    width: 300,
    height: 100,
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
    width: "40%",
    height: "100%",
    justifyContent: "center",
    fontSize: 20,
  },
  formValue: {
    width: "60%",
    height: "100%",
    justifyContent: "center",
  },
  optionsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    width: windowWidth,
    height: 150,
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
  logLabel: {
    width: windowWidth,
    height: 50,
  },
  table: {
    width: windowWidth,
    height: "70%",
  },
  tableDesc: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 100,
  },
  tableDescText: {
    fontSize: 20,
  },
  tableRows: {
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginVertical: 10,
    paddingBottom: 3,
    borderBottomWidth: 2,
  },
  rowLabel: {
    width: "60%",
    paddingLeft: 30,
  },
  rowValue: {
    paddingLeft: 20,
    width: "40%",
  },
});
