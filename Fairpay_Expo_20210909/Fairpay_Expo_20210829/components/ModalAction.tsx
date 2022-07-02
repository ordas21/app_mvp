import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import {
  useTheme,
  InputProps,
  Input,
  Icon,
  Button,
} from "@ui-kitten/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useLayout from "hooks/useLayout";
import Text from "./Text";
import Modal, { ReactNativeModal } from "react-native-modal";
import ListFriend from "./ListFriend";
import TextUnderLine from "./TextUnderline";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AddFriendProps } from "constants/Types";
import { Images } from "assets/images";
import useAppTheme from "hooks/useAppTheme";
import EmptyContact from "./EmptyContact";
import * as Contacts from "expo-contacts";
import { Contact } from "expo-contacts";
import _, { isEmpty } from "lodash";
import keyExtractor from "utils/keyExtractor";
import ContactInfo from "screens/friends/AddFriend/ContactInfo";
import AddFriend from "screens/groups/NewGroup/AddFriend";

interface BottomSheetProps<T> {
  title: string;
  dataNearby: AddFriendProps[];
  onEndReached?(): void;
  keyExtractor?: (item: any, index: number) => string; // must fix
  loading?: boolean;
  searchProps?: InputProps;
  isInvisible?: boolean;
  onAddNewFriend?(): void;
  setIsInvisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function ModalAction<T>(
  {
    isInvisible = false,
    setIsInvisible,
    title,
    dataNearby,
    onAddNewFriend,
  }: BottomSheetProps<T>,
  ref: React.ForwardedRef<ReactNativeModal>
) {
  const { theme } = useAppTheme();
  const themes = useTheme();
  const { t } = useTranslation(["groups", "common"]);
  const { height, width } = useLayout();
  const { bottom, top } = useSafeAreaInsets();
  const [permission, setPermission] = React.useState<boolean>(false);
  const [listContact, setListContact] = React.useState<Contacts.Contact[]>([]);
  const [listItemChoose, setListItemChoose] = React.useState<
    Contacts.Contact[]
  >([]);

  React.useEffect(() => {
    async () => getPermission();
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
  const handleRemove = React.useCallback(
    (item: Contacts.Contact) => {
      const arr = _.filter(listItemChoose, (i) => {
        return i !== item;
      });
      setListItemChoose(arr);
    },
    [listItemChoose]
  );

  const onChooseItem = React.useCallback(
    (item: Contacts.Contact) => {
      const idx = _.find(listItemChoose, (i) => i.id === item.id);

      if (!!idx) {
        handleRemove(item);
      } else {
        setListItemChoose([...listItemChoose, item]);
      }
    },
    [listItemChoose]
  );
  const renderChooseItem = React.useCallback(
    ({ item }) => {
      const onPress = () => {
        let idx = _.find(listItemChoose, (i) => i.id === item.id);

        if (!!idx) {
          handleRemove(item);
        }
      };

      return (
        <ContactInfo
          style={styles.contactInfo}
          statusName="white"
          item={item}
          onPress={onPress}
        />
      );
    },
    [listItemChoose]
  );
  const {
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      search: "",
    },
  });
  const onClose = React.useCallback(() => setIsInvisible(false), []);
  const renderEmptyLocal = React.useCallback(() => {
    return (
      <EmptyContact
        image={
          theme === "light" ? Images.contactsEmpty : Images.darkContactsEmpty
        }
        description={t("addFromContacts")}
        buttonTitle={t("common:settings")}
        onPress={handleSetting}
      />
    );
  }, []);
  const renderEmptyNeably = React.useCallback(() => {
    return (
      <EmptyContact
        image={theme === "dark" ? Images.nearlyEmpty : Images.nearlyLightEmpty}
        description={t("noFriendAround")}
      />
    );
  }, []);
  const renderNearby = React.useCallback(
    ({ item }) => {
      return <AddFriend item={item} onPress={() => onChooseItem(item)} />;
    },
    [listItemChoose]
  );
  const renderLocal = React.useCallback(
    ({ item }) => {
      return <AddFriend item={item} onPress={() => onChooseItem(item)} />;
    },
    [listItemChoose]
  );
  return (
    <Modal
      ref={ref}
      coverScreen={false}
      style={{
        width,
        height: height + top,
        alignSelf: "center",
        paddingTop: top,
      }}
      animationInTiming={650}
      animationOutTiming={550}
      isVisible={isInvisible}
      animationIn="slideInRight"
      animationOut="slideOutRight"
    >
      <View style={[styles.modal, { width, height }]}>
        <View style={styles.leftView}>
          {!isEmpty(listItemChoose) && (
            <FlatList
              data={listItemChoose || []}
              renderItem={renderChooseItem}
              keyExtractor={keyExtractor}
              scrollEventThrottle={16}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[
                styles.contentContainer,
                { marginTop: top },
              ]}
            />
          )}
        </View>
        <View
          style={[
            {
              backgroundColor: themes["background-basic-color-1"],
              paddingTop: top * 2,
              marginTop: -top,
            },
            styles.rightView,
          ]}
        >
          <Text marginLeft={24} marginBottom={16} category="h7">
            {title}
          </Text>
          <Controller
            control={control}
            name="search"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                status={errors.search ? "warning" : undefined}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="email-address"
                placeholder={t("enterName")}
                size="small"
                style={styles.input}
              />
            )}
          />
          <TextUnderLine
            onPress={onAddNewFriend}
            marginBottom={40}
            marginTop={32}
            isArrow={false}
            isAdd={true}
            marginLeft={24}
          >
            {t("addNewFriend")}
          </TextUnderLine>
          <ScrollView showsVerticalScrollIndicator={false}>
            <ListFriend
              renderItem={renderNearby}
              data={dataNearby}
              title={t("nearbyFriends")}
              paddingHorizontal={24}
              renderEmpty={renderEmptyNeably}
            />
            <ListFriend
              renderItem={renderLocal}
              title={t("fromContacts")}
              paddingTop={48}
              paddingBottom={90}
              data={listContact}
              renderEmpty={renderEmptyLocal}
              paddingHorizontal={24}
            />
          </ScrollView>
          <View
            style={[
              styles.bottomView,
              {
                backgroundColor: themes["background-basic-color-5"],
              },
            ]}
          >
            <Text
              category="h8-p"
              onPress={onClose}
              marginTop={32}
              marginBottom={48}
              center
              marginLeft={24}
            >
              {t("common:cancel")}
            </Text>
            <TouchableOpacity style={styles.buttonDone} onPress={onClose}>
              <Icon pack="assets" name="checkMark" />
              <Text center category="h8-p" marginLeft={8} marginRight={72}>
                {t("common:done")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default React.forwardRef(ModalAction) as <T>(
  props: BottomSheetProps<T> & { ref: React.ForwardedRef<ReactNativeModal> }
) => ReturnType<typeof ModalAction>;

const styles = StyleSheet.create({
  modalStyle: {
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    backgroundColor: "transparent",
  },
  contactInfo: {
    marginTop: 12,
  },
  handleStyle: {
    height: 0,
  },
  headerModal: {
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    paddingTop: 24,
    paddingHorizontal: 32,
  },
  styleFlatList: {
    flex: 1,
    paddingHorizontal: 24,
  },
  searchBox: {
    marginTop: 32,
  },
  leftView: {
    width: 80,
  },
  bottomView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonDone: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  rightView: {
    flex: 1,
  },
  modal: {
    flexDirection: "row",
    ...StyleSheet.absoluteFillObject,
  },
  input: {
    paddingHorizontal: 24,
  },
  contentContainer: {
    alignItems: "center",
    marginLeft: 8,
  },
});
