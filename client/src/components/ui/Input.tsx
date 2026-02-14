import { TextInput, KeyboardTypeOptions, TextInputProps } from "react-native";
import React from "react";
import { clsx } from "clsx";
import { colors } from "src/constants/theme";

type Props = TextInputProps & {
  placeholder?: string;
  onChangeText?: (parm: any) => void;
  onBlur?: (parm: any) => void;
  keyboardType?: KeyboardTypeOptions;
  value?: string;
  defaultValue?: string;
  isPassword?: boolean;
  className?: string;
  editable?: boolean;
  caretHidden?: boolean;
};

const Input: React.FC<Props> = (props) => {
  return (
    <TextInput
      {...props}
      caretHidden={props.caretHidden}
      secureTextEntry={props.isPassword}
      editable={props.editable}
      placeholderTextColor={colors["muted-dark"]}
      cursorColor={colors.primary}
      className={clsx(
        "selection:w-full placeholder:font-sans rounded-lg bg-card dark:bg-card-dark px-3 py-3 text-base dark:text-white text-foreground font-rubik border-[1px] border-transparent dark:border-border-dark/30",
        props.className,
      )}
    />
  );
};

export default Input;
