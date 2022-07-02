import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar, useTheme } from "@ui-kitten/components";
import Text from "components/Text";
import { Contact } from "expo-contacts";
import { Images } from "assets/images";

export interface GroupFriendProps {
  item: Contact;
  onPress?(): void;
}

const AddFriend = ({ item, onPress }: GroupFriendProps) => {
  const themes = useTheme();
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.container,
        { backgroundColor: themes["background-basic-color-5"] },
      ]}
      onPress={onPress}
    >
      {item.imageAvailable ? (
        <Avatar source={{ uri: item.image?.uri }} size="small" />
      ) : (
        <Avatar size="small" source={Images.avatarDefault} />
      )}
      <View>
        <Text marginLeft={16} capitalize category="h8">
          {item.name}
        </Text>
        {item.phoneNumbers && (
          <Text category="h9-s" status="body" marginLeft={16} marginTop={4}>
            {item.phoneNumbers[0].number}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default AddFriend;

const styles = StyleSheet.create({
  container: {
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    marginBottom: 12,
    paddingLeft: 16,
  },
});
