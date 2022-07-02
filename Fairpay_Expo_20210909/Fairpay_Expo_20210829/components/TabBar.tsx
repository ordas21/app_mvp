import { useTheme } from "@ui-kitten/components";
import Text from "components/Text";
import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
  ColorValue,
} from "react-native";

interface Props {
  tabs?: string[];
  style?: StyleProp<ViewStyle>;
  tabStyle?: StyleProp<ViewStyle>;
  backgroundTab?: string | ColorValue;
  onChangeTab: (index: number) => void;
  tabActive: number;
}
const TabBar = ({
  tabs,
  onChangeTab,
  style,
  tabStyle,
  backgroundTab,
  tabActive,
}: Props) => {
  const theme = useTheme();
  const _onChangeTab = React.useCallback(
    (number: number) => {
      onChangeTab(number);
    },
    [onChangeTab]
  );

  return (
    <View style={[styles.container, style, { backgroundColor: backgroundTab }]}>
      {tabs?.map((item, index) => {
        const backgroundColor = {
          backgroundColor:
            tabActive === index
              ? theme["border-text-input-focused-color"]
              : theme["dot-basic-color-2"],
        };
        const tintColor = tabActive === index ? "control" : "body";
        return (
          <TouchableOpacity
            onPress={() => _onChangeTab(index)}
            key={index}
            style={[styles.tabStyle, tabStyle, backgroundColor]}
          >
            <Text
              marginVertical={8}
              uppercase
              status={tintColor}
              center
              category="h9"
            >
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
export default TabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 8,
    marginHorizontal: 32,
    marginTop: 32,
  },
  tabStyle: {
    height: 32,
    marginRight: 1,
    borderRadius: 8,
    justifyContent: "center",
    flex: 1,
  },
});
