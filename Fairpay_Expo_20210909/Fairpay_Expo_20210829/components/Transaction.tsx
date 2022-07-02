import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useTheme } from "@ui-kitten/components";
import { useTranslation } from "react-i18next";

import Text from "./Text";
import CurrencyText from "./CurrencyText";

import {
  ActivityFragment,
  Category_Types_Enum,
  Format_Type,
} from "constants/Types";

interface TransactionProps {
  item: ActivityFragment;
  onPress?(): void;
}

const Transaction = ({ item, onPress }: TransactionProps) => {
  const { title, bill, category, amount, type_id } = item;
  const { t } = useTranslation(["common", "friendProfile"]);
  const theme = useTheme();

  if (title) {
    return (
      <Text marginTop={32} marginBottom={24} category="h8-sl">
        {title}
      </Text>
    );
  }
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.container,
        { backgroundColor: theme["background-basic-color-7"] },
      ]}
    >
      <View style={[styles.iconView, { backgroundColor: category?.color }]}>
        {category?.icon && (
          <Image
            source={category.icon.path}
            style={{ tintColor: theme["color-basic-100"] }}
          />
        )}
      </View>
      <View style={styles.row}>
        <View style={styles.textName}>
          <Text category="h8" numberOfLines={1} marginRight={12}>
            {bill?.name}
          </Text>
        </View>
        <Text category="h8-sl" marginTop={4} status="body">
          {t("total")}{" "}
          <CurrencyText category="h8-sl" status="body">
            {bill?.amount}
          </CurrencyText>
        </Text>
      </View>
      <View style={styles.bottom}>
        {type_id === Category_Types_Enum.Settled ? (
          <Text category="h8-sl">{t("friendProfile:settled")}</Text>
        ) : (
          <CurrencyText
            type={type_id}
            formatType={Format_Type.INKY}
            status={
              type_id === Category_Types_Enum.Income ? "success" : "basic"
            }
          >
            {amount}
          </CurrencyText>
        )}
      </View>
    </TouchableOpacity>
  );
};
export default Transaction;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 22,
    paddingHorizontal: 24,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  textName: {
    height: 24,
    justifyContent: "center",
  },
  row: {
    marginLeft: 16,
    flex: 1,
  },
  iconView: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  bottom: {
    position: "absolute",
    right: 24,
    bottom: 22,
  },
});
