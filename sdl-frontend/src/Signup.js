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
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCircleArrowLeft
} from "@fortawesome/free-solid-svg-icons";


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export function Signup(props) {
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");
  var [username, setUsername] = useState("");

  

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <FontAwesomeIcon size={40}
                icon={faCircleArrowLeft }
                />
      </View>
      <View style={styles.appTitle}>
      <Text style={styles.Title}>Smart Door Lock</Text>
      <View style={styles.imageContainer}>
          <Image
            style={styles.iconStyle}
            source={require("../assets/Logo.jpeg")}
          />
        </View>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.formLine}>
          <Text style={styles.label}>User Name</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Display Name"
              onChangeText={(text) => setUsername(text)}
            >
              {username}
            </TextInput>
          </View>
        </View>
        <View style={styles.formLine}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="xxx@gmail.com"
              onChangeText={(text) => setEmail(text)}
            >
              {email}
            </TextInput>
          </View>
        </View>
        <View style={styles.formLine}>
          <Text style={styles.label}>Şifre</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="*********"
              onChangeText={(text) => setPassword(text)}
            >
              {password}
            </TextInput>
          </View>
        </View>
        <View style={styles.formLine}>
              <Text style={styles.label}>Confirm Password</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="************">
                    
                  </TextInput>
              </View>
            </View>
        <View style={styles.buttonContainer}>
          <TouchableHighlight underlayColor="none" >
            <View style={styles.button}>
              <Text style={styles.buttonText}>Kayıt Ol</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>

      <StatusBar style="auto" />
    </View>
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
  Title:{
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
    backgroundColor: "#FF4500",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 30,
  },
  appTitle: {
    width: 300,
    height: 200,
    padding: 10,
    marginTop: 35,
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
    backgroundColor: "#6A5ACD",
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    top: 50,
    
  },
  buttonText: {
    // fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "#FFF",
  },
  iconContainer: {
    display: "flex",
    marginRight: 300,
    marginTop: 10,
  },
});