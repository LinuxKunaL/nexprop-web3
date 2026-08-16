import { useThemeStore } from "@stores/theme.store";
import React from "react";
import {
  Path,
  Control,
  Controller,
  FieldValues,
  FieldErrorsImpl,
} from "react-hook-form";
import { Dropdown } from "./Dropdown";
import { View } from "react-native";
import { startCase } from "lodash";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import clsx from "clsx";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  data: { label: string; value: string }[];
  requiredMessage?: string;
  pattern?: RegExp;
  invalidMassage?: string;
  disable?: boolean;
  placeholder?: string;
  onChange?: (parm: any) => void;
  onBlur?: (parm: any) => void;
  value?: string;
  defaultValue?: string;
  isRequired?: boolean;
  type?: "string" | "number";
  dropdownPosition?: "auto" | "top" | "bottom" | undefined;
};

const DropdownController = <T extends FieldValues>(props: Props<T>) => {
  const { colors } = useThemeStore();

  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={
        props.isRequired
          ? { required: `${startCase(props.name).toLowerCase()} is required` }
          : {}
      }
      render={({ field: { onBlur, onChange, value }, fieldState }) => {
        const error = fieldState.error;
        const errorAnimatedStyle = useAnimatedStyle(() => ({
          opacity: withTiming(error ? 1 : 0, {
            duration: 250,
          }),
        }));
        return (
          <View>
            <Dropdown
              className="selection:w-full placeholder:font-sans rounded-lg bg-card dark:bg-card-dark px-3 py-3 font-rubik border-[1px] border-transparent dark:border-border-dark/30"
              dropdownPosition={props.dropdownPosition}
              itemTextClassName="dark:text-muted-dark text-muted text-base font-rubik rounded-lg"
              selectedTextClassName="dark:text-white text-foreground font-rubik text-base"
              data={props.data}
              labelField="label"
              disable={props.disable || false}
              valueField="value"
              placeholder={props.placeholder}
              placeholderClassName={clsx(
                "text-muted-dark",
                props.disable && "opacity-40 ",
              )}
              value={props.data.find((item) => item.value == value)}
              onBlur={onBlur}
              activeColor={colors["primary/20"]}
              containerClassName="overflow-hidden rounded-lg bg-card dark:bg-background-dark border-[1px] border-transparent dark:border-border-dark/30 border-border-dark/10 shadow-none"
              onChange={(item) => {
                if (!item.value) {
                  return;
                }
                onChange(
                  props.type === "number" ? Number(item.value) : item.value,
                );
                props?.onChange?.(item);
              }}
            />
            {error && (
              <Animated.Text
                style={errorAnimatedStyle}
                className="mt-2 ml-2 font-medium text-danger italic"
              >
                {error.message?.toString()}
              </Animated.Text>
            )}
          </View>
        );
      }}
    />
  );
};

export default DropdownController;
