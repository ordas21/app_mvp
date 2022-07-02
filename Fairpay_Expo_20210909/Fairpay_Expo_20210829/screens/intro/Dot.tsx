import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";

interface DotsProps<T> {
  translationX: Animated.SharedValue<number>;
  data: Array<T>;
}

function Dots<T>({ data, translationX }: DotsProps<T>) {
  const theme = useTheme();
  const { width } = useLayout();

  return (
    <View style={[styles.container]}>
      {data.map((_, i) => {
        const dotColor = useDerivedValue(() => {
          return interpolateColor(
            translationX.value,
            [(i - 1) * width, i * width, (i + 1) * width],
            [
              theme["dot-basic-color-2"],
              theme["dot-basic-color-1"],
              theme["dot-basic-color-2"],
            ]
          );
        });

        const dotWidth = useDerivedValue(() => {
          return interpolate(
            translationX.value,
            [(i - 1) * width, i * width, (i + 1) * width],
            [8, 16, 8],
            Extrapolate.CLAMP
          );
        });

        const dotStyle = useAnimatedStyle(() => {
          return {
            backgroundColor: dotColor.value,
            width: dotWidth.value,
          };
        });

        return (
          <Animated.View key={i.toString()} style={[styles.dot, dotStyle]} />
        );
      })}
    </View>
  );
}

export default Dots;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 40,
    paddingRight: 60,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    marginHorizontal: 4,
  },
});
