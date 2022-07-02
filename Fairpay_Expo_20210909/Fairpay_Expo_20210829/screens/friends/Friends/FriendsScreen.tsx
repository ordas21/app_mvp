import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { TopNavigation, useTheme } from "@ui-kitten/components";
import { useTranslation } from "react-i18next";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import useAppTheme from "hooks/useAppTheme";

import Text from "components/Text";
import AdMob from "components/AdMob";
import FriendsItem from "./FriendsItem";
import FriendsEmpty from "./FriendsEmpty";
import Container from "components/Container";
import CurrencyText from "components/CurrencyText";
import TextUnderLine from "components/TextUnderline";
import NavigationAction from "components/NavigationAction";
import ProgressBar from "screens/friends/Friends/ProgressBar";

import { isEmpty } from "lodash";
import { FRIENDS_DATA } from "constants/Data";
import {
  Format_Type,
  Category_Types_Enum,
  FriendFragment,
  Friend_Profile_Types,
} from "constants/Types";
import { RootStackParamList } from "navigation/types";
import { FlatList } from "react-native-gesture-handler";
import { RefreshControl } from "react-native-web-refresh-control";

const FriendsScreen = memo(() => {
  const themes = useTheme();
  const { theme } = useAppTheme();
  const { t } = useTranslation("friends");
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const scrollRef = React.useRef(null);

  const data = {
    income: 938.83,
    expense: 254.83,
  };

  const handleRemind = React.useCallback((item: FriendFragment) => {
    navigate("Friends", {
      screen: "FriendProfile",
      params: { friend: item, type: Friend_Profile_Types.Remind },
    });
  }, []);

  const handleSettleUp = React.useCallback((item: FriendFragment) => {
    navigate("Friends", {
      screen: "FriendProfile",
      params: { friend: item, type: Friend_Profile_Types.SettleUp },
    });
  }, []);

  const listHeaderComponent = React.useCallback(() => {
    return (
      <>
        <View style={styles.topView}>
          <View>
            <Text capitalize status="basic" category="h8-sl">
              {t("totalReceivable")}
            </Text>
            <CurrencyText
              formatType={Format_Type.INKY}
              type={Category_Types_Enum.Income}
              status={"success"}
              category="h5"
              marginTop={8}
            >
              {data.income}
            </CurrencyText>
          </View>
          <View>
            <Text
              right
              capitalize
              status={theme === "dark" ? "body" : "basic"}
              category="h8-sl"
            >
              {t("totalPayable")}
            </Text>
            <CurrencyText
              right
              formatType={Format_Type.INKY}
              type={Category_Types_Enum.Expense}
              category="h5"
              marginTop={8}
            >
              {data.expense}
            </CurrencyText>
          </View>
        </View>
        <ProgressBar
          style={styles.progressBar}
          income={data.income}
          expense={data.expense}
        />

        <TextUnderLine marginBottom={33} marginTop={40} marginLeft={32}>
          {t("allFriends")}
        </TextUnderLine>
      </>
    );
  }, []);

  const accessoryRight = React.useCallback(() => {
    return (
      <View style={styles.header}>
        <NavigationAction icon="searchNormal" onPress={() => {}} />
        <NavigationAction
          marginLeft={24}
          icon="plus"
          status="primary"
          onPress={() => navigate("Friends", { screen: "AddFriend" })}
        />
      </View>
    );
  }, []);

  const renderItem = React.useCallback(({ item, index }) => {
    return item.ads ? (
      <AdMob marginBottom={16} />
    ) : (
      <FriendsItem
        simultaneousHandlers={scrollRef}
        index={index}
        item={item}
        onRemind={() => handleRemind(item)}
        onSettleUp={() => handleSettleUp(item)}
      />
    );
  }, []);

  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={() => (
          <Text status="basic" category="h3">
            {t("friends")}
          </Text>
        )}
        accessoryRight={accessoryRight}
      />
      {isEmpty(FRIENDS_DATA) ? (
        <FriendsEmpty />
      ) : (
        <FlatList
          ref={scrollRef}
          data={FRIENDS_DATA || []}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={listHeaderComponent}
          refreshControl={
            <RefreshControl tintColor={themes["color-primary-500"]} />
          }
          contentContainerStyle={styles.contentContainerStyle}
        />
      )}
    </Container>
  );
});

export default FriendsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
  },
  topView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    marginTop: 16,
  },
  progressBar: {
    marginHorizontal: 32,
    marginTop: 16,
  },
  item: {
    marginBottom: 16,
    marginHorizontal: 32,
  },
  contentContainerStyle: {
    paddingBottom: 90,
  },
});
