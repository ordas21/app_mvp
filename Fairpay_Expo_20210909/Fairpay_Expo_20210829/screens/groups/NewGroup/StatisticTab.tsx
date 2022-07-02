import { useTheme } from "@ui-kitten/components";
import AnimatedCategories from "components/AnimatedCategories";
import CurrencyText from "components/CurrencyText";
import SpendingItem from "components/SpendingItem";
import SpendItem from "components/SpendItem";
import Text from "components/Text";
import { Category_Types_Enum, Format_Type, GroupProps } from "constants/Types";
import React from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, FlatList, ScrollView } from "react-native";
import { Data_Spending_Breakdown } from "constants/Data";
interface StatisticTabProps {
  firstTitle?: string;
  secondTitle?: string;
  data?: GroupProps;
}

const StatisticTab = ({ data, firstTitle, secondTitle }: StatisticTabProps) => {
  const theme = useTheme();
  const { t } = useTranslation("statistics");
  return (
    <ScrollView style={styles.container}>
      <View style={styles.flexView}>
        <Text capitalize marginTop={42} center category="h8-sl">
          {firstTitle}
        </Text>
        <Text capitalize marginTop={42} center category="h8-sl">
          {secondTitle}
        </Text>
      </View>
      <View style={styles.flexView}>
        <CurrencyText
          center
          status={"basic"}
          marginTop={8}
          marginBottom={32}
          category="h5"
        >
          {data?.totalAmount}
        </CurrencyText>
        <CurrencyText
          center
          formatType={
            data?.type === Category_Types_Enum.Income
              ? Format_Type.INKY
              : Format_Type.SAVING
          }
          status={
            data?.type === Category_Types_Enum.Expense ? "basic" : "success"
          }
          marginTop={8}
          marginBottom={32}
          category="h5"
        >
          {data?.totalPaid}
        </CurrencyText>
      </View>
      <View
        style={[
          styles.line,
          { backgroundColor: theme["button-basic-background-color"] },
        ]}
      />
      <Text capitalize marginLeft={32} marginTop={40} category="h7">
        {t("spendingBreakdown")}
      </Text>
      <AnimatedCategories
        style={styles.category}
        categories={Data_Spending_Breakdown}
      />
      <FlatList
        scrollEnabled={false}
        data={data?.details || []}
        horizontal={false}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.breakdown}
        renderItem={({ item }) => <SpendingItem item={item} />}
      />
      <FlatList
        scrollEnabled={false}
        style={styles.frequent}
        data={data?.details || []}
        ListHeaderComponent={() => (
          <Text marginBottom={24} category="h7">
            {t("largestSpending")}
          </Text>
        )}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <SpendItem item={item} />}
      />
    </ScrollView>
  );
};

export default StatisticTab;

const styles = StyleSheet.create({
  container: {},
  category: {
    marginHorizontal: 32,
    marginTop: 24,
  },
  frequent: {
    paddingHorizontal: 32,
    marginTop: 16,
  },
  line: {
    height: 1,
    marginTop: 32,
    marginHorizontal: 32,
  },
  breakdown: {
    flexWrap: "nowrap",
    marginTop: 40,
    paddingLeft: 12,
  },
  flexView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 32,
  },
});
