import { Text, View } from "react-native";
import IconButton, { TIconButton } from "../buttons/IconButton";
import { TIconName } from "../display/Icon";
import BackButton from "@components/navigation/BackButton";

type Props = {
  title: string;
  icon?: {
    name: TIconName;
    variant: TIconButton["variant"];
  };
  backButtonVisble?: boolean;
  onPressIcon?: () => void;
};

export default function ScreenHeader({
  title,
  backButtonVisble,
  icon,
  onPressIcon,
}: Props) {
  return (
    <View className="flex-row justify-between items-center h-16 mb-3">
      {backButtonVisble && <BackButton />}
      <Text className="font-medium text-xl text-foreground dark:text-foreground-dark">
        {title}
      </Text>
      <IconButton
        onPress={onPressIcon}
        name={icon?.name}
        iconSize={24}
        variant={icon?.variant || "transparent"}
      />
    </View>
  );
}
