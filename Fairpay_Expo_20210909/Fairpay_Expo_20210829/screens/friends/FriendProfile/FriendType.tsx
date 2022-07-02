import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { Icon, useTheme } from "@ui-kitten/components";
import useAppTheme from "hooks/useAppTheme";

import Text from "components/Text";
import CurrencyText from "components/CurrencyText";

import {
  Format_Type,
  FriendFragment,
  Friend_Profile_Types,
} from "constants/Types";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { FriendsStackParamList } from "navigation/types";

interface FriendTypeProps {
  item: FriendFragment;
  type: Friend_Profile_Types;
}

const FriendType = ({ item, type }: FriendTypeProps) => {
  const { type_id, amount } = item;
  const { t } = useTranslation("friendProfile");
  const { theme } = useAppTheme();
  const themes = useTheme();
  const { navigate } = useNavigation<NavigationProp<FriendsStackParamList>>();

  const backgroundColor =
    type === Friend_Profile_Types.Remind
      ? themes["color-success-500"]
      : themes["background-basic-color-6"];

  const backGround =
    theme === "light"
      ? type === Friend_Profile_Types.Remind
        ? themes["color-basic-100"]
        : themes["color-success-500"]
      : themes["color-primary-500"];

  const iconColor =
    theme === "light"
      ? type === Friend_Profile_Types.SettleUp
        ? themes["color-basic-100"]
        : themes["color-basic-1100"]
      : themes["color-basic-1100"];

  const onPress = React.useCallback(() => {
    if (type === Friend_Profile_Types.Remind) {
    } else {
      navigate("SettleUp", { friend: item });
    }
  }, [type, item]);

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <View>
        <Text
          category="h8-sl"
          status={
            type === Friend_Profile_Types.SettleUp && theme === "dark"
              ? "black"
              : "white"
          }
        >
          {type === Friend_Profile_Types.Remind
            ? t("receivable")
            : t("payable")}
        </Text>
        <CurrencyText
          status={
            type === Friend_Profile_Types.SettleUp && theme === "dark"
              ? "black"
              : "white"
          }
          category="h5"
          marginTop={8}
          type={type_id}
          formatType={Format_Type.INKY}
        >
          {amount}
        </CurrencyText>
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={[styles.box, { backgroundColor: backGround }]}
      >
        <Icon
          pack="assets"
          name={type === Friend_Profile_Types.Remind ? "reminder" : "settleUp"}
          style={[styles.icon, { tintColor: iconColor }]}
        />
        <Text
          marginLeft={6}
          status={
            type === Friend_Profile_Types.Remind
              ? "black"
              : theme === "light"
              ? "white"
              : "black"
          }
        >
          {type === Friend_Profile_Types.Remind ? t("remind") : t("settleUp")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FriendType;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingRight: 24,
    paddingLeft: 22.5,
    borderRadius: 12,
    marginTop: 32,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  box: {
    paddingLeft: 10,
    paddingVertical: 12,
    paddingRight: 16,
    flexDirection: "row",
    borderRadius: 8,
    alignItems: "center",
  },
  icon: {
    width: 16,
    height: 16,
  },
});
