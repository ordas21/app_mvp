import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerProps,
} from "react-native-gesture-handler";
import { useTheme, Avatar, Icon } from "@ui-kitten/components";
import { useTranslation } from "react-i18next";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  useDerivedValue,
  withTiming,
  interpolate,
  interpolateColor,
} from "react-native-reanimated";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import CurrencyText from "components/CurrencyText";
import AnimatedAppearance from "components/AnimatedAppearance";

import {
  Category_Types_Enum,
  Format_Type,
  FriendFragment,
} from "constants/Types";
interface FriendsItemProps
  extends Pick<PanGestureHandlerProps, "simultaneousHandlers"> {
  item: FriendFragment;
  index?: number;
  onRemind?(): void;
  onSettleUp?(): void;
}

const FriendsItem = ({
  item,
  index,
  onRemind,
  onSettleUp,
  simultaneousHandlers,
}: FriendsItemProps) => {
  const { avatar, amount, type_id, name }: FriendFragment = item;
  const theme = useTheme();

  const { width } = useLayout();

  const TRANSLATE_X_THRESHOLD = width * 0.3;

  const { t } = useTranslation("friends");

  const scrollX = useSharedValue(0);

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onStart: (event, ctx: any) => {
      // must fix
      ctx.startX = scrollX.value;
    },
    onActive: (event, ctx: any) => {
      // must fix
      scrollX.value = event.translationX;
      let x = ctx.startX + event.translationY;
      const swipeRight = scrollX.value < -TRANSLATE_X_THRESHOLD / 2;
      const swipeLeft = scrollX.value > TRANSLATE_X_THRESHOLD / 2;
      if (x < swipeRight) {
        scrollX.value = withTiming(-TRANSLATE_X_THRESHOLD);
      } else if (x > swipeLeft) {
        scrollX.value = withTiming(TRANSLATE_X_THRESHOLD);
      } else {
        scrollX.value = withTiming(0);
      }
    },
    onEnd: (event, ctx: any) => {
      // must fix
      const swipeRight = scrollX.value < -TRANSLATE_X_THRESHOLD / 1.5;
      const swipeLeft = scrollX.value > TRANSLATE_X_THRESHOLD / 1.5;
      if (swipeRight) {
        scrollX.value = withTiming(-TRANSLATE_X_THRESHOLD);
      } else if (swipeLeft) {
        scrollX.value = withTiming(TRANSLATE_X_THRESHOLD);
      } else {
        scrollX.value = withTiming(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: scrollX.value,
      },
    ],
  }));

  const leftColor = useDerivedValue(() => {
    return interpolateColor(
      scrollX.value,
      [-width * 0.3, 0, width * 0.3],
      [
        theme["color-primary-500"],
        theme["color-basic-100"],
        theme["color-danger-500"],
      ]
    );
  });

  const backgroundColor = useAnimatedStyle(() => {
    return {
      backgroundColor: leftColor.value,
    };
  });

  const left = useAnimatedStyle(() => {
    const trans = interpolate(
      scrollX.value,
      [0, width * 0.3],
      [-width * 0.3, 0]
    );

    const opacity = interpolate(scrollX.value, [0, width * 0.3], [0, 1]);

    return {
      transform: [
        {
          translateX: trans,
        },
      ],
      opacity: opacity,
    };
  });

  const right = useAnimatedStyle(() => {
    const trans = interpolate(
      scrollX.value,
      [0, -width * 0.3],
      [width * 0.3, 0]
    );

    const opacity = interpolate(scrollX.value, [0, -width * 0.3], [0, 1]);

    return {
      transform: [
        {
          translateX: trans,
        },
      ],
      opacity: opacity,
    };
  });

  return (
    <AnimatedAppearance index={index}>
      <Animated.View style={styles.container}>
        <Animated.View style={[styles.content, backgroundColor]}>
          <TouchableOpacity activeOpacity={0.7} onPress={onRemind}>
            <Animated.View style={[styles.left, left]}>
              <Icon
                pack="assets"
                name="notification"
                style={[
                  styles.icon,
                  {
                    tintColor: theme["color-basic-100"],
                  },
                ]}
              />
              <Text marginLeft={8} left status="white">
                {t("remind")}
              </Text>
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onSettleUp}
            style={styles.leftBox}
          >
            <Animated.View style={[styles.right, right]}>
              <Icon
                pack="assets"
                name="cash"
                style={[
                  styles.icon,
                  {
                    tintColor: theme["color-basic-1100"],
                  },
                ]}
              />
              <Text marginLeft={8} left status="black">
                {t("settle")}
              </Text>
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
        <PanGestureHandler
          simultaneousHandlers={simultaneousHandlers}
          onGestureEvent={panGesture}
        >
          <Animated.View
            style={[
              styles.task,
              rStyle,
              {
                width: width - 32 * 2,
                backgroundColor: theme["background-basic-color-5"],
              },
            ]}
          >
            <View style={styles.flexRow}>
              {avatar && <Avatar source={avatar.path} />}
              <Text marginLeft={16}>{name}</Text>
            </View>
            <CurrencyText
              type={type_id}
              formatType={Format_Type.INKY}
              status={
                type_id === Category_Types_Enum.Income ? "success" : "basic"
              }
            >
              {amount}
            </CurrencyText>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </AnimatedAppearance>
  );
};

export default FriendsItem;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    marginBottom: 16,
  },
  content: {
    height: "100%",
    position: "absolute",
    right: 0,
    left: 0,
    marginHorizontal: 32,
    borderRadius: 14,
    flexDirection: "row",
    overflow: "hidden",
  },
  task: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: "white",
    borderRadius: 12,
  },
  left: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    flexDirection: "row",
    borderRadius: 12,
  },
  leftBox: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    flex: 1,
  },
  icon: {
    width: 20,
    height: 20,
  },
  right: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 12,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
