import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";

import Text from "./Text";

import { CategoryFragment } from "constants/Types";
import { CheckBox, useTheme } from "@ui-kitten/components";

interface Props {
  item: CategoryFragment;
  checked?: boolean;
  onPress?(): void;
}

const Category = ({ item, checked, onPress }: Props) => {
  const { icon, color, name } = item;
  const theme = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPress={onPress}
    >
      <View style={styles.flexRow}>
        <View style={[styles.iconView, { backgroundColor: color }]}>
          {icon && (
            <Image
              style={[styles.icon, { tintColor: theme["color-basic-100"] }]}
              source={icon.path}
            />
          )}
        </View>
        <Text marginLeft={16} category="h8-sl">
          {name}
        </Text>
      </View>
      <CheckBox checked={checked} onChange={onPress} status="round" />
    </TouchableOpacity>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingLeft: 32,
    paddingRight: 34,
  },
  iconView: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 20,
    height: 20,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
