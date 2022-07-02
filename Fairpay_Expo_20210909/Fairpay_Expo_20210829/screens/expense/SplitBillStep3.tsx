import React, { memo } from "react";
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  View,
  Image,
} from "react-native";
import {
  useTheme,
  Layout,
  TopNavigation,
  Button,
  Icon,
  Input,
  Toggle,
  Datepicker,
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
import useToggle from "hooks/useToggle";
import useModalize from "hooks/useModalize";

import dayjs from "utils/dayjs";
import Text from "components/Text";
import Category from "components/Category";
import Container from "components/Container";
import BillPayers from "components/BillPayers";
import ModalPanel from "components/ModalPanel";
import CurrencyText from "components/CurrencyText";
import CurrencyCountry from "components/CurrencyCountry";
import HideWithKeyboard from "components/HideWithKeyboard";
import NavigationAction from "components/NavigationAction";
import FocusAwareStatusBar from "components/FocusAwareStatusBar";

import {
  BillFragment,
  CategoryFragment,
  SplitBillFragment,
  Split_Types_Enum,
} from "constants/Types";
import { Images } from "assets/images";
import { getListFlag } from "utils/getListFlag";
import { ExpenseStackParamList } from "navigation/types";
import { Data_Categories, Data_Group } from "constants/Data";
import { RefreshControl } from "react-native-web-refresh-control";

const SplitBillStep3 = memo(() => {
  const theme = useTheme();
  const translateY = useSharedValue(0);
  const { t } = useTranslation("step3");
  const { navigate } = useNavigation<NavigationProp<ExpenseStackParamList>>();
  const { width, height } = useLayout();
  const { bottom } = useSafeAreaInsets();

  const { open, close, modalizeRef } = useModalize();

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateY.value = event.contentOffset.y;
  });

  const list = getListFlag();
  const [expenseName, setExpenseName] = React.useState<string>("");
  const [repeatBill, setRepeatBill] = useToggle(false);
  const [bill, setBill] = React.useState<SplitBillFragment>();
  const [date, setDate] = React.useState(new Date());
  const [category, setCategory] = React.useState<CategoryFragment>(
    Data_Categories[0]
  );

  React.useEffect(() => {
    setBill({
      name: "L’Ami Louis",
      amount: 247,
      image: {
        path: Images.bill,
      },
    });
  }, []);

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

  const handleGoStep4 = React.useCallback(() => {
    const bill: BillFragment = {
      amount: 247,
      created_by: {
        full_name: "Hieu Le Quang",
        avatar: {
          path: Images.avatar0,
        },
      },
      location: "L’Ami Louis",
      split_type: {
        id: Split_Types_Enum.Equally,
      },
      category: category,
      is_repeat: repeatBill,
      day: 15,
      due_at: date,
      payers: [
        {
          id: "uuid",
          full_name: "Hieu Le Quang",
          avatar: {
            path: Images.avatar0,
          },
        },
        {
          id: "uuid1",
          full_name: "Callie Nunez",
          avatar: {
            path: Images.avatar11,
          },
        },
        {
          id: "uuid2",
          full_name: "James Keller",
          avatar: {
            path: Images.avatar12,
          },
        },
      ],
      image: {
        path: Images.bill,
      },
    };

    navigate("SplitBillStep4", {
      bill: bill,
    });
  }, [category, repeatBill]);

  const handleAddGroup = React.useCallback(() => {}, []);

  const handleAddBill = React.useCallback(() => {}, []);

  const renderGroupItem = React.useCallback(({ item }) => {
    return <BillPayers item={item} />;
  }, []);

  const renderCategory = React.useCallback(
    (item, index) => {
      return (
        <Category
          checked={category?.id === item.id}
          item={item}
          key={index}
          onPress={() => setCategory(item)}
        />
      );
    },
    [category]
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
        </Animated.View>
        <Text
          center
          category="h8"
          status="white"
          marginTop={8}
          marginBottom={40}
        >
          {t("from", { name: bill?.name })}
        </Text>
        <Layout level="2" style={[styles.box, { minHeight: height / 2 }]}>
          <Input
            size="giant"
            placeholder={t("expenseName").toString()}
            style={styles.input}
            value={expenseName}
            onChangeText={setExpenseName}
          />
          <View style={styles.row}>
            <View>
              <Text category="h7">{t("expenseGroup")}</Text>
              <Text category="h8-sl" status="body" marginTop={8}>
                {t("selectBelow")}
              </Text>
            </View>
            <NavigationAction
              icon="add"
              status="primary"
              onPress={handleAddGroup}
            />
          </View>
          <View>
            <FlatList
              data={Data_Group}
              renderItem={renderGroupItem}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              horizontal
              pagingEnabled={false}
              decelerationRate="fast"
              scrollEventThrottle={16}
              contentContainerStyle={styles.contentContainerStyle}
            />
          </View>
          <Text marginTop={48} marginLeft={32} marginBottom={16} category="h7">
            {t("expenseType")}
          </Text>
          {Data_Categories.map(renderCategory)}
          <Text category="h7" marginTop={40} marginLeft={32}>
            {t("dueDateForPay")}
          </Text>
          <Text category="h8-sl" status="body" marginTop={8} marginLeft={32}>
            {t("selectADay")}
          </Text>
          <Datepicker
            label={t("dueDate").toString()}
            style={styles.datePicker}
            placeholder=""
            onSelect={(nextDate) => setDate(nextDate)}
            accessoryLeft={() => (
              <View style={styles.rowD}>
                <Icon
                  name="dob"
                  pack="assets"
                  style={{ tintColor: theme["color-basic-600"] }}
                />
                <Text center marginLeft={12} category="h7" marginTop={4}>
                  {dayjs(date).format("DD/MM/YYYY")}
                </Text>
              </View>
            )}
          />
          <View style={styles.repeatBill}>
            <Text category="h7">{t("repeatBill")}</Text>
            <Toggle checked={repeatBill} onChange={setRepeatBill} />
          </View>
          <View style={styles.receiptBill}>
            <Text category="h7">{t("receiptBill")}</Text>
            <NavigationAction
              icon="add"
              status="primary"
              onPress={handleAddBill}
            />
          </View>
          <View style={styles.bills}>
            {bill?.image && <Image source={bill.image.path} />}
          </View>
        </Layout>
      </Animated.ScrollView>
      <HideWithKeyboard>
        <Layout
          level="7"
          style={[styles.bottom, { paddingBottom: bottom + 8 }]}
        >
          <Button
            activeOpacity={0.7}
            accessoryRight={() => <Icon pack="assets" name="next" />}
            style={styles.button}
            onPress={handleGoStep4}
            children={t("step4").toString()}
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

export default SplitBillStep3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 0,
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
    paddingTop: 40,
  },
  input: {
    backgroundColor: "transparent",
    paddingHorizontal: 32,
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
  iconModal: {
    marginRight: 8,
  },
  button: {
    justifyContent: "space-between",
  },
  datePicker: {
    justifyContent: "center",
    marginHorizontal: 32,
    marginTop: 21,
    borderRadius: 12,
  },
  bills: {
    marginTop: 24,
    marginLeft: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 32,
    marginTop: 72,
  },
  contentContainerStyle: {
    paddingLeft: 32,
    paddingTop: 32,
    paddingRight: 16,
  },
  repeatBill: {
    flexDirection: "row",
    marginTop: 40,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 32,
  },
  receiptBill: {
    flexDirection: "row",
    marginTop: 48,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 32,
  },
  rowD: {
    flexDirection: "row",
  },
});
