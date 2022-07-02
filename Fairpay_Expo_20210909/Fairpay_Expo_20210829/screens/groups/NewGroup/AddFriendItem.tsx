import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import Text from "components/Text";
import { Avatar,  useTheme } from "@ui-kitten/components";
import { Images } from "assets/images";
import { Category_Status_Enum } from "constants/Types";
import NavigationAction from "components/NavigationAction";

interface Props {
  id: number;
  name: string;
  phoneNumbers?: number;
  status?: Category_Status_Enum;
  image?: ImageSourcePropType;
}
interface GroupItemProps {
  item: Props;
  onPressResent?(): void;
  onPressAddFriend?(): void;
}

const AddFriendItem = ({
  item,
  onPressResent,
  onPressAddFriend,
}: GroupItemProps) => {
  const { image, name, phoneNumbers, status } = item;
  const themes = useTheme();
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themes["background-basic-color-5"] },
      ]}
    >
      <View style={styles.imageView}>
        {image ? (
          <Avatar source={image} size="small" style={styles.avatar} />
        ) : (
          <Avatar
            size="small"
            source={Images.avatarDefault}
            style={styles.avatar}
          />
        )}
        <View style={styles.title}>
          <View>
            <Text category="h8" status="basic">
              {name}
            </Text>

            {phoneNumbers ? (
              <Text category="h9-s" status="body" marginTop={4}>
                {phoneNumbers}
              </Text>
            ) : (
              <Text marginTop={4} status="body" category="h9">
                {item.status}
              </Text>
            )}
          </View>
        </View>
      </View>
      {status === Category_Status_Enum.NotFriend ? (
        <NavigationAction
          onPress={onPressAddFriend}
          icon={status}
          size="small"
          status="primary"
          marginRight={16}
        />
      ) : null}
      {status === Category_Status_Enum.RequestFriend ? (
        <TouchableOpacity onPress={onPressResent} activeOpacity={0.7}>
          <Text
            category="h9-s"
            status="body"
            marginTop={20}
            onPress={onPressResent}
            marginRight={6}
          >
            {status}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default AddFriendItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    marginBottom: 16,
    height: 80,
    justifyContent: "space-between",
  },
  imageView: {
    flexDirection: "row",
  },
  avatar: {
    marginVertical: 16,
    marginLeft: 24,
  },
  title: {
    paddingLeft: 16,
    flexDirection: "row",
    alignItems: "center",
  },
});
