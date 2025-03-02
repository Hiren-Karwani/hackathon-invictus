import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./LoginScreen";
import SignupScreen from "./SignupScreen";
import HomePage from "./HomePage";
import ResearchPage from "./ResearchPage";
import ResearchDetails from "./ResearchDetails";
import CollaborationPage from "./CollaborationPage";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Research" component={ResearchPage} />
        <Stack.Screen name="ResearchDetails" component={ResearchDetails} />
        <Stack.Screen name="Collaboration" component={CollaborationPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
