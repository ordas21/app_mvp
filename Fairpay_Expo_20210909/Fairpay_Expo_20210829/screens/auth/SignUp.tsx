import React, { memo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
  Button,
  Icon,
  Input,
  Layout,
  TopNavigation,
  useTheme,
} from "@ui-kitten/components";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import useToggle from "hooks/useToggle";

import Text from "components/Text";
import Container from "components/Container";
import HideWithKeyboard from "components/HideWithKeyboard";
import NavigationAction from "components/NavigationAction";

import { AuthStackParamList } from "navigation/types";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const SignUpScreen = memo(() => {
  const themes = useTheme();
  const { t } = useTranslation("login");
  const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>();

  const [invisible, setInvisible] = useToggle(true);

  const {
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "lehieuds@gmail.com",
      password: "",
    },
  });
  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryRight={() => (
          <NavigationAction
            title={t("login")}
            onPress={() => navigate("Login")}
          />
        )}
      />
      <Text
        category="h3"
        status="basic"
        marginTop={16}
        marginHorizontal={32}
        marginBottom={8}
      >
        {t("signup")}
      </Text>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <Text
          marginTop={4}
          marginBottom={24}
          category="h8-sl"
          marginHorizontal={32}
        >
          {t("welcome")}
        </Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              keyboardType="email-address"
              label={t("email").toString()}
              style={styles.inputBox}
              placeholder={t("yourEmail")}
            />
          )}
          name="email"
          rules={{
            required: true,
            pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
            maxLength: 5,
          }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              secureTextEntry={invisible}
              onBlur={onBlur}
              label="PASSWORD"
              style={styles.inputBox}
              placeholder={t("yourPass")}
              onChangeText={onChange}
              value={value}
              accessoryRight={() => (
                <TouchableOpacity activeOpacity={0.7} onPress={setInvisible}>
                  <Icon
                    style={{ tintColor: themes["icon-eye-color"] }}
                    pack="assets"
                    name={invisible ? "eyeOn" : "eyeOff"}
                  />
                </TouchableOpacity>
              )}
            />
          )}
          name="password"
        />
        <Button
          activeOpacity={0.7}
          style={styles.buttonBottom}
          accessoryRight={() => (
            <Icon marginRight={24} pack={"assets"} name="next" />
          )}
          onPress={() => navigate("OtherInformation")}
        >
          {t("joinUs").toString()}
        </Button>
        <Text center marginTop={40} category="h8-sl" status="body">
          {t("otherWay")}
        </Text>
        <View style={styles.lastView}>
          <TouchableOpacity activeOpacity={0.7} style={styles.buttonFB}>
            <Icon
              style={{ tintColor: themes["color-basic-100"] }}
              pack="assets"
              name="facebook"
              marginLeft={24}
            />
            <Text status="white" category="h7" marginLeft={4} marginRight={24}>
              Facebook
            </Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={styles.buttonTW}>
            <Icon
              style={{ tintColor: themes["color-basic-100"] }}
              pack="assets"
              name="twitter"
            />
            <Text status="white" category="h7" marginLeft={6}>
              Twitter
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
      <HideWithKeyboard>
        <Layout style={styles.absolute}>
          <Text status="body" center category="h8-sl">
            {t("termsOfUse")}
            <Text
              center
              underline
              onPress={() => {}}
              status="body"
              category="h8-sl"
            >
              {t("term")}
            </Text>
            <Text status="body" category="h8-sl">
              {t("andThe")}
            </Text>
            <Text status="body" underline category="h8-sl">
              {t("privacy")}
            </Text>
          </Text>
        </Layout>
      </HideWithKeyboard>
    </Container>
  );
});

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonFB: {
    borderRadius: 12,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3B5998",
    flexDirection: "row",
    marginRight: 8,
  },
  buttonTW: {
    borderRadius: 12,
    flex: 1,
    marginLeft: 8,
    flexDirection: "row",
    backgroundColor: "#53D0EC",
    justifyContent: "center",
    alignItems: "center",
  },
  inputBox: {
    paddingHorizontal: 32,
    marginTop: 24,
  },
  buttonBottom: {
    flex: 1,
    justifyContent: "space-between",
    marginLeft: 32,
    marginTop: 32,
  },
  lastView: {
    flexDirection: "row",
    marginHorizontal: 32,
    justifyContent: "space-between",
    marginTop: 32,
    flex: 1,
    height: 50,
  },
  absolute: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 8,
    paddingHorizontal: 32,
  },
});
