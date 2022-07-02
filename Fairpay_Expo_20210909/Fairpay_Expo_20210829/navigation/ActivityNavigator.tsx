import React, { memo } from "react";

import { ActivityStackParamList } from "./types";
import createStackNavigator from "./createStackNavigator";
import ActivityAllScreen from "screens/activity/ActivityAll/ActivityAllScreen";

const Stack = createStackNavigator<ActivityStackParamList>();

const ActivityNavigator = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="ActivityAll"
    >
      <Stack.Screen name="ActivityAll" component={ActivityAllScreen} />
    </Stack.Navigator>
  );
});

export default ActivityNavigator;
