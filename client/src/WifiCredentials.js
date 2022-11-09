import React, { useEffect, useState } from "react";
import axios from "axios";
import { save, getValueFor } from "../storage.js";
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
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { delay } from "../delay.js";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export function WifiCredentials(props) {
  var [ssid, setSsid] = useState("FiberHGW_ZTEX6Q_2.4GHz");
  var [password, setPassword] = useState("t9TUPsTskA");
  var [wifiConn, setwifiConn] = useState("main");
  var [deviceStatus, setDeviceStatus] = useState(false);

  const handleAttach = async () => {
    const body = {
      id: props.route.params.lockId,
    };
    try {
      axios
        .post("http://192.168.1.91:9000/api/locks/attach", body, {
          headers: {
            "auth-token": await getValueFor("auth-token"),
          },
        })
        .then(async (result) => {
          console.log(result.data);
          alert("Connect to ESP access point");
          setwifiConn("waitingForSoft");

          await isDeviceOnline();
          // while (!deviceStatus) {
          //   console.log("devam");
          //   if (deviceStatus) {
          //     console.log(deviceStatus);
          //   }
          //   await delay(3000);
          //   // if (credentials == true) {
          //   //   alert("GERI BAGLAN!!");
          //   // }
          // }
        })
        .catch((err) => {
          console.log("Cannot Attach Lock");
        });
    } catch (error) {
      console.log(error);
    }
  };

  const lastConfig = async () => {
    const body2 = {
      lockId: props.route.params.lockId,
      ssid: ssid,
      password: password,
    };
    try {
      axios
        .post("http://192.168.1.125/setCredentials", body2)
        .then((result) => {
          alert(
            "Connect back to your wifi and refresh to complete configurations"
          );
          props.navigation.navigate("MainApp");
          //setwifiConn("waitingForWifi");
          //          alert("Configuration Done. Connect back to your wifi network!");
          //props.navigation.navigate("MainApp");
        })
        .catch((err) => {
          console.log("Cannot Set Credentials");
        });
    } catch (error) {
      console.log(error);
    }
  };
  const isDeviceOnline = async () => {
    var isOnline = false;
    while (!isOnline) {
      try {
        axios
          .get("http://192.168.1.125/")
          .then(async (result) => {
            console.log(result.data);
            if (result.data == "Server Up") {
              console.log("SERVER UP!!!");
              await lastConfig();
              await delay(500);
              isOnline = true;
            }
          })
          .catch((err) => {
            console.log("Device Offline");
          });
      } catch (error) {
        console.log(error);
      }
      await delay(3000);
    }
  };

  useEffect(() => {
    console.log(deviceStatus);
  }, [deviceStatus]);
  return (
    <>
      {wifiConn == "main" ? (
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <TouchableHighlight
                underlayColor="none"
                onPress={() => {
                  props.navigation.navigate("Attach");
                }}
              >
                <FontAwesomeIcon size={35} icon={faCircleArrowLeft} />
              </TouchableHighlight>
            </View>
          </View>
          <View style={styles.body}>
            <View style={styles.appTitle}>
              <Text style={styles.Title}>Smart Door Lock</Text>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.iconStyle}
                  source={require("../assets/Logo.jpeg")}
                />
              </View>
            </View>
            {wifiConn == "main" ? (
              <View style={styles.formContainer}>
                <View style={styles.formLine}>
                  <Text style={styles.label}>SSID:</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="Display Name"
                      onChangeText={(text) => setSsid(text)}
                    >
                      {ssid}
                    </TextInput>
                  </View>
                </View>
                <View style={styles.formLine}>
                  <Text style={styles.label}>Password</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.input}
                      placeholder="***********"
                      onChangeText={(text) => setPassword(text)}
                    >
                      {password}
                    </TextInput>
                  </View>
                </View>

                <View style={styles.buttonContainer}>
                  <TouchableHighlight
                    underlayColor="none"
                    onPress={handleAttach}
                  >
                    <View style={styles.button}>
                      <Text style={styles.buttonText}>Send Credentials</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
            ) : wifiConn == "waitingForSoft" ? (
              <View style={styles.connectionStatus}>
                <Text>Waiting for user to connect device access point</Text>
              </View>
            ) : wifiConn == "softap" ? (
              <View style={styles.connectionStatus}>
                <Text>Waiting for configurations to finish</Text>
              </View>
            ) : (
              <View style={styles.connectionStatus}>
                <Text>Configuration Complete!</Text>
              </View>
            )}

            <View style={styles.connectionStatus}>
              <Text></Text>
            </View>
          </View>
          <View style={styles.footer}></View>
          <StatusBar style="auto" />
        </View>
      ) : (
        <View>
          <Text>Waiting for user to connect device access point</Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: 300,
    height: 450,
    display: "flex",
    flexDirection: "column",
  },
  formLine: {
    width: "100%",
    height: "15%",
    paddingHorizontal: 10,
  },
  input: {
    fontSize: 18,
    color: "#6A6565",
  },
  label: {
    color: "#000",
    fontSize: 15,
  },
  Title: {
    fontSize: 25,
  },
  inputContainer: {
    width: "100%",
    height: "60%",
    backgroundColor: "#E5E4E1",
    opacity: 0.9,
    borderBottomWidth: 4,
    borderColor: "#000",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  container: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: "#1D94AD",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  appTitle: {
    width: 300,
    height: 200,
    padding: 10,

    display: "flex",
    alignItems: "center",
    //borderRadius:10,
    //backgroundColor:"#6495ED"
  },
  imageContainer: {
    width: 120,
    height: 120,
    marginBottom: 30,
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 10,
  },
  iconStyle: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  buttonContainer: {
    width: "100%",
    height: "40%",
  },
  button: {
    width: "100%",
    height: "50%",
    backgroundColor: "#FFA04D",
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    top: 30,
  },
  buttonText: {
    // fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "#FFF",
  },
  iconContainer: {
    display: "flex",
  },
  body: {
    backgroundColor: "#1D94AD",
    width: windowWidth,
    height: (windowHeight * 80) / 100,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    paddingHorizontal: 10,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
    width: windowWidth,
    height: (windowHeight * 10) / 100,
    marginTop: 20,

    backgroundColor: "#1D94AD",
  },
  footer: {
    width: windowWidth,
    height: (windowHeight * 10) / 100 - 20,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1D94AD",
  },
});
