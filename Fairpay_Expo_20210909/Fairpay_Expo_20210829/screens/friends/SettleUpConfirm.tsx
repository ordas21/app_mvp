import React, { memo } from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import {
  Avatar,
  Button,
  Icon,
  Layout,
  TopNavigation,
  useTheme,
} from "@ui-kitten/components";
import {
  useRoute,
  useNavigation,
  NavigationProp,
} from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useAppTheme from "hooks/useAppTheme";

import Text from "components/Text";
import DotItem from "components/DotItem";
import Content from "components/Content";
import Container from "components/Container";
import CurrencyText from "components/CurrencyText";
import NavigationAction from "components/NavigationAction";

import dayjs from "dayjs";
import { Images } from "assets/images";
import {
  RootStackParamList,
  SettleUpConfirmNavigationProps,
} from "navigation/types";

const SettleUpConfirm = memo(() => {
  const themes = useTheme();
  const route = useRoute<SettleUpConfirmNavigationProps>();
  const { theme } = useAppTheme();
  const { bottom } = useSafeAreaInsets();
  const { t } = useTranslation(["settleUpConfirm", "modalScreen"]);
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const dotColor = themes["color-basic-100"];

  const {
    name,
    account_number,
    exp_date,
    cvv,
    logo_uri,
  } = route.params.account;
  const { avatar, amount, name: nameF } = route.params.friend;

  const handleSettleUp = React.useCallback(() => {
    navigate("ModalScreen", {
      modalScreen: {
        title: t("modalScreen:moneySent"),
        description: t("modalScreen:thankForPaying", { name: nameF }),
        children: [
          {
            title: t("modalScreen:backToFriends"),
            onPress: () => navigate("Main", { screen: "Friend" }),
            status: "primary",
          },
        ],
      },
    });
  }, []);

  return (
    <Container style={styles.container}>
      <TopNavigation accessoryLeft={() => <NavigationAction />} />
      <Content level="1" padder>
        <ImageBackground
          source={
            theme === "light" ? Images.creditCardLight : Images.creditCardDark
          }
          style={styles.card}
        >
          <View style={styles.content}>
            <View style={styles.top}>
              <Text uppercase status="white">
                {name}
              </Text>
              {logo_uri && <Image source={logo_uri.path} />}
            </View>
            <View style={styles.center}>
              <DotItem dotNumber={4} size="tiny-s" dotColor={dotColor} />
              <DotItem dotNumber={4} size="tiny-s" dotColor={dotColor} />
              <DotItem dotNumber={4} size="tiny-s" dotColor={dotColor} />
              <Text category="h6" status="white">
                {account_number && account_number.toString().slice(-4)}
              </Text>
            </View>
            <View style={styles.space} />
            <View style={styles.bottom}>
              <View>
                <Text left category="h9-s" uppercase status="white">
                  {t("expDate")}
                </Text>
                <Text left status="white" marginTop={6}>
                  {dayjs(exp_date).format("MM/YY")}
                </Text>
              </View>
              <View>
                <Text right category="h9-s" uppercase status="white">
                  {t("cvv")}
                </Text>
                <Text right status="white" marginTop={6}>
                  {cvv}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
        {avatar && (
          <Avatar source={avatar.path} size="medium" style={styles.avatar} />
        )}
        <Text center category="h9-s" marginTop={16}>
          {t("makePayment")} <Text>{nameF}</Text>
        </Text>
        <CurrencyText category="h3" center marginTop={24}>
          {amount}
        </CurrencyText>
        <Text category="h9-s" status="body" center marginTop={8}>
          {t("youWill")}
          {amount && (
            <CurrencyText category="h9-s" status="body">
              {amount + 1.34}
            </CurrencyText>
          )}
          <Text category="h9-s" status="body">
            {t("afterA")}
          </Text>
          <CurrencyText category="h9-s" status="body">
            1.34
          </CurrencyText>
          <Text category="h9-s" status="body">
            {t("fee")}
          </Text>
        </Text>
      </Content>
      <Layout
        level="7"
        style={[styles.buttonView, { paddingBottom: bottom + 8 }]}
      >
        <Button
          activeOpacity={0.7}
          accessoryRight={() => <Icon pack="assets" name="checkMark" />}
          style={styles.button}
          onPress={handleSettleUp}
          children={t("settleUpNow").toString()}
        />
      </Layout>
    </Container>
  );
});

export default SettleUpConfirm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 16,
  },
  content: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 24,
  },
  top: {
    flexDirection: "row",
    paddingHorizontal: 24,
    justifyContent: "space-between",
    alignItems: "center",
  },
  center: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 24,
    paddingRight: 28,
    marginTop: 8,
    alignItems: "center",
  },
  space: {
    flex: 1,
  },
  bottom: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: 24,
    paddingRight: 28,
  },
  avatar: {
    alignSelf: "center",
    marginTop: 64,
  },
  button: {
    justifyContent: "space-between",
  },
  buttonView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 24,
    paddingTop: 24,
    paddingLeft: 32,
  },
});
