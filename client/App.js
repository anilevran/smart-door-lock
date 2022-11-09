import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "./src/Home.js";
import { Signup } from "./src/Signup.js";
import { Signin } from "./src/Signin.js";
import { MainApp } from "./src/MainApp.js";
import { LockDetail } from "./src/LockDetail.js";
import { AssignKey } from "./src/AssignKey.js";
import { ViewLogs } from "./src/ViewLogs.js";
import { Attach } from "./src/Attach.js";
import { save, getValueFor } from "./storage.js";
import { WifiCredentials } from "./src/WifiCredentials.js";

const Stack = createStackNavigator();

export default function App(props) {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          {getValueFor("auth-token") ? (
            <>
              <Stack.Screen name="MainApp" component={MainApp} />
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="SignUp" component={Signup} />
              <Stack.Screen name="SignIn" component={Signin} />
              <Stack.Screen name="LockDetail" component={LockDetail} />
              <Stack.Screen name="AssignKey" component={AssignKey} />
              <Stack.Screen name="ViewLogs" component={ViewLogs} />
              <Stack.Screen name="Attach" component={Attach} />
              <Stack.Screen
                name="WifiCredentials"
                component={WifiCredentials}
              />
            </>
          ) : (
            <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="SignUp" component={Signup} />
              <Stack.Screen name="SignIn" component={Signin} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
