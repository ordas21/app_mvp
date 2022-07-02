import React, { memo, useCallback } from "react";
import { FlatList, StyleSheet, Image, ImageSourcePropType } from "react-native";
import { useTheme, Layout } from "@ui-kitten/components";

import Text from "components/Text";
import AdMob from "components/AdMob";
import ActivityItem from "components/ActivityItem";

import keyExtractor from "utils/keyExtractor";
import { ActivityProps } from "constants/Types";
import { getListViewDate } from "utils/getListViewDate";
import { RefreshControl } from "react-native-web-refresh-control";

interface ActivityTabProps {
  nodataTitle?: string;
  nodataImage: ImageSourcePropType;
  data: ActivityProps[];
}
const ActivityTab = memo(
  ({ nodataTitle, nodataImage, data }: ActivityTabProps) => {
    const list = getListViewDate(data);
    const themes = useTheme();

    const ListEmptyComponent = useCallback(() => {
      return (
        <Layout style={styles.layout}>
          <Image source={nodataImage} style={styles.image} />
          <Text center marginTop={24} status="body" category="h8-p">
            {nodataTitle}
          </Text>
        </Layout>
      );
    }, []);

    const renderItem = React.useCallback(({ item }) => {
      return item.ads ? <AdMob /> : <ActivityItem item={item} />;
    }, []);

    return (
      <Layout style={styles.container}>
        <FlatList
          data={list || []}
          renderItem={renderItem}
          ListEmptyComponent={ListEmptyComponent}
          style={{
            backgroundColor: themes["background-basic-color-1"],
          }}
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
          keyExtractor={keyExtractor}
          refreshControl={
            <RefreshControl tintColor={themes["color-primary-500"]} />
          }
        />
      </Layout>
    );
  }
);

export default ActivityTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 160,
    height: 160,
    marginTop: 88,
  },
  layout: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 24,
    marginTop: 40,
  },
  contentContainerStyle: {
    paddingBottom: 40,
  },
});
