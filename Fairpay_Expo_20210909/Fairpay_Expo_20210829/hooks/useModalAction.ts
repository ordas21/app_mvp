import * as React from "react";
import ReactNativeModal from "react-native-modal";

const useModalAction = () => {
  const modalActionRef = React.useRef<ReactNativeModal>(null);

  const openModal = React.useCallback(() => {
    modalActionRef.current?.open();
  }, []);

  const closeModal = React.useCallback(() => {
    return modalActionRef.current?.close();
  }, []);

  return { modalActionRef, openModal, closeModal };
};

export default useModalAction;
