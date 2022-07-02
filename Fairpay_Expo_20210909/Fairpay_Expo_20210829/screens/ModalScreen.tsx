import React, { memo } from "react";
import { useRoute } from "@react-navigation/native";
import { ModalScreenNavigationProp } from "navigation/types";
import NotificationScreen from "components/NotificationScreen";
import { Images } from "assets/images";

const initValue = {
  goBack: true,
  title: "Oops!",
  description: "Something went wrong somewhere.\nWould you like to try again?",
  children: [],
};

const ModalScreen = memo(() => {
  const route = useRoute<ModalScreenNavigationProp>();
  const { title, description, children, buttonsViewStyle, image } =
    route?.params?.modalScreen || initValue;

  return (
    <NotificationScreen
      image={image}
      title={title}
      description={description}
      children={children}
      buttonsViewStyle={buttonsViewStyle}
    />
  );
});

export default ModalScreen;
