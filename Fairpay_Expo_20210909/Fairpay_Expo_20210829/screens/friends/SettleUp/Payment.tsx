import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme, Icon } from "@ui-kitten/components";
import { useNavigation, NavigationProp } from "@react-navigation/native";

import Text from "components/Text";
import DotItem from "components/DotItem";

import { AccountService } from "constants/Types";
import { FriendsStackParamList } from "navigation/types";

interface PaymentProps {
  item: AccountService;
  onPress?(): void;
}

const Payment = ({ item, onPress }: PaymentProps) => {
  const theme = useTheme();
  const { t } = useTranslation("settleUp");
  const { navigate } = useNavigation<NavigationProp<FriendsStackParamList>>();

  const { account_number, addDefault, logo_uri } = item;

  const handleAddPayment = React.useCallback(() => {
    navigate("PaymentMethod");
  }, []);

  return addDefault ? (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handleAddPayment}
      style={[
        styles.default,
        { backgroundColor: theme["background-basic-color-5"] },
      ]}
    >
      <View
        style={[
          styles.iconView,
          { backgroundColor: theme["color-primary-500"] },
        ]}
      >
        <Icon pack="assets" name="plus" />
      </View>
      <Text category="h8-sl" marginLeft={16}>
        {t("addPayment")}
      </Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.container,
        { backgroundColor: theme["background-basic-color-5"] },
      ]}
    >
      <View style={styles.box}>
        {logo_uri && <Image source={logo_uri.path} />}
        <View style={styles.flexRow}>
          <DotItem dotNumber={4} />
          <Text category="h7">
            {" "}
            {account_number && account_number.toString().slice(-4)}
          </Text>
        </View>
      </View>
      <Icon
        pack="assets"
        name="arrowRight"
        style={[styles.icon, { tintColor: theme["color-basic-600"] }]}
      />
    </TouchableOpacity>
  );
};

export default Payment;

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
  default: {
    flexDirection: "row",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
  },
  box: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 16,
    height: 16,
  },
  iconView: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16,
  },
});
