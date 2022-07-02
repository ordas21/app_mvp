import React, { memo } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import {
  useTheme,
  Layout,
  TopNavigation,
  Button,
  Icon,
  Toggle,
} from "@ui-kitten/components";
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import useToggle from "hooks/useToggle";
import useLayout from "hooks/useLayout";
import useModalize from "hooks/useModalize";

import Text from "components/Text";
import Container from "components/Container";
import SplitItem from "components/SplitItem";
import ModalPanel from "components/ModalPanel";
import CurrencyText from "components/CurrencyText";
import CurrencyCountry from "components/CurrencyCountry";
import HideWithKeyboard from "components/HideWithKeyboard";
import NavigationAction from "components/NavigationAction";
import FocusAwareStatusBar from "components/FocusAwareStatusBar";

import { Images } from "assets/images";
import { getListFlag } from "utils/getListFlag";
import { SPLIT_BILL_DATA } from "constants/Data";
import { SplitBillFragment } from "constants/Types";
import { ExpenseStackParamList } from "navigation/types";
import { RefreshControl } from "react-native-web-refresh-control";

const SplitBillStep1 = memo(() => {
  const { t } = useTranslation(["splitBill", "common"]);
  const { bottom } = useSafeAreaInsets();
  const { width, height } = useLayout();
  const theme = useTheme();
  const translateY = useSharedValue(0);
  const { modalizeRef, open, close } = useModalize();
  let list = getListFlag();

  const { navigate } = useNavigation<NavigationProp<ExpenseStackParamList>>();

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateY.value = event.contentOffset.y;
  });

  const [personal, togglePersonal] = useToggle(false);

  const [listItemChose, setListItemChose] = React.useState<number[]>([]);

  const [bill, setBill] = React.useState<SplitBillFragment>();

  React.useEffect(() => {
    setListItemChose([0]);
    setBill({ name: "L’Ami Louis", amount: 247 });
  }, []);

  const DATA = [
    {
      id: "1b220c-11",
      avatar: Images.avatar0,
      name: "Hieu Le Quang",
      amount: "247.00",
    },
    ...SPLIT_BILL_DATA,
    { addDefault: true },
  ];

  const opacityText = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [0, height * 0.045, height * 0.049, height * 0.05],
      [0, 0, 0.5, 1]
    );
    return {
      opacity: opacity,
    };
  }, []);

  const opacitySubText = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [0, height * 0.075, height * 0.079, height * 0.08],
      [0, 0, 0.5, 1]
    );
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
  const handleAddParticipants = React.useCallback(() => {}, []);

  const handleGoStep2 = React.useCallback(() => {
    navigate("SplitBillStep2", {});
  }, []);

  const onChooseItem = React.useCallback(
    (index: number) => {
      const idx = listItemChose.indexOf(index);
      setListItemChose(
        idx >= 0
          ? listItemChose.filter((i) => i != index)
          : [...listItemChose, index]
      );
    },
    [listItemChose]
  );

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
            backgroundColor: theme["color-basic-1000"],
          },
        ]}
      />
      <TopNavigation
        title={() => (
          <Animated.View style={opacityText}>
            <CurrencyText center category="h5" status="white">
              {bill?.amount}
            </CurrencyText>
          </Animated.View>
        )}
        subtitle={() => (
          <Animated.View style={opacitySubText}>
            <Text center category="h9" status="white">
              {t("from", { name: bill?.name })}
            </Text>
          </Animated.View>
        )}
        accessoryLeft={() => <NavigationAction status="transparent" />}
        accessoryRight={() => (
          <NavigationAction
            icon="exchange"
            status="transparent"
            onPress={open}
          />
        )}
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
        contentContainerStyle={{ paddingBottom: bottom + 106 }}
      >
        <Animated.View style={scaleText}>
          <CurrencyText center category="h3" status="white">
            {bill?.amount}
          </CurrencyText>
          <Text
            center
            category="h8"
            status="white"
            marginTop={8}
            marginBottom={40}
          >
            {t("from", { name: bill?.name })}
          </Text>
        </Animated.View>

        <Layout level="2" style={[styles.box, { minHeight: height / 2 }]}>
          <View style={styles.topBox}>
            <Text category="h7">{t("whoPaid")}</Text>
            <View style={styles.flexDirection}>
              <Text category="h8-sl" marginRight={4}>
                {t("personalBill")}
              </Text>
              <Toggle checked={personal} onChange={togglePersonal} />
            </View>
          </View>
          {DATA.map((i, index) => {
            const checked = listItemChose.indexOf(index) >= 0;
            return (
              <SplitItem
                item={i}
                key={index}
                checked={checked}
                onChooseItem={() => onChooseItem(index)}
                onAdd={handleAddParticipants}
              />
            );
          })}
        </Layout>
      </Animated.ScrollView>
      <HideWithKeyboard>
        <Layout
          level="7"
          style={[styles.bottom, { paddingBottom: bottom + 8 }]}
        >
          <Button
            activeOpacity={0.7}
            accessoryRight={() => <Icon pack={"assets"} name="next" />}
            style={styles.button}
            onPress={handleGoStep2}
            children={t("step2").toString()}
          />
        </Layout>
      </HideWithKeyboard>
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

export default SplitBillStep1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  iconModal: {
    marginRight: 8,
  },
  header: {
    backgroundColor: "transparent",
  },
  image: {
    right: 0,
    top: 0,
    left: 0,
    position: "absolute",
  },
  box: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 34,
  },
  item: {
    marginBottom: 16,
    marginHorizontal: 32,
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
  flexDirection: {
    flexDirection: "row",
    alignItems: "center",
  },
  topBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    alignItems: "center",
    marginBottom: 32,
    minHeight: 28,
  },
});
