import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
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
  Platform,
} from "react-native";
import delay from "../delay";
import { StatusBar } from "expo-status-bar";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export function AssignKey(props) {
  const [isAuthed, setAuthed] = useState(false);
  const [userName, setuserName] = useState("");
  const [locks, setLocks] = useState([]);
  const [date, setDate] = useState(new Date(Date.now()));
  const [formattedDate, setFormattedDate] = useState("");
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  var dateArr = [];
  if (Platform.OS == "android") {
    dateArr = date?.toLocaleString().split(" ");
    console.log(dateArr);
    dateArr.splice(2, 1);

    setFormattedDate(
      `${dateArr[2]} ${dateArr[1]} ${dateArr[4]} ${dateArr[3].substring(
        0,
        dateArr[3].length - 3
      )}`
    );
  } else {
    dateArr = date?.toLocaleString().split(" ");
    console.log(dateArr);
  }

  var onChange = null;
  var showMode = null;
  var showDatepicker = null;
  var showTimepicker = null;
  if (Platform.OS == "android") {
    showDatepicker = () => {
      showMode("date");
    };

    showTimepicker = () => {
      showMode("time");
    };
    showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
    onChange = (event, value) => {
      if (value) setDate(value);
      if (event.type == "set" && mode == "time") {
        setShow(false);
        setTimeout(() => {
          setMode("date");
        }, 200);
      }
      if (event.type == "set" && mode == "date") {
        setShow(false);
        setTimeout(() => {
          showTimepicker();
        }, 200);
      }
    };
  } else {
    onChange = (event, value) => {
      console.log("Date = " + date);
      console.log("Selected Date = " + value);
      setDate(value);
    };
  }

  const getLocks = async () => {
    //   try {
    //     const result = await axios.get(
    //       "http://192.168.1.22:9000/api/locks/getLocks",
    //       {
    //         headers: {
    //           "auth-token": await getValueFor("auth-token"),
    //         },
    //       }
    //     );
    //     setAuthed(true);
    //     setLocks(result.data);
    //     await delay(1000);
    //   } catch (error) {
    //     console.log(error);
    //   }
    setAuthed(true);
  };

  const handleLogout = async () => {
    setAuthed(false);
    await deleteItem("auth-token");
    props.navigation.navigate("Home");
  };

  // const KeyButton = (props) => {
  //   return (
  //     <View style={styles.keyButton}>
  //       <Text style={styles.keyText}>{props.name}</Text>
  //     </View>
  //   );
  // };

  useEffect(() => {
    getLocks();
  }, []);
  useEffect(() => {
    console.log("date updated");
    if (Platform.OS == "android") {
      setFormattedDate(
        `${dateArr[2]} ${dateArr[1]} ${dateArr[4]} ${dateArr[3].substring(
          0,
          dateArr[3].length - 3
        )}`
      );
    } else {
    }
  }, [date]);
  return (
    <>
      {isAuthed ? (
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableHighlight underlayColor="none" onPress={handleLogout}>
              <View style={styles.logoutContainer}>
                <Text style={styles.logoutText}>Logout</Text>
              </View>
            </TouchableHighlight>
          </View>

          <View style={styles.body}>
            <View style={styles.wrapper}>
              <View style={styles.formContainer}>
                <View style={styles.formLine}>
                  <View style={styles.inputLabel}>
                    <Text style={styles.inputText}>UserName:</Text>
                  </View>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter A Valid User Name"
                      onChangeText={(text) => setuserName(text)}
                    ></TextInput>
                  </View>
                </View>
                <View style={styles.formLine}>
                  <View style={styles.inputLabel}>
                    <Text style={styles.inputText}>Expiration Date: </Text>
                  </View>
                  {Platform.OS == "android" ? (
                    <>
                      <View
                        style={{
                          width: "60%",
                          height: "50%",
                          borderRadius: 50,
                          padding: 8,
                        }}
                      >
                        <View style={styles.dateContainer}>
                          <Text style={{ color: "white", fontWeight: "bold" }}>
                            {" "}
                            {formattedDate}
                          </Text>
                          {!show && (
                            <View style={{ marginLeft: 50 }}>
                              <TouchableHighlight onPress={showDatepicker}>
                                <FontAwesomeIcon icon={faCalendarDays} />
                              </TouchableHighlight>
                            </View>
                          )}
                        </View>

                        {show && (
                          <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            onChange={onChange}
                            themeVariant="dark"
                            style={{
                              borderRadius: 50,
                            }}
                          />
                        )}
                      </View>
                    </>
                  ) : (
                    <>
                      <View
                        style={{
                          width: "30%",
                          height: "50%",
                          borderRadius: 50,
                        }}
                      >
                        <DateTimePicker
                          testID="dateTimePicker"
                          value={date}
                          mode={"date"}
                          is24Hour={true}
                          onChange={onChange}
                          themeVariant="dark"
                          style={{
                            borderRadius: 50,
                          }}
                        />
                      </View>
                      <View
                        style={{
                          width: "30%",
                          height: "50%",
                          borderRadius: 50,
                        }}
                      >
                        <DateTimePicker
                          testID="dateTimePicker"
                          value={date}
                          mode={"time"}
                          is24Hour={true}
                          onChange={onChange}
                          themeVariant="dark"
                          textColor="white"
                          color
                          style={{
                            borderRadius: 50,
                          }}
                        />
                      </View>
                    </>
                  )}
                </View>
              </View>
              <TouchableHighlight>
                <View style={styles.newLockContainer}>
                  <Text style={styles.newLockButton}>Give temporary key</Text>
                </View>
              </TouchableHighlight>
              {/* {Platform.OS == "android"?
          !show && (
            <View style={styles.btnContainer}>
              <TouchableHighlight onPress={showDatepicker} >
                <View style={styles.dateButton}>
                <Text>Show Date Picker</Text>
                </View>
                </TouchableHighlight>

            </View>
            
          ):<></>} */}
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
  logoutContainer: {
    width: 70,
    height: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#FFA04D",
  },
  body: {
    backgroundColor: "#1D94AD",
    width: windowWidth,
    height: (windowHeight * 90) / 100,
    display: "flex",
    flexDirection: "column",
    paddingVertical: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  inputLabel: {
    width: 130,
    height: "30%",
  },
  inputText: {
    fontSize: 17,
    color: "white",
    fontWeight: "bold",
  },
  inputContainer: {
    width: "60%",
    height: "40%",
    backgroundColor: "#E5E4E1",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  input: {
    fontSize: 15,
    color: "#6A6565",
  },
  formLine: {
    width: "100%",
    height: 80,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  newLockContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    height: 85,
    borderRadius: 10,
    backgroundColor: "#FFA04D",
    marginBottom: 30,
  },
  newLockButton: {
    color: "#000",
    fontSize: 20,
  },
  header: {
    paddingHorizontal: 10,
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
    width: windowWidth,
    height: (windowHeight * 5) / 100,
    marginTop: 20,
    backgroundColor: "#1D94AD",
  },
  footer: {
    width: windowWidth,
    height: (windowHeight * 5) / 100 - 20,
    backgroundColor: "#1D94AD",
    flexDirection: "row",
    alignItems: "center",
  },
  wrapper: {
    height: "100%",
    borderRadius: 5,
    width: "90%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btnContainer: {
    width: "100%",
    height: 70,
    backgroundColor: "purple",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  dateContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    height: "100%",
    flexDirection: "row",
  },
  formContainer: {
    height: 200,
    width: "100%",
  },
});
