import DateTimePicker from '@react-native-community/datetimepicker';
import axios from "axios";
import React, { useEffect, useState } from "react";

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
  
  export function AssignKey(props) {
    const [isAuthed, setAuthed] = useState(false);
    const [userName, setuserName] = useState("");
    const [locks, setLocks] = useState([]);
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(true);
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      //setShow(false);
      setDate(currentDate);
    };
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };
  
    const showTimepicker = () => {
      showMode('time');
    };
  
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
            <View style={styles.formLine}>
                <View>
            <Text>UserName:</Text>
                </View>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} placeholder="Enter A Valid User Name" onChangeText={(text) => setuserName(text)}>


                </TextInput>
            </View>
            </View>
            <View style={styles.formLine}>
                <View>
            <Text>Expiration Date:</Text>
                </View>
            {show &&(
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
            </View>
            </View>


            <View style={styles.footer}>
            <TouchableHighlight>
              <View style={styles.newLockContainer}>
                <Text style={styles.newLockButton}>Attach New Lock</Text>
              </View>
            </TouchableHighlight>
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
    logoutContainer: {
        width: 70,
        height: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        backgroundColor: "#000",
      },
      body: {
        backgroundColor: "blue",
        width: windowWidth,
        height: windowHeight * 75 /100,
        display: "flex",
        flexDirection: "column",
        
      },
      inputContainer: {
        width: "70%",
        height: "60%",
        backgroundColor: "#E5E4E1",
        borderBottomWidth: 4,
        borderColor: "#000",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 5,
      },
      input: {
        fontSize: 18,
        color: "#6A6565",
      },
      formLine: {
        width: "100%",
        height: "15%",
        paddingHorizontal: 10,
        flexDirection: "row",
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