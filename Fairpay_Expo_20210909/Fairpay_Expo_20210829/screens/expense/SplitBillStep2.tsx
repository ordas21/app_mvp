import React, { memo } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import {
  useTheme,
  Layout,
  TopNavigation,
  Button,
  Icon,
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
import useLayout from "hooks/useLayout";
import useModalize from "hooks/useModalize";

import Text from "components/Text";
import Container from "components/Container";
import SplitItem from "components/SplitItem";
import SplitType from "components/SplitType";
import ModalPanel from "components/ModalPanel";
import CurrencyText from "components/CurrencyText";
import TextUnderLine from "components/TextUnderline";
import CurrencyCountry from "components/CurrencyCountry";
import HideWithKeyboard from "components/HideWithKeyboard";
import NavigationAction from "components/NavigationAction";
import FocusAwareStatusBar from "components/FocusAwareStatusBar";

import {
  SplitBillFragment,
  SplitTypeFragment,
  Split_Types_Enum,
} from "constants/Types";
import { Images } from "assets/images";
import { SPLIT_BILL_DATA } from "constants/Data";
import { ExpenseStackParamList } from "navigation/types";
import { RefreshControl } from "react-native-web-refresh-control";
import { getListFlag } from "utils/getListFlag";

const SplitBillStep2 = memo(() => {
  const theme = useTheme();
  const translateY = useSharedValue(0);
  const { t } = useTranslation(["splitBill", "common"]);
  const { navigate } = useNavigation<NavigationProp<ExpenseStackParamList>>();
  const { width, height } = useLayout();
  const { bottom } = useSafeAreaInsets();
  const {
    modalizeRef: modalizeRefSplitType,
    open: openSplitType,
    close: closeSplitType,
  } = useModalize();
  const {
    modalizeRef: modalizeRefCurrency,
    open: openCurrency,
    close: closeCurrency,
  } = useModalize();

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateY.value = event.contentOffset.y;
  });

  const [bill, setBill] = React.useState<SplitBillFragment>();

  const list = getListFlag();

  const DATA = [...SPLIT_BILL_DATA, { addDefault: true }];

  const SPLIT_TYPES = [
    {
      id: "0",
      type: Split_Types_Enum.Equally,
      name: t("equally"),
      description: t("equallyS", { symbol: "=" }),
    },
    {
      id: "1",
      type: Split_Types_Enum.Unequally,
      name: t("unequally"),
      description: t("unequallyS", { symbol: "#" }),
    },
    {
      id: "2",
      type: Split_Types_Enum.Percentages,
      name: t("percentages"),
      description: t("percentagesS", { symbol: "%" }),
    },
    {
      id: "3",
      type: Split_Types_Enum.Shares,
      name: t("shares"),
      description: t("sharesS", { symbol: t("times") }),
    },
    {
      id: "4",
      type: Split_Types_Enum.Adjustment,
      name: t("adjustment"),
      description: t("adjustmentS", { symbol: "+/-" }),
    },
  ];

  const [splitType, setSplitType] = React.useState<SplitTypeFragment>(
    SPLIT_TYPES[0]
  );

  React.useEffect(() => {
    setBill({ name: "L’Ami Louis", amount: 247 });
  }, []);

  React.useEffect(() => {
    if (splitType.type === Split_Types_Enum.Equally) {
      let data = [];
    }
  }, [splitType]);

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
  const handleGoStep3 = React.useCallback(() => {
    navigate("SplitBillStep3");
  }, []);

  const handleAddParticipants = React.useCallback(() => {}, []);

  const renderItem = React.useCallback(
    ({ item }) => {
      return (
        <SplitType
          item={item}
          checked={splitType?.id === item.id}
          onPress={() => setSplitType(item)}
        />
      );
    },
    [splitType]
  );

  const ListFooterComponent = React.useCallback(() => {
    return (
      <Button
        size="large"
        style={[styles.buttonOk, { marginBottom: bottom + 8 }]}
        children={t("common:ok").toString()}
        onPress={closeSplitType}
      />
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
            onPress={openCurrency}
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
            <TextUnderLine onPress={openSplitType}>
              {t("splitBill", { type: splitType?.name })}
            </TextUnderLine>
          </View>
          {DATA.map((i, index) => {
            return (
              <SplitItem
                item={i}
                key={index}
                checked={true}
                onAdd={handleAddParticipants}
                type={splitType?.type}
                disabled={true}
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
            onPress={handleGoStep3}
            children={t("step3").toString()}
          />
        </Layout>
      </HideWithKeyboard>
      <ModalPanel
        data={list}
        ref={modalizeRefCurrency}
        renderItem={({ item }) => (
          <CurrencyCountry item={item} onPress={closeCurrency} />
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
      <ModalPanel
        ref={modalizeRefSplitType}
        title={t("splitType")}
        modalHeight={0.7 * height}
        scrollEnabled={false}
        data={SPLIT_TYPES}
        renderItem={renderItem}
        contentContainerStyle={styles.modal}
        ListFooterComponent={ListFooterComponent}
      />
    </Container>
  );
});

export default SplitBillStep2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  modal: {
    paddingTop: 18,
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
  buttonOk: {
    marginTop: 70,
  },
  iconModal: {
    marginRight: 8,
  },
});
