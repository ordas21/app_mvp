import React, { memo } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { TopNavigation, useTheme } from "@ui-kitten/components";

import Text from "components/Text";
import Container from "components/Container";
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { GroupsStackParamListProp, RootStackParamList } from "navigation/types";
import NavigationAction from "components/NavigationAction";
import { useTranslation } from "react-i18next";
import TextUnderLine from "components/TextUnderline";
import { SceneMap, TabView } from "react-native-tab-view";
import StatisticTab from "./StatisticTab";
import TabBar from "components/TabBar";

const Statistics = memo(() => {
  const initialLayout = { width: Dimensions.get("window").width };
  const route = useRoute<GroupsStackParamListProp>();
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const theme = useTheme();
  const { t } = useTranslation("statistics");
  const GroupsSpent = () => (
    <StatisticTab
      firstTitle={t("groupSpent")}
      secondTitle={t("youPaidFor")}
      data={route.params.details}
    />
  );
  const PersonalSpent = () => (
    <StatisticTab
      firstTitle={t("youSpent")}
      secondTitle={t("totalReceivable")}
      data={route.params.details}
    />
  );
  const renderScene = SceneMap({
    first: GroupsSpent,
    second: PersonalSpent,
  });
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Group" },
    { key: "second", title: "Personal" },
  ]);
  return (
    <Container style={styles.container}>
      <TopNavigation accessoryLeft={() => <NavigationAction />} />
      <View style={styles.topView}>
        <Text capitalize category="h4" marginTop={8}>
          {t("statistics")}
        </Text>
        <TextUnderLine capitalize>{t("thisMonth")}</TextUnderLine>
      </View>
      <TabBar
        onChangeTab={setIndex}
        tabActive={index}
        style={styles.tabBar}
        backgroundTab={theme["dot-basic-color-2"]}
        tabs={[t("group"), t("personal")]}
      />
      <TabView
        showPageIndicator
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        style={styles.content}
        transitionStyle="scroll"
        renderTabBar={() => null}
      />
    </Container>
  );
});

export default Statistics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  content: {
    flex: 1,
    paddingTop: 32,
  },
  frequent: {
    paddingHorizontal: 32,
    marginTop: 16,
  },
  line: {
    height: 1,
    marginTop: 32,
    marginHorizontal: 32,
  },
  breakdown: {
    flexWrap: "wrap-reverse",
    marginTop: 40,
  },
  flexView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 32,
  },
  tabView: {
    marginHorizontal: 32,
    borderRadius: 8,
  },
  tabBar: {},
  topView: {
    paddingHorizontal: 32,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
