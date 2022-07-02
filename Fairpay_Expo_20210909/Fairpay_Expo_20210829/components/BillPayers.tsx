import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme, Avatar, Icon } from "@ui-kitten/components";

import Text from "./Text";

import { BillPayersProps } from "constants/Types";

interface Props {
  item: BillPayersProps;
}

const BillPayers = ({ item }: Props) => {
  const { name, payers } = item;
  const [active, setActive] = useState(false);
  const theme = useTheme();

  const background = active
    ? theme["background-bill-payer-color"]
    : theme["background-basic-color-7"];

  const color = active
    ? theme["icon-check-box-color"]
    : theme["icon-basic-color"];

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => setActive(!active)}
      style={[styles.container, { backgroundColor: background }]}
    >
      <View style={styles.flexRow}>
        <View style={styles.top}>
          <Text
            status={active ? "white" : "basic"}
            numberOfLines={2}
            marginTop={8}
          >
            {name}
          </Text>
        </View>
        {active ? (
          <Icon pack="assets" name="checkMark" style={{ tintColor: color }} />
        ) : null}
      </View>
      <View style={styles.space} />
      <View style={styles.bottom}>
        {payers &&
          payers.map((i, index) => {
            const source = i.avatar?.path;
            const length = payers.length;
            if (length < 4) {
              return <Avatar style={styles.avatar} source={source} />;
            } else {
              if (index < 2) {
                return <Avatar style={styles.avatar} source={source} />;
              } else if (index === 2) {
                return (
                  <View
                    style={[
                      styles.avatar,
                      { backgroundColor: theme["color-primary-500"] },
                    ]}
                  >
                    <Text status="black">+{length - 3}</Text>
                  </View>
                );
              }
            }
          })}
      </View>
    </TouchableOpacity>
  );
};

export default BillPayers;

const styles = StyleSheet.create({
  container: {
    width: 240,
    height: 104,
    marginRight: 16,
    borderRadius: 12,
    paddingTop: 16,
    paddingLeft: 24,
    paddingRight: 16,
    paddingBottom: 24,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 4,
  },
  top: {
    flex: 1,
    marginRight: 8,
  },
  space: {
    flex: 1,
  },
  bottom: {
    flexDirection: "row",
  },
  flexRow: {
    flexDirection: "row",
  },
});
