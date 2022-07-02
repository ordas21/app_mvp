import React, { memo } from "react";
import { Platform, TouchableOpacity, View } from "react-native";
import {
  BottomTabBarOptions,
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import Svg, { Path } from "react-native-svg";
import {
  useTheme,
  Icon,
  useStyleSheet,
  StyleService,
} from "@ui-kitten/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import FriendsScreen from "screens/friends/Friends/FriendsScreen";
import AccountScreen from "screens/profile/Account/AccountScreen";

import { MainStackParamList } from "./types";
import Activity from "screens/activity/Activity";
import GroupStackNavigator from "./GroupStackNavigator";

const BottomTab = createBottomTabNavigator<MainStackParamList>();

const MainNavigator = memo(() => {
  const theme = useTheme();
  const { bottom } = useSafeAreaInsets();
  const { width } = useLayout();
  const styles = useStyleSheet(themedStyles);

  const HEIGHT_BOTTOM_TAB = bottom + 66;
  const LINE = (width - (24 * 2 + 28 * 2 + 76)) / 2;
  const BORDER = width - (LINE + 52) * 2;
  const viewBox = `0 0 ${width} ${HEIGHT_BOTTOM_TAB - 2}`;
  const d = `M0 24 a24 24 0 0 1 24 -24 h${LINE} q16 0 28 24 a42 42 0 0 0 ${BORDER} 0  q12 -24 28 -24 h${LINE} a24 24 0 0 1 24 24 V${HEIGHT_BOTTOM_TAB} H0 z`;

  function MyTabBar({
    state,
    descriptors,
    navigation,
  }: BottomTabBarProps<BottomTabBarOptions>) {
    const focusedOptions = descriptors[state.routes[state.index].key].options;

    if (focusedOptions.tabBarVisible === false) {
      return null;
    }

    return (
      <View style={styles.container}>
        <Svg
          style={[styles.viewBottomTab, { height: HEIGHT_BOTTOM_TAB }]}
          viewBox={viewBox}
          fill="transparent"
        >
          <Path
            d={d}
            fill={theme["background-basic-color-7"]}
            strokeWidth={1}
            stroke={
              Platform.OS === "ios"
                ? "rgba(120, 121, 121, 0.06)"
                : "rgba(120, 121, 121, 0.2)"
            }
          />
        </Svg>
        <View
          style={[
            styles.viewButtonTab,
            {
              width: width,
              height: HEIGHT_BOTTOM_TAB,
              paddingBottom: bottom + 8,
            },
          ]}
        >
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: "tabLongPress",
                target: route.key,
              });
            };

            const getIcon = React.useCallback(() => {
              let icon = "";
              if (index === 0) {
                isFocused
                  ? (icon = "activityActive")
                  : (icon = "activityNormal");
              } else if (index === 1) {
                isFocused ? (icon = "groupActive") : (icon = "groupNormal");
              } else if (index === 2) {
                isFocused ? (icon = "friendsActive") : (icon = "friendsNormal");
              } else if (index === 3) {
                isFocused ? (icon = "accountActive") : (icon = "accountNormal");
              }
              return icon;
            }, [index, isFocused]);

            return (
              <TouchableOpacity
                key={index}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={[
                  styles.buttonTab,

                  {
                    marginRight: index === 1 ? 24 : undefined,
                    marginLeft: index === 2 ? 24 : undefined,
                  },
                ]}
              >
                <Icon
                  pack="assets"
                  name={getIcon()}
                  style={[
                    styles.icon,
                    {
                      tintColor: isFocused
                        ? theme["icon-active-bottom-tab-color"]
                        : theme["color-basic-600"],
                    },
                  ]}
                />
                <Text
                  marginTop={4}
                  category="h9"
                  status={isFocused ? "basic" : "body"}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Expense")}
          activeOpacity={0.7}
          style={[styles.scan, { bottom: bottom + 26 }]}
        >
          <Icon pack="assets" name="scanBill" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <BottomTab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
      <BottomTab.Screen name="Activity" component={Activity} />
      <BottomTab.Screen name="Group" component={GroupStackNavigator} />
      <BottomTab.Screen name="Friend" component={FriendsScreen} />
      <BottomTab.Screen name="Account" component={AccountScreen} />
    </BottomTab.Navigator>
  );
});

export default MainNavigator;

const themedStyles = StyleService.create({
  container: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
  },
  viewBottomTab: {
    backgroundColor: "transparent",
    shadowColor: "color-basic-1100",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 15,
  },
  viewButtonTab: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonTab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  scan: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    backgroundColor: "color-primary-500",
  },
  icon: {
    width: 24,
    height: 24,
  },
});
