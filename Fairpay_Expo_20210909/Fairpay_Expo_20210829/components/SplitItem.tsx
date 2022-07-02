import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme, Avatar, CheckBox, Icon, Input } from "@ui-kitten/components";
import { useTranslation } from "react-i18next";

import Text from "components/Text";

import { SplitBillFragment, Split_Types_Enum } from "constants/Types";

interface SplitItemProps {
  item: SplitBillFragment;
  onAdd?(): void;
  onChooseItem?(): void;
  checked?: boolean;
  type?: Split_Types_Enum;
  disabled?: boolean;
}

const SplitItem = ({
  item,
  checked,
  type,
  disabled,
  onChooseItem,
  onAdd,
}: SplitItemProps) => {
  const theme = useTheme();
  const { t } = useTranslation("splitBill");
  const { avatar, name, addDefault, amount } = item;
  const currency = "€";

  return addDefault ? (
    <View style={styles.default}>
      <TouchableOpacity
        style={[
          styles.layout,
          { backgroundColor: theme["background-basic-color-7"] },
        ]}
        activeOpacity={disabled ? 1 : 0.7}
        onPress={onAdd}
        disabled={disabled}
      >
        <View
          style={[
            styles.iconView,
            { backgroundColor: theme["color-primary-500"] },
          ]}
        >
          <Icon pack="assets" name="plus" />
        </View>
        <Text marginLeft={16}>{t("addParticipants")}</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View style={styles.container}>
      <CheckBox
        checked={checked}
        onChange={onChooseItem}
        style={styles.checkBox}
      />
      <TouchableOpacity
        style={[
          styles.layout,
          {
            backgroundColor: theme["background-basic-color-7"],
            justifyContent: "space-between",
          },
        ]}
        disabled={disabled}
        activeOpacity={0.7}
        onPress={onChooseItem}
      >
        <View style={styles.row}>
          <Avatar source={avatar} size="small" />
          <Text numberOfLines={1} marginLeft={16} marginRight={12}>
            {name}
          </Text>
        </View>
        <View
          style={[
            styles.flexDirection,
            {
              paddingRight: type === Split_Types_Enum.Unequally ? 16 : 42,
            },
          ]}
        >
          {amount && (
            <Input
              size="small"
              status="disableFill"
              disabled={type === Split_Types_Enum.Unequally ? false : true}
              accessoryLeft={() => <Text>{currency}</Text>}
              value={amount.toString()}
              keyboardType="number-pad"
              accessoryRight={
                type === Split_Types_Enum.Unequally
                  ? () => (
                      <Icon
                        pack="assets"
                        name="edit16"
                        style={{
                          tintColor: theme["color-primary-500"],
                          marginLeft: 10,
                        }}
                      />
                    )
                  : undefined
              }
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SplitItem;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    flexDirection: "row",
    paddingLeft: 34,
  },
  layout: {
    paddingVertical: 16,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    flex: 1,
    paddingLeft: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  default: {
    paddingLeft: 72,
  },
  iconView: {
    width: 48,
    height: 48,
    borderRadius: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  checkBox: {
    marginRight: 18,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  flexDirection: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
