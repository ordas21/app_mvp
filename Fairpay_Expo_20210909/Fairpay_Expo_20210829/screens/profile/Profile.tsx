import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { Avatar, TopNavigation } from "@ui-kitten/components";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import Text from "components/Text";
import DotItem from "components/DotItem";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";

import { Images } from "assets/images";
import { ProfileStackParamList } from "navigation/types";

const Profile = memo(() => {
  const { t } = useTranslation("profile");
  const { navigate } = useNavigation<NavigationProp<ProfileStackParamList>>();

  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={() => <NavigationAction icon="close" />}
        accessoryRight={() => (
          <NavigationAction
            icon="edit"
            onPress={() => navigate("ProfileEdit")}
          />
        )}
      />
      <Text marginLeft={32} status="basic" category="h4" marginBottom={8}>
        {t("profile")}
      </Text>
      <Content style={styles.content} level="1">
        <Avatar size="giant" source={Images.avatarA} style={styles.avatar} />
        <Text marginTop={8} status="body" category="h8-sl">
          {t("fullName")}
        </Text>
        <Text marginTop={12} category="h7" status="basic">
          Hieu Le Quang
        </Text>
        <Text marginTop={32} status="body" category="h8-sl">
          {t("email")}
        </Text>
        <Text marginTop={12} category="h7" status="basic">
          lehieuds@gmail.com
        </Text>
        <Text marginTop={32} status="body" category="h8-sl">
          {t("phoneNumber")}
        </Text>
        <Text marginTop={12} category="h7" status="basic">
          979-777-5720
        </Text>
        <Text marginTop={32} status="body" category="h8-sl">
          {t("password")}
        </Text>
        <DotItem dotNumber={10} style={styles.dot} size="small" />
      </Content>
    </Container>
  );
});

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dot: {
    marginTop: 16,
  },
  avatar: {
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 32,
  },
  content: {
    paddingLeft: 32,
  },
});
