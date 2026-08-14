import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Switch as SwitchInput } from "react-native";
import { useThemeStore } from "@stores/theme.store";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
};

function Switch<T extends FieldValues>({ control, name }: Props<T>) {
  const { colors } = useThemeStore();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <SwitchInput
          value={Boolean(!value)}
          onValueChange={(val) => onChange(Number(!val))}
          trackColor={{
            false: colors["card-secondary-dark"],
            true: colors["primary/20"],
          }}
          thumbColor={colors.primary}
        />
      )}
    />
  );
}

export default Switch;
