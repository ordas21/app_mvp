import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { useTheme, Icon } from "@ui-kitten/components";
import useAppTheme from "hooks/useAppTheme";

import Text from "./Text";

export interface TextUnderLineProps {
  children?: React.ReactElement<any, any> | null;
  onPress?(): void;
  isArrow?: boolean;
  isAdd?: boolean;
  marginTop?: number;
  marginLeft?: number;
  marginBottom?: number;
  capitalize?: boolean;
}

const TextUnderLine = ({
  children,
  marginTop,
  marginLeft,
  marginBottom,
  isArrow = true,
  isAdd = false,
  capitalize,
  onPress,
}: TextUnderLineProps) => {
  const themes = useTheme();
  const { theme } = useAppTheme();

  const [width, setWidth] = React.useState<number>(0);

  const onLayout = React.useCallback(({ nativeEvent }) => {
    setWidth((prev) => {
      if (prev !== nativeEvent.layout.width) {
        return nativeEvent.layout.width;
      }
      return prev;
    });
  }, []);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          marginTop: marginTop,
          marginLeft: marginLeft,
          marginBottom: marginBottom,
        },
      ]}
      activeOpacity={0.7}
      onPress={onPress}
    >
      {isAdd && (
        <Icon
          pack="assets"
          name="addFriend"
          style={[
            styles.add,
            {
              tintColor:
                theme === "light"
                  ? themes["color-basic-600"]
                  : themes["color-primary-500"],
            },
          ]}
        />
      )}
      {theme === "light" ? (
        <View>
          <View
            style={{
              backgroundColor: themes["color-primary-500"],
              width: width - 7,
              height: 9,
              position: "absolute",
              bottom: 0,
            }}
          />
          <Text
            capitalize={capitalize}
            onLayout={onLayout}
            category="h7"
            status={theme === "light" ? "basic" : "primary"}
          >
            {children}
          </Text>
        </View>
      ) : (
        <Text category="h7" status={"primary"}>
          {children}
        </Text>
      )}
      {isArrow && (
        <Icon
          pack="assets"
          name="arrowDown"
          style={[
            styles.arrow,
            {
              tintColor:
                theme === "light"
                  ? themes["color-basic-1100"]
                  : themes["color-primary-500"],
            },
          ]}
        />
      )}
    </TouchableOpacity>
  );
};

export default TextUnderLine;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  add: {
    width: 16,
    height: 16,
    marginRight: 12,
  },
  arrow: {
    width: 16,
    height: 16,
  },
});
