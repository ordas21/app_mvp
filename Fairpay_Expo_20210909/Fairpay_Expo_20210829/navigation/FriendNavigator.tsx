import React, { memo } from "react";
import createStackNavigator from "./createStackNavigator";
import { FriendsStackParamList } from "./types";

import AddPayment from "screens/friends/AddPayment";
import SettleUpConfirm from "screens/friends/SettleUpConfirm";
import SettleUpScreen from "screens/friends/SettleUp/SettleUpScreen";
import AddFriendScreen from "screens/friends/AddFriend/AddFriendScreen";
import FriendProfileScreen from "screens/friends/FriendProfile/FriendProfileScreen";
import PaymentMethodScreen from "screens/friends/PaymentMethod/PaymentMethodScreen";

const Stack = createStackNavigator<FriendsStackParamList>();

const FriendNavigator = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={"FriendProfile"}
    >
      <Stack.Screen
        name="FriendProfile"
        component={FriendProfileScreen}
        initialParams={{ friend: undefined, type: undefined }}
      />
      <Stack.Screen name="SettleUp" component={SettleUpScreen} />
      <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen} />
      <Stack.Screen name="SettleUpConfirm" component={SettleUpConfirm} />
      <Stack.Screen name="AddFriend" component={AddFriendScreen} />
      <Stack.Screen name="AddPayment" component={AddPayment} />
    </Stack.Navigator>
  );
});

export default FriendNavigator;
