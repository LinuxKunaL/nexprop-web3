import React from "react";
import Input from "./Input";
import {
  Path,
  Control,
  Controller,
  FieldValues,
  FieldErrorsImpl,
} from "react-hook-form";
import { KeyboardTypeOptions, Text, View } from "react-native";
import { startCase } from "lodash";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  requiredMessage?: string;
  pattern?: RegExp;
  invalidMassage?: string;
  errors: FieldErrorsImpl<T>;
  caretHidden?: boolean;
  isPassword?: boolean;
  placeholder?: string;
  onChangeText?: (parm: any) => void;
  onBlur?: (parm: any) => void;
  keyboardType?: KeyboardTypeOptions;
  value?: string;
  defaultValue?: string;
  editable?: boolean;
  onPress?: () => void;
  isRequired?: boolean;
};

function InputController<T extends FieldValues>(props: Props<T>) {
  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={
        props.isRequired
          ? { required: `${startCase(props.name).toLowerCase()} is required` }
          : {}
      }
      render={({ field: { value, onChange } }) => (
        <View>
          <Input {...props} onChangeText={onChange} value={value} />
          {props.errors[props.name] && (
            <Text className="mt-2 font-medium text-danger italic">
              {props.errors[props.name]?.message?.toString()}
            </Text>
          )}
        </View>
      )}
    />
  );
}

export default InputController;
