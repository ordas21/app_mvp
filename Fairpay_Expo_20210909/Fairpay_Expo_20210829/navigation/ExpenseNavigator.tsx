import React, { memo } from "react";
import createStackNavigator from "./createStackNavigator";

import { ExpenseStackParamList } from "./types";
import AddBill from "screens/expense/AddBill";
import EditBill from "screens/expense/EditBill";
import SplitBillStep1 from "screens/expense/SplitBillStep1";
import SplitBillStep2 from "screens/expense/SplitBillStep2";
import SplitBillStep3 from "screens/expense/SplitBillStep3";
import SplitBillStep4 from "screens/expense/SplitBillStep4";

const Stack = createStackNavigator<ExpenseStackParamList>();

const ExpenseNavigator = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="AddBill"
    >
      <Stack.Screen
        name="AddBill"
        component={AddBill}
        initialParams={{ bill: undefined }}
      />
      <Stack.Screen
        name="EditBill"
        component={EditBill}
        initialParams={{ bill: undefined }}
      />
      <Stack.Screen name="SplitBillStep1" component={SplitBillStep1} />
      <Stack.Screen name="SplitBillStep2" component={SplitBillStep2} />
      <Stack.Screen name="SplitBillStep3" component={SplitBillStep3} />
      <Stack.Screen name="SplitBillStep4" component={SplitBillStep4} />
    </Stack.Navigator>
  );
});

export default ExpenseNavigator;
