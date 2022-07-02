import React from "react";
import {
  StyleSheet,
  Image,
  ImageSourcePropType,
  ImageBackground,
  View,
  TouchableOpacity,
} from "react-native";
import Text from "components/Text";
import { useTranslation } from "react-i18next";
import CurrencyText from "components/CurrencyText";
import { Images } from "assets/images";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Icon, useTheme } from "@ui-kitten/components";
import DotItem from "components/DotItem";
interface Props {
  image: ImageSourcePropType;
  numberCard: string;
  payment: string;
}
interface PaymentMethodProps {
  item: Props;
  onPressEdit?(): void;
  onPressDelete?(): void;
}

const PaymentMethod = ({
  item,
  onPressDelete,
  onPressEdit,
}: PaymentMethodProps) => {
  const { t } = useTranslation("account");
  const themes = useTheme();
  const startPosition = 0;
  const scrollY = useSharedValue(startPosition);
  const animationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: scrollY.value,
        },
      ],
    };
  });

  const gestureEvent = useAnimatedGestureHandler({
    onStart: (event, ctx: any) => {
      // must fix
      ctx.startY = scrollY.value;
    },
    onActive: (event, ctx) => {
      let y = ctx.startY + event.translationY;
      if (y >= startPosition + 40) {
        scrollY.value = withTiming(startPosition + 40);
      }
      if (y <= startPosition - 40) {
        scrollY.value = withTiming(startPosition - 40);
      }
      if (y === 0) {
        scrollY.value = withTiming(startPosition);
      }
    },
    onEnd: (event, ctx) => {
      let y = ctx.startY + event.translationY;
      let velY = event.velocityY;
      if (y < 0 && velY < 0) {
        scrollY.value = withTiming(startPosition);
      }
      if (y > 0 && velY > 0) {
        scrollY.value = withTiming(startPosition);
      }
    },
  });

  return (
    <View style={styles.content}>
      <PanGestureHandler onGestureEvent={gestureEvent}>
        <Animated.View style={[styles.container, animationStyle]}>
          <ImageBackground source={Images.bgMethod} style={styles.background}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.numberCard}>
              <DotItem
                dotNumber={4}
                size="tiny"
                dotColor={themes["color-basic-200"]}
              />
              <Text center category="h8" status="control">
                {item.numberCard}
              </Text>
            </View>
            <Text marginTop={25} status="control" category="h9">
              {t("spent")}
            </Text>
            <CurrencyText marginTop={6} category="h8" status="control">
              {item.payment}
            </CurrencyText>
          </ImageBackground>
        </Animated.View>
      </PanGestureHandler>
      <View style={styles.option}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            {
              backgroundColor: themes["color-primary-500"],
            },
            styles.edit,
          ]}
        >
          <Icon name="edit16" pack="assets" style={styles.icon} />
          <Text
            center
            marginLeft={8}
            category="h8"
            style={{ color: themes["color-basic-1100"] }}
          >
            {t("edit")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPressDelete}
          activeOpacity={0.7}
          style={[
            {
              backgroundColor: themes["color-danger-500"],
            },
            styles.delete,
          ]}
        >
          <Icon
            name="trash"
            pack="assets"
            style={[styles.icon, { tintColor: themes["color-basic-100"] }]}
          />
          <Text status="white" center marginLeft={8} category="h8">
            {t("delete")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentMethod;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    marginVertical: 40,
  },
  content: {
    justifyContent: "center",
  },
  numberCard: {
    alignItems: "center",
    flexDirection: "row",
  },
  image: {
    width: 40,
    height: 40,
    marginTop: 16,
    marginBottom: 24,
  },
  background: {
    width: 128,
    height: 179,
    paddingLeft: 24,
  },
  option: {
    width: 128,
    height: 179,
    position: "absolute",
    alignSelf: "center",
    borderRadius: 12,
    left: 16,
    zIndex: -10,
  },
  icon: {
    width: 16,
    height: 16,
  },
  delete: {
    height: 89,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingBottom: 11,
  },
  edit: {
    height: 89,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingTop: 11,
  },
});
