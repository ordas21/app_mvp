import React, { memo } from "react";
import { StyleProp, TextStyle } from "react-native";
import { Text, TextProps } from "@ui-kitten/components";
import { EvaStatus } from "@ui-kitten/components/devsupport";

export interface MyTextProps extends TextProps {
  style?: StyleProp<TextStyle>;
  category?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "h7"
    | "h7-p"
    | "h7-sl"
    | "h8"
    | "h8-p"
    | "h8-sl"
    | "h9"
    | "h9-s";
  status?: EvaStatus | "body" | "white" | "black" | "note";
  children?: any;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
  marginVertical?: number;
  marginHorizontal?: number;
  opacity?: number;
  maxWidth?: number;
  fontSize?: number;
  lineHeight?: number;
  uppercase?: boolean;
  lowercase?: boolean;
  capitalize?: boolean;
  none?: boolean;
  left?: boolean;
  right?: boolean;
  center?: boolean;
  underline?: boolean;
  bold?: boolean;
  italic?: boolean;
}
const getLineHeight = (
  category:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "h7"
    | "h7-p"
    | "h7-sl"
    | "h8"
    | "h8-p"
    | "h8-sl"
    | "h9"
    | "h9-s"
): number => {
  switch (category) {
    case "h1":
      return 64;
    case "h2":
      return 54;
    case "h3":
      return 48;
    case "h4":
      return 38;
    case "h5":
      return 32;
    case "h6":
    case "h7-p":
      return 28;
    case "h7":
    case "h7-sl":
      return 18;
    case "h8":
    case "h8-sl":
      return 16;
    case "h8-p":
      return 24;
    case "h9":
    case "h9-s":
      return 14;
    default:
      return 24;
  }
};
export default memo(
  ({
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    marginVertical,
    marginHorizontal,
    opacity,
    uppercase,
    lowercase,
    capitalize,
    none,
    left,
    right,
    center,
    underline,
    bold,
    italic,
    category = "h8",
    status,
    children,
    maxWidth,
    style,
    ...rest
  }: MyTextProps) => {
    let textAlign: "left" | "center" | "right" | "auto" | "justify" | "left";

    left
      ? (textAlign = "left")
      : right
      ? (textAlign = "right")
      : center
      ? (textAlign = "center")
      : (textAlign = "left");

    let textTransform: "uppercase" | "lowercase" | "capitalize" | "none";

    uppercase
      ? (textTransform = "uppercase")
      : lowercase
      ? (textTransform = "lowercase")
      : capitalize
      ? (textTransform = "capitalize")
      : none
      ? (textTransform = "none")
      : (textTransform = "none");

    let fontWeight:
      | "bold"
      | "normal"
      | "100"
      | "200"
      | "300"
      | "400"
      | "500"
      | "600"
      | "700"
      | "800"
      | "900";
    bold ? (fontWeight = "bold") : (fontWeight = "normal");

    let textDecorationLine:
      | "none"
      | "underline"
      | "line-through"
      | "underline line-through";
    underline
      ? (textDecorationLine = "underline")
      : (textDecorationLine = "none");

    let fontStyle: "normal" | "italic";
    italic ? (fontStyle = "italic") : (fontStyle = "normal");

    return (
      <Text
        category={category}
        status={status}
        style={[
          {
            marginLeft: marginLeft,
            marginRight: marginRight,
            marginTop: marginTop,
            marginBottom: marginBottom,
            marginVertical: marginVertical,
            marginHorizontal: marginHorizontal,
            opacity: opacity,
            textAlign: textAlign,
            maxWidth: maxWidth,
            lineHeight: getLineHeight(category),
            textTransform: textTransform,
            textDecorationLine: textDecorationLine,
            fontWeight: fontWeight,
            fontStyle: fontStyle,
          },
          style,
        ]}
        {...rest}
      >
        {children}
      </Text>
    );
  }
);
