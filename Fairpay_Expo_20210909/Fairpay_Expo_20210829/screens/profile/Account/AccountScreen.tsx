import React, { memo } from "react";
import {
  ImageRequireSource,
  StyleSheet,
  View,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme, Avatar, Layout } from "@ui-kitten/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import useModal from "hooks/useModal";

import Text from "components/Text";
import ProfileItem from "./ProfileItem";
import PaymentMethod from "./PaymentMethod";
import Container from "components/Container";
import ModalConfirm from "components/ModalConfirm";
import NavigationAction from "components/NavigationAction";
import FocusAwareStatusBar from "components/FocusAwareStatusBar";

import { Images } from "assets/images";
import { RootStackParamList } from "navigation/types";
import { DATA_ACCOUNT, DATA_METHODS } from "constants/Data";

interface Props {
  avatar?: ImageRequireSource;
  name?: string;
  email?: string;
}
interface HeaderProp {
  data?: Props;
}
const Header = ({ data }: HeaderProp) => {
  const themes = useTheme();
  const { top } = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.header,
        {
          marginTop: top + 24,
        },
      ]}
    >
      <Avatar
        source={data?.avatar}
        style={[styles.avatar, { borderColor: themes["color-primary-500"] }]}
      />
      <View>
        <Text category="h6" status="white" marginLeft={18}>
          {data?.name}
        </Text>
        <Text status="white" marginTop={8} category="h8-p" marginLeft={18}>
          {data?.email}
        </Text>
      </View>
    </View>
  );
};

const AccountScreen = memo(() => {
  const themes = useTheme();
  const { t } = useTranslation(["account", "common"]);
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const { modalRef, hide, show } = useModal();

  const [data, setData] = React.useState(DATA_METHODS);

  const DATA_SETTING = [
    {
      id: 0,
      icon: "profile",
      name: t("profile"),
      route: "",
    },
    {
      id: 1,
      icon: "spending",
      name: t("spending"),
      route: "Spending",
    },
    {
      id: 2,
      icon: "setting",
      name: t("settings"),
      route: "Setting",
    },
  ];

  const handleAddMethods = React.useCallback(() => {}, []);

  const renderItem = React.useCallback(
    ({ item }) => <PaymentMethod item={item} onPressDelete={show} />,
    []
  );
  return (
    <Container style={styles.container} level="2">
      <FocusAwareStatusBar barStyle="light-content" />
      <Image
        resizeMode="contain"
        source={Images.art}
        style={[styles.image, { backgroundColor: themes["color-basic-1100"] }]}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header data={DATA_ACCOUNT} />
        <Layout style={styles.content}>
          <View style={styles.feature}>
            {DATA_SETTING.map((item, index) => {
              return <ProfileItem key={index} item={item} />;
            })}
          </View>
          <View style={styles.middleView}>
            <Text>{t("paymentMethods")}</Text>
            <NavigationAction
              icon="add"
              status="primary"
              onPress={handleAddMethods}
            />
          </View>
          <FlatList
            scrollEnabled={false}
            style={styles.method}
            horizontal
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.methods}
            scrollEventThrottle={16}
          />
        </Layout>
      </ScrollView>
      <ModalConfirm
        ref={modalRef}
        title={t("removeMethod")}
        description={t("removeTitle")}
        buttonAbove={{ onPress: hide }}
        buttonBelow={{ onPress: hide }}
      />
    </Container>
  );
});

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  method: {
    marginTop: -12,
    paddingLeft: 16,
    paddingBottom: 120,
  },

  header: {
    flexDirection: "row",
    paddingLeft: 32,
  },
  content: {
    marginTop: 34,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
  },
  avatar: {
    width: 64,
    height: 64,
    borderWidth: 2,
  },
  inputBox: {
    paddingTop: 32,
  },
  feature: {
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingTop: 32,
    flexDirection: "row",
  },
  middleView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    alignItems: "center",
    paddingTop: 40,
  },
  methods: {
    paddingVertical: 8,
  },
  image: {
    width: "100%",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    zIndex: -1,
  },
  modal: {
    borderRadius: 24,
    alignItems: "center",
    marginHorizontal: 32,
    justifyContent: "center",
  },
});
