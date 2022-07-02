import React from "react";
import { View, StyleSheet, Image } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "@ui-kitten/components";
import { useTranslation } from "react-i18next";
import useLayout from "hooks/useLayout";
import useAppTheme from "hooks/useAppTheme";

import Text from "components/Text";

import { Images } from "assets/images";

const FriendsEmpty = () => {
  const themes = useTheme();
  const { t } = useTranslation("friends");
  const { width, height } = useLayout();
  const { theme } = useAppTheme();

  const [heightView, setHeightView] = React.useState<number>(0);
  const [widthText, setWidthText] = React.useState<number>(0);

  const onLayoutView = React.useCallback(({ nativeEvent }) => {
    setHeightView((prev) => {
      if (prev !== nativeEvent.layout.height) {
        return nativeEvent.layout.height;
      }
      return prev;
    });
  }, []);

  const onLayout = React.useCallback(({ nativeEvent }) => {
    setWidthText((prev) => {
      if (prev !== nativeEvent.layout.width) {
        return nativeEvent.layout.width;
      }
      return prev;
    });
  }, []);

  const space = (width - widthText - 52 * 2) / 2 - 5;

  return (
    <View
      onLayout={onLayoutView}
      style={[styles.container, { height: height / 2 }]}
    >
      <Image
        source={
          theme === "dark" ? Images.friendEmptyDark : Images.friendEmptyLight
        }
      />
      <Text
        onLayout={onLayout}
        marginTop={24}
        center
        category="h8-p"
        status="body"
      >
        {t("noFriends")}
      </Text>
      <Text center category="h8-p" status="body">
        {t("createFirst")}
      </Text>
      <Svg
        style={styles.shape}
        width={68}
        height={heightView - 36}
        viewBox={`0 0 68 ${heightView}`}
        fill="none"
      >
        <Path
          d={`M0 ${heightView} H0 ${space} a10 10 0 0 0 10 -10 V0 0`}
          strokeWidth={1}
          stroke={themes["color-basic-400"]}
        />
        <Path
          d={`M68 0 L66 4 L70 4 z`}
          strokeWidth={1}
          stroke={themes["color-basic-400"]}
          fill={themes["color-basic-400"]}
        />
      </Svg>
    </View>
  );
};

export default FriendsEmpty;

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 12,
  },
  shape: {
    position: "absolute",
    bottom: 36,
    right: 50,
    paddingHorizontal: 4,
  },
});
