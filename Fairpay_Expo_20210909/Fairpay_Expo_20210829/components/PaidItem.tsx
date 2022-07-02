import { Avatar, Layout } from "@ui-kitten/components";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  StyleSheet,
  ImageRequireSource,
  ViewStyle,
  StyleProp,
} from "react-native";
import CurrencyText from "./CurrencyText";

import Text from "./Text";

interface Props {
  id?: number;
  avatar?: ImageRequireSource;
  name?: string;
  amount?: string;
  settled?: boolean;
}
interface PaidItemProps {
  item: Props;
  style?: StyleProp<ViewStyle>;
  marginTop?: number;
}

const PaidItem = ({ item, style, marginTop }: PaidItemProps) => {
  const { t } = useTranslation("groups");
  return (
    <Layout
      level="5"
      style={[styles.container, style, { marginTop: marginTop }]}
    >
      <Avatar source={item.avatar} style={styles.image} />
      <View style={styles.title}>
        <Text category="h8">{item.name}</Text>
        <CurrencyText category="h8-sl" marginTop={4}>
          {item.amount}
        </CurrencyText>
      </View>
      {item.settled ? (
        <Text style={styles.status} category="h8-sl">
          {t("settled")}
        </Text>
      ) : null}
    </Layout>
  );
};

export default PaidItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 32,
    borderRadius: 12,
  },
  image: {
    marginLeft: 24,
    marginVertical: 16,
    width: 48,
    height: 48,
  },
  title: {
    marginTop: 24,
    marginLeft: 16,
  },
  status: {
    position: "absolute",
    bottom: 20,
    right: 24,
  },
});
