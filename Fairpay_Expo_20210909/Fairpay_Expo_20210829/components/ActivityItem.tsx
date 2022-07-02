import React from "react";
import { View, StyleSheet, ViewStyle, StyleProp } from "react-native";
import Text from "components/Text";
import { Avatar, Layout } from "@ui-kitten/components";
import CurrencyText from "components/CurrencyText";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  ActivityProps,
  Category_Types_Enum,
  Format_Type,
} from "constants/Types";
import { Dispatch } from "react";
import { SetStateAction } from "react";
interface ActivityItemProps {
  item?: ActivityProps;
  onPress?(): void;
  style?: StyleProp<ViewStyle>;
  level?: string;
}

const ActivityItem = ({ item, onPress, style, level }: ActivityItemProps) => {
  if (item?.header === "header" && item.title) {
    return (
      <Layout style={style} level={level}>
        <Text
          marginLeft={32}
          marginTop={32}
          marginBottom={12}
          category="h7-p"
          status="basic"
        >
          {item?.title}
        </Text>
      </Layout>
    );
  }
  return (
    <Layout style={[styles.layout, style]} level={level}>
      <TouchableOpacity
        style={styles.container}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Avatar source={item?.avatar} size="tiny" />
        <View style={styles.textView}>
          <Text category="h8" status="basic" marginLeft={16}>
            {item?.name}
          </Text>
          <Text category="h9" status="body" marginLeft={16} marginTop={4}>
            {item?.description}
          </Text>
        </View>
        {item?.amount ? (
          <CurrencyText
            marginTop={8}
            style={styles.currencyText}
            category="h8"
            type={item.type}
            formatType={Format_Type.INKY}
            status={
              item.type === Category_Types_Enum.Income ? "success" : "basic"
            }
          >
            {item?.amount}
          </CurrencyText>
        ) : null}
      </TouchableOpacity>
    </Layout>
  );
};

export default ActivityItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 12,
  },
  currencyText: {
    right: 0,
    position: "absolute",
  },
  layout: {
    paddingHorizontal: 32,
  },
  textView: {
    justifyContent: "center",
    marginLeft: 16,
  },
});
