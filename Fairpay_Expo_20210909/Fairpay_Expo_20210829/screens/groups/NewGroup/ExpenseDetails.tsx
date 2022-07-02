import React, { memo } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import {
  Button,
  Icon,
  Layout,
  TopNavigation,
  useTheme,
} from "@ui-kitten/components";

import Text from "components/Text";
import Container from "components/Container";
import { RefreshControl } from "react-native-web-refresh-control";

import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";
import useLayout from "hooks/useLayout";
import CurrencyText from "components/CurrencyText";
import PaidItem from "components/PaidItem";
import CurrencyCountry from "components/CurrencyCountry";
import useModalize from "hooks/useModalize";
import { useTranslation } from "react-i18next";
import ModalPanel from "components/ModalPanel";
import ActivityItem from "components/ActivityItem";
import { Category_Types_Enum } from "constants/Types";
import { getListFlag } from "utils/getListFlag";
import { getListViewDate } from "utils/getListViewDate";

const ExpenseDetails = memo(() => {
  const theme = useTheme();
  const { t } = useTranslation("expenseDetails");
  const { modalizeRef, open, close } = useModalize();
  const { width, height } = useLayout();

  const list = getListFlag();
  const listActivity = getListViewDate(ACTIVITY_DATA);

  const renderItem = React.useCallback(
    ({ item }) => <PaidItem marginTop={16} item={item} />,
    []
  );

  return (
    <Container style={[styles.container, { backgroundColor: "#3B5998" }]}>
      <ImageBackground
        source={Images.backGround1}
        style={[
          styles.image,
          {
            width: width,
            height: height / 2,
            backgroundColor: "#3B5998",
          },
        ]}
      />
      <View>
        <TopNavigation
          style={styles.topNavigation}
          accessoryRight={() => (
            <NavigationAction
              onPress={() => {}}
              icon={"edit"}
              status="opacity-p"
            />
          )}
          title={() => (
            <Icon
              pack="assets"
              name={"entertainment"}
              style={{ tintColor: theme["color-basic-100"] }}
            />
          )}
          accessoryLeft={() => <NavigationAction status="opacity-p" />}
        />
      </View>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl tintColor={theme["color-primary-500"]} />
        }
      >
        <Text
          marginTop={40}
          marginBottom={16}
          center
          category="h5"
          status={"control"}
        >
          Cruises on the Seine
        </Text>
        <Text marginBottom={40} category="h9-s" center status="white">
          Last updated on Jul 28, 2020
        </Text>
        <Layout style={styles.layout}>
          <View style={styles.flexRow}>
            <View>
              <Text marginTop={40} marginBottom={8}>
                {t("spent")}
              </Text>
              <CurrencyText category="h5">120.50</CurrencyText>
            </View>
            <View>
              <Text marginTop={40} marginBottom={8}>
                {t("receivable")}
              </Text>
              <CurrencyText
                type={Category_Types_Enum.Income}
                category="h5"
                status={"success"}
              >
                225.00
              </CurrencyText>
            </View>
          </View>
          <View
            style={[
              styles.lineUnder,
              {
                backgroundColor: theme["button-background-disable-color"],
              },
            ]}
          />
          <Text marginLeft={32} category="h8-sl">
            {t("totalBill")}
          </Text>

          <View style={styles.totalBill}>
            <CurrencyText marginTop={8} category="h5">
              486.00
            </CurrencyText>
            <Text marginTop={12} marginRight={28} category="h9-s" status="body">
              (Original €414.84)
            </Text>

            <NavigationAction
              onPress={open}
              marginLeft={32}
              icon="exchange"
              status="primary"
            />
          </View>
          <View style={styles.flexRow}>
            <Text marginTop={12} status="body" category="h8-sl">
              {t("from")}
            </Text>
            <Text center category="h8" marginTop={12} marginLeft={4}>
              Bateau Croisière - La Marina
            </Text>
          </View>
          <View
            style={[
              styles.lineUnder,
              {
                backgroundColor: theme["button-background-disable-color"],
              },
            ]}
          />
          <Text marginLeft={32} category="h7">
            {t("whoPaid")}
          </Text>
          <PaidItem marginTop={24} item={OWN_DATA} />
          <Text marginLeft={32} marginTop={48} category="h7">
            {t("splitEquallyFor")}
          </Text>
          <FlatList
            data={EXPENSE_DATA}
            renderItem={renderItem}
            scrollEnabled={false}
          />
          <View style={styles.flexRow}>
            <View>
              <Text marginTop={48} category="h8-p">
                Due date for pay:
              </Text>
              <Text category="h7" marginTop={8}>
                Aug 15, 2020
              </Text>
            </View>
            <Button
              size="large"
              style={styles.button}
              accessoryLeft={() => (
                <View style={styles.buttonNoti}>
                  <Icon name="notification" pack="assets" />
                  <Text status="black" marginLeft={8} center category="h8">
                    Send Reminder
                  </Text>
                </View>
              )}
            />
          </View>
          <Text category="h7" marginTop={48} marginLeft={32}>
            Receipt/Bill Photos
          </Text>
          <View style={styles.viewImage}>
            <Image source={Images.bill} />
            <Image source={Images.bill1} />
          </View>
          <View
            style={[
              styles.lineUnder,
              {
                backgroundColor: theme["background-line-color"],
              },
            ]}
          />
          <Text marginLeft={32} category="h7">
            Activity
          </Text>
          <FlatList
            data={listActivity}
            renderItem={({ item }) => <ActivityItem item={item} />}
          />
          <Button status="basic" size="giant" style={styles.buttonBottom}>
            Delete Expense
          </Button>
        </Layout>
      </ScrollView>
      <ModalPanel
        data={list}
        ref={modalizeRef}
        renderItem={({ item }) => (
          <CurrencyCountry item={item} onPress={close} />
        )}
        title={t("Exchange")}
        searchProps={{
          accessoryLeft: () => (
            <Icon
              style={[
                styles.iconModal,
                { tintColor: theme["color-basic-400"] },
              ]}
              pack="assets"
              name="searchNormal"
            />
          ),
          placeholder: t("typeCurrecy"),
        }}
      />
    </Container>
  );
});

