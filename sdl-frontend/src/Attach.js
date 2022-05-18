import axios from "axios";
import React, { useEffect, useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { delay } from "../delay.js";

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

export function Attach(props) {
  const [isAuthed, setAuthed] = useState(true);
  // var [keyName, setkeyName] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    // getLocks();
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    const body = {
      id: data,
    };
    try {
      axios
        .post("http://192.168.1.35:9000/api/locks/attach", body, {
          headers: {
            "auth-token": await getValueFor("auth-token"),
          },
        })
        .then(async (result) => {
          console.log(result.data);
          props.navigation.navigate("MainApp");
        })
        .catch((err) => {
          console.log(err.response);
          console.log("Cannot Attach Lock");
        });
    } catch (error) {
      console.log(error);
    }
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <>
      {isAuthed ? (
        <View style={styles.container}>
          <View style={styles.header}></View>
          <View style={styles.body}>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
            />
            {scanned && (
              <Button
                title={"Tap to Scan Again"}
                onPress={() => setScanned(false)}
              />
            )}
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
