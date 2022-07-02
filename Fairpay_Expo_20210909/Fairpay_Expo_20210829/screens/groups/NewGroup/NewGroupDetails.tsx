import React, { memo, useRef } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  Button,
  Icon,
  Input,
  TopNavigation,
  useTheme,
} from "@ui-kitten/components";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { useTranslation } from "react-i18next";
import { RefreshControl } from "react-native-web-refresh-control";
import AddFriendItem from "./AddFriendItem";
import { Images } from "assets/images";
import { Category_Status_Enum } from "constants/Types";
import ModalAction from "components/ModalAction";
import { DATA_GROUP_FRIEND } from "constants/Data";
import ModalPanel from "components/ModalPanel";
import { Controller, useForm } from "react-hook-form";
import useModalize from "hooks/useModalize";
import Modal from "react-native-modal";

const NewGroupDetails = memo(() => {
  const { t } = useTranslation(["groups", "common"]);
  const themes = useTheme();
  const refModal = useRef<Modal>(null);

  const [invisible, setInvisible] = React.useState<boolean>(false);
  const handleDone = React.useCallback(() => {}, []);
  const { open, close, modalizeRef } = useModalize();
  const handleSendInvite = React.useCallback(() => {
    close();
  }, []);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      setName: "",
    },
  });
  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={() => <NavigationAction icon="close" status="basic" />}
        accessoryRight={() => (
          <Text category="h7" capitalize onPress={handleDone}>
            {t("common:done")}
          </Text>
        )}
      />
      <Text marginLeft={32} marginTop={24} category={"h5"} marginBottom={36}>
        The Sydney Vacation
      </Text>

      <Content style={styles.content}>
        <Text category="h7" marginTop={36}>
          {t("addParticipants")}
        </Text>
        <FlatList
          contentContainerStyle={styles.list}
          data={DATA_GROUP}
          renderItem={({ item }) => <AddFriendItem item={item} />}
          keyExtractor={(item, index) => item.id.toString()}
          refreshControl={
            <RefreshControl
              tintColor={themes["color-primary-500"]}
              onRefresh={() => {}}
            />
          }
        />
        <TouchableOpacity
          onPress={() => {
            setInvisible(true);
          }}
          style={[
            {
              backgroundColor: themes["background-basic-color-5"],
            },
            styles.buttonAdd,
          ]}
          activeOpacity={0.7}
        >
          <View
            style={[
              styles.icon,
              {
                backgroundColor: themes["color-primary-500"],
              },
            ]}
          >
            <Icon pack="assets" name="plus" />
          </View>
          <Text marginLeft={16} category="h8" status="basic">
            {t("addParticipants")}
          </Text>
        </TouchableOpacity>
      </Content>
      <ModalAction
        isInvisible={invisible}
        setIsInvisible={setInvisible}
        ref={refModal}
        title={t("addParticipants")}
        dataNearby={DATA_GROUP_FRIEND}
        onAddNewFriend={open}
      />
      <ModalPanel ref={modalizeRef} title={t("addFriend")}>
        <View>
          <Controller
            name="name"
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <Input
                style={styles.inputModal}
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
                style={styles.inputModal}
                label={t("emailNPhone").toString()}
                placeholder={t("placeholderEmail")}
                keyboardType="name-phone-pad"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
            rules={{ required: true, minLength: 10 }}
          />
          <Button
            size="large"
            children={t("sendInvite").toString()}
            style={styles.buttonSend}
            onPress={handleSendInvite}
          />
        </View>
      </ModalPanel>
    </Container>
  );
});

export default NewGroupDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonSend: {
    marginTop: 24,
    marginHorizontal: 32,
  },
  content: {
    paddingHorizontal: 32,
  },
  buttonAdd: {
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 24,
    borderRadius: 12,
  },
  icon: {
    borderRadius: 40,
    height: 48,
    width: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    marginTop: 24,
  },
  inputModal: {
    marginTop: 24,
    marginHorizontal: 32,
  },
});
const DATA_GROUP = [
  {
    id: 0,
    image: Images.avatar,
    name: "Hieu Le Quang",
    status: Category_Status_Enum.Owner,
  },
  {
    id: 1,
    image: Images.avatar1,
    name: "Dorothy Arnold",
    status: Category_Status_Enum.Friend,
  },
  {
    id: 2,
    image: Images.avatar2,
    name: "Mark Twain",
    phoneNumbers: "012-273-8321",
    status: Category_Status_Enum.NotFriend,
  },
  {
    id: 3,
    name: "Mark Twain",
    phoneNumbers: "986-289-6593",
    status: Category_Status_Enum.RequestFriend,
  },
];
