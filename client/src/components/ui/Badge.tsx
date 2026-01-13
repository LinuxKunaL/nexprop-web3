import { View, Text, TouchableHighlight } from "react-native";
import Icon, { TIconName } from "./Icon";
import clsx from "clsx";
import { Vibration } from "react-native";
import { useTheme } from "@providers/ThemeProvider";
import { colors } from "@constants/theme";

type Props = {
  icon?: {
    name: TIconName;
    color: string;
    size?: number;
  };
  textColor?: string;
  className?: string;
  onPress?: () => void;
  iconPlace?: "after" | "before";
  variant?: "whiteSolid" | "graySolid" | "primarySolid" | "ghost";
  size?: "xs" | "sm" | "md" | "lg";
  children?: React.ReactNode;
};

export default function Badge({
  icon,
  className,
  onPress,
  textColor,
  iconPlace = "before",
  variant = "whiteSolid",
  size = "md",
  children,
}: Props) {
  const { theme } = useTheme();
  const Container = onPress ? TouchableHighlight : View;
  const textThemed =
    theme == "dark" ? colors["foreground-dark"] : colors.foreground;

  const sizeClasses = {
    xs: "px-1 py-0.3",
    sm: "px-2 py-0.5",
    md: "px-3 py-1",
    lg: "px-4 py-1.5",
  };

  const textSizeClasses = {
    xs: "text-xs",
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const backgroundColor = {
    whiteSolid: "bg-white",
    primarySolid:"bg-primary",
    graySolid: "bg-[#e4e7e9] dark:bg-card-secondary-dark",
    ghost: "bg-primary/40",
  };

  const handleOnPress = () => {
    Vibration.vibrate(100);
    if (onPress) {
      onPress();
    }
  };

  return (
    <Container
      onPress={handleOnPress}
      activeOpacity={0.8}
      className="rounded-md self-start overflow-hidden"
    >
      <View
        className={clsx(
          "flex-row items-center gap-1",
          sizeClasses[size],
          backgroundColor[variant],
          className
        )}
      >
        {icon && iconPlace === "before" && (
          <Icon name={icon.name} size={icon.size ?? 14} color={icon.color} />
        )}
        <Text
          className={clsx("font-medium", textSizeClasses[size])}
          style={{
            color: textColor || textThemed,
          }}
        >
          {children}
        </Text>
        {icon && iconPlace === "after" && (
          <Icon name={icon.name} size={icon.size ?? 14} color={icon.color} />
        )}
      </View>
    </Container>
  );
}
