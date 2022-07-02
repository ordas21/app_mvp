import React, { memo, useCallback } from "react";
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  View,
  Image,
} from "react-native";
import { Layout, TopNavigation, useTheme } from "@ui-kitten/components";

import Text from "components/Text";
import Container from "components/Container";
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import {
  GroupDetailsNavigationProp,
  RootStackParamList,
} from "navigation/types";
import useLayout from "hooks/useLayout";
import { Images } from "assets/images";
import NavigationAction from "components/NavigationAction";
import CurrencyText from "components/CurrencyText";
import {
  ActivityFragment,
  Category_Types_Enum,
  Format_Type,
} from "constants/Types";
import { RefreshControl } from "react-native-web-refresh-control";
import { useTranslation } from "react-i18next";
import dayjs from "utils/dayjs";
import { Data_Activities } from "constants/Data";
import Transaction from "components/Transaction";
import FocusAwareStatusBar from "components/FocusAwareStatusBar";
import useAppTheme from "hooks/useAppTheme";
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const GroupDetails = memo(() => {
  const { t } = useTranslation("groupDetails");
  const themes = useTheme();
  const { theme } = useAppTheme();
  const route = useRoute<GroupDetailsNavigationProp>();
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const { title, id, amount, type, totalAmount } = route.params.category;
  const { height, width } = useLayout();

  const [activities, setActivities] = React.useState<ActivityFragment[]>();
  const data = Data_Activities;
  //Animated
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

  const renderEmpty = useCallback(() => {
    return (
      <Layout
        level="2"
        style={[
          {
            height: height / 2,
          },
          styles.empty,
        ]}
      >
        <Image
          source={theme === "light" ? Images.noExpense : Images.darkNoExpense}
          style={styles.imageEmpty}
        />
        <Text
          marginBottom={24}
          center
          category="h8-p"
          status="body"
          marginTop={24}
        >
          {t("noExpense")}
        </Text>
        <Image source={Images.arrow} />
      </Layout>
    );
  }, []);

  React.useEffect(() => {
    let lActivities: ActivityFragment[] = [];
    for (let i = 0; i < data.length; i++) {
      let findIndex = lActivities.findIndex(
        (item) =>
          dayjs(data[i].bill?.created_at).format("MMM D, YYYY ") === item.title
      );
      if (findIndex < 0) {
        lActivities.push(
          {
            title: dayjs(data[i].bill?.created_at).format("MMM D, YYYY "),
          },
          data[i]
        );
      } else {
        lActivities.push(data[i]);
      }
    }
    setActivities(lActivities);
  }, [data]);
  const renderItem = React.useCallback(({ item }) => {
    const onPress = () => navigate("Groups", { screen: "ExpenseDetails" });

    return (
      <Layout level="2" style={styles.category}>
        <Transaction item={item} onPress={onPress} />
      </Layout>
    );
  }, []);
  return (
    <Container level="2" useSafeArea={true} style={styles.container}>
      <FocusAwareStatusBar barStyle="light-content" />

      <ImageBackground
        source={Images.backGround1}
        style={[
          styles.image,
          {
            width: width,
            height: height / 2,
            backgroundColor: themes["icon-primary-color"],
          },
        ]}
      />
      <TopNavigation
        style={styles.topNavigation}
        accessoryLeft={() => <NavigationAction status="transparent" />}
        accessoryRight={() => (
          <View style={styles.rightNavigation}>
            <NavigationAction
              marginRight={24}
              icon={"statistics"}
              status="transparent"
              onPress={() => {
                const details = { ...route.params.category };
                navigate("Groups", {
                  screen: "Statistics",
                  params: { details: details },
                });
              }}
            />
            <NavigationAction
              status="transparent"
              icon={"option"}
              onPress={() => {}}
            />
          </View>
        )}
      />
      <Animated.ScrollView
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        refreshControl={
          <RefreshControl
            tintColor={themes["color-primary-500"]}
            onRefresh={() => {}}
          />
        }
      >
        <View>
          <Animated.View style={scaleText}>
            <Text
              marginTop={40}
              marginHorizontal={40}
              center
              capitalize
              category="h5"
              status="control"
            >
              {title}
            </Text>
            <Text
              marginTop={16}
              marginBottom={40}
              center
              capitalize
              category="h9-s"
              status="control"
            >
              {t("lastSyncOn")} Jul 28, 2020
            </Text>
          </Animated.View>
          <Layout style={styles.headerFlatlist} level="2">
            <View>
              <Text category="h8-p">{t("groupSpent")}:</Text>
              <CurrencyText marginTop={8} category="h5">
                {totalAmount}
              </CurrencyText>
            </View>
            <View>
              <Text category="h8-p">{t("totalReceivable")}:</Text>
              <CurrencyText
                formatType={Format_Type.INKY}
                type={type}
                status={
                  type === Category_Types_Enum.Income ? "success" : "basic"
                }
                marginTop={8}
                category="h5"
                marginBottom={32}
              >
                {amount}
              </CurrencyText>
            </View>
          </Layout>

          <Layout level="2">
            <View
              style={[
                styles.lineUnder,
                {
                  backgroundColor: themes["button-background-disable-color"],
                },
              ]}
            />
          </Layout>
        </View>
        <FlatList
          data={activities}
          // data={[]}
          scrollEnabled={false}
          contentContainerStyle={[styles.content]}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          ListEmptyComponent={renderEmpty}
        />
      </Animated.ScrollView>
    </Container>
  );
});

export default GroupDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  topNavigation: {
    backgroundColor: "transparent",
  },
  rightNavigation: {
    flexDirection: "row",
  },
  image: {
    position: "absolute",
    right: 0,
    left: 0,
    top: 0,
  },
  content: {
    paddingBottom: 120,
  },
  flexRow: {
    flexDirection: "row",
  },
  imageEmpty: {
    marginTop: 80,
  },
  headerFlatlist: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingTop: 40,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
  },
  item: {
    marginHorizontal: 32,
    justifyContent: "center",
    borderRadius: 12,
  },
  category: {
    paddingHorizontal: 32,
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 90,
  },
  lineUnder: {
    height: 1,
    marginVertical: 32,
    marginHorizontal: 32,
  },
});
