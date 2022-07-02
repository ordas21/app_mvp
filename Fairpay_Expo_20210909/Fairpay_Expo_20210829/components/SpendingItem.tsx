import React, { memo } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Text from "components/Text";
import NavigationAction from "./NavigationAction";
import CurrencyText from "./CurrencyText";
import { SpendingProps } from "constants/Types";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ProfileStackParamList } from "navigation/types";
import { Icon, useTheme } from "@ui-kitten/components";

interface SpendingItemProps {
  item: SpendingProps;
  onPress?(): null;
}

const SpendingItem = ({ item, onPress }: SpendingItemProps) => {
  const { navigate } = useNavigation<NavigationProp<ProfileStackParamList>>();
  const themes = useTheme();
  return (
    <TouchableOpacity
      onPress={() => {
        navigate("CategoryDetail", { category: item });
      }}
      activeOpacity={0.7}
      style={styles.touch}
    >
      <View
        style={[
          styles.icon,
          {
            backgroundColor: item.color,
          },
        ]}
      >
        <Icon
          name={item.icon}
          pack="assets"
          style={{ tintColor: themes["color-basic-100"] }}
        />
      </View>
      <View>
        <Text marginBottom={8} status="body" category="h9" capitalize>
          {item.icon}
        </Text>
        <CurrencyText category="h7">{item.amount}</CurrencyText>
      </View>
    </TouchableOpacity>
  );
};

export default SpendingItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  touch: {
    flexDirection: "row",
    marginBottom: 32,
    marginHorizontal: 20,
    width: 141,
  },
  icon: {
    height: 40,
    width: 40,
    alignItems: "center",
    borderRadius: 12,
    justifyContent: "center",
    marginRight: 16,
  },
});
