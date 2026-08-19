import React, { useContext, useEffect } from "react";
import Icon from "@components/display/Icon";
import { Controller } from "react-hook-form";
import IconButton from "@components/buttons/IconButton";
import { pick, types } from "@react-native-documents/picker";
import { PropertyFormContext } from "@features/property/form-context";
import { View, ScrollView, Text, Pressable, Image } from "react-native";

const Media = () => {
  const { control, errorTabLevel, setErrorTabLevel, trigger } =
    useContext(PropertyFormContext);

  useEffect(() => {
    if (errorTabLevel.trigger && errorTabLevel.tab === "Media") {
      trigger().finally(() => {
        setErrorTabLevel({ tab: null, trigger: false });
      });
    }
  }, [errorTabLevel, trigger]);

  const handleOnPick = async (
    index: number,
    onChange: (params: any) => void,
    value: any,
  ) => {
    try {
      const file = await pick({ type: [types.images] });

      const updated = [...(value || [])];

      updated[index] = file[0];

      onChange(updated);
    } catch (error) {}
  };

  const handleRemoveMedia = (
    index: number,
    onChange: (params: any) => void,
    value: any,
  ) => {
    const updated = [...(value || [])];

    updated[index] = "";

    onChange(updated);
  };

  return (
    <View className="flex-1 h-full w-full">
      <ScrollView scrollEnabled showsVerticalScrollIndicator={false}>
        <Controller
          control={control}
          name="media"
          rules={{
            validate: (value: any[]) =>
              value.length === 5 && value.every(Boolean)
                ? true
                : "Please upload an image",
          }}
          render={({ field: { onChange, value }, formState: { errors } }) => {
            return (
              <View className="gap-4" testID="images-preview">
                <Pressable
                  className="bg-card dark:bg-card-dark gap-2 h-80 rounded-lg justify-center items-center border-2 border-border border-dashed dark:border-border-dark/30 overflow-hidden"
                  testID="main-image"
                  onPress={() => handleOnPick(0, onChange, value)}
                >
                  {value[0] ? (
                    <View className="size-full">
                      <IconButton
                        variant="secondary"
                        className="absolute z-10 right-1 top-1 !bg-danger !rounded-full"
                        name="close"
                        color="white"
                        onPress={() => handleRemoveMedia(0, onChange, value)}
                      />
                      <Image className="size-full" source={{ uri: value[0].uri }} />
                    </View>
                  ) : (
                    <>
                      <Icon name="image-plus-outline" size={30} isThemed />
                      <Text className="font-sans dark:text-muted-dark text-muted">
                        Upload Your Thumbnail
                      </Text>
                      <Text className="mt-2 ml-2 font-medium text-danger italic">
                        {errors.media?.message}
                      </Text>
                    </>
                  )}
                </Pressable>
                <View className="flex-row h-40 gap-4">
                  <Pressable
                    onPress={() => handleOnPick(1, onChange, value)}
                    className="bg-card dark:bg-card-dark flex-auto rounded-lg justify-center items-center border-2 border-border border-dashed dark:border-border-dark/30 w-1/2 overflow-hidden"
                  >
                    {value[1] ? (
                      <View className="size-full">
                        <IconButton
                          variant="secondary"
                          className="absolute z-10 right-1 top-1 !bg-danger !rounded-full"
                          name="close"
                          color="white"
                          onPress={() => handleRemoveMedia(1, onChange, value)}
                        />
                        <Image
                          className="size-full"
                          source={{ uri: value[1].uri }}
                        />
                      </View>
                    ) : (
                      <>
                        <Icon name="image-plus-outline" size={30} isThemed />
                        <Text className="mt-2 ml-2 font-medium text-danger italic text-xs">
                          {errors.media?.message}
                        </Text>
                      </>
                    )}
                  </Pressable>
                  <Pressable
                    onPress={() => handleOnPick(2, onChange, value)}
                    className="bg-card dark:bg-card-dark flex-auto rounded-lg justify-center items-center border-2 border-border border-dashed dark:border-border-dark/30 w-1/2 overflow-hidden"
                  >
                    {value[2] ? (
                      <View className="size-full">
                        <IconButton
                          variant="secondary"
                          className="absolute z-10 right-1 top-1 !bg-danger !rounded-full"
                          name="close"
                          color="white"
                          onPress={() => handleRemoveMedia(2, onChange, value)}
                        />
                        <Image
                          className="size-full"
                          source={{ uri: value[2].uri }}
                        />
                      </View>
                    ) : (
                      <>
                        <Icon name="image-plus-outline" size={30} isThemed />
                        <Text className="mt-2 ml-2 font-medium text-danger italic text-xs">
                          {errors.media?.message}
                        </Text>
                      </>
                    )}
                  </Pressable>
                </View>
                <View className="flex-row h-40  gap-4">
                  <Pressable
                    onPress={() => handleOnPick(3, onChange, value)}
                    className="bg-card dark:bg-card-dark flex-auto rounded-lg justify-center items-center border-2 border-border border-dashed dark:border-border-dark/30 overflow-hidden w-1/2"
                  >
                    {value[3] ? (
                      <View className="size-full">
                        <IconButton
                          variant="secondary"
                          className="absolute z-10 right-1 top-1 !bg-danger !rounded-full"
                          name="close"
                          color="white"
                          onPress={() => handleRemoveMedia(3, onChange, value)}
                        />
                        <Image
                          className="size-full"
                          source={{ uri: value[3].uri }}
                        />
                      </View>
                    ) : (
                      <>
                        <Icon name="image-plus-outline" size={30} isThemed />
                        <Text className="mt-2 ml-2 font-medium text-danger italic text-xs">
                          {errors.media?.message}
                        </Text>
                      </>
                    )}
                  </Pressable>
                  <Pressable
                    onPress={() => handleOnPick(4, onChange, value)}
                    className="bg-card dark:bg-card-dark flex-auto rounded-lg justify-center items-center border-2 border-border border-dashed dark:border-border-dark/30 overflow-hidden w-1/2"
                  >
                    {value[4] ? (
                      <View className="size-full">
                        <IconButton
                          variant="secondary"
                          className="absolute z-10 right-1 top-1 !bg-danger !rounded-full"
                          name="close"
                          color="white"
                          onPress={() => handleRemoveMedia(4, onChange, value)}
                        />
                        <Image
                          className="size-full"
                          source={{ uri: value[4].uri }}
                        />
                      </View>
                    ) : (
                      <>
                        <Icon name="image-plus-outline" size={30} isThemed />
                        <Text className="mt-2 ml-2 font-medium text-danger italic text-xs">
                          {errors.media?.message}
                        </Text>
                      </>
                    )}
                  </Pressable>
                </View>
              </View>
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

export default Media;
