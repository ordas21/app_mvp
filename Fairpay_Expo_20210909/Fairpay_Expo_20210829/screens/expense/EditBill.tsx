import React, { memo } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from "react-native";
import { CameraCapturedPicture } from "expo-camera";
import { useTheme, Icon, TopNavigation, Layout } from "@ui-kitten/components";
import {
  useRoute,
  useNavigation,
  NavigationProp,
} from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useLayout from "hooks/useLayout";
import useAppTheme from "hooks/useAppTheme";

import _, { isEmpty } from "lodash";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";

import keyExtractor from "utils/keyExtractor";
import {
  EditBillNavigationProps,
  ExpenseStackParamList,
} from "navigation/types";

const EditBill = memo(() => {
  const themes = useTheme();
  const route = useRoute<EditBillNavigationProps>();
  const { t } = useTranslation("common");
  const { top, bottom } = useSafeAreaInsets();
  const { width } = useLayout();
  const { theme } = useAppTheme();
  const { navigate } = useNavigation<NavigationProp<ExpenseStackParamList>>();

  const [bills, setBills] = React.useState<CameraCapturedPicture[]>([]);
  const [deg, setDeg] = React.useState<number>(0);
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);

  const refFlatList = React.useRef<FlatList>(null);

  React.useEffect(() => {
    setBills(route.params.bill);
  }, [route.params.bill]);

  const handleRemove = React.useCallback(
    (item: CameraCapturedPicture) => {
      const arr = _.filter(bills, (i) => {
        return i !== item;
      });
      setBills(arr);
    },
    [bills]
  );

  const handleAddMore = React.useCallback(() => {
    navigate("AddBill", { bill: bills });
  }, [bills]);

  const onMomentumScrollEnd = React.useCallback(({ nativeEvent }) => {
    setSelectedIndex(nativeEvent.contentOffset.x / width);
  }, []);

  const handleFilter = React.useCallback(() => {}, []);

  const handleRotation = React.useCallback(() => {
    if (deg < 270) {
      setDeg(deg + 90);
    } else {
      setDeg(0);
    }
  }, [deg]);

  const renderItem = React.useCallback(
    ({ item, index }) => {
      const onPress = () => {
        let idx = _.find(bills, (i) => i.uri === item.uri);

        if (!!idx) {
          handleRemove(item);
          refFlatList?.current?.scrollToItem({
            animated: false,
            item: item,
            viewPosition: index - 1,
          });
          setSelectedIndex(index - 1);
        }
      };

      return (
        <View style={[styles.content, { width: width }]}>
          <ImageBackground
            style={[
              {
                width: width - 50 * 2,
                height: ((width - 50 * 2) * 16) / 9,
              },
              { transform: [{ rotate: `${deg}deg` }] },
            ]}
            source={{ uri: item.uri }}
          >
            <TouchableOpacity
              style={[
                styles.buttonDelete,
                {
                  backgroundColor:
                    theme === "light"
                      ? themes["color-basic-1000"]
                      : themes["color-primary-500"],
                },
              ]}
              activeOpacity={0.7}
              onPress={onPress}
            >
              <Icon
                pack="assets"
                name="trash"
                style={{
                  tintColor:
                    theme === "light"
                      ? themes["color-basic-100"]
                      : themes["color-primary-1000"],
                }}
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>
      );
    },
    [bills, selectedIndex]
  );

  return (
    <Container useSafeArea={false} style={styles.container}>
      <View
        style={{
          paddingTop: top,
          backgroundColor: themes["background-basic-color-5"],
        }}
      >
        <TopNavigation
          style={styles.header}
          title={bills ? `${selectedIndex + 1} of ${bills.length}` : "0 of 0"}
          accessoryLeft={() => (
            <NavigationAction
              status="basic"
              icon="close"
              onPress={() => navigate("AddBill", { bill: [] })}
            />
          )}
          accessoryRight={() => (
            <NavigationAction
              disabled={isEmpty(bills)}
              onPress={() => navigate("SplitBillStep1")}
              title={t("next")}
            />
          )}
        />
      </View>
      <FlatList
        ref={refFlatList}
        data={bills || []}
        horizontal
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToInterval={width}
        bounces={false}
        pagingEnabled={false}
        decelerationRate="fast"
        onMomentumScrollEnd={onMomentumScrollEnd}
      />
      <Layout
        level="5"
        style={[
          styles.bottom,
          {
            paddingBottom: bottom + 16,
          },
        ]}
      >
        <NavigationAction
          status="control"
          icon="addMore"
          onPress={handleAddMore}
        />
        <NavigationAction
          status="control"
          icon="filter"
          onPress={handleFilter}
        />
        <NavigationAction
          icon="rotation"
          onPress={handleRotation}
          status="control"
        />
      </Layout>
    </Container>
  );
});

export default EditBill;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "transparent",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingTop: 16,
  },
  buttonDelete: {
    width: 32,
    height: 32,
    borderRadius: 8,
    top: -12,
    left: -12,
    justifyContent: "center",
    alignItems: "center",
  },
});
