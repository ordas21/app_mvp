import React, { memo } from "react";
import ExpenseDetails from "screens/groups/NewGroup/ExpenseDetails";
import GroupSearch from "screens/groups/NewGroup/GroupSearch";
import NewGroup from "screens/groups/NewGroup/NewGroup";
import NewGroupDetails from "screens/groups/NewGroup/NewGroupDetails";
import Statistics from "screens/groups/NewGroup/Statistics";
import createStackNavigator from "./createStackNavigator";
import { GroupsStackParamList } from "./types";

const Stack = createStackNavigator<GroupsStackParamList>();

const GroupNavigator = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="NewGroup"
    >
      <Stack.Screen name="NewGroup" component={NewGroup} />
      <Stack.Screen name="NewGroupDetails" component={NewGroupDetails} />
      <Stack.Screen name="Statistics" component={Statistics} />
      <Stack.Screen name="GroupSearch" component={GroupSearch} />
      <Stack.Screen name="ExpenseDetails" component={ExpenseDetails} />
    </Stack.Navigator>
  );
});

export default GroupNavigator;
