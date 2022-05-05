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

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export function Signup(props) {
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");
  var [username, setUsername] = useState("");

  const handleSignUp = (props) => {
    try {
      axios
        .post("http://192.168.1.22:9000/api/auth/signup", {
          email: email,
          password: password,
          username: username,
        })
        .then(async (result) => {
          await save("auth-token", result.data);
          props.navigation.navigate("MainApp");
        })
        .catch((err) => {
          console.log(err);
          console.log("Giriş yaparken hata oluştu");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <View style={styles.iconContainer}>
        <TouchableHighlight
          underlayColor="none"
          onPress={() => {
            props.navigation.navigate("Home");
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
              placeholder="************"
            ></TextInput>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableHighlight underlayColor="none" onPress={handleSignUp}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Kayıt Ol</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
      </View>
      <View style={styles.footer}></View>
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
    height: windowHeight * 80 /100,
    display: "flex",
    flexDirection: "column",
    alignItems:"center",
    
  },
  header: {
    paddingHorizontal: 10,
    justifyContent:"flex-start",
    alignItems:"flex-start",
    flexDirection: "row",
    width: windowWidth,
    height:windowHeight* 10 / 100,
    marginTop: 20,
  
    backgroundColor:"#1D94AD"
    
    
  },
  footer: {
    width: windowWidth,
    height: (windowHeight * 10 /100)-20 ,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems:"center",
    justifyContent:"center",
    backgroundColor: "#1D94AD",

  }
  
});
