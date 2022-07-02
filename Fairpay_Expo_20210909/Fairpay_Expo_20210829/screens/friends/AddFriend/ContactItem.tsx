import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme, Avatar, CheckBox } from "@ui-kitten/components";

import Text from "components/Text";

import { Contact } from "expo-contacts";
import { Images } from "assets/images";

interface ContactItemProps {
  item: Contact;
  onChooseItem?(): void;
  listItemChose?: Contact[];
  checked?: boolean;
}

const ContactItem = ({ item, checked, onChooseItem }: ContactItemProps) => {
  const theme = useTheme();

  const { phoneNumbers, name, imageAvailable, image } = item;

  return (
    <View style={styles.container}>
      <CheckBox
        checked={checked}
        onChange={onChooseItem}
        style={styles.checkBox}
      />
      <TouchableOpacity
        style={[
          styles.layout,
          {
            backgroundColor: theme["background-basic-color-7"],
          },
        ]}
        activeOpacity={0.7}
        onPress={onChooseItem}
      >
        <View style={styles.row}>
          {imageAvailable ? (
            <Avatar source={{ uri: image?.uri }} size="small" />
          ) : (
            <Avatar size="small" source={Images.avatarDefault} />
          )}
          <View style={styles.content}>
            <Text numberOfLines={1} marginLeft={16}>
              {name}
            </Text>
            {phoneNumbers && (
              <Text category="h9-s" status="body" marginLeft={16} marginTop={4}>
                {phoneNumbers[0].number}
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ContactItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingLeft: 34,
    marginBottom: 16,
  },
  layout: {
    paddingVertical: 16,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    flex: 1,
    paddingLeft: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  checkBox: {
    marginRight: 18,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  flexDirection: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  content: {
    flex: 1,
    paddingRight: 24,
  },
});
