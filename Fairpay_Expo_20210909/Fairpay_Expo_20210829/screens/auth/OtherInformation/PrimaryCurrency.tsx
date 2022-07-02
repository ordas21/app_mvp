import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme, Icon } from "@ui-kitten/components";
import useAppTheme from "hooks/useAppTheme";

import Text from "components/Text";

import { CurrencyFragment } from "constants/Types";

export interface PrimaryCurrencyProps {
  item: CurrencyFragment;
  choseItem?: CurrencyFragment;
  onPress?(): void;
}

const PrimaryCurrency = ({
  item,
  choseItem,
  onPress,
}: PrimaryCurrencyProps) => {
  const themes = useTheme();
  const { theme } = useAppTheme();
  const { type, image } = item;

  const active = choseItem && item.id === choseItem.id;

  const backgroundColor = {
    backgroundColor: active
      ? themes["background-basic-color-6"]
      : themes["background-basic-color-5"],
  };

  const backgroundIcon = {
    backgroundColor: active
      ? themes["background-active-color"]
      : themes["button-background-disable-color"],
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.container, backgroundColor]}
      onPress={onPress}
    >
      <View style={[styles.image, backgroundIcon]}>
        <Icon pack="assets" name={image} />
      </View>
      <Text
        category="h9"
        status={active ? (theme === "light" ? "white" : "dark") : "basic"}
        marginTop={12}
      >
        {type}
      </Text>
    </TouchableOpacity>
  );
};

export default PrimaryCurrency;

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    marginRight: 16,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  image: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    width: 48,
    height: 48,
  },
});
