import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Text from "components/Text";
import { Icon, useTheme } from "@ui-kitten/components";
import CurrencyText from "./CurrencyText";
import NavigationAction from "./NavigationAction";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import {
  Category_Types_Enum,
  Format_Type,
  SpendingDetailsProps,
} from "constants/Types";
import { RootStackParamList } from "navigation/types";

interface GroupSpendItemProps {
  item: SpendingDetailsProps;
  onPress?(): void;
}

const GroupSpendItem = ({ item, onPress }: GroupSpendItemProps) => {
  const themes = useTheme();
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.touch,
        { backgroundColor: themes["background-basic-color-7"] },
      ]}
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
        <Text marginTop={20} category="h8-p" capitalize>
          {item.title}
        </Text>
        <View style={styles.flexRow}>
          <Text status="body" category="h8-p">
            Total{" "}
            <CurrencyText capitalize status="body" category="h8-p">
              {item.totalAmount}
            </CurrencyText>
          </Text>
          <CurrencyText
            status={
              item.type === Category_Types_Enum.Expense ? "basic" : "success"
            }
            right
            formatType={Format_Type.INKY}
            category="h8"
            marginBottom={24}
            marginLeft={50}
            marginTop={4}
          >
            {item.amount}
          </CurrencyText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default GroupSpendItem;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  touch: {
    flexDirection: "row",
    marginBottom: 16,
    marginHorizontal: 32,
    borderRadius: 12,
    alignItems: "center",
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 24,
    marginRight: 16,
    width: 40,
    height: 40,
    borderRadius: 12,
  },
  flexRow: {
    flexDirection: "row",
  },
});
