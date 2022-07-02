import React, { memo } from "react";

import { MainStackParamList } from "./types";
import createStackNavigator from "./createStackNavigator";
import Groups from "screens/groups/Groups";
import GroupDetails from "screens/groups/GroupDetails";

const Stack = createStackNavigator<MainStackParamList>();

const StackGroupNavigator = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Group"
    >
      <Stack.Screen name="Group" component={Groups} />
      <Stack.Screen name="GroupDetails" component={GroupDetails} />
    </Stack.Navigator>
  );
});

export default StackGroupNavigator;
