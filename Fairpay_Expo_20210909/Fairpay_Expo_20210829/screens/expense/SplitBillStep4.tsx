import React, { memo } from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import {
  Button,
  Icon,
  Layout,
  TopNavigation,
  useTheme,
} from "@ui-kitten/components";
import {
  useRoute,
  useNavigation,
  NavigationProp,
} from "@react-navigation/native";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  interpolate,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useLayout from "hooks/useLayout";
import useModalize from "hooks/useModalize";

import dayjs from "dayjs";
import Text from "components/Text";
import SplitFor from "components/SplitFor";
import Container from "components/Container";
import ModalPanel from "components/ModalPanel";
import CurrencyText from "components/CurrencyText";
import CurrencyCountry from "components/CurrencyCountry";
import NavigationAction from "components/NavigationAction";

import {
  RootStackParamList,
  SplitBillStep4NavigationProps,
} from "navigation/types";
import { Images } from "assets/images";
import { formatDefault } from "utils/format";
import { getListFlag } from "utils/getListFlag";
import { RefreshControl } from "react-native-web-refresh-control";

const SplitBillStep4 = memo(() => {
  const theme = useTheme();
  const list = getListFlag();
  const translateY = useSharedValue(0);
  const route = useRoute<SplitBillStep4NavigationProps>();
  const { width, height } = useLayout();
  const { bottom } = useSafeAreaInsets();
  const { t } = useTranslation(["step4", "modalScreen"]);
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const { open, close, modalizeRef } = useModalize();

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateY.value = event.contentOffset.y;
  });

  const {
    category,
    location,
    amount,
    created_by,
    type_id,
    payers,
    due_at,
    image,
  } = route.params.bill;

  const opacityText = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [0, height * 0.053, height * 0.063, height * 0.083],
      [0, 0, 0.5, 1]
    );
    return {
      opacity: opacity,
    };
  }, []);

  const opacitySubText = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [0, height * 0.1, height * 0.15, height * 0.2],
      [0, 0, 0.5, 1]
    );
    return {
      opacity: opacity,
    };
  }, []);

  const opacityImage = useAnimatedStyle(() => {
    const opacity = interpolate(translateY.value, [0, height * 0.045], [1, 0]);
    return {
      opacity: opacity,
    };
  }, []);

  const scaleText = useAnimatedStyle(() => {
    const scale = interpolate(translateY.value, [0, -height * 0.225], [1, 1.2]);
    return {
      transform: [{ scale: scale }],
    };
  }, []);

  const handleExchange = React.useCallback(() => {
    open();
  }, []);

  const handleEditPaid = React.useCallback(() => {}, []);

  const handleEditSplit = React.useCallback(() => {}, []);

  const handleEditDueDate = React.useCallback(() => {}, []);

  const handleEditBillPhotos = React.useCallback(() => {}, []);

  const handleConfirmed = React.useCallback(() => {
    navigate("ModalScreen", {
      modalScreen: {
        title: t("modalScreen:expenseCreated"),
        description: t("modalScreen:expenseCreatedSuccess"),
        children: [
          {
            title: t("modalScreen:seeExpense"),
            onPress: () => {},
            status: "primary",
          },
          {
            title: t("modalScreen:backToActivity"),
            onPress: () => navigate("Main", { screen: "Activity" }),
            status: "basic",
          },
        ],
      },
    });
  }, []);

  return (
    <Container style={styles.container}>
      <ImageBackground
        source={Images.backGround1}
        style={[
          styles.image,
          {
            width: width,
            height: height / 2,
            backgroundColor: category?.color,
          },
        ]}
      />
      <TopNavigation
        title={() => (
          <View>
            <Animated.View style={[styles.title, opacityText]}>
              <Text category="h7" status="white">
                {location} Dinner
              </Text>
              {category?.icon && (
                <Image
                  source={category.icon.path}
                  style={{
                    tintColor: theme["color-basic-100"],
                  }}
                />
              )}
            </Animated.View>
            {category?.icon && (
              <Animated.Image
                source={category.icon.path}
                style={[
                  styles.iconCategory,
                  { tintColor: theme["color-basic-100"] },
                  opacityImage,
                ]}
              />
            )}
          </View>
        )}
        subtitle={() => (
          <Animated.View style={opacitySubText}>
            <Text center category="h9-s" status="black">
              {t("createdOn", { date: dayjs().format("MMM D, YYYY") })}
            </Text>
          </Animated.View>
        )}
        accessoryLeft={() => <NavigationAction status="opacity" />}
        style={styles.header}
      />
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            tintColor={theme["color-primary-500"]}
            onRefresh={() => {}}
          />
        }
        contentContainerStyle={[
          styles.contentContainerStyle,
          { paddingBottom: bottom + 106 },
        ]}
      >
        <Animated.View style={scaleText}>
          <Text center category="h5" status="white">
            {location} Dinner
          </Text>
        </Animated.View>
        <Text
          center
          category="h9-s"
          marginTop={16}
          marginBottom={32}
          status="black"
        >
          {t("createdOn", { date: dayjs().format("MMM D, YYYY") })}
        </Text>
        <Layout style={[styles.box, { minHeight: height / 2 }]}>
          <Text category="h8-sl">{t("totalBill")}</Text>
          <View style={styles.top}>
            <View style={styles.balance}>
              <CurrencyText category="h5">291.45</CurrencyText>
              {amount && (
                <Text
                  category="h9-s"
                  status="body"
                  marginLeft={12}
                  marginTop={12}
                >
                  {t("original", {
                    amount: formatDefault(amount.toString(), "$"),
                  })}
                </Text>
              )}
            </View>
            <NavigationAction
              status="primary"
              icon="exchange"
              onPress={handleExchange}
            />
          </View>
          <Text category="h8-sl" status="body" marginTop={12}>
            {t("from")}
            <Text>{location}</Text>
          </Text>
          <View />
          <View
            style={[
              styles.line,
              { backgroundColor: theme["button-basic-background-color"] },
            ]}
          />
          <View style={styles.whoPaid}>
            <Text category="h7">{t("whoPaid")}</Text>
            <NavigationAction
              status="primary"
              icon="edit16"
              size="small"
              onPress={handleEditPaid}
            />
          </View>
          <SplitFor {...created_by} amount={291.45} />
          <View style={styles.splitFor}>
            <Text category="h7" capitalize>
              {t("split", { type: type_id })}
              <Text category="h7">{t("Equally", { type: type_id })}</Text>
              <Text category="h7" capitalize>
                {t("for", { type: type_id })}
              </Text>
            </Text>

            <NavigationAction
              status="primary"
              icon="edit16"
              size="small"
              onPress={handleEditSplit}
            />
          </View>
          {payers &&
            payers?.map((item, index) => {
              const margin = index < payers.length - 1 ? 16 : 0;
              return (
                <SplitFor
                  {...item}
                  key={index}
                  amount={97.15}
                  style={{ marginBottom: margin }}
                />
              );
            })}
          <View style={styles.dueDate}>
            <View>
              <Text category="h8-sl">{t("dueDateForPay")}</Text>
              <Text category="h7" marginTop={8}>
                {dayjs(due_at).format("MMM D, YYYY")}
              </Text>
            </View>
            <NavigationAction
              status="primary"
              icon="edit16"
              size="small"
              onPress={handleEditDueDate}
            />
          </View>
          <View style={styles.receipt}>
            <Text category="h7">{t("receipt")}</Text>
            <NavigationAction
              status="primary"
              icon="edit16"
              size="small"
              onPress={handleEditBillPhotos}
            />
          </View>
          {image && <Image source={image?.path} style={styles.bill} />}
        </Layout>
      </Animated.ScrollView>
      <Layout level="7" style={[styles.bottom, { paddingBottom: bottom + 8 }]}>
        <Button
          activeOpacity={0.7}
          accessoryRight={() => <Icon pack="assets" name="next" />}
          style={styles.button}
          onPress={handleConfirmed}
          children={t("confirmedSend").toString()}
        />
      </Layout>
      <ModalPanel
        data={list}
        ref={modalizeRef}
        renderItem={({ item }) => (
          <CurrencyCountry item={item} onPress={close} />
        )}
        title={t("otherInformation:addCurrency")}
        searchProps={{
          accessoryLeft: () => (
            <Icon
              style={[
                styles.iconModal,
                { tintColor: theme["color-basic-400"] },
              ]}
              pack="assets"
              name="searchNormal"
            />
          ),
          placeholder: t("otherInformation:typeCurrency"),
        }}
      />
    </Container>
  );
});

export default SplitBillStep4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "transparent",
  },
  title: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  image: {
    right: 0,
    top: 0,
    left: 0,
    position: "absolute",
  },
  iconCategory: {
    width: 24,
    height: 24,
    position: "absolute",
    alignSelf: "center",
    bottom: -16,
  },
  box: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 48,
    paddingHorizontal: 32,
  },
  line: {
    height: 1,
    marginTop: 32,
  },
  iconModal: {
    marginRight: 8,
  },
  bill: {
    width: 80,
    height: 120,
    marginTop: 24,
  },
  bottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 24,
    paddingTop: 24,
    paddingLeft: 32,
  },
  button: {
    justifyContent: "space-between",
  },
  contentContainerStyle: {
    paddingTop: 24,
  },
  top: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: 8,
  },
  balance: {
    flexDirection: "row",
    alignItems: "center",
  },
  whoPaid: {
    marginTop: 40,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 24,
  },
  splitFor: {
    marginTop: 48,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 24,
  },
  dueDate: {
    marginTop: 48,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  receipt: {
    marginTop: 48,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
});
