import React, { memo } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Layout, TopNavigation } from "@ui-kitten/components";
import {
  useNavigation,
  CommonActions,
  NavigationProp,
} from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useAuth from "hooks/useAuth";
import useToggle from "hooks/useToggle";
import useAppTheme from "hooks/useAppTheme";

import Text from "components/Text";
import SettingsItem from "./SettingsItem";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";

import keyExtractor from "utils/keyExtractor";
import { RootStackParamList } from "navigation/types";
import { SettingsItemProps } from "constants/Types";

const SettingScreen = memo(() => {
  const { bottom } = useSafeAreaInsets();
  const { signOut } = useAuth();
  const { t } = useTranslation("settings");
  const { theme, toggleTheme } = useAppTheme();
  const { dispatch } = useNavigation<NavigationProp<RootStackParamList>>();

  const [changeTheme, setChangeTheme] = useToggle(theme === "dark");

  const features: SettingsItemProps[] = [
    {
      icon: "notification",
      color: "#3B5998",
      title: t("notifications"),
      onPress: () => {},
    },
    {
      icon: "usd",
      color: "#53D0EC",
      title: t("currency"),
      onPress: () => {},
    },
    {
      icon: "uncategory",
      color: "#FE9870",
      title: t("FAQ"),
      onChange: () => {},
    },
    {
      icon: "checkMark",
      color: "#2574FF",
      title: t("term"),
      onChange: () => {},
    },
    {
      icon: "darkMode",
      color: "#1E1F20",
      title: t("darkMode"),
      isToggle: true,
      checked: changeTheme,
      onChange: () => {
        toggleTheme();
        setChangeTheme();
      },
    },
  ];

  const nextScreen = React.useCallback(
    (screenName: keyof RootStackParamList) => {
      const resetAction = CommonActions.reset({
        index: 1,
        routes: [
          {
            name: screenName,
          },
        ],
      });
      dispatch(resetAction);
    },
    []
  );

  const logout = React.useCallback(async () => {
    await signOut();
    nextScreen("Auth");
  }, [signOut]);

  const renderItem = React.useCallback(({ item }) => {
    return <SettingsItem {...item} />;
  }, []);

  return (
    <Container style={styles.container}>
      <TopNavigation accessoryLeft={() => <NavigationAction />} />
      <Text
        marginLeft={32}
        category="h4"
        status="basic"
        marginBottom={8}
        marginTop={16}
      >
        {t("title")}
      </Text>
      <FlatList
        data={features || []}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      />
      <Layout style={[styles.bottom, { paddingBottom: bottom + 20 }]}>
        <TouchableOpacity activeOpacity={0.7} onPress={logout}>
          <Text status="danger" center marginBottom={20} category="h8-sl">
            {t("logout")}
          </Text>
        </TouchableOpacity>
        <Text status="body" center marginBottom={20} category="h8-sl">
          Fairpay 1.0.0
        </Text>
      </Layout>
    </Container>
  );
});

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 32,
    paddingTop: 40,
  },
  bottom: {
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 0,
  },
});
