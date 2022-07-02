import React, { memo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useTheme, Icon, TopNavigationAction } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import useAppTheme from "hooks/useAppTheme";

import Text from "./Text";

import { EvaStatus } from "@ui-kitten/components/devsupport";

interface NavigationActionProps {
  icon?: string;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  onPress?: () => void;
  title?: string;
  titleStatus?: EvaStatus | "body" | "white";
  status?:
    | "basic"
    | "primary"
    | "opacity"
    | "opacity-p"
    | "transparent"
    | "control";
  size?: "giant" | "large" | "medium" | "small"; // giant-58-icon-24 large-48-icon-24  medium-40-icon-24  small-32-icon-16
  disabled?: boolean;
}

const NavigationAction = memo(
  ({
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    marginHorizontal,
    marginVertical,
    onPress,
    icon = "back",
    title,
    size = "medium",
    status = "basic",
    titleStatus,
    disabled,
  }: NavigationActionProps) => {
    const themes = useTheme();

    const { theme } = useAppTheme();
    const { goBack } = useNavigation();
    const _onPress = React.useCallback(() => {
      if (onPress) {
        onPress && onPress();
      } else {
        goBack();
      }
    }, [onPress, goBack]);

    const getBackGroundColor = (
      status:
        | "basic"
        | "primary"
        | "opacity"
        | "opacity-p"
        | "transparent"
        | "control"
    ): string => {
      switch (status) {
        case "basic":
          return themes["background-basic-color-7"];
        case "primary":
          return themes["color-primary-500"];
        case "opacity":
        case "opacity-p":
          return theme === "light"
            ? "rgba(30, 31, 32, 0.24)"
            : "rgba(20, 20, 21, 0.24)";
        case "transparent":
          return "transparent";
        case "control":
          return theme === "light"
            ? themes["color-basic-400"]
            : themes["color-basic-700"];

        default:
          return themes["background-basic-color-7"];
      }
    };

    const getIconColor = (
      status:
        | "basic"
        | "primary"
        | "opacity"
        | "opacity-p"
        | "transparent"
        | "control"
    ): string => {
      switch (status) {
        case "basic":
          return themes["icon-basic-color"];
        case "primary":
          return themes["icon-primary-color"];
        case "opacity":
          return themes["color-basic-100"];
        case "opacity-p":
          return themes["color-primary-500"];
        case "transparent":
          return themes["color-primary-500"];
        case "control":
          return theme === "light"
            ? themes["color-basic-1100"]
            : themes["color-basic-500"];
        default:
          return themes["background-basic-color-7"];
      }
    };

    const getSize = (size: "giant" | "large" | "medium" | "small"): number => {
      switch (size) {
        case "giant":
          return 58;
        case "large":
          return 48;
        case "medium":
          return 40;
        case "small":
          return 32;
        default:
          return 40;
      }
    };

    const getSizeIcon = (
      size: "giant" | "large" | "medium" | "small"
    ): number => {
      switch (size) {
        case "giant":
          return 24;
        case "large":
          return 24;
        case "medium":
          return 24;
        case "small":
          return 16;
        default:
          return 24;
      }
    };

    const getBorderRadius = (
      size: "giant" | "large" | "medium" | "small"
    ): number => {
      switch (size) {
        case "giant":
          return 12;
        case "large":
          return 24;
        case "medium":
          return 12;
        case "small":
          return 8;
        default:
          return 12;
      }
    };

    return title ? (
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={0.7}
        onPress={onPress}
      >
        <Text category="h7" status={titleStatus}>
          {title}
        </Text>
      </TouchableOpacity>
    ) : (
      <TopNavigationAction
        onPress={_onPress}
        disabled={disabled}
        activeOpacity={0.7}
        style={[
          styles.container,
          {
            marginBottom: marginBottom,
            marginTop: marginTop,
            marginLeft: marginLeft,
            marginRight: marginRight,
            marginHorizontal: marginHorizontal,
            marginVertical: marginVertical,
            height: getSize(size),
            width: getSize(size),
            borderRadius: getBorderRadius(size),
            backgroundColor: getBackGroundColor(status),
          },
        ]}
        icon={(props) => (
          <Icon
            {...props}
            pack="assets"
            name={icon}
            style={[
              {
                height: getSizeIcon(size),
                width: getSizeIcon(size),
              },
              { tintColor: getIconColor(status) },
            ]}
          />
        )}
      />
    );
  }
);

export default NavigationAction;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
