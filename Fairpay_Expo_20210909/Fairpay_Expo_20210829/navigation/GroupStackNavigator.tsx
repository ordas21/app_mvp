import React from "react";
import { MainStackParamList } from "./types";
import createStackNavigator from "./createStackNavigator";
import GroupDetails from "screens/groups/GroupDetails";
import Groups from "screens/groups/Groups";
const Stack = createStackNavigator<MainStackParamList>();
const GroupStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={"Group"}
    >
      <Stack.Screen name="Group" component={Groups} />
      <Stack.Screen name="GroupDetails" component={GroupDetails} />
    </Stack.Navigator>
  );
};
export default GroupStackNavigator;
