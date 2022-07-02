import React, { memo } from "react";
import useAuth from "hooks/useAuth";

import { AuthStackParamList } from "./types";
import createStackNavigator from "./createStackNavigator";
import ForgotPassword from "screens/auth/ForgotPassword";
import ChangePassword from "screens/auth/ChangePassword";
import SignUpScreen from "screens/auth/SignUp";
import Login from "screens/auth/Login";
import OtherInformationScreen from "screens/auth/OtherInformation/OtherInformationScreen";

const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigator = memo(() => {
  const { isSignedIn } = useAuth();
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={!isSignedIn ? "Login" : "Profile"}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen
        name="OtherInformation"
        component={OtherInformationScreen}
      />
    </Stack.Navigator>
  );
});

export default AuthNavigator;
