import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useTheme, Icon } from "@ui-kitten/components";

import Text from "components/Text";

import { PaymentService } from "constants/Types";

interface PaymentProps {
  item: PaymentService;
  onPress?(): void;
}

const PaymentItem = ({ item, onPress }: PaymentProps) => {
  const theme = useTheme();

  const { logo_uri, name } = item;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.container,
        { backgroundColor: theme["background-basic-color-5"] },
      ]}
    >
      <View style={styles.box}>
        {logo_uri && <Image source={logo_uri.path} style={styles.logo} />}
        <Text category="h7" marginLeft={16}>
          {name}
        </Text>
      </View>
      <Icon
        pack="assets"
        name="arrowRight"
        style={[styles.icon, { tintColor: theme["color-basic-600"] }]}
      />
    </TouchableOpacity>
  );
};

export default PaymentItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  box: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 40,
    height: 40,
  },
  icon: {
    width: 16,
    height: 16,
  },
});
