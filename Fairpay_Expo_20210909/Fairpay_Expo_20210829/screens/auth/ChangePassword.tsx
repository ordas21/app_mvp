import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { Button, Icon, Input, TopNavigation } from "@ui-kitten/components";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { useNavigation, NavigationProp } from "@react-navigation/native";

import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";

import { RootStackParamList } from "navigation/types";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ChangePassword = memo(() => {
  const { t } = useTranslation(["login", "modalScreen"]);
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const { control } = useForm({
    defaultValues: {
      passwordConfirm: "",
      password: "",
      resetCode: "",
    },
  });

  const handleGoLogin = React.useCallback(() => {
    navigate("ModalScreen", {
      modalScreen: {
        title: t("modalScreen:congrats"),
        description: t("modalScreen:changePasswordSuccess"),
        children: [
          {
            title: t("modalScreen:login"),
            onPress: () => navigate("Auth", { screen: "Login" }),
            status: "primary",
          },
        ],
      },
    });
  }, []);

  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={() => <NavigationAction status="basic" />}
      />
      <Text marginHorizontal={32} marginTop={8} category="h4" status="basic">
        {t("changePass")}
      </Text>
      <KeyboardAwareScrollView extraScrollHeight={80}>
        <Text
          marginHorizontal={32}
          marginBottom={24}
          status="body"
          category="h8-p"
          marginTop={16}
        >
          {t("resetCodeWasSent")}
        </Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              keyboardType="number-pad"
              label={t("resetCode").toString()}
              size="large"
              style={styles.inputBox}
              placeholder={t("yourCode")}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
          name="resetCode"
          rules={{
            required: true,
            maxLength: 6,
          }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              secureTextEntry
              label={t("passNew").toString()}
              size="large"
              style={styles.inputBox}
              placeholder={t("yourPass")}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="password"
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              secureTextEntry
              label={t("passConfirm").toString()}
              size="large"
              style={styles.inputBox}
              placeholder={t("yourPass")}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
          name="passwordConfirm"
        />
        <Button
          activeOpacity={0.7}
          accessoryRight={() => <Icon pack={"assets"} name="next" />}
          style={styles.buttonBottom}
          onPress={handleGoLogin}
        >
          {t("changePass").toString()}
        </Button>
      </KeyboardAwareScrollView>
    </Container>
  );
});

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonBottom: {
    marginLeft: 32,
    justifyContent: "space-between",
    marginTop: 32,
  },
  inputBox: {
    paddingHorizontal: 32,
    marginTop: 24,
  },
});
