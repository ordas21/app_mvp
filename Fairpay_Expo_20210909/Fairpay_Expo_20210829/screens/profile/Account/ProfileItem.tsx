import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Text from "components/Text";
import { Icon, useTheme } from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ProfileStackParamList, RootStackParamList } from "navigation/types";
import useAppTheme from "hooks/useAppTheme";

interface ItemProfileProps {
  id: number;
  icon: string;
  name: string;
  route: keyof ProfileStackParamList;
}
export interface AccountSettingProps {
  item: ItemProfileProps;
}

const ProfileItem = ({ item }: AccountSettingProps) => {
  const { theme } = useAppTheme();
  const themes = useTheme();
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      onPress={() => navigate("Profile", { screen: item.route })}
      style={[
        {
          backgroundColor: themes["background-basic-color-7"],
        },
        styles.container,
      ]}
    >
      <Icon
        style={[styles.icon, { tintColor: themes["background-basic-color-6"] }]}
        name={item.icon}
        pack="assets"
      />
      <Text
        marginTop={16}
        capitalize
        status={theme === "light" ? "basic" : "body"}
        category="h8-p"
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

export default ProfileItem;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderRadius: 12,
    width: 93,
    height: 112,
  },
  icon: {
    marginTop: 24,
    marginLeft: 31,
    marginRight: 30,
  },
});
