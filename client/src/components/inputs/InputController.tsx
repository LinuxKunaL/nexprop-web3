import React from "react";
import Input from "./Input";
import {
  Path,
  Control,
  Controller,
  FieldValues,
  FieldErrorsImpl,
} from "react-hook-form";
import {
  KeyboardTypeOptions,
  TextInputAndroidProps,
  TextInputProps,
  View,
} from "react-native";
import { startCase } from "lodash";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { regexPattern, TRegexPattern } from "@utils/RegexPattern";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  numberOfLines?: number;
  className?: string;
  requiredMessage?: string;
  multiline?: boolean | undefined;
  type?: "string" | "number";
  invalidMassage?: string;
  caretHidden?: boolean;
  isPassword?: boolean;
  placeholder?: string;
  textAlignVertical?: TextInputAndroidProps["textAlignVertical"];
  onChangeText?: (parm: any) => void;
  onBlur?: (parm: any) => void;
  keyboardType?: KeyboardTypeOptions;
  value?: string;
  defaultValue?: string;
  editable?: boolean;
  onPress?: () => void;
  isRequired?: boolean;
  pattern?: TRegexPattern;
};

function InputController<T extends FieldValues>(props: Props<T>) {
  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={
        props.isRequired
          ? {
              required: `${startCase(props.name).toLowerCase()} is required`,
              pattern: props.pattern && regexPattern(props.pattern),
            }
          : {}
      }
      render={({ field: { value, onChange }, fieldState }) => {
        const error = fieldState.error;
        const errorAnimatedStyle = useAnimatedStyle(() => ({
          opacity: withTiming(error ? 1 : 0, {
            duration: 250,
          }),
        }));
        return (
          <View>
            <Input
              {...props}
              onChangeText={(value) =>
                onChange(props.type == "number" ? Number(value) : value)
              }
              value={typeof value === "number" ? String(value) : value}
            />
            {error && (
              <Animated.Text
                style={errorAnimatedStyle}
                className="mt-2 ml-2 font-medium text-danger italic"
              >
                {error?.message?.toString()}
              </Animated.Text>
            )}
          </View>
        );
      }}
    />
  );
}

export default InputController;
