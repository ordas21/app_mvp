import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { useTranslation } from "react-i18next";
import useAppTheme from "hooks/useAppTheme";

import Text from "components/Text";

import { Images } from "assets/images";
import { Button } from "@ui-kitten/components";

interface ContactEmptyProps {
  onPress?(): void;
}

const ContactEmpty = ({ onPress }: ContactEmptyProps) => {
  const { theme } = useAppTheme();
  const { t } = useTranslation("addFriend");

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={theme === "light" ? Images.contactLight : Images.contactDark}
      />
      <Text
        category="h9-s"
        status="body"
        center
        marginHorizontal={32}
        marginTop={32}
      >
        {t("contactEmpty")}
      </Text>
      <Button
        size="large"
        style={styles.button}
        children={t("settings").toString()}
        onPress={onPress}
      />
    </View>
  );
};

export default ContactEmpty;

const styles = StyleSheet.create({
  container: {},
  image: {
    alignSelf: "center",
    marginTop: 72,
    width: 120,
    height: 120,
  },
  button: {
    marginHorizontal: 92,
    marginTop: 12,
  },
});
