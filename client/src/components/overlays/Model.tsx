import React from "react";
import { Text } from "react-native";
import { Modal as ModalView, ScrollView, View } from "react-native";
import IconButton from "../buttons/IconButton";
import clsx from "clsx";
import Hr from "@components/layout/Hr";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

type Props = {
  height: "h-2/3" | "h-1/2" | "h-2/4" | "h-3/4";
  title: string;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onClose?: () => null;
  children: React.ReactNode | React.ReactNode[];
  subtitle?: string;
  scrollType?: "normal" | "keyboardAware";
};

const Modal = (props: Props) => {
  const ScrollViewComp =
    props.scrollType == "normal" ? ScrollView : KeyboardAwareScrollView;
  const onClosePress = () => {
    if (props.onClose) {
      props.onClose();
    }
    props.setVisible(!props.visible);
  };
  return (
    <ModalView
      visible={props.visible}
      transparent={true}
      statusBarTranslucent
      animationType="fade"
    >
      <View className="bg-black/50 flex-1 justify-center items-center px-4">
        <View
          className={clsx(
            "bg-card-dark self-center rounded-lg w-full",
            props.height,
          )}
        >
          <View
            testID="modal-head"
            className="flex-row justify-between items-center py-3 px-4"
          >
            <View>
              <Text className="text-xl text-foreground dark:text-foreground-dark font-semibold">
                {props.title}
              </Text>
              {props.subtitle && (
                <Text className="font-sans text-muted dark:text-muted-dark">
                  {props.subtitle}
                </Text>
              )}
            </View>
            <IconButton onPress={onClosePress} name="close" variant="theme" />
          </View>
          <Hr />
          <ScrollViewComp
            showsVerticalScrollIndicator={false}
            className="mx-4 my-5"
            contentContainerClassName="flex-1"
          >
            {props.children}
          </ScrollViewComp>
        </View>
      </View>
    </ModalView>
  );
};

export default Modal;
