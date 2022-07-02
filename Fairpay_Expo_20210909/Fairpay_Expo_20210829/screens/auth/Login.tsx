import React, { memo } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  useTheme,
  Button,
  Icon,
  Input,
  CheckBox,
  TopNavigation,
} from "@ui-kitten/components";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import useAuth from "hooks/useAuth";
import useToggle from "hooks/useToggle";

import Text from "components/Text";
import Container from "components/Container";

import * as WebBrowser from "expo-web-browser";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Login = memo(() => {
  const { t } = useTranslation("login");
  const { signIn } = useAuth();
  const { navigate, dispatch } = useNavigation();

  const themes = useTheme();
  const [invisible, setInvisible] = useToggle(true);

  const [check, setCheck] = useToggle(false);

  const nextScreen = React.useCallback((screenName: string) => {
    const resetAction = CommonActions.reset({
      index: 1,
      routes: [
        {
          name: screenName,
        },
      ],
    });
    dispatch(resetAction);
  }, []);

  const login = () => {
    signIn();
    nextScreen("Main");
  };

  const {
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "lehieuds@gmail.com",
      password: "",
    },
  });

  const handleGoPolicy = React.useCallback(() => {
    WebBrowser.openBrowserAsync(
      "https://timivietnam.github.io/fair_pay/policy"
    );
  }, []);

  const handleGoTerm = React.useCallback(() => {
    WebBrowser.openBrowserAsync("https://timivietnam.github.io/fair_pay/term");
  }, []);

  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryRight={() => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigate("SignUp")}
          >
            <Text category="h8" status="basic">
              {t("signup")}
            </Text>
          </TouchableOpacity>
        )}
      />
      <Text
        marginLeft={32}
        marginTop={16}
        status="basic"
        category="h3"
        marginBottom={8}
      >
        {t("login")}
      </Text>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <View style={styles.content}>
          <Text marginTop={4} category="h8-sl" status="basic" marginBottom={48}>
            {t("welcomeBack")}
          </Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                status={errors.email ? "warning" : undefined}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                keyboardType="email-address"
                label={t("email").toString()}
                size="large"
                placeholder={t("yourEmail")}
              />
            )}
            name="email"
            rules={{
              required: true,
              pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
            }}
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.inputPass}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.forgotPass}
                  onPress={() => navigate("ForgotPassword")}
                >
                  <Text category="h8-sl" status="body" underline>
                    {t("forgotPass")}
                  </Text>
                </TouchableOpacity>
                <Input
                  secureTextEntry={invisible}
                  onBlur={onBlur}
                  label="PASSWORD"
                  placeholder={t("yourPass")}
                  onChangeText={onChange}
                  value={value}
                  accessoryRight={() => (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={setInvisible}
                    >
                      <Icon
                        style={{ tintColor: themes["icon-eye-color"] }}
                        pack="assets"
                        name={invisible ? "eyeOff" : "eyeOn"}
                      />
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
            name="password"
          />
        </View>
        <CheckBox
          style={styles.checkBox}
          checked={check}
          onChange={setCheck}
          children={() => {
            return (
              <View style={styles.row}>
                <Text category="h9-s" status="body">
                  I Agree to
                </Text>
                <TouchableOpacity activeOpacity={0.7} onPress={handleGoPolicy}>
                  <Text category="h9-s" status="body" underline>
                    {" "}
                    Policy
                  </Text>
                </TouchableOpacity>
                <Text category="h9-s" status="body">
                  {" "}
                  and{" "}
                </Text>
                <TouchableOpacity activeOpacity={0.7} onPress={handleGoTerm}>
                  <Text category="h9-s" status="body" underline>
                    Terms
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
        <View style={styles.loginView}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.faceId,
              { backgroundColor: themes["background-basic-color-4"] },
            ]}
          >
            <Icon
              style={{ tintColor: themes["background-basic-color-2"] }}
              pack={"assets"}
              name="faceId"
            />
          </TouchableOpacity>
          <Button
            disabled={!check}
            activeOpacity={0.7}
            accessoryRight={() => (
              <Icon
                pack={"assets"}
                name="next"
                style={
                  !check && { tintColor: themes["button-text-disable-color"] }
                }
              />
            )}
            style={styles.buttonBottom}
            onPress={() => login()}
          >
            {t("login").toString()}
          </Button>
        </View>
        <Text status="body" center marginTop={40} category="h8-sl">
          {t("otherWay")}
        </Text>
        <View style={styles.lastView}>
          <TouchableOpacity activeOpacity={0.7} style={styles.buttonFB}>
            <Icon
              style={{ tintColor: themes["color-basic-100"] }}
              pack="assets"
              name="facebook"
            />
            <Text status="white" category="h8" marginLeft={4}>
              Facebook
            </Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={styles.buttonTW}>
            <Icon
              style={{ tintColor: themes["color-basic-100"] }}
              pack="assets"
              name="twitter"
            />
            <Text status="white" category="h8" marginLeft={6}>
              Twitter
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </Container>
  );
});

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 32,
  },
  buttonFB: {
    borderRadius: 12,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3B5998",
    flexDirection: "row",
  },
  buttonTW: {
    borderRadius: 12,
    marginLeft: 16,
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#53D0EC",
    justifyContent: "center",
    alignItems: "center",
  },
  loginView: {
    flexDirection: "row",
    marginLeft: 32,
    marginTop: 32,
  },
  forgotPass: {
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 10,
  },
  inputPass: {
    marginTop: 24,
  },
  inputEmail: {
    borderRadius: 8,
    marginTop: 24,
  },
  buttonBottom: {
    marginLeft: 16,
    justifyContent: "space-between",
    flex: 1,
  },
  lastView: {
    flexDirection: "row",
    marginHorizontal: 32,
    justifyContent: "space-between",
    marginTop: 32,
    flex: 1,
    height: 50,
  },
  faceId: {
    width: 58,
    height: 58,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    marginLeft: 16,
  },
  checkBox: {
    marginLeft: 32,
    marginTop: 24,
  },
  contentContainerStyle: {
    paddingBottom: 16,
  },
});
