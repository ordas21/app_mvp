import React, { memo } from "react";
import { StyleSheet, View, FlatList, ImageBackground } from "react-native";
import { useTheme, Icon, Layout, TopNavigation } from "@ui-kitten/components";
import { useRoute } from "@react-navigation/native";
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Container from "components/Container";
import SpendItem from "components/SpendItem";
import CurrencyText from "components/CurrencyText";
import TextUnderLine from "components/TextUnderline";
import NavigationAction from "components/NavigationAction";

import keyExtractor from "utils/keyExtractor";
import { Images } from "assets/images";
import { RefreshControl } from "react-native-web-refresh-control";
import { CategoryDetailNavigationProps } from "navigation/types";

const CategoryDetail = memo(() => {
  const themes = useTheme();
  const route = useRoute<CategoryDetailNavigationProps>();
  const { width, height } = useLayout();
  const { t } = useTranslation("spendDetail");

  const { title, icon, amount, color, details } = route.params.category;

  const translateY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateY.value = event.contentOffset.y;
  });

  const scaleText = useAnimatedStyle(() => {
    const scale = interpolate(translateY.value, [0, -height * 0.225], [1, 1.2]);
    return {
      transform: [{ scale: scale }],
    };
  }, []);

  const opacityText = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [0, height * 0.06, height * 0.062, height * 0.063],
      [0, 0, 0.5, 1]
    );
    return {
      opacity: opacity,
    };
  }, []);

  const renderHeader = () => {
    return (
      <View>
        <View style={styles.title}>
          <Text>{t("haveSent")}</Text>
          <View style={styles.layout}>
            <CurrencyText marginRight={4} category="h5" status="basic">
              {amount}
            </CurrencyText>
            <Text category="h8-sl">{t("onExpense")}</Text>
          </View>
          <View
            style={[
              styles.lineUnder,
              {
                backgroundColor: themes["background-line-color"],
              },
            ]}
          />
        </View>

        <View style={styles.selectView}>
          <Text capitalize category="h7" status="basic">
            {t("history")}
          </Text>
          <TextUnderLine children={t("thisMonth")} />
        </View>
      </View>
    );
  };

  return (
    <Container style={styles.container}>
      <ImageBackground
        source={Images.backGround1}
        style={[
          styles.image,
          {
            width: width,
            height: height / 2,
            backgroundColor: color,
          },
        ]}
      />
      <View>
        <TopNavigation
          style={styles.topNavigate}
          accessoryLeft={() => <NavigationAction status="opacity" />}
          title={() => (
            <View style={styles.icon}>
              <Icon
                pack="assets"
                name={icon}
                style={{
                  tintColor: themes["color-basic-100"],
                }}
              />
              <Animated.View style={[opacityText]}>
                <Text status="white" marginTop={8} capitalize category="h7">
                  {t(title)}
                </Text>
              </Animated.View>
            </View>
          )}
        />
      </View>
      <Animated.ScrollView
        onScroll={scrollHandler}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            tintColor={themes["color-primary-500"]}
            onRefresh={() => {}}
          />
        }
      >
        <Animated.View style={scaleText}>
          <Text
            marginTop={40}
            center
            status="control"
            category="h5"
            marginBottom={40}
            capitalize
          >
            {t(title)}
          </Text>
        </Animated.View>
        <FlatList
          style={[
            styles.flatList,
            {
              backgroundColor: themes["background-basic-color-1"],
            },
          ]}
          scrollEnabled={false}
          data={details || []}
          renderItem={({ item, index }) => (
            <Layout style={styles.content}>
              <SpendItem item={item} />
            </Layout>
          )}
          keyExtractor={keyExtractor}
          ListHeaderComponent={renderHeader}
        />
      </Animated.ScrollView>
    </Container>
  );
});

export default CategoryDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    paddingBottom: 0,
  },
  image: {
    right: 0,
    top: 0,
    left: 0,
    position: "absolute",
  },
  flatList: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 40,
    marginTop: 8,
  },
  icon: {
    alignItems: "center",
    flex: 1,
    marginTop: 16,
  },
  dropDown: {
    marginLeft: 12,
    width: 145,
  },
  content: {
    paddingHorizontal: 32,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  topNavigate: {
    backgroundColor: "transparent",
    marginTop: 32,
  },
  selectView: {
    flexDirection: "row",
    paddingHorizontal: 32,
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 16,
  },
  layout: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 8,
  },
  title: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 32,
    paddingTop: 40,
  },
  lineUnder: {
    width: "100%",
    height: 1,
    marginTop: 32,
    marginBottom: 40,
  },
  listSpent: {
    paddingBottom: 40,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
});
