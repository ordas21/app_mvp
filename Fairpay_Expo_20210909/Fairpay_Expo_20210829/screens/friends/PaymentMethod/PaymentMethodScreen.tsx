import React, { memo } from "react";
import { FlatList, StyleSheet } from "react-native";
import { TopNavigation } from "@ui-kitten/components";
import { useTranslation } from "react-i18next";
import { useNavigation, NavigationProp } from "@react-navigation/native";

import Text from "components/Text";
import PaymentItem from "./PaymentItem";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";

import keyExtractor from "utils/keyExtractor";
import { FriendsStackParamList } from "navigation/types";
import useAppTheme from "hooks/useAppTheme";
import { PaymentService, Payment_Types_Enum } from "constants/Types";
import { Images } from "assets/images";

const PaymentMethodScreen = memo(() => {
  const { t } = useTranslation("paymentMethod");
  const { theme } = useAppTheme();
  const { navigate } = useNavigation<NavigationProp<FriendsStackParamList>>();

  const handleChosePayment = React.useCallback(() => {
    navigate("AddPayment");
  }, []);

  const renderItem = React.useCallback(({ item }) => {
    return <PaymentItem item={item} onPress={handleChosePayment} />;
  }, []);
  const Payment_Method: PaymentService[] = [
    {
      id: "uuid",
      logo_uri: {
        path: Images.master,
      },
      name: "Credit Card",
      kind_id: Payment_Types_Enum.CreditCard,
    },
    {
      id: "uuid1",
      logo_uri: {
        path: Images.payPal,
      },
      name: "PayPal",
      kind_id: Payment_Types_Enum.PayPal,
    },
    {
      id: "uuid3",
      logo_uri: {
        path: theme === "dark" ? Images.applePay : Images.lightApplePay,
      },
      name: "Apple Pay",
      kind_id: Payment_Types_Enum.ApplePay,
    },
  ];
  return (
    <Container style={styles.container}>
      <TopNavigation accessoryLeft={() => <NavigationAction icon="close" />} />
      <Text category="h4" marginLeft={32} marginTop={8} marginBottom={8}>
        {t("title")}
      </Text>
      <FlatList
        data={Payment_Method}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        scrollEventThrottle={16}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </Container>
  );
});

export default PaymentMethodScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingHorizontal: 32,
    paddingTop: 40,
  },
});
