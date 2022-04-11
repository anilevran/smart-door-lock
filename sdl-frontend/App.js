import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "./src/Home.js";
import { Signup } from "./src/Signup.js";
import { Signin } from "./src/Signin.js";
import { MainApp } from "./src/MainApp.js";
import { LockDetail } from "./src/LockDetail.js";
import { save, getValueFor } from "./storage.js";

const Stack = createStackNavigator();

export default function App(props) {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="LockDetail"
          headerMode={{
            headerShown: false,
          }}
        >
          {getValueFor("auth-token") ? (
            <>
              <Stack.Screen name="MainApp" component={MainApp} />
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="SignUp" component={Signup} />
              <Stack.Screen name="SignIn" component={Signin} />
              <Stack.Screen name="LockDetail" component={LockDetail} />
              
            </>
          ) : (
            <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="SignUp" component={Signup} />
              <Stack.Screen name="SignIn" component={Signin} />
              <Stack.Screen name="LockDetail" component={LockDetail} />
              
              
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
