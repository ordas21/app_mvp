import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { ActivityFragment, CategoryFragment } from "constants/Types";
import Animated, {
  Easing,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import _ from "lodash";
import { BillFragment, Category_Types_Enum } from "constants/Types";

interface AnimatedCategoriesProps {
  style?: ViewStyle;
  categories?: ActivityFragment[];
}

interface ActivityFragmentT {
  id?: string;
  category?: CategoryFragment;
  bill?: BillFragment;
  amount?: number;
  type_id?: Category_Types_Enum;
  title?: string;
  width?: number;
  flex?: number;
}

const AnimatedCategories = ({ categories, style }: AnimatedCategoriesProps) => {
  const [total, setTotal] = React.useState<number>(0);
  const [width, setWidth] = React.useState<number>(1);
  const [data, setData] = React.useState<ActivityFragmentT[]>([]);

  const onLayout = React.useCallback(({ nativeEvent }) => {
    setWidth((prev) => {
      if (prev !== nativeEvent.layout.width) {
        return nativeEvent.layout.width;
      }
      return prev;
    });
  }, []);

  React.useEffect(() => {
    if (categories) {
      let lTotal = 0;
      categories.map((i, index) => {
        if (i.amount) {
          lTotal += i.amount;
        }
      });
      setTotal(lTotal);
    }
  }, [categories]);

  React.useEffect(() => {
    let arr: ActivityFragmentT[] = [];

    if (categories && !!total && !!width) {
      _.forEach(categories, (i) => {
        if (i.amount) {
          arr.push({
            ...i,
            width: (i.amount / total) * width,
            flex: (10 * ((i.amount / total) * width)) / width,
          });
        }
      });
    }
    setData(arr);
  }, [categories, total, width]);

  const styleSlider = useAnimatedStyle(() => {
    return {
      width: withTiming(width, {
        duration: 1000,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
    };
  }, [width]);

  return (
    <View style={style} onLayout={onLayout}>
      {data && (
        <Animated.View style={[styles.container, styleSlider]}>
          {data &&
            data.map((item, index) => {
              return (
                <Animated.View
                  key={index}
                  style={[
                    {
                      backgroundColor: item.category?.color,
                      width: item.width,
                      flex: item.flex,
                    },
                  ]}
                />
              );
            })}
        </Animated.View>
      )}
    </View>
  );
};

export default AnimatedCategories;

const styles = StyleSheet.create({
  container: {
    height: 16,
    borderRadius: 8,
    flexDirection: "row",
    overflow: "hidden",
  },
});
