import React from "react";
import {
  StyleSheet,
  FlatList,
  StyleProp,
  ViewStyle,
  ListRenderItem,
} from "react-native";

import Text from "components/Text";

interface ListFriendProps<T> {
  data: Array<T>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  paddingBottom?: number;
  paddingHorizontal?: number;
  paddingTop?: number;
  title: string;
  renderItem?: ListRenderItem<T> | null | undefined;
  renderEmpty?: React.ComponentType<any> | React.ReactElement | null;
}
function ListFriend<T>({
  data,
  contentContainerStyle,
  style,
  renderEmpty,
  title,
  paddingBottom,
  paddingHorizontal,
  paddingTop,
  renderItem,
}: ListFriendProps<T>) {
  return (
    <FlatList
      style={[
        style,
        {
          paddingBottom: paddingBottom,
          paddingHorizontal: paddingHorizontal,
          paddingTop: paddingTop,
        },
      ]}
      contentContainerStyle={contentContainerStyle}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item: any, index: number) => index.toString()} // must fix
      data={data}
      renderItem={renderItem}
      ListHeaderComponent={() => {
        return (
          <Text capitalize marginBottom={24} marginTop={8}>
            {title}
          </Text>
        );
      }}
      ListEmptyComponent={renderEmpty}
    />
  );
}

export default ListFriend;

const styles = StyleSheet.create({
  container: {},
});
