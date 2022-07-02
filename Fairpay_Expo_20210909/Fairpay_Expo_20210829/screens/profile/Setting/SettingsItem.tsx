import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme, Icon, Toggle } from "@ui-kitten/components";
import useAppTheme from "hooks/useAppTheme";

import Text from "components/Text";

import { SettingsItemProps } from "constants/Types";

const SettingsItem = ({
  icon,
  color,
  title,
  checked,
  isToggle,
  isArrow = !isToggle && true,
  onChange,
  onPress,
}: SettingsItemProps) => {
  const themes = useTheme();
  const { theme } = useAppTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={onPress}
    >
      <View style={[styles.icon, { backgroundColor: color }]}>
        <Icon
          style={{ tintColor: themes["color-basic-100"] }}
          name={icon}
          pack="assets"
        />
      </View>
      <View style={styles.text}>
        <Text category="h8" marginRight={32}>
          {title}
        </Text>
      </View>
      {!!isArrow && (
        <Icon
          name="arrowRight"
          pack="assets"
          style={[
            styles.arrow,
            {
              tintColor:
                theme === "dark"
                  ? themes["color-basic-100"]
                  : themes["color-basic-1100"],
            },
          ]}
        />
      )}
      {!!isToggle && <Toggle checked={checked} onChange={onChange} />}
    </TouchableOpacity>
  );
};

export default SettingsItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 12,
    alignItems: "center",
  },
  text: {
    flex: 1,
  },
  icon: {
    height: 40,
    width: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  arrow: {
    width: 16,
    height: 16,
  },
});
