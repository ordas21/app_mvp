import React, { memo, useCallback, useState } from "react";
import { FlatList, StyleSheet, View, Image } from "react-native";
import { TopNavigation } from "@ui-kitten/components";

import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { useTranslation } from "react-i18next";
import GroupItem from "components/GroupItem";
import { Images } from "assets/images";
import useLayout from "hooks/useLayout";
import { useForm } from "react-hook-form";
import { Category_Types_Enum } from "constants/Types";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "navigation/types";
import useAppTheme from "hooks/useAppTheme";

const Groups = memo(() => {
  const data = GROUPS_DATA;
  const [list, setList] = useState(data);
  const { theme } = useAppTheme();
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const { t } = useTranslation("groups");
  const { height } = useLayout();
  const [isSearch, setIsSearch] = useState(false);
  const dataShow = getList(list);

  const {
    formState: { errors },
  } = useForm({
    defaultValues: { search: "" },
  });
  const onPlus = useCallback(
    () => navigate("Groups", { screen: "NewGroup" }),
    []
  );

  const accessoryRight = React.useCallback(() => {
    return (
      <View style={styles.header}>
        <NavigationAction
          icon="searchNormal"
          status="basic"
          onPress={() => navigate("Groups", { screen: "GroupSearch" })}
        />
        <NavigationAction
          marginLeft={24}
          icon="plus"
          status="primary"
          onPress={onPlus}
        />
      </View>
    );
  }, []);
  const renderEmpty = useCallback(() => {
    return (
      <View
        style={[
          {
            height: height / 2,
          },
          styles.empty,
        ]}
      >
        <Image
          source={theme === "light" ? Images.noGroups : Images.darkNoGroup}
        />
        <Text center category="h8-p" status="body" marginTop={24}>
          {t("noGroups")}
        </Text>
      </View>
    );
  }, []);

  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryRight={accessoryRight}
        accessoryLeft={() => (
          <Text capitalize category="h3">
            {t("groups")}
          </Text>
        )}
      />
      <FlatList
        data={dataShow}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <GroupItem
            item={item}
            onPin={(item) => {
              let _list = [...list];
              const index = _list.findIndex((i) => i.id === item.id);
              if (index >= 0) {
                _list[index].pined = !_list[index].pined;
              }
              setList(_list);
            }}
          />
        )}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.content}
      />
    </Container>
  );
});

export default Groups;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  input: {
    marginHorizontal: 32,
  },
  content: {
    paddingBottom: 90,
    marginTop: -8,
  },
});
const GROUPS_DATA = [
  {
    id: 0,
    title: "Avenger: Endgame Cinema",
    friendInGroup: "8",
    numberExpense: "5",
    isSettled: false,
    pined: false,
    amount: 324,
    totalPaid: 812,
    totalAmount: 934,
    type: Category_Types_Enum.Income,
    details: [
      {
        type: Category_Types_Enum.Income,
        id: 1,
        icon: "entertainment",
        title: "Cruises on the Seine",
        color: "#3B5998",
        totalAmount: 432.42,
        amount: 214.33,
      },
      {
        type: Category_Types_Enum.Income,
        id: 0,
        icon: "shopping",
        title: "Vedettes du Pont Neuf",
        color: "#FFCA62",
        totalAmount: 232.42,
        amount: 174.33,
      },
      {
        type: Category_Types_Enum.Income,
        id: 3,
        icon: "transportation",
        title: "Vedettes du Pont Neuf",
        color: "#53D0EC",
        totalAmount: 132.42,
        amount: 74.33,
      },
    ],
  },
  {
    id: 1,
    title: "Disney's Land",
    pined: false,
    totalPaid: 212,
    friendInGroup: "8",
    numberExpense: "2",
    isSettled: "settled",
    totalAmount: 434,
    amount: 123,
    type: Category_Types_Enum.Expense,
    details: [
      {
        type: Category_Types_Enum.Income,
        id: 1,
        icon: "entertainment",
        title: "Cruises on the Seine",
        color: "#3B5998",
        totalAmount: 432.42,
        amount: 214.33,
      },
      {
        type: Category_Types_Enum.Income,
        id: 0,
        icon: "shopping",
        title: "Vedettes du Pont Neuf",
        color: "#FFCA62",
        totalAmount: 232.42,
        amount: 174.33,
      },
      {
        type: Category_Types_Enum.Income,
        id: 3,
        icon: "transportation",
        title: "Vedettes du Pont Neuf",
        color: "#53D0EC",
        totalAmount: 132.42,
        amount: 74.33,
      },
    ],
  },
  {
    id: 3,
    title: "Paris Summer Vacation",
    pined: true,
    friendInGroup: "8",
    numberExpense: "2",
    isSettled: "didPaid",
    totalAmount: 534,
    totalPaid: 334,
    amount: 123,
    type: Category_Types_Enum.Settled,
    details: [
      {
        type: Category_Types_Enum.Income,
        id: 1,
        icon: "entertainment",
        title: "Cruises on the Seine",
        color: "#3B5998",
        totalAmount: 432.42,
        amount: 214.33,
      },
      {
        type: Category_Types_Enum.Income,
        id: 0,
        icon: "shopping",
        title: "Vedettes du Pont Neuf",
        color: "#FFCA62",
        totalAmount: 232.42,
        amount: 174.33,
      },
      {
        type: Category_Types_Enum.Income,
        id: 3,
        icon: "transportation",
        title: "Vedettes du Pont Neuf",
        color: "#53D0EC",
        totalAmount: 132.42,
        amount: 74.33,
      },
    ],
  },
];
const getList = (data = GROUPS_DATA) => {
  let output: any[] = [];
  // must fix
  for (let i = 0; i < data.length; i++) {
    if (data[i].pined) {
      if (output.includes("Quick Access")) {
        output.splice(1, 0, data[i]);
      } else {
        output.splice(0, 0, "Quick Access", data[i]);
      }
    } else {
      if (output.includes("All Groups")) {
        output.push(data[i]);
      } else {
        output.push("All Groups", data[i]);
      }
    }
  }
  return output;
};
