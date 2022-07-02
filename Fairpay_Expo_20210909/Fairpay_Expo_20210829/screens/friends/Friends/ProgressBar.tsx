import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import Animated, {
  useDerivedValue,
  useAnimatedStyle,
  Easing,
  withTiming,
} from "react-native-reanimated";
import { useTheme, Layout } from "@ui-kitten/components";

interface ProgressBarProps {
  style?: ViewStyle;
  income: number;
  expense: number;
}

const ProgressBar = ({ style, income, expense }: ProgressBarProps) => {
  const theme = useTheme();
  const [width, setWidth] = React.useState<number>(1);

  const progress = income / (income + expense);

  const progressValue = React.useMemo(() => {
    return progress * width;
  }, [width, progress]);

  const slider = useDerivedValue(() => {
    return progress * width;
  });

  const styleSlider = useAnimatedStyle(() => {
    return {
      width: withTiming(slider.value, {
        duration: 1000,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
    };
  });

  const onLayout = React.useCallback(({ nativeEvent }) => {
    setWidth((prev) => {
      if (prev !== nativeEvent.layout.width) {
        return nativeEvent.layout.width;
      }
      return prev;
    });
  }, []);

  return (
    <Layout level="6" style={[styles.container, style]} onLayout={onLayout}>
      <Animated.View
        style={[
          {
            height: 16,
            backgroundColor: theme["color-success-500"],
            width: progressValue,
          },
          styleSlider,
        ]}
      />
    </Layout>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    height: 16,
    borderRadius: 8,
    flexDirection: "row",
    overflow: "hidden",
  },
});
