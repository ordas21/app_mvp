import React, { memo } from "react";
import { StyleSheet, Image, View } from "react-native";
import { Button } from "@ui-kitten/components";
import useAppTheme from "hooks/useAppTheme";

import Text from "./Text";
import Container from "./Container";

import { ModalScreenType } from "constants/Types";
import { Images } from "assets/images";

const NotificationScreen = memo(
  ({
    image,
    title,
    description,
    children,
    buttonsViewStyle,
  }: ModalScreenType) => {
    const { theme } = useAppTheme();

    return (
      <Container style={styles.container}>
        <View style={styles.top}>
          <Image
            style={styles.image}
            source={
              image
                ? image
                : theme === "dark"
                ? Images.congratsDark
                : Images.congratsLight
            }
          />
          <Text marginTop={32} center category="h6">
            {title}
          </Text>
          <Text category="h8-p" status="body" marginTop={16} center>
            {description}
          </Text>
        </View>
        <View style={[styles.bottom, buttonsViewStyle]}>
          {!!children &&
            children.map((i, index: number) => {
              const { status, title, onPress } = i;
              return (
                <Button
                  size="large"
                  style={[{ alignItems: "center" }, index > 0 && styles.button]}
                  key={index}
                  children={title}
                  status={status}
                  onPress={onPress}
                />
              );
            })}
        </View>
      </Container>
    );
  }
);

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 160,
    height: 160,
    alignSelf: "center",
  },
  top: {
    flex: 1,
    justifyContent: "flex-end",
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 24,
    paddingHorizontal: 86,
  },
  button: {
    marginTop: 16,
  },
});
