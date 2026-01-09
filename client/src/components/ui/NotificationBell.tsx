import { Text, TouchableOpacity, View } from "react-native";
import { Vibration } from "react-native";
import Icon from "./Icon";

type Props = {
  count?: number;
};

export default function NotificationBell({ count }: Props) {
  const handlePress = () => {
    Vibration.vibrate(100);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
      className="items-center size-12 p-1.5 rounded-full justify-center bg-card dark:bg-card-dark dark:border-[1px] border-transparent dark:border-border-dark/30 after:bg-red-500 after:size-10 relative"
    >
      {count && (
        <View className="size-5 bg-red-600 absolute rounded-full justify-center items-center !right-1 -top-2">
          <Text className="text-white font-sans text-xs text-center">
            {count}
          </Text>
        </View>
      )}
      <Icon name="bell" size={19} isThemed />
    </TouchableOpacity>
  );
}
