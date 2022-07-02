import React, { memo } from "react";
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useTheme, Icon, Layout, TopNavigation } from "@ui-kitten/components";
import Animated, {
  useSharedValue,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useModal from "hooks/useModal";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import AdMob from "components/AdMob";
import Container from "components/Container";
import ActivityItem from "components/ActivityItem";
import CurrencyText from "components/CurrencyText";
import DialogPayment from "components/DialogPayment";
import FocusAwareStatusBar from "components/FocusAwareStatusBar";

import { Images } from "assets/images";
import { ActivityProps } from "constants/Types";
import { RootStackParamList } from "navigation/types";
import { RefreshControl } from "react-native-web-refresh-control";
import { getListViewDate } from "utils/getListViewDate";

const Activity = memo(() => {
  const themes = useTheme();
  const list = getListViewDate();
  const { t } = useTranslation("activity");
  const { height, width } = useLayout();
  const { bottom } = useSafeAreaInsets();
  const { modalRef, hide, show } = useModal();
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const [data, setData] = React.useState<ActivityProps>();

  const translateY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateY.value = event.contentOffset.y;
  });

  React.useEffect(() => {
    if (data) {
      show();
    }
  }, [data]);

  const opacityText = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [0, height * 0.058, height * 0.062, height * 0.063],
      [0, 0, 0.5, 1]
    );
    return {
      opacity: opacity,
    };
  }, []);

  const opacitySubText = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [0, height * 0.098, height * 0.11, height * 0.12],
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

  const listEmptyComponent = React.useCallback(() => {
    return (
      <Layout style={styles.layout} level="2">
        <Image source={Images.empty} style={styles.nodataImage} />
        <Text center marginTop={24} status="body" category="h8-p">
          {t("noActivity")}
        </Text>
        <Image source={Images.arrow} />
      </Layout>
    );
  }, []);

  const listHeaderComponent = React.useCallback(() => {
    return (
      <Layout style={styles.headerLayout} level="2">
        <Text marginTop={20} status="basic" category="h7">
          {t("activity")}
        </Text>
        <TouchableOpacity
          onPress={() => navigate("Activities", { screen: "ActivityAll" })}
          activeOpacity={0.7}
          style={styles.seeAll}
        >
          <Text
            category="h8-p"
            style={{
              color: themes["background-check-box-color"],
            }}
          >
            {t("seeAll")}
          </Text>
          <Icon
            pack="assets"
            name="arrowRight"
            style={{
              tintColor: themes["background-check-box-color"],
            }}
          />
        </TouchableOpacity>
      </Layout>
    );
  }, []);

  const renderItem = React.useCallback(({ item }) => {
    const onPress = () => {
      setData(item);
      show();
    };

    return item.ads ? (
      <Layout level="2">
        <AdMob />
      </Layout>
    ) : (
      <ActivityItem level="2" onPress={onPress} item={item} />
    );
  }, []);

  return (
    <Container style={styles.container} level="2">
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
        title={() => (
          <Animated.View style={opacitySubText}>
            <CurrencyText center category="h4" status="white">
              684
            </CurrencyText>
          </Animated.View>
        )}
        subtitle={() => (
          <Animated.View style={opacityText}>
            <Text center category="h9" status="white">
              {t("myBalance")}
            </Text>
          </Animated.View>
        )}
        accessoryRight={() => (
          <TouchableOpacity>
            <View style={styles.numberNoti}>
              <Text marginTop={1} center category="h9" status="white">
                3
              </Text>
            </View>
            <Icon
              pack="assets"
              name="notification"
              style={{ tintColor: themes["color-primary-500"] }}
            />
          </TouchableOpacity>
        )}
        style={[styles.header, { marginTop: 32 }]}
      />
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl tintColor={themes["color-primary-500"]} />
        }
        contentContainerStyle={{
          paddingBottom: bottom + 106,
        }}
      >
        <Animated.View style={scaleText}>
          <Text
            marginTop={36}
            center
            status="control"
            category="h8"
            marginBottom={8}
          >
            {t("myBalance")}
          </Text>
          <CurrencyText marginBottom={40} center category="h3" status="control">
            684
          </CurrencyText>
        </Animated.View>
        <FlatList
          scrollEnabled={false}
          data={list || []}
          scrollEventThrottle={16}
          ListHeaderComponent={listHeaderComponent}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          ListEmptyComponent={listEmptyComponent}
          contentContainerStyle={[
            {
              backgroundColor: themes["background-basic-color-1"],
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
            },
          ]}
          showsVerticalScrollIndicator={false}
        />
      </Animated.ScrollView>
      <DialogPayment ref={modalRef} item={data} />
    </Container>
  );
});

export default Activity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    paddingBottom: 0,
  },
  headerLayout: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingTop: 24,
    paddingHorizontal: 32,
  },
  balance: {
    marginTop: 64,
  },
  header: {
    backgroundColor: "transparent",
  },
  notification: {
    position: "absolute",
    zIndex: 10,
    right: 32,
  },
  numberNoti: {
    backgroundColor: "#FA4169",
    width: 16,
    height: 16,
    borderRadius: 40,
    position: "absolute",
    zIndex: 10,
    top: -8,
    left: 18,
  },
  image: {
    right: 0,
    top: 0,
    left: 0,
    position: "absolute",
  },
  nodataImage: {
    width: 160,
    height: 160,
    marginTop: 88,
  },
  layout: {
    flex: 1,
    alignItems: "center",
    paddingTop: 24,
    paddingHorizontal: 32,
  },
  seeAll: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
});
