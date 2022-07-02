import React, { memo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
  useTheme,
  Avatar,
  CheckBox,
  Datepicker,
  Icon,
  Input,
  TopNavigation,
} from "@ui-kitten/components";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import useToggle from "hooks/useToggle";
import useLayout from "hooks/useLayout";
import useModalize from "hooks/useModalize";
import useImagePicker from "hooks/useImagePicker";

import dayjs from "utils/dayjs";
import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import ModalPanel from "components/ModalPanel";
import InputSelect from "components/InputSelect";
import NavigationAction from "components/NavigationAction";

import { Images } from "assets/images";
import { DATA_CITY, DATA_COUNTRY } from "constants/Data";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { CameraCapturedPicture } from "expo-camera/build/Camera.types";
import { isEmpty } from "lodash";

const ProfileEdit = memo(() => {
  const navigate = useNavigation();
  const { t } = useTranslation("editProfile");
  const [invisible, setInvisible] = useToggle(true);
  const [date, setDate] = React.useState(new Date());
  const themes = useTheme();
  const {
    modalizeRef: modalizeCountry,
    open: openCountry,
    close: closeCountry,
  } = useModalize();
  const {
    modalizeRef: modalizeCity,
    open: openCity,
    close: closeCity,
  } = useModalize();
  const [valueCountry, setValueCountry] = React.useState<string>("VietNam");
  const [valueCity, setValueCity] = React.useState<string>("Ha Noi");
  const { height } = useLayout();
  const [gender, setGender] = React.useState<boolean>(true);
  const [takePhoto, choosePhoto] = useImagePicker();
  const [image, setImage] = React.useState<CameraCapturedPicture>();

  const {
    control,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      fullname: "Hieu Le Quang",
      phoneNumber: "9797775720",
      email: "",
      password: "123123",
      instagram: "",
      facebook: "",
      twitter: "",
    },
  });
  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={() => <NavigationAction />}
        accessoryRight={() => (
          <NavigationAction
            title={t("save")}
            onPress={() => navigate.goBack()}
          />
        )}
      />
      <Text marginBottom={8} marginLeft={32} category="h4" status="basic">
        {t("updateProfile")}
      </Text>
      <KeyboardAwareScrollView
        extraScrollHeight={100}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <Content level="1">
          <View style={styles.content}>
            <Avatar
              source={image ? image : Images.avatarCircle}
              size="giant"
              style={styles.avatar}
            />
            <TouchableOpacity
              onPress={() => choosePhoto((i) => setImage(i), [1, 1])}
              activeOpacity={0.7}
              style={[
                styles.pickImg,
                { backgroundColor: themes["color-primary-500"] },
              ]}
            >
              <Icon name="edit16" pack="assets" style={styles.icon} />
            </TouchableOpacity>
          </View>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                keyboardType="email-address"
                label={t("FULL NAME").toString()}
                style={styles.inputBox}
                placeholder={t("yourName")}
              />
            )}
            name="fullname"
          />
          <Text marginLeft={32} marginTop={30} category="h9" status="body">
            {t("gender")}
          </Text>
          <View style={styles.checkboxView}>
            <CheckBox
              status="round"
              onChange={() => setGender(true)}
              checked={gender === true ? true : false}
              style={styles.checkbox}
            >
              {t("male").toString()}
            </CheckBox>
            <CheckBox
              status="round"
              onChange={() => setGender(false)}
              checked={!gender}
            >
              {t("female").toString()}
            </CheckBox>
          </View>
          <Datepicker
            style={styles.datePicker}
            label="DOB"
            placeholder=""
            onSelect={(nextDate) => setDate(nextDate)}
            accessoryLeft={() => (
              <View style={styles.viewDate}>
                <Icon
                  name="dob"
                  pack="assets"
                  style={{ tintColor: themes["color-basic-600"] }}
                />
                <Text center marginLeft={12} category="h7" marginTop={4}>
                  {dayjs(date).format("DD/MM/YYYY")}
                </Text>
              </View>
            )}
          />
          <InputSelect
            style={styles.input}
            label={t("countryRegion").toString()}
            value={valueCountry}
            onPress={openCountry}
          />
          <InputSelect
            style={styles.input}
            label={t("city").toString()}
            value={valueCity}
            onPress={openCity}
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                keyboardType="number-pad"
                label={t("mobilePhone").toString()}
                style={styles.inputMiddle}
                placeholder={t("yourPhone")}
                textContentType="telephoneNumber"
                autoCompleteType="tel"
                dataDetectorTypes="phoneNumber"
              />
            )}
            name="phoneNumber"
          />
          <Text category="h7" status="basic" marginLeft={32} marginTop={48}>
            {t("accountFairPay")}
          </Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                keyboardType="email-address"
                label={t("email").toString()}
                style={styles.inputBox}
                placeholder={t("yourEmail")}
              />
            )}
            name="email"
            rules={{
              required: true,
              pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
              maxLength: 5,
            }}
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                secureTextEntry={invisible}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                keyboardType="email-address"
                label={t("password").toString()}
                style={styles.inputBox}
                placeholder={t("yourPass")}
                accessoryRight={() => (
                  <TouchableOpacity activeOpacity={0.7} onPress={setInvisible}>
                    <Icon
                      style={{ tintColor: themes["icon-eye-color"] }}
                      pack="assets"
                      name={invisible ? "eyeOff" : "eyeOn"}
                    />
                  </TouchableOpacity>
                )}
              />
            )}
            name="password"
            rules={{ required: true }}
          />
          <Text category="h7" status="basic" marginLeft={32} marginTop={48}>
            {t("socialAccount")}
          </Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                accessoryRight={
                  isEmpty(watch("facebook"))
                    ? () => <Text status="note">{t("optional")}</Text>
                    : undefined
                }
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                keyboardType="email-address"
                label={"FACEBOOK"}
                style={styles.inputBox}
              />
            )}
            name="facebook"
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                keyboardType="email-address"
                label={"INSTAGRAM"}
                style={styles.inputBox}
                accessoryRight={
                  isEmpty(watch("instagram"))
                    ? () => <Text status="note">{t("optional")}</Text>
                    : undefined
                }
              />
            )}
            name="instagram"
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                keyboardType="email-address"
                label={"TWITTER"}
                style={styles.inputBox}
                accessoryRight={
                  isEmpty(watch("twitter"))
                    ? () => <Text status="note">{t("optional")}</Text>
                    : undefined
                }
              />
            )}
            name="twitter"
          />
        </Content>
      </KeyboardAwareScrollView>
      <ModalPanel
        data={DATA_COUNTRY}
        title={t("country")}
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
          placeholder: t("search"),
        }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.modalButton}
            onPress={() => {
              setValueCountry(item.name), closeCountry();
            }}
          >
            <Text status="basic" category="h7-p">
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        ref={modalizeCountry}
      />
      <ModalPanel
        data={DATA_CITY}
        title={t("city")}
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
          placeholder: t("search"),
        }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.modalButton}
            onPress={() => {
              setValueCity(item.name), closeCity();
            }}
          >
            <Text capitalize status="basic" category="h7-p">
              {t(item.name)}
            </Text>
          </TouchableOpacity>
        )}
        ref={modalizeCity}
      />
    </Container>
  );
});

export default ProfileEdit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 40,
  },
  viewDate: {
    flexDirection: "row",
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 36,
  },
  datePicker: {
    marginHorizontal: 32,
    marginTop: 35,
  },
  inputBox: {
    paddingHorizontal: 32,
    paddingTop: 24,
  },
  inputMiddle: {
    marginTop: 22,
    paddingHorizontal: 32,
  },
  icon: {
    width: 16,
    height: 16,
  },
  avatar: {
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 12,
    marginTop: 11,
    width: 106,
    height: 106,
  },
  checkboxView: {
    flexDirection: "row",
    paddingHorizontal: 32,
    paddingTop: 18,
  },
  pickImg: {
    width: 32,
    height: 32,
    alignItems: "center",
    borderRadius: 10,
    justifyContent: "center",
    position: "absolute",
    bottom: -8,
  },
  iconModal: {
    marginRight: 8,
  },
  checkbox: {
    paddingRight: 91,
  },
  modalButton: {
    marginVertical: 24,
  },
  input: {
    marginTop: 22,
    marginHorizontal: 32,
  },
  contentContainerStyle: {
    paddingBottom: 42,
  },
});
