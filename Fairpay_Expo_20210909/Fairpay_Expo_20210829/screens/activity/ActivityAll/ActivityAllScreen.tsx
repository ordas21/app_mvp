import React, { memo } from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import {
  useTheme,
  Button,
  Input,
  Layout,
  TopNavigation,
} from "@ui-kitten/components";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useLayout from "hooks/useLayout";
import useAppTheme from "hooks/useAppTheme";
import useModalize from "hooks/useModalize";

import Text from "components/Text";
import ActivityTab from "./ActivityTab";
import Container from "components/Container";
import ModalPanel from "components/ModalPanel";
import FilterActivities from "./FilterActivities";
import ActivityItem from "components/ActivityItem";
import NavigationAction from "components/NavigationAction";

import { Images } from "assets/images";
import { ACTIVITY_DATA } from "constants/Data";
import { ActivityProps } from "constants/Types";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface Props<T = any> {
  // must fix
  data: Array<T>;
}
const ActivityAllScreen = memo(({ data }: Props<ActivityProps>) => {
  const themes = useTheme();
  const { width } = useLayout();
  const { theme } = useAppTheme();
  const { top } = useSafeAreaInsets();
  const { t } = useTranslation(["activity", "common", "country", "filterDate"]);

  const [isSearch, setIsSearch] = React.useState<boolean>(false);
  const [index, setIndex] = React.useState<number>(0);
  const [indexCurrency, setIndexCurrency] = React.useState<number>(0);
  const [dataSearch, setDataSearch] = React.useState<ActivityProps[]>();

  const [routes] = React.useState([
    { key: "all", title: "All" },
    { key: "remainder", title: "Remainder" },
    { key: "paymentReceived", title: "Payment Received" },
    { key: "paymentSent", title: "Payment Sent" },
  ]);

  const refTab = React.useRef<ScrollView>(null);
  const { open, close, modalizeRef } = useModalize();

  const {
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { search: "" },
  });

  const onSearch = React.useCallback(() => {
    setIsSearch(!isSearch);
  }, [isSearch]);

  React.useMemo(() => {
    setIndexCurrency(indexCurrency);
  }, [indexCurrency]);

  React.useEffect(() => {
    refTab.current?.scrollTo({
      x: indexCurrency * 78 + 16 - (width - 120) / 2 + 120,
      animated: true,
    });
  }, [indexCurrency]);

  const renderSearchEmpty = React.useCallback(() => {
    return <Layout style={styles.layout} />;
  }, []);

  const TabAll = () => (
    <ActivityTab
      nodataTitle={t("noActivity")}
      nodataImage={Images.empty}
      data={ACTIVITY_DATA}
    />
  );
  const Remainder = () => (
    <ActivityTab
      nodataImage={theme === "dark" ? Images.darkBell : Images.bell}
      nodataTitle={t("noReminder")}
      data={[]}
    />
  );
  const PaymentReceived = () => (
    <ActivityTab
      nodataImage={theme === "dark" ? Images.darkMoneyIn : Images.moneyIn}
      nodataTitle={t("paymentReceived")}
      data={[]}
    />
  );
  const PaymentSent = () => (
    <ActivityTab
      nodataImage={theme === "dark" ? Images.darkMoneyOut : Images.moneyOut}
      nodataTitle={t("paymentSent")}
      data={[]}
    />
  );
  const renderScene = SceneMap({
    all: TabAll,
    remainder: Remainder,
    paymentReceived: PaymentReceived,
    paymentSent: PaymentSent,
  });

  const renderTabBar = React.useCallback((props) => {
    return (
      <TabBar
        {...props}
        scrollEnabled
        contentContainerStyle={styles.containerStyle}
        style={styles.tabView}
        tabStyle={styles.tabBar}
        indicatorStyle={styles.tabView}
        renderLabel={({ route, focused }) => (
          <View>
            <Text
              category="h8-sl"
              status={focused ? "basic" : "body"}
              marginTop={12}
              marginRight={32}
            >
              {route.title}
            </Text>
            {focused ? (
              <View
                style={[
                  {
                    backgroundColor: themes["background-basic-color-6"],
                  },
                  styles.underText,
                ]}
              />
            ) : null}
          </View>
        )}
      />
    );
  }, []);

  return (
    <Container
      useSafeArea={false}
      style={[styles.container, { paddingTop: top }]}
    >
      <TopNavigation
        title={() => (
          <Text category="h8" status="basic">
            {t("activity")}
          </Text>
        )}
        accessoryLeft={() => <NavigationAction />}
        accessoryRight={() => (
          <NavigationAction icon="filter" onPress={open} status="basic" />
        )}
      />
      <Layout>
        <KeyboardAwareScrollView>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                returnKeyType="search"
                clearButtonMode={"always"}
                style={styles.input}
                onChangeText={onChange}
                onFocus={onSearch}
                onBlur={() => {
                  setIsSearch(false);
                  onBlur;
                }}
                value={value}
                keyboardType="email-address"
                size="large"
                placeholder={"Enter name, group and more"}
              />
            )}
            name="search"
          />
        </KeyboardAwareScrollView>
      </Layout>
      {isSearch ? (
        <FlatList
          data={dataSearch}
          renderItem={({ item }) => <ActivityItem item={item} />}
          ListEmptyComponent={renderSearchEmpty}
          contentContainerStyle={styles.flatList}
          style={{ backgroundColor: themes["background-basic-color-2"] }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <>
          <TabView
            showPageIndicator
            renderTabBar={renderTabBar}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: width }}
            style={styles.content}
            transitionStyle="scroll"
          />
        </>
      )}
      <ModalPanel title={t("filter")} ref={modalizeRef}>
        <View>
          <FilterActivities />
          <Button style={styles.button} size="large">
            {t("filterDate:result").toString()}
          </Button>
        </View>
      </ModalPanel>
    </Container>
  );
});

export default ActivityAllScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    width: "auto",
  },
  containerStyle: {
    paddingLeft: 32,
  },
  content: {},
  input: {
    marginHorizontal: 32,
    marginTop: 8,
  },
  tabView: {
    backgroundColor: "transparent",
  },

  flatList: {},
  icon: {
    width: 16,
    height: 16,
  },
  image: {
    width: 160,
    height: 160,
    marginTop: 88,
  },
  underText: {
    width: 8,
    height: 3,
    borderRadius: 10,
  },
  layout: {
    flex: 1,
    alignItems: "center",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 24,
    paddingHorizontal: 32,
    marginTop: 40,
  },
  button: {
    marginHorizontal: 24,
    marginTop: 32,
  },
});
