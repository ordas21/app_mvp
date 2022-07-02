import React, { memo } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme, Avatar, TopNavigation } from "@ui-kitten/components";
import {
  useRoute,
  useNavigation,
  NavigationProp,
} from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useAppTheme from "hooks/useAppTheme";

import Text from "components/Text";
import FriendType from "./FriendType";
import Container from "components/Container";
import Transaction from "components/Transaction";
import NavigationAction from "components/NavigationAction";

import dayjs from "utils/dayjs";
import keyExtractor from "utils/keyExtractor";
import {
  FriendProfileNavigationProps,
  RootStackParamList,
} from "navigation/types";
import { ActivityFragment } from "constants/Types";
import { RefreshControl } from "react-native-web-refresh-control";
import { Data_Activities, Data_Activities_Expense } from "constants/Data";

const FriendProfileScreen = memo(() => {
  const themes = useTheme();
  const route = useRoute<FriendProfileNavigationProps>();
  const { theme } = useAppTheme();
  const { bottom } = useSafeAreaInsets();
  const { t } = useTranslation("friendProfile");
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const { avatar, name, is_join, email } = route.params.friend;

  const [data, setData] = React.useState<ActivityFragment[]>([]);
  const [activities, setActivities] = React.useState<ActivityFragment[]>([]);

  React.useEffect(() => {
    if (route.params.type === 1) {
      setData(Data_Activities_Expense);
    } else {
      setData(Data_Activities);
    }
  }, [route.params.type]);

  React.useEffect(() => {
    let lActivities: ActivityFragment[] = [];
    for (let i = 0; i < data.length; i++) {
      let findIndex = lActivities.findIndex(
        (item) =>
          dayjs(data[i].bill?.created_at).format("MMM D, YYYY ") === item.title
      );
      if (findIndex < 0) {
        lActivities.push(
          {
            title: dayjs(data[i].bill?.created_at).format("MMM D, YYYY "),
          },
          data[i]
        );
      } else {
        lActivities.push(data[i]);
      }
    }
    setActivities(lActivities);
  }, [data]);

  const handleSetOption = React.useCallback(() => {}, []);

  const handleResendInvitation = React.useCallback(() => {}, []);

  const listHeaderComponent = React.useCallback(() => {
    return (
      <>
        <View style={styles.header}>
          {avatar && <Avatar size="medium" source={avatar.path} />}
          <View>
            <Text marginLeft={16} category="h6" marginBottom={8}>
              {name}
            </Text>
            {is_join ? (
              <Text category="h8-sl" marginLeft={16}>
                {email}
              </Text>
            ) : (
              <View style={styles.row}>
                <Text category="h8-sl">{t("notJoin")}</Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={handleResendInvitation}
                >
                  <Text
                    category="h8-sl"
                    underline={theme === "light" ? true : false}
                    status={theme === "light" ? "basic" : "primary"}
                  >
                    {t("resend")}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        <FriendType item={route.params.friend} type={route.params.type} />
        <Text category="h7" marginTop={48}>
          {t("activity")}
        </Text>
      </>
    );
  }, [avatar, name, is_join, email, theme]);

  const renderItem = React.useCallback(({ item }) => {
    const onPress = () => navigate("Groups", { screen: "ExpenseDetails" });

    return <Transaction item={item} onPress={onPress} />;
  }, []);

  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={() => <NavigationAction />}
        accessoryRight={() => (
          <NavigationAction icon="option" onPress={handleSetOption} />
        )}
      />
      <FlatList
        data={activities}
        renderItem={renderItem}
        ListHeaderComponent={listHeaderComponent}
        keyExtractor={keyExtractor}
        contentContainerStyle={[
          styles.contentContainerStyle,
          {
            paddingBottom: bottom,
          },
        ]}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            tintColor={themes["color-primary-500"]}
            onRefresh={() => {}}
          />
        }
      />
    </Container>
  );
});

export default FriendProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    marginLeft: 16,
  },
  contentContainerStyle: {
    paddingHorizontal: 32,
    paddingTop: 16,
  },
});
