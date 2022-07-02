import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import Text from "components/Text";

import { SplitTypeFragment } from "constants/Types";
import { CheckBox } from "@ui-kitten/components";

interface SplitTypeProps {
  item: SplitTypeFragment;
  checked?: boolean;
  onPress?(): void;
}

const SplitType = ({ item, checked, onPress }: SplitTypeProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={onPress}
    >
      <Text category={checked ? "h8" : "h8-sl"}>{item.description}</Text>
      <CheckBox checked={checked} status="round" onChange={onPress} />
    </TouchableOpacity>
  );
};

export default SplitType;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
});
