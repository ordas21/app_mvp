import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Text from "components/Text";
import { Icon, Layout, useTheme } from "@ui-kitten/components";
import { useTranslation } from "react-i18next";
import { Category_Types_Enum, GroupProps } from "constants/Types";
import CurrencyText from "components/CurrencyText";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { MainStackParamList } from "navigation/types";

export interface GroupItemProps {
  item: GroupProps;
  onPin: (item: any) => void; // must fix
}

const GroupItem = ({ item, onPin }: GroupItemProps) => {
  const { navigate } = useNavigation<NavigationProp<MainStackParamList>>();
  const { t } = useTranslation("groups");
  const themes = useTheme();
  if (typeof item === "string") {
    return (
      <Text category="h8-sl" marginLeft={32} marginBottom={24} marginTop={32}>
        {item}
      </Text>
    );
  }
  return (
    <TouchableOpacity
      onPress={() => navigate("GroupDetails", { category: item })}
      activeOpacity={0.7}
      style={[
        styles.container,
        { backgroundColor: themes["background-text-input-color"] },
      ]}
    >
      <View style={styles.firstLine}>
        <Text category="h7" status="basic" capitalize>
          {item.title}
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            onPin(item);
          }}
        >
          <Icon
            style={[
              styles.icon,
              {
                tintColor:
                  item.pined === true
                    ? themes["background-check-box-color"]
                    : themes["dot-basic-color-2"],
              },
            ]}
            pack="assets"
            name="pinGroup"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.middleLine}>
        <Icon
          pack="assets"
          name="participants"
          style={{ tintColor: themes["color-basic-600"] }}
        />
        <Text marginLeft={8} status="body" category="h8-p">
          {item.friendInGroup} {t("friends")}
        </Text>
      </View>
      <View style={styles.lastLine}>
        <View style={styles.expense}>
          <Icon
            pack="assets"
            name="expense"
            style={{ tintColor: themes["color-basic-600"] }}
          />
          <Text marginLeft={8} status="body" category="h8-p">
            {item.numberExpense} {t("expense")}
          </Text>
        </View>
        {item.type === Category_Types_Enum.Settled ? (
          <Text capitalize status="basic" category="h8-p">
            {t("Settled!")}
          </Text>
        ) : (
          <CurrencyText
            status={
              item.type === Category_Types_Enum.Expense ? "basic" : "success"
            }
            category="h8"
          >
            {item.amount}
          </CurrencyText>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default GroupItem;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 24,
    paddingRight: 16,
    borderRadius: 12,
    marginHorizontal: 32,
    marginBottom: 16,
  },
  firstLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginBottom: 16,
  },
  middleLine: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  lastLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  icon: {
    width: 16,
    height: 16,
  },
  expense: {
    flexDirection: "row",
    alignItems: "center",
  },
});
