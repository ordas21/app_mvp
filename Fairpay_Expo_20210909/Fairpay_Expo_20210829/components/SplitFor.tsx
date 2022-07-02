import React from "react";
import { Avatar, Layout } from "@ui-kitten/components";
import { View, StyleSheet, ViewStyle } from "react-native";

import Text from "./Text";
import CurrencyText from "./CurrencyText";

import { ImageFragment } from "constants/Types";

interface SplitForProps {
  full_name?: string;
  avatar?: ImageFragment;
  amount?: number;
  style?: ViewStyle;
}

const SplitFor = ({ avatar, full_name, amount, style }: SplitForProps) => {
  return (
    <Layout level="5" style={[styles.container, style]}>
      <Avatar size="small" source={avatar?.path} />
      <View style={styles.content}>
        <Text>{full_name}</Text>
        <CurrencyText category="h8-sl" marginTop={4}>
          {amount}
        </CurrencyText>
      </View>
    </Layout>
  );
};

export default SplitFor;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingVertical: 16,
    alignItems: "center",
    borderRadius: 12,
  },
  content: {
    marginLeft: 16,
  },
});