export default ExpenseDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  topNavigation: {
    backgroundColor: "transparent",
  },
  layout: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  viewImage: {
    flexDirection: "row",
    paddingLeft: 16,
    marginTop: 24,
  },
  image: {
    right: 0,
    top: 0,
    left: 0,
    position: "absolute",
  },
  flexRow: {
    flexDirection: "row",
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    marginLeft: 32,
    marginTop: 48,
    width: 165,
    height: 40,
  },
  lineUnder: {
    height: 1,
    marginTop: 32,
    marginBottom: 40,
    marginHorizontal: 32,
  },
  totalBill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  iconModal: {
    marginRight: 8,
  },
  buttonNoti: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonBottom: {
    marginHorizontal: 32,
    borderRadius: 12,
    marginTop: 32,
    marginBottom: 32,
  },
});

const OWN_DATA = {
  id: 0,
  name: "Hieu Le Quang",
  amount: 486,
  avatar: Images.avatar1,
};

const ACTIVITY_DATA = [
  {
    id: 1,
    avatar: Images.avatar,
    status: "reminders",
    name: "Beulah Walker",
    description: "send you reminder",
    type: Category_Types_Enum.Income,
    date: 1595945399000,
    title: "Paris Vacation",
    amount: 123,
  },
  {
    id: 2,
    avatar: Images.avatar1,
    status: "receive",
    name: "Sally Hawkins",
    description: "money sent",
    amount: 128,
    type: Category_Types_Enum.Expense,
    date: 1595945399000,
    title: "Paris Vacation",
  },
];

const EXPENSE_DATA = [
  {
    id: 0,
    name: "Hieu Le Quang",
    amount: 486,
    avatar: Images.avatar2,
  },
  {
    id: 1,
    name: "Dorothy Arnold",
    amount: 486,
    avatar: Images.avatar,
  },
  {
    id: 2,
    name: "Gordon Hughes",
    amount: 486,
    avatar: Images.avatar3,
    settled: true,
  },
  {
    id: 3,
    name: "Mark Twain",
    amount: 486,
    avatar: Images.avatar1,
  },
];
