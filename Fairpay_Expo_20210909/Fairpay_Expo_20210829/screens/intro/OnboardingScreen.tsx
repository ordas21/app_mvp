import React, { memo } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme, Button, Icon } from "@ui-kitten/components";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, CommonActions } from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import useAuth from "hooks/useAuth";

import Dots from "./Dot";
import Text from "components/Text";
import Container from "components/Container";
import FocusAwareStatusBar from "components/FocusAwareStatusBar";

import { Images } from "assets/images";
import { RootStackParamList } from "navigation/types";
import { EKeyAsyncStorage } from "constants/Types";

const OnboardingScreen = memo(() => {
  const theme = useTheme();
  const { t } = useTranslation("intro");
  const { dispatch } = useNavigation();
  const { height, width } = useLayout();
  const { top, bottom } = useSafeAreaInsets();
  const { isSignedIn } = useAuth();

  const translationX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationX.value = event.contentOffset.x;
  });

  const PAGES = [
    {
      image: Images.intro1,
      title: t("title1"),
      description: t("description1"),
    },
    {
      image: Images.intro2,
      title: t("title2"),
      description: t("description2"),
    },
    {
      image: Images.intro3,
      title: t("title3"),
      description: t("description3"),
    },
  ];

  const nextScreen = React.useCallback(
    (screenName: keyof RootStackParamList) => {
      const resetAction = CommonActions.reset({
        index: 1,
        routes: [
          {
            name: screenName,
          },
        ],
      });
      dispatch(resetAction);
    },
    []
  );

  const handleSignIn = React.useCallback(() => {
    if (isSignedIn) {
      nextScreen("Main");
    } else {
      nextScreen("Auth");
    }
    AsyncStorage.setItem(EKeyAsyncStorage.intro, "1");
  }, [isSignedIn]);

  const imageAnim = useAnimatedStyle(() => {
    const transX = interpolate(
      translationX.value,
      [0, width, width * 2],
      [0, -width, -width * 2]
    );

    return {
      transform: [{ translateX: transX }],
    };
  });

  return (
    <Container useSafeArea={false} style={styles.container}>
      <FocusAwareStatusBar barStyle="light-content" />
      <Animated.View
        style={[styles.flexDirection, { width: width * 3 }, imageAnim]}
      >
        {PAGES.map((i, index) => (
          <Image
            style={{ width: width, height: height * 0.61 }}
            source={i.image}
            key={index}
          />
        ))}
      </Animated.View>
      <View style={[StyleSheet.absoluteFill]}>
        <Svg height="100%" width="100%">
          <Path
            d={`M0 ${height * 0.61} a75 75 0 0 1 75 -75 h${
              width - 75 * 2
            } a100 100 0 0 0 100 -100 V${height} H${0} z`}
            fill={theme["background-basic-color-1"]}
          />
        </Svg>
        <View style={[styles.bottomView, { height: height * 0.485 }]}>
          {PAGES.map((i, index) => {
            const { title, description } = i;
            const opacityAnim = useAnimatedStyle(() => {
              const opacity = interpolate(
                translationX.value,
                [(index - 1) * width, index * width, (index + 1) * width],
                [0, 1, 0],
                Extrapolate.CLAMP
              );

              return {
                opacity: opacity,
              };
            });

            return (
              <Animated.View
                key={index}
                style={[opacityAnim, { width: width }]}
              >
                <Text
                  style={styles.text}
                  marginTop={48}
                  marginHorizontal={40}
                  category="h5"
                  center
                >
                  {title}
                </Text>
                <Text
                  style={styles.text}
                  marginTop={96}
                  category="h8-p"
                  marginHorizontal={40}
                >
                  {description}
                </Text>
              </Animated.View>
            );
          })}
        </View>
      </View>
      <View style={[StyleSheet.absoluteFill]}>
        <Animated.ScrollView
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          horizontal
          snapToInterval={width}
          bounces={false}
          pagingEnabled={false}
          decelerationRate="fast"
          onScroll={scrollHandler}
          style={{ width: width }}
          contentContainerStyle={{ width: width * 3 }}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleSignIn}
          style={[styles.top, { top: top + 8 }]}
        >
          <Text category="h7" status="white">
            {t("login")}
          </Text>
        </TouchableOpacity>
        <View style={[styles.bottom, { bottom: bottom + 75 }]}>
          <Dots translationX={translationX} data={PAGES} />
          <View />
          <Button
            accessoryRight={() => <Icon pack={"assets"} name="next" />}
            style={styles.button}
            onPress={handleSignIn}
          >
            {t("getStarted").toString()}
          </Button>
        </View>
      </View>
    </Container>
  );
});

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexDirection: {
    flexDirection: "row",
  },
  button: {
    flex: 1,
    justifyContent: "space-between",
  },
  bottomView: {
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 0,
  },
  top: {
    position: "absolute",
    right: 32,
  },
  bottom: {
    flexDirection: "row",
    position: "absolute",
  },
  text: {
    position: "absolute",
  },
});
