import React, { memo } from "react";
import createStackNavigator from "./createStackNavigator";
import { IntroStackParamList } from "./types";

import OnboardingScreen from "screens/intro/OnboardingScreen";

const Stack = createStackNavigator<IntroStackParamList>();

const IntroNavigator = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Intro"
    >
      <Stack.Screen name="Intro" component={OnboardingScreen} />
    </Stack.Navigator>
  );
});

export default IntroNavigator;
