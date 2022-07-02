import React, { memo } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useTheme, Layout, TopNavigation } from "@ui-kitten/components";
import { useTranslation } from "react-i18next";

import Text from "components/Text";
import Content from "components/Content";
import SpendItem from "components/SpendItem";
import Container from "components/Container";
import SpentHeader from "components/SpentHeader";
import SpendingItem from "components/SpendingItem";
import CurrencyText from "components/CurrencyText";
import TextUnderLine from "components/TextUnderline";
import NavigationAction from "components/NavigationAction";
import AnimatedCategories from "components/AnimatedCategories";

import {
  BREAKDOWN_DATA,
  DATA_SPENDING_BREAKDOWN,
  FREQUENT_SPEND_DATA,
  LARGEST_SPEND_DATE,
} from "constants/Data";
import { Category_Types_Enum } from "constants/Types";
import { ProfileStackParamList } from "navigation/types";
import { NavigationProp, useNavigation } from "@react-navigation/native";

const Spending = memo(() => {
  const themes = useTheme();
  const { t } = useTranslation("spendDetail");
  const { navigate } = useNavigation<NavigationProp<ProfileStackParamList>>();

  const data = {
    firstTitle: t("youSpent"),
    secondTitle: t("totalReceivable"),
    secondNumber: "938.83",
    firstNumber: "2272.83",
    typeId: Category_Types_Enum.Income,
  };

  return (
    <Container style={styles.container}>
      <TopNavigation accessoryLeft={() => <NavigationAction />} />
      <View style={styles.header}>
        <Text category="h4" status="basic" capitalize>
          {t("spending")}
        </Text>
        <TextUnderLine>{t("thisMonth")}</TextUnderLine>
      </View>
      <Content style={styles.content} level="1">
        <SpentHeader
          style={styles.spentHeader}
          firstTitle={data.firstTitle}
          secondTitle={data.secondTitle}
          firstNumber={data.firstNumber}
          secondNumber={data.secondNumber}
        />
        <View
          style={[
            styles.lineUnder,
            {
              backgroundColor: themes["background-line-color"],
            },
          ]}
        />
        <Text marginLeft={32} category="h7" status="basic" capitalize>
          {t("spendingBreakDown")}
        </Text>
        <AnimatedCategories
          style={styles.category}
          categories={DATA_SPENDING_BREAKDOWN}
        />
        <View>
          <FlatList
            data={BREAKDOWN_DATA}
            horizontal={false}
            numColumns={2}
            keyExtractor={(item, index) => item.id.toString()}
            contentContainerStyle={styles.breakdown}
            renderItem={({ item }) => <SpendingItem item={item} />}
          />
        </View>
        <Text capitalize marginLeft={32} category="h7" status="basic">
          {t("frequentSpend")}
        </Text>
        <Layout
          style={[
            styles.layout,
            { backgroundColor: themes["background-text-input-color"] },
          ]}
        >
          <FlatList
            style={styles.frequentList}
            data={FREQUENT_SPEND_DATA}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={styles.title}>
                <Text category="h8" status="basic">
                  {item.name}
                </Text>
                <CurrencyText category="h8" status="basic">
                  {item.price}
                </CurrencyText>
              </View>
            )}
          />
        </Layout>
        <Text
          capitalize
          marginLeft={32}
          marginTop={48}
          category="h7"
          status="basic"
        >
          {t("largestSpend")}
        </Text>
        <FlatList
          scrollEnabled={false}
          style={styles.frequent}
          data={LARGEST_SPEND_DATE}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({ item }) => <SpendItem item={item} />}
        />
      </Content>
    </Container>
  );
});

export default Spending;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  content: {
    paddingTop: 32,
  },
  button: {
    marginHorizontal: 32,
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: 32,
    justifyContent: "space-between",
    paddingBottom: 8,
  },
  dropDown: {
    marginLeft: 12,
  },
  spentHeader: {
    paddingHorizontal: 32,
  },
  lineUnder: {
    height: 1,
    marginBottom: 40,
    marginTop: 32,
    marginHorizontal: 32,
  },
  frequent: {
    paddingHorizontal: 32,
    marginTop: 16,
    paddingBottom: 108,
  },
  breakdown: {
    alignItems: "center",
    marginTop: 40,
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
    paddingHorizontal: 24,
  },
  layout: {
    borderRadius: 12,
    marginHorizontal: 32,
    marginTop: 24,
  },
  frequentList: {
    paddingVertical: 12,
  },
  category: {
    marginHorizontal: 32,
    marginTop: 24,
  },
});
export const OPTION_DATA = ["Today", "This Month", "This Year"];
