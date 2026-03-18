import clsx from "clsx";
import React from "react";
import Icon from "@components/display/Icon";
import { View, Text, Pressable } from "react-native";
import useAppearance from "@hooks/other/use-appearance";
import { useTheme } from "@providers/ThemeProvider";
import { PreviewTheme } from "@constants/theme";

const ThemePreviewCard = ({
  template,
  dark,
  icon,
  light,
  primary,
}: PreviewTheme) => {
  const { switchTemplate, themeTemplate } = useAppearance();
  const { theme } = useTheme();

  const currentTheme = theme == "dark" ? dark : light;

  const handleChangeTemplate = () => {
    switchTemplate(template);
  };

  return (
    <Pressable
      android_ripple={{
        color: "rgba(1,1,1,0.20)",
        borderless: true,
        radius: 200,
        foreground: true,
      }}
      onPress={handleChangeTemplate}
      style={{
        borderColor: currentTheme.border,
        backgroundColor: currentTheme.background,
      }}
      className="flex-auto h-64 rounded-2xl overflow-hidden border"
    >
      {/* Header */}
      <View
        style={{
          backgroundColor: currentTheme.card,
        }}
        className="h-12 flex-row items-center justify-between px-3"
      >
        <Icon
          name={icon}
          color={primary.replace(/bg-\[([^\]]+)\]/g, "$1")}
          size={18}
        />
        <Text
          style={{ color: currentTheme.muted }}
          className="text-[11px] font-semibold"
        >
          Messages
        </Text>
        <View
          style={{ backgroundColor: currentTheme.background }}
          className="w-5 h-5 rounded-full"
        />
      </View>

      {/* Chat Preview */}
      <View className="flex-1 px-3 py-2 gap-4">
        {/* Date */}
        <View
          style={{ backgroundColor: currentTheme.card }}
          className="self-center px-2 py-0.5 rounded-full"
        >
          <Text
            style={{
              color: currentTheme.muted,
            }}
            className="text-[7px] font-medium"
          >
            TODAY
          </Text>
        </View>

        {/* Incoming */}
        <View className="flex-row items-end">
          <View
            style={{
              backgroundColor: currentTheme.border,
            }}
            className="w-5 h-5 rounded-full mr-2"
          />
          <View
            style={{
              backgroundColor: currentTheme.card,
            }}
            className="px-2 py-1.5 rounded-lg rounded-bl-sm w-24"
          >
            <View className="h-1 bg-gray-400/50 rounded-full w-full mb-1" />
            <View className="h-1 bg-gray-400/50 rounded-full w-2/3" />
          </View>
        </View>

        {/* Outgoing */}
        <View
          style={{
            backgroundColor: primary,
          }}
          className="self-end px-2 py-1.5 rounded-lg rounded-br-sm w-24"
        >
          <View className="h-1 bg-white/40 rounded-full w-full mb-1" />
          <View className="flex-row justify-end mt-1">
            <Text className="text-[7px] text-white/70">17:23 ✓✓</Text>
          </View>
        </View>
      </View>

      {/* Bottom Bar */}
      <View
        style={{
          borderColor: currentTheme.border,
          backgroundColor: currentTheme.card,
        }}
        className="px-3 py-2 flex-row justify-between items-center border-t-[1px]"
      >
        <Text
          style={{
            color: currentTheme.muted,
          }}
          className="text-[11px] capitalize"
        >
          {template}
        </Text>
        <View
          style={{
            backgroundColor:
              themeTemplate === template ? primary : "rgb(255 255 255 / 0.1)",
          }}
          className="w-5 h-5 rounded-full items-center justify-center"
        >
          <View className="w-2 h-2 bg-white rounded-full" />
        </View>
      </View>
    </Pressable>
  );
};

export default ThemePreviewCard;
