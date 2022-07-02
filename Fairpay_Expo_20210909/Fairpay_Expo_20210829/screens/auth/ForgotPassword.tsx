import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { Button, Icon, Input, TopNavigation } from "@ui-kitten/components";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { useNavigation, NavigationProp } from "@react-navigation/native";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";

import { AuthStackParamList } from "navigation/types";

const ForgotPassword = memo(() => {
  const { t } = useTranslation("login");
  const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>();

  const {
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "lehieuds@gmail.com",
    },
  });

  return (
    <Container style={styles.container}>
      <TopNavigation accessoryLeft={() => <NavigationAction />} />
      <Text
        marginLeft={32}
        marginTop={8}
        marginBottom={8}
        status="basic"
        category="h4"
      >
        {t("forgotPass")}
      </Text>
      <Content level="1">
        <Text marginHorizontal={32} category="h8-p" marginTop={8} status="body">
          {t("receiveEmail")}
        </Text>
        <Controller
          control={control}
          name="email"
          rules={{
            required: true,
            pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              status={errors.email ? "warning" : undefined}
              value={value}
              onChangeText={onChange}
              autoFocus={true}
              onBlur={onBlur}
              keyboardType="email-address"
              label={t("email").toString()}
              style={styles.input}
              placeholder={t("yourEmail")}
            />
          )}
        />
        <Button
          activeOpacity={0.7}
          accessoryRight={() => <Icon pack={"assets"} name="next" />}
          style={styles.buttonBottom}
          onPress={() => navigate("ChangePassword")}
        >
          {t("sendEmail").toString()}
        </Button>
      </Content>
    </Container>
  );
});

export default ForgotPassword;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonBottom: {
    marginTop: 32,
    justifyContent: "space-between",
    flex: 1,
    marginLeft: 32,
  },
  input: {
    marginTop: 48,
    paddingHorizontal: 32,
  },
});
