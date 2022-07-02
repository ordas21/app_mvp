import React, { memo } from "react";
import { StyleSheet, View, TouchableOpacity, FlatList } from "react-native";
import {
  useTheme,
  Avatar,
  Button,
  Icon,
  Input,
  TopNavigation,
} from "@ui-kitten/components";
import { useTranslation } from "react-i18next";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import useAppTheme from "hooks/useAppTheme";
import useModalize from "hooks/useModalize";
import useImagePicker from "hooks/useImagePicker";

import Text from "components/Text";
import Container from "components/Container";
import ModalPanel from "components/ModalPanel";
import PrimaryCurrency from "./PrimaryCurrency";
import CurrencyCountry from "components/CurrencyCountry";
import NavigationAction from "components/NavigationAction";

import keyExtractor from "utils/keyExtractor";
import { Images } from "assets/images";
import { getListFlag } from "utils/getListFlag";
import { RootStackParamList } from "navigation/types";
import { PRIMARY_CURRENCY } from "constants/Data";
import { CameraCapturedPicture } from "expo-camera/build/Camera.types";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { CurrencyFragment } from "constants/Types";

const OtherInformationScreen = memo(() => {
  const list = getListFlag();
  const themes = useTheme();
  const { theme } = useAppTheme();
  const { t } = useTranslation(["login", "modalScreen", "otherInformation"]);
  const { modalizeRef, open, close } = useModalize();
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const [takePhoto, choosePhoto] = useImagePicker();
  const [image, setImage] = React.useState<CameraCapturedPicture>();
  const [name, setName] = React.useState<string>("Hieu Le Quang");

  const [currency, setCurrency] = React.useState<CurrencyFragment>();

  const handleDone = React.useCallback(() => {
    navigate("ModalScreen", {
      modalScreen: {
        image: theme === "dark" ? Images.lightSymbol : Images.darkSymbol,
        title: t("welcome"),
        description: t("modalScreen:registerSuccess"),
        children: [
          {
            title: t("modalScreen:createGroup"),
            onPress: () => navigate("Main", { screen: "Group" }),
            status: "primary",
          },
          {
            title: t("modalScreen:goToActivity"),
            onPress: () => navigate("Main", { screen: "Activity" }),
            status: "basic",
          },
        ],
      },
    });
  }, []);

  const handleChoseItem = React.useCallback((item) => {
    setCurrency(item);
  }, []);

  const renderItem = React.useCallback(
    ({ item }) => {
      return (
        <PrimaryCurrency
          item={item}
          onPress={() => handleChoseItem(item)}
          choseItem={currency}
        />
      );
    },
    [currency]
  );

  return (
    <Container style={styles.container}>
      <TopNavigation accessoryLeft={() => <NavigationAction />} />
      <Text
        marginLeft={32}
        status="basic"
        category="h4"
        marginBottom={8}
        marginTop={8}
      >
        {t("others")}
      </Text>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.viewAvatar}>
          <Avatar
            source={image ? image : Images.avatarCircle}
            size="giant"
            style={styles.avatar}
          />
          <TouchableOpacity
            onPress={() => choosePhoto((i) => setImage(i), [1, 1])}
            activeOpacity={0.7}
            style={[
              styles.edit,
              { backgroundColor: themes["color-primary-500"] },
            ]}
          >
            <Icon name="edit16" pack="assets" style={styles.icon} />
          </TouchableOpacity>
        </View>
        <Input
          value={name}
          onChangeText={setName}
          keyboardType="email-address"
          label={t("FULL NAME").toString()}
          size="large"
          style={styles.inputBox}
          placeholder={t("yourName")}
        />
        <View style={styles.selectView}>
          <View>
            <Text status="basic" category="h7">
              {t("otherInformation:selectCurrency")}
            </Text>
            <Text marginTop={8} status="body" category="h8-sl">
              {t("otherInformation:changeCurrency")}
            </Text>
          </View>
          <NavigationAction icon="add" onPress={open} status="primary" />
        </View>
        <View>
          <FlatList
            data={PRIMARY_CURRENCY || []}
            renderItem={renderItem}
            horizontal
            keyExtractor={keyExtractor}
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contentContainerStyle}
          />
        </View>
      </KeyboardAwareScrollView>
      <Button
        activeOpacity={0.7}
        style={styles.buttonBottom}
        accessoryRight={() => <Icon pack={"assets"} name="next" />}
        onPress={handleDone}
      >
        {t("imDone").toString()}
      </Button>
      <ModalPanel
        data={list}
        ref={modalizeRef}
        renderItem={({ item }) => (
          <CurrencyCountry item={item} onPress={close} />
        )}
        title={t("otherInformation:addCurrency")}
        searchProps={{
          accessoryLeft: () => (
            <Icon
              style={[
                styles.iconModal,
                { tintColor: themes["color-basic-400"] },
              ]}
              pack="assets"
              name="searchNormal"
            />
          ),
          placeholder: t("otherInformation:typeCurrency"),
        }}
      />
    </Container>
  );
});

export default OtherInformationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconModal: {
    marginRight: 8,
  },
  content: {
    paddingHorizontal: 32,
    marginTop: 43,
    marginBottom: 32,
  },
  icon: {
    width: 16,
    height: 16,
  },
  avatar: {
    alignSelf: "center",
    justifyContent: "center",
    height: 104,
    width: 104,
    marginBottom: 12,
  },
  viewAvatar: {
    marginTop: 36,
    alignItems: "center",
  },
  inputBox: {
    marginTop: 32,
    paddingHorizontal: 32,
  },
  edit: {
    height: 32,
    width: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    position: "absolute",
    bottom: 0,
  },
  selectView: {
    marginTop: 48,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    marginBottom: 32,
  },
  scrollView: {
    paddingLeft: 24,
    marginBottom: 26,
    paddingRight: 24,
  },
  buttonBottom: {
    justifyContent: "space-between",
    marginLeft: 32,
    marginBottom: 8,
    marginTop: 12,
  },
  add: {
    alignItems: "center",
  },
  image: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    width: 48,
    height: 48,
    margin: 12,
  },
  contentContainerStyle: {
    paddingLeft: 32,
    paddingRight: 16,
  },
});
