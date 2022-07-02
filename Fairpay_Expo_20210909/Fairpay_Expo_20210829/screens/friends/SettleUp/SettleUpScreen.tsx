import React, { memo } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useTheme, Button, Layout, TopNavigation } from "@ui-kitten/components";
import { useTranslation } from "react-i18next";
import {
  useNavigation,
  useRoute,
  NavigationProp,
} from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useAppTheme from "hooks/useAppTheme";

import Payment from "./Payment";
import Text from "components/Text";
import Container from "components/Container";
import CurrencyText from "components/CurrencyText";
import NavigationAction from "components/NavigationAction";

import keyExtractor from "utils/keyExtractor";
import { Account_Service } from "constants/Data";
import {
  FriendProfileNavigationProps,
  FriendsStackParamList,
} from "navigation/types";
import { AccountService } from "constants/Types";

const SettleUpScreen = memo(() => {
  const themes = useTheme();
  const route = useRoute<FriendProfileNavigationProps>();
  const { name, amount } = route.params.friend;
  const { t } = useTranslation(["settleUp", "common"]);
  const { theme } = useAppTheme();
  const { bottom } = useSafeAreaInsets();

  const { navigate } = useNavigation<NavigationProp<FriendsStackParamList>>();

  const data = [...Account_Service, { addDefault: true }];

  const handlePaidCash = React.useCallback(() => [], []);

  const listHeaderComponent = React.useCallback(() => {
    return (
      <>
        <Layout
          style={[
            styles.box,
            {
              backgroundColor:
                theme === "light"
                  ? themes["color-basic-1100"]
                  : themes["color-basic-900"],
            },
          ]}
        >
          <Text category="h8-sl" status="white">
            {t("needPay")}
            <Text status="white">{name}</Text>
          </Text>
          <CurrencyText category="h5" marginTop={8} status="white">
            {amount}
          </CurrencyText>
        </Layout>
        <Button
          size="large"
          style={styles.button}
          children={t("paidCash").toString()}
          onPress={handlePaidCash}
        />
        <Text
          category="h8-sl"
          status="body"
          center
          marginTop={32}
          marginBottom={32}
        >
          {t("payByServices")}
        </Text>
      </>
    );
  }, [name, amount]);

  const handleGoConfirm = React.useCallback((item: AccountService) => {
    const friend = { ...route.params.friend };
    navigate("SettleUpConfirm", { friend: friend, account: item });
  }, []);

  const renderItem = React.useCallback(({ item }) => {
    return <Payment item={item} onPress={() => handleGoConfirm(item)} />;
  }, []);

  return (
    <Container style={styles.container}>
      <TopNavigation accessoryLeft={() => <NavigationAction icon="close" />} />
      <Text category="h4" marginLeft={32} marginTop={8} marginBottom={8}>
        {t("title")}
      </Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={listHeaderComponent}
        keyExtractor={keyExtractor}
        scrollEventThrottle={16}
        contentContainerStyle={styles.contentContainerStyle}
      />
      <Layout style={[styles.bottom, { paddingBottom: bottom + 8 }]}>
        <Text category="h9" status="body">
          {t("common:note")}:
        </Text>
        <Text category="h9-s" status="body">
          {t("noteContent")}
        </Text>
        <Text category="h9-s" status="body">
          {t("noteContent1")}
        </Text>
      </Layout>
    </Container>
  );
});

export default SettleUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    paddingVertical: 24,
    paddingHorizontal: 32,
    alignItems: "center",
    marginTop: 24,
    borderRadius: 12,
  },
  button: {
    marginTop: 32,
  },
  bottom: {
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 0,
    paddingHorizontal: 32,
    paddingTop: 8,
  },
  contentContainerStyle: {
    paddingHorizontal: 32,
  },
});
