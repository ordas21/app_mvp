import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Text from "components/Text";
import { FlagProps } from "constants/Types";
import { Avatar } from "@ui-kitten/components";

interface CurrencyCountryProps {
  item: FlagProps;
  onPress?(): void;
}
const CurrencyCountry = ({ item, onPress }: CurrencyCountryProps) => {
  if (item?.type === "header" && item.title) {
    return (
      <Text marginTop={32} category="h7-p" status="body" marginBottom={16}>
        {item.title}
      </Text>
    );
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.button}
        onPress={onPress}
      >
        <Avatar source={item?.icon} style={styles.flag} />

        <Text marginHorizontal={12} center category="h7-p" status="basic">
          {item?.nation}
        </Text>
        <Text status="body" center category="h8-sl">
          {item?.country}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CurrencyCountry;

const styles = StyleSheet.create({
  container: {},
  flag: {
    borderRadius: 0,
    height: 16,
    width: 24,
  },
  button: {
    flexDirection: "row",
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
});
