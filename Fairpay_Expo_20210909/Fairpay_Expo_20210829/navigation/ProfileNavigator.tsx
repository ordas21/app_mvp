import React, { memo } from "react";
import createStackNavigator from "./createStackNavigator";
import { ProfileStackParamList } from "./types";

import Profile from "screens/profile/Profile";
import ProfileEdit from "screens/profile/ProfileEdit";
import CategoryDetail from "screens/profile/CategoryDetail";
import Spending from "screens/profile/Spending";
import SettingScreen from "screens/profile/Setting/SettingScreen";

const Stack = createStackNavigator<ProfileStackParamList>();

const ProfileNavigator = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Profile"
    >
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Setting" component={SettingScreen} />
      <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
      <Stack.Screen name="Spending" component={Spending} />
      <Stack.Screen name="CategoryDetail" component={CategoryDetail} />
    </Stack.Navigator>
  );
});

export default ProfileNavigator;
