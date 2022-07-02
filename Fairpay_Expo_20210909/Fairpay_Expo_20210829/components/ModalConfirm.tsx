import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme, Button, Modal } from "@ui-kitten/components";
import { EvaStatus } from "@ui-kitten/components/devsupport";
import { useTranslation } from "react-i18next";
import useAppTheme from "hooks/useAppTheme";

import Text from "./Text";
interface ModalConfirmProps {
  title: string;
  description: string;
  buttonAbove?: {
    title?: string;
    onPress?: () => void;
    status?: EvaStatus;
  };
  buttonBelow?: {
    title?: string;
    onPress?: () => void;
    status?: EvaStatus;
  };
}

function ModalConfirm(
  { title, description, buttonAbove, buttonBelow }: ModalConfirmProps,
  ref: React.ForwardedRef<{ show: () => void; hide: () => void }>
) {
  const { t } = useTranslation("common");
  const themes = useTheme();
  const { theme } = useAppTheme();

  const modalRef = React.useRef<Modal>(null);

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
      <View
        style={[
          styles.modal,
          { backgroundColor: themes["background-modal-color"] },
        ]}
      >
        <Text marginHorizontal={32} category="h7" center>
          {title}
        </Text>
        <Text marginTop={16} center category="h8-p" marginHorizontal={24}>
          {description}
        </Text>
        <View style={styles.buttonView}>
          <Button
            status={buttonAbove?.status || "primary"}
            size="large"
            onPress={buttonAbove?.onPress}
          >
            {buttonAbove?.title || t("cancel").toString()}
          </Button>
          <Button
            size="large"
            style={styles.button}
            onPress={buttonBelow?.onPress}
            status={buttonBelow?.status || "basic"}
          >
            {buttonBelow?.title || t("remove").toString()}
          </Button>
        </View>
      </View>
    </Modal>
  );
}

export default React.forwardRef(ModalConfirm) as (
  props: ModalConfirmProps & {
    ref?: React.ForwardedRef<{ show: () => void; hide: () => void }>;
  }
) => ReturnType<typeof ModalConfirm>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    borderRadius: 24,
    paddingTop: 48,
    paddingBottom: 40,
    alignSelf: "center",
    marginHorizontal: 32,
  },
  buttonView: {
    paddingHorizontal: 32,
    marginTop: 32,
  },
  button: {
    marginTop: 12,
  },
});
