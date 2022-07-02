import React, { memo } from "react";
import { View, TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import { Input, InputProps } from "@ui-kitten/components";

interface InputSelectProps extends InputProps {
  iconStyle?: ViewStyle;
  onPress?: () => void;
}

const InputSelect = memo(
  ({
    onPress,
    iconStyle,
    disabled,
    style,
    eva,
    ...props
  }: InputSelectProps) => {
    return (
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={0.7}
        style={style}
        onPress={onPress}
      >
        <View style={styles.container} />
        <Input {...props} disabled={disabled} />
      </TouchableOpacity>
    );
  }
);

export default InputSelect;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
  },
});
