import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "./src/Home.js";
import { Signup } from "./src/Signup.js";
import { Signin } from "./src/Signin.js";

const Stack = createStackNavigator();

export default function App(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        headerMode={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SignUp" component={Signup} />
        <Stack.Screen name="SignIn" component={Signin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
