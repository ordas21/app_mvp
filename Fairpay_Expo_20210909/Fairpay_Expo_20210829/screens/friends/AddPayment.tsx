import React, { memo } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  View,
  Animated,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme, Input, TopNavigation } from "@ui-kitten/components";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import useAppTheme from "hooks/useAppTheme";
import useKeyboard from "hooks/useKeyboard";

import Text from "components/Text";
import DotItem from "components/DotItem";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";

import { Images } from "assets/images";
import { FriendsStackParamList } from "navigation/types";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const AddPayment = memo(() => {
  const themes = useTheme();
  const { t } = useTranslation(["addPayment", "common"]);
  const { theme } = useAppTheme();
  const { height: keyboardHeight } = useKeyboard();
  const { navigate } = useNavigation<NavigationProp<FriendsStackParamList>>();

  const refInput = React.useRef<Input>(null);
  const dotColor = themes["color-basic-100"];
  const [cardNumber, setCardNumber] = React.useState<string>("");

  const handlePressDone = React.useCallback(() => {
    navigate("SettleUp", {
      friend: {
        amount: 69.18,
        name: "Cora Davis",
      },
    });
  }, []);

  const handlePressNext = React.useCallback(() => {
    navigate("SettleUp", {
      friend: {
        amount: 69.18,
        name: "Cora Davis",
      },
    });
  }, []);

  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={() => <NavigationAction />}
        title={t("title").toString()}
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={styles.contentContainerStyle}
        scrollEnabled={false}
      >
        <ImageBackground
          source={
            theme === "light" ? Images.creditCardLight : Images.creditCardDark
          }
          style={styles.card}
        >
          <View style={styles.content}>
            <View style={styles.top}>
              <Text uppercase status="white">
                Hieu Le Quang
              </Text>
              <Image source={Images.master} />
            </View>
            <View style={styles.center}>
              <Text category="h6" status="white">
                4645
              </Text>
              <Text category="h6" status="white">
                5686
              </Text>
              <Text category="h6" status="white">
                8978
              </Text>
              <DotItem dotNumber={4} dotColor={dotColor} size="tiny-s" />
            </View>
            <View style={styles.space} />
            <View style={styles.bottom}>
              <View>
                <Text left category="h9-s" uppercase status="white">
                  {t("expDate")}
                </Text>
                <Text left status="white" marginTop={6}>
                  12/22
                </Text>
              </View>
              <View>
                <Text right category="h9-s" uppercase status="white">
                  {t("cvv")}
                </Text>
                <Text right status="white" marginTop={6}>
                  468
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
        <Input
          ref={refInput}
          style={styles.input}
          label={t("cardNumber").toString()}
          value={cardNumber}
          autoFocus
          onChangeText={setCardNumber}
          keyboardType="number-pad"
        />
      </KeyboardAwareScrollView>
      <Animated.View
        style={[
          styles.keyboard,
          theme === "light" ? styles.lightShadow : styles.darkShadow,
          {
            bottom: Animated.subtract(keyboardHeight, 0),
            backgroundColor: themes["background-basic-color-5"],
          },
        ]}
      >
        <NavigationAction title={t("common:done")} onPress={handlePressDone} />
        <NavigationAction title={t("common:next")} onPress={handlePressNext} />
      </Animated.View>
    </Container>
  );
});

export default AddPayment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 16,
  },
  content: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 24,
  },
  top: {
    flexDirection: "row",
    paddingHorizontal: 24,
    justifyContent: "space-between",
    alignItems: "center",
  },
  center: {
    flexDirection: "row",
    paddingLeft: 24,
    paddingRight: 28,
    marginTop: 8,
    alignItems: "center",
    justifyContent: "space-between",
  },
  space: {
    flex: 1,
  },
  bottom: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: 24,
    paddingRight: 28,
  },
  input: {
    marginTop: 32,
  },
  keyboard: {
    paddingVertical: 16,
    position: "absolute",
    right: 0,
    left: 0,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    flexDirection: "row",
  },
  lightShadow: {
    shadowColor: "rgba(120, 121, 121, 0.06)",
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 15,
    shadowOpacity: 1,
  },
  darkShadow: {
    shadowColor: "rgba(0, 0, 0, 0.16)",
    shadowOffset: { width: 0, height: -10 },
    shadowRadius: 16,
    shadowOpacity: 1,
  },
  contentContainerStyle: {
    paddingHorizontal: 32,
  },
});
