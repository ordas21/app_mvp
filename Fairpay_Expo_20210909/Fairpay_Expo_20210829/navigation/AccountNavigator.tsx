import React from "react";
import { MainStackParamList } from "./types";
import createStackNavigator from "./createStackNavigator";
import AccountScreen from "screens/profile/Account/AccountScreen";
const Stack = createStackNavigator<MainStackParamList>();
const ActivityNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={"Account"}
    >
      <Stack.Screen name="Account" component={AccountScreen} />
    </Stack.Navigator>
  );
};
export default ActivityNavigator;
