import { View, Text, TouchableHighlight } from "react-native";
import Icon, { TIconName } from "./Icon";
import clsx from "clsx";
import { Vibration } from "react-native";

type Props = {
  icon?: {
    name: TIconName;
    color: string;
    size?: number;
  };
  color?: string;
  textColor?: string;
  className?: string;
  onPress?: () => void;
  iconPlace?: "after" | "before";
  variant?: "solid" | "graySolid" | "ghost";
  size?: "xs" | "sm" | "md" | "lg";
  children?: React.ReactNode;
};

export default function Badge({
  icon,
  color,
  className,
  onPress,
  textColor,
  iconPlace = "before",
  variant = "solid",
  size = "md",
  children,
}: Props) {
  const Container = onPress ? TouchableHighlight : View;

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
    solid: "bg-white",
    graySolid: "bg-muted-dark",
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
            color: textColor,
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
