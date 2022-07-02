import { Button } from "@ui-kitten/components";
import { title } from "process";
import React from "react";
import { View, StyleSheet, ImageSourcePropType, Image } from "react-native";

import Text from "./Text";

interface EmptyContactProps {
  image: ImageSourcePropType;
  description: string;
  buttonTitle?: string;
  onPress?(): void;
}

const EmptyContact = ({
  image,
  description,
  buttonTitle,
  onPress,
}: EmptyContactProps) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <Text
        status="body"
        category="h9-s"
        center
        marginTop={24}
        marginBottom={16}
      >
        {description}
      </Text>
      {buttonTitle ? (
        <Button
          onPress={onPress}
          size="medium"
          children={buttonTitle}
          style={styles.buttonSetting}
        />
      ) : null}
    </View>
  );
};

export default EmptyContact;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonSetting: {
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  image: {
    marginTop: 32,
  },
});
