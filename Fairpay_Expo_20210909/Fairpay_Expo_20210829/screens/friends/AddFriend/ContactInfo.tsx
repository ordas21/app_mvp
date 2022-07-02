import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
} from "react-native";
import { Contact } from "expo-contacts";
import { useTheme, Avatar, Icon } from "@ui-kitten/components";
import useAppTheme from "hooks/useAppTheme";

import Text from "components/Text";

import { Images } from "assets/images";

interface ContactInfoProps {
  item: Contact;
  onPress?(): void;
  statusName?: string;
  style?: StyleProp<ViewStyle>;
}

const ContactInfo = ({
  item,
  onPress,
  statusName,
  style,
}: ContactInfoProps) => {
  const { name, image, imageAvailable } = item;

  const themes = useTheme();
  const { theme } = useAppTheme();

  const backgroundColor =
    theme === "light"
      ? themes["color-basic-1100"]
      : themes["color-primary-500"];

  const tintColor =
    theme === "light" ? themes["color-basic-100"] : themes["color-basic-1000"];

  return (
    <View style={[styles.container, style]}>
      {imageAvailable ? (
        <Avatar source={{ uri: image?.uri }} size="small" />
      ) : (
        <Avatar size="small" source={Images.avatarDefault} />
      )}
      <Text numberOfLines={1} marginTop={8} status={statusName}>
        {name}
      </Text>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={onPress}
        style={[styles.delete, { backgroundColor: backgroundColor }]}
      >
        <Icon
          pack="assets"
          name="close"
          style={[styles.icon, { tintColor: tintColor }]}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ContactInfo;

const styles = StyleSheet.create({
  container: {
    marginRight: 16,
    maxWidth: 48,
  },
  delete: {
    width: 14,
    height: 14,
    borderRadius: 14,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    position: "absolute",
    right: 0,
  },
  icon: {
    width: 10,
    height: 10,
  },
});
