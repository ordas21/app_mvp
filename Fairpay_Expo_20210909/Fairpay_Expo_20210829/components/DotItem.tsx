import React, { useCallback } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { useTheme } from "@ui-kitten/components";

interface Props {
  dotNumber: number;
  size?: "small" | "tiny" | "tiny-s";
  style?: ViewStyle;
  dotColor?: string;
}

const DotItem = ({ dotNumber, size = "tiny", dotColor, style }: Props) => {
  const theme = useTheme();

  const getSize = (size: "small" | "tiny" | "tiny-s"): number => {
    switch (size) {
      case "small":
        return 6;
      case "tiny":
      case "tiny-s":
        return 4;
      default:
        return 4;
    }
  };

  const getSpace = (size: "small" | "tiny" | "tiny-s"): number => {
    switch (size) {
      case "small":
        return 2;
      case "tiny":
        return 1;
      case "tiny-s":
        return 4;
      default:
        return 1;
    }
  };

  const renderDots = useCallback(() => {
    let dots = [];
    let dotN = dotNumber || 0;
    for (let i = 0; i < dotN; i++) {
      dots.push(
        <View
          key={i}
          style={[
            {
              width: getSize(size),
              height: getSize(size),
              borderRadius: getSize(size),
              marginHorizontal: getSpace(size),
            },
            {
              backgroundColor: dotColor ? dotColor : theme["text-basic-color"],
            },
          ]}
        />
      );
    }
    return dots;
  }, [dotNumber]);
  return <View style={[styles.container, style]}>{renderDots()}</View>;
};
export default DotItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
