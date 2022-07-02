import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import Text from "components/Text";
import { useTranslation } from "react-i18next";
import { Category_Types_Enum, Format_Type } from "constants/Types";
import CurrencyText from "./CurrencyText";

interface HeaderItemProps {
  firstTitle: string;
  secondTitle: string;
  firstNumber: string;
  secondNumber: string;
  typeId?: Category_Types_Enum;
  style?: StyleProp<ViewStyle>;
}

const SpentHeader = ({
  firstNumber,
  secondNumber,
  firstTitle,
  secondTitle,
  typeId,
  style,
}: HeaderItemProps) => {
  return (
    <View style={[styles.container, style]}>
      <View>
        <Text capitalize status="basic" category="h8-p">
          {firstTitle}
        </Text>
        <CurrencyText category="h5">{firstNumber}</CurrencyText>
      </View>
      <View>
        <Text capitalize status="basic" category="h8-p">
          {secondTitle}
        </Text>
        <CurrencyText
          type={typeId}
          formatType={Format_Type.INKY}
          status={typeId === Category_Types_Enum.Income ? "basic" : "success"}
          category="h5"
        >
          {secondNumber}
        </CurrencyText>
      </View>
    </View>
  );
};

export default SpentHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
