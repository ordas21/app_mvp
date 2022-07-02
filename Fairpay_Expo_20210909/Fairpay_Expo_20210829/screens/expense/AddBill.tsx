import React, { memo } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import {
  useStyleSheet,
  StyleService,
  TopNavigation,
} from "@ui-kitten/components";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  useNavigation,
  NavigationProp,
  useRoute,
} from "@react-navigation/native";
import useToggle from "hooks/useToggle";
import useImagePicker from "hooks/useImagePicker";

import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import FocusAwareStatusBar from "components/FocusAwareStatusBar";

import {
  ExpenseStackParamList,
  AddBillNavigationProps,
} from "navigation/types";
import { Images } from "assets/images";
import { Camera, PermissionStatus } from "expo-camera";
import { FlashMode } from "expo-camera/build/Camera.types";
import { ImageInfo } from "expo-image-picker/build/ImagePicker.types";

const AddBill = memo(() => {
  const { top, bottom } = useSafeAreaInsets();
  const { t } = useTranslation("addBill");
  const { navigate } = useNavigation<NavigationProp<ExpenseStackParamList>>();
  const styles = useStyleSheet(themedStyles);
  const route = useRoute<AddBillNavigationProps>();

  const cameraRef = React.useRef<Camera>(null);
  const [hasPermission, setHasPermission] = React.useState<boolean>();
  const [flash, toggleFlash] = useToggle(false);
  const [flashMode, setFlashMode] = React.useState<FlashMode>();
  const [takePhoto, choosePhoto] = useImagePicker();

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === PermissionStatus.GRANTED);
    })();
  }, []);

  React.useEffect(() => {
    flash ? setFlashMode(FlashMode.on) : setFlashMode(FlashMode.off);
  }, [flash]);

  const handleAuto = React.useCallback(() => {}, []);

  const handleChosePhoto = React.useCallback(
    (i: ImageInfo) => {
      if (route.params.bill) {
        let arr = route.params.bill;
        let bill = [...arr, i];
        navigate("EditBill", { bill: bill });
      } else {
        let bill = [i];
        navigate("EditBill", { bill: bill });
      }
    },
    [route.params.bill]
  );

  const handleTakePicture = React.useCallback(async () => {
    const data = await cameraRef.current?.takePictureAsync();
    if (route.params.bill) {
      let arr = route.params.bill;

      if (data) {
        let bill = [...arr, data];
        navigate("EditBill", { bill: bill });
      }
    } else {
      if (data) {
        let bill = [data];
        navigate("EditBill", { bill: bill });
      }
    }
  }, [route.params.bill]);

  return (
    <Container useSafeArea={false} style={styles.container}>
      <FocusAwareStatusBar barStyle="light-content" />
      {hasPermission ? (
        <Camera
          ref={cameraRef}
          ratio={"16:9"}
          flashMode={flashMode}
          style={styles.camera}
        >
          <View style={[styles.top, { paddingTop: top }]}>
            <TopNavigation
              style={styles.header}
              accessoryLeft={() => <NavigationAction icon="close" />}
              accessoryRight={() => (
                <NavigationAction title={t("auto")} titleStatus="white" />
              )}
            />
          </View>
          <View style={[styles.bottom, { paddingBottom: bottom + 12 }]}>
            <View style={styles.imageView}>
              <TouchableOpacity
                onPress={() =>
                  choosePhoto((i) => {
                    if (!!i) {
                      handleChosePhoto(i), [16, 9];
                    } else {
                      return;
                    }
                  })
                }
                activeOpacity={0.7}
              >
                <Image style={styles.image} source={Images.default} />
              </TouchableOpacity>
            </View>
            <View style={styles.viewButton}>
              <View style={styles.buttonBorder}>
                <TouchableOpacity
                  onPress={handleTakePicture}
                  activeOpacity={0.7}
                  style={styles.button}
                />
              </View>
            </View>
            <View style={styles.flashView}>
              <NavigationAction
                icon={flash ? "flashOn" : "flashOff"}
                onPress={toggleFlash}
              />
            </View>
          </View>
        </Camera>
      ) : (
        <View style={styles.cameraNoPermission}>
          <Text category="h7" status="basic">
            No access to camera
          </Text>
        </View>
      )}
    </Container>
  );
});

export default AddBill;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  top: {
    backgroundColor: "rgba(30, 31, 32, 0.24)",
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
  },
  header: {
    backgroundColor: "transparent",
  },
  bottom: {
    backgroundColor: "rgba(30, 31, 32, 0.24)",
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 12,
  },
  viewButton: {
    flex: 1,
    alignItems: "center",
  },
  buttonBorder: {
    width: 72,
    height: 72,
    backgroundColor: "transparent",
    borderRadius: 72,
    borderWidth: 6,
    borderColor: "color-primary-500",
    padding: 2,
    justifyContent: "center",
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 56,
    backgroundColor: "color-basic-100",
  },
  imageView: {
    flex: 1,
  },
  image: {
    width: 48,
    height: 48,
  },
  box: {
    width: 48,
    height: 48,
  },
  flashView: {
    flex: 1,
    alignItems: "flex-end",
  },
  cameraNoPermission: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
