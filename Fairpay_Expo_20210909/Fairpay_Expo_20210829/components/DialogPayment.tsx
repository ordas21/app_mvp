import React from "react";
import { View } from "react-native";
import {
  Avatar,
  Button,
  Icon,
  Modal,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components";
import { useTranslation } from "react-i18next";
import useLayout from "hooks/useLayout";
import useAppTheme from "hooks/useAppTheme";

import Text from "./Text";
import CurrencyText from "./CurrencyText";

import dayjs from "utils/dayjs";
import { Images } from "assets/images";
import { ActivityProps, Category_Types_Enum } from "constants/Types";

interface DialogPaymentProps {
  item: ActivityProps;
}
const initValue = {
  id: 1,
  avatar: Images.avatar1,
  status: "reminders",
  name: "Beulah Walker",
  description: "send you reminderl",
  type: Category_Types_Enum,
  date: "Jul 12, 2020",
  title: "Paris Vacation",
  amount: 123,
};

function DialogPayment(
  { item }: DialogPaymentProps,
  ref: React.ForwardedRef<{ show: () => void; hide: () => void }>
) {
  const { width } = useLayout();
  const { theme, toggleTheme } = useAppTheme();
  const { t } = useTranslation("dialogPayment");
  const styles = useStyleSheet(themedStyles);

  const modalRef = React.useRef<Modal>(null);

  const {
    title,
    type,
    service,
    date,
    description,
    amount,
    avatar = Images.avatar1,
    name,
  } = item || initValue;
  React.useImperativeHandle(ref, () => ({
    show: () => {
      modalRef.current?.show();
    },
    hide: () => {
      modalRef.current?.hide();
    },
  }));

  const hide = React.useCallback(() => {
    modalRef.current?.hide();
  }, []);

  const handleSettleUp = React.useCallback(() => {
    hide();
  }, []);

  const handleViewExpense = React.useCallback(() => {
    hide();
  }, []);
  return (
    <Modal
      ref={modalRef}
      onBackdropPress={hide}
      backdropStyle={[
        styles.container,
        {
          backgroundColor:
            theme === "light"
              ? "rgba(30, 31, 32, 0.86)"
              : "rgba(0, 0, 0, 0.86)",
        },
      ]}
    >
      <View style={[styles.modal, { width: width - 32 * 2 }]}>
        <Avatar style={styles.avatar} size="large" source={avatar} />
        {type === Category_Types_Enum.Income ? (
          <Text center category="h8">
            {name}
            <Text category="h8-p">{t("paid")} </Text>
            <CurrencyText category="h8">{amount}</CurrencyText>
            <Text category="h8-p">{t("via")}</Text>
            <Text category="h8-p">{service}</Text>
          </Text>
        ) : (
          <>
            <Text center category="h8-p">
              {t("pay")}
            </Text>
            <Text marginTop={6} center category="h8">
              {name} <CurrencyText category="h8">{amount}</CurrencyText>
            </Text>
          </>
        )}
        <View style={styles.top}>
          <Icon pack="assets" name="groups" style={styles.icon} />
          <Text category="h8-sl">{title}</Text>
        </View>
        <View style={styles.flexRow}>
          <Icon pack="assets" name="expense" style={styles.icon} />
          <Text capitalize category="h8-sl">
            {description}
          </Text>
        </View>
        <View style={styles.flexRow}>
          <Icon
            pack="assets"
            name={type === Category_Types_Enum.Income ? "time" : "dueDate"}
            style={styles.icon}
          />
          <Text category="h8-sl">
            {type === Category_Types_Enum.Income
              ? dayjs(date).format("MMM D, YYYY hh:mm A")
              : dayjs(date).format("MMM D, YYYY ")}
          </Text>
        </View>
        <Button
          children={
            type === Category_Types_Enum.Expense
              ? t("settleUp").toString()
              : t("viewExpense").toString()
          }
          onPress={
            type === Category_Types_Enum.Income
              ? handleViewExpense
              : handleSettleUp
          }
          style={styles.button}
          size="large"
          children={
            type === Category_Types_Enum.Income
              ? t("viewExpense").toString()
              : t("settleUp").toString()
          }
        />
      </View>
    </Modal>
  );
}

export default React.forwardRef(DialogPayment) as (
  props: DialogPaymentProps & {
    ref?: React.ForwardedRef<{ show: () => void; hide: () => void }>;
  }
) => ReturnType<typeof DialogPayment>;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(30, 31, 32, 0.86)",
  },
  modal: {
    paddingHorizontal: 32,
    paddingTop: 60,
    borderRadius: 24,
    paddingBottom: 40,
    backgroundColor: "background-modal-color",
  },
  avatar: {
    position: "absolute",
    alignSelf: "center",
    top: -40,
    borderWidth: 4,
    borderColor: "background-modal-color",
    borderRadius: 40,
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 16,
    tintColor: "color-basic-600",
  },
  top: {
    flexDirection: "row",
    marginTop: 22,
  },
  flexRow: {
    flexDirection: "row",
    marginTop: 16,
  },
  button: {
    marginTop: 40,
  },
});
