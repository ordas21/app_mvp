import React, { memo } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import {
  Button,
  Icon,
  Input,
  Layout,
  TopNavigation,
  useTheme,
} from "@ui-kitten/components";
import * as Contacts from "expo-contacts";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import useModalize from "hooks/useModalize";

import _, { isEmpty } from "lodash";
import Text from "components/Text";
import ContactItem from "./ContactItem";
import ContactInfo from "./ContactInfo";
import ContactEmpty from "./ContactEmpty";
import Container from "components/Container";
import keyExtractor from "utils/keyExtractor";
import ModalPanel from "components/ModalPanel";
import TextUnderLine from "components/TextUnderline";
import NavigationAction from "components/NavigationAction";

import { RootStackParamList } from "navigation/types";
import { RefreshControl } from "react-native-web-refresh-control";
import Content from "components/Content";

const AddFriendScreen = memo(() => {
  const theme = useTheme();
  const { bottom } = useSafeAreaInsets();
  const { t } = useTranslation(["addFriend", "modalScreen"]);
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const { modalizeRef, open, close } = useModalize();

  const [permission, setPermission] = React.useState<boolean>(false);
  const [listContact, setListContact] = React.useState<Contacts.Contact[]>([]);
  const [listItemChose, setListItemChose] = React.useState<Contacts.Contact[]>(
    []
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
    },
  });

  React.useEffect(() => {
    (async () => getPermission())();
  }, []);

  const handleSetting = React.useCallback(async () => {
    getPermission();
  }, []);

  const getPermission = React.useCallback(async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const {
        data,
      }: Contacts.ContactResponse = await Contacts.getContactsAsync({
        fields: [
          Contacts.Fields.Name,
          Contacts.Fields.MiddleName,
          Contacts.Fields.LastName,
          Contacts.Fields.MaidenName,
          Contacts.Fields.PhoneNumbers,
          Contacts.Fields.ImageAvailable,
          Contacts.Fields.Image,
        ],
      });

      if (data.length > 0) {
        setPermission(true);
        setListContact(data);
      }
    }
  }, []);

  const handleSendInvite = React.useCallback(() => {
    if (isEmpty(errors)) {
      close();
      setTimeout(() => {
        onSubmit();
      }, 500);
    }
  }, []);

  const onSubmit = async () => {
    try {
      navigate("ModalScreen", {
        modalScreen: {
          title: t("modalScreen:invitationSent"),
          description: t("modalScreen:descriptionSent"),
          children: [
            {
              title: t("modalScreen:backToFriends"),
              onPress: () => navigate("Main", { screen: "Friend" }),
              status: "primary",
            },
          ],
        },
      });
    } catch (error) {
      console.log("onSubmit error", error);
    }
  };

  const handleRemove = React.useCallback(
    (item: Contacts.Contact) => {
      const arr = _.filter(listItemChose, (i) => {
        return i !== item;
      });
      setListItemChose(arr);
    },
    [listItemChose]
  );

  const onChooseItem = React.useCallback(
    (item: Contacts.Contact) => {
      const idx = _.find(listItemChose, (i) => i.id === item.id);

      if (!!idx) {
        handleRemove(item);
      } else {
        setListItemChose([...listItemChose, item]);
      }
    },
    [listItemChose]
  );

  const renderItem = React.useCallback(
    ({ item }) => {
      const onPress = () => {
        let idx = _.find(listItemChose, (i) => i.id === item.id);

        if (!!idx) {
          handleRemove(item);
        }
      };

      return <ContactInfo item={item} onPress={onPress} />;
    },
    [listItemChose]
  );

  const renderContact = React.useCallback(
    (item, index) => {
      const checked = !!listItemChose.find((i) => i.id === item.id);

      return (
        <ContactItem
          key={index}
          item={item}
          checked={checked}
          onChooseItem={() => onChooseItem(item)}
        />
      );
    },
    [listItemChose]
  );

  return (
    <Container style={styles.container}>
      <TopNavigation accessoryLeft={() => <NavigationAction icon="close" />} />
      <Text category="h4" marginVertical={8} marginLeft={32}>
        {t("title")}
      </Text>
      <Content
        level="1"
        refreshControl={
          <RefreshControl
            tintColor={theme["color-primary-500"]}
            onRefresh={() => {}}
          />
        }
        contentContainerStyle={styles.contentContainerStyle}
      >
        <Input
          accessoryLeft={() => (
            <Icon
              style={[
                styles.icon,
                { tintColor: theme["placeholder-text-input-color"] },
              ]}
              pack="assets"
              name="searchNormal"
            />
          )}
          placeholder={t("placeholderSearch")}
          size="small"
          style={styles.inputSearch}
        />
        <TextUnderLine
          isAdd
          isArrow={false}
          marginTop={32}
          marginLeft={32}
          onPress={open}
        >
          {t("addNewFriend")}
        </TextUnderLine>
        <Text category="h7" marginTop={48} marginLeft={32} marginBottom={24}>
          {t("fromContacts")}
        </Text>
        {!isEmpty(listItemChose) && (
          <FlatList
            data={listItemChose || []}
            renderItem={renderItem}
            horizontal
            keyExtractor={keyExtractor}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}
          />
        )}
        {permission && !isEmpty(listContact) ? (
          listContact.map(renderContact)
        ) : (
          <ContactEmpty onPress={handleSetting} />
        )}
      </Content>
      <Layout
        level="7"
        style={[styles.buttonView, { paddingBottom: bottom + 8 }]}
      >
        <Button
          disabled={isEmpty(listItemChose)}
          activeOpacity={0.7}
          accessoryRight={() => <Icon pack="assets" name="checkMark" />}
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
          children={t("sendInvite").toString()}
        />
      </Layout>
      <ModalPanel ref={modalizeRef} title={t("addFriend")}>
        <View>
          <Controller
            name="name"
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <Input
                style={styles.input}
                label={t("fullName").toString()}
                placeholder={t("placeholderName")}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
            rules={{ required: true, minLength: 10 }}
          />
          <Controller
            name="email"
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <Input
                style={styles.input}
                label={t("email").toString()}
                placeholder={t("placeholderEmail")}
                keyboardType="name-phone-pad"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
            rules={{ required: true, minLength: 10 }}
          />
          {!isEmpty(listContact) && (
            <Button
              size="large"
              children={t("sendInvite").toString()}
              style={styles.buttonSend}
              onPress={handleSendInvite}
            />
          )}
        </View>
      </ModalPanel>
    </Container>
  );
});

export default AddFriendScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    marginRight: 18,
  },
  inputSearch: {
    marginTop: 16,
    marginHorizontal: 32,
  },
  contentContainerStyle: {
    paddingBottom: 90,
  },
  buttonView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 24,
    paddingTop: 24,
    paddingLeft: 32,
  },
  button: {
    justifyContent: "space-between",
  },
  contentContainer: {
    paddingLeft: 32,
    paddingRight: 16,
    paddingBottom: 32,
  },
  input: {
    marginTop: 24,
    marginHorizontal: 32,
  },
  buttonSend: {
    marginTop: 24,
    marginHorizontal: 32,
  },
});
