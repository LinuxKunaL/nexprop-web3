import Icon from "@components/display/Icon";
import { useThemeStore } from "@stores/theme.store";
import React, { useContext, useEffect } from "react";
import { Controller, useFieldArray } from "react-hook-form";
import { View, Text, Pressable, ScrollView } from "react-native";
import { PropertyFormContext } from "@features/property/form-context";
import { pick, types } from "@react-native-documents/picker";
import IconButton from "@components/buttons/IconButton";
import { useToast } from "@components/toast";
import { getFileType } from "@utils/getFileType";

const Document = () => {
  const colors = useThemeStore((st) => st.colors);
  const toast = useToast();
  const { control, errorTabLevel, setErrorTabLevel, trigger } =
    useContext(PropertyFormContext);
  const documents = useFieldArray({
    control,
    name: "documents",
  });

  useEffect(() => {
    if (errorTabLevel.trigger && errorTabLevel.tab === "Document") {
      trigger().finally(() => {
        setErrorTabLevel({ tab: null, trigger: false });
      });
    }
  }, [errorTabLevel, trigger]);

  const handleOnPick = async (idx: number) => {
    try {
      const file = await pick({
        type: [types.doc, types.pdf, types.docx],
      });
      documents.update(idx, file[0]);
    } catch (error) {}
  };

  const handleAddDocumentField = () => {
    const documentLenght = documents.fields.length;
    if (documentLenght < 6) {
      documents.append(null);
    } else {
      toast.warning("Maximum 6 documents allowed");
    }
  };

  return (
    <View className="flex-1 h-full w-full gap-4">
      <View
        className="flex-row w-full items-center justify-between"
        testID="header"
      >
        <Text className="font-medium dark:text-foreground-dark text-foreground text-xl">
          Add Documents
        </Text>
        <Pressable
          onPress={handleAddDocumentField}
          className="flex-row gap-1 items-center"
        >
          <Icon name="plus-circle-outline" size={21} color={colors.primary} />
          <Text className="font-medium dark:text-foreground-dark text-foreground text-base">
            Add More Files
          </Text>
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-4" testID="file-upload-screen">
          {documents.fields.map((file, idx) => (
            <Controller
              key={idx}
              control={control}
              name={`documents.${idx}`}
              rules={{
                validate: (value) =>
                  value?.name?.trim() ? true : "Document is required",
              }}
              render={({ fieldState: { error } }) => (
                <View>
                  <Pressable
                    onPress={() => handleOnPick(idx)}
                    className="bg-card dark:bg-card-dark gap-2 h-24 rounded-lg justify-between flex-row p-4 items-center border-2 border-border border-dashed dark:border-border-dark/30"
                  >
                    {file.name ? (
                      <View className="flex-row gap-2 items-center flex-1">
                        <Icon
                          name={getFileType(file.type)}
                          size={24}
                          isThemed
                        />
                        <Text
                          className="font-medium dark:text-foreground-dark text-foreground text-base w-4/5"
                          numberOfLines={1}
                          ellipsizeMode="middle"
                        >
                          {file.name}
                        </Text>
                      </View>
                    ) : (
                      <View className="flex-row gap-2 items-center">
                        <Icon name="file-plus-outline" size={24} isThemed />
                        <View>
                          <Text className="font-medium dark:text-foreground-dark text-foreground text-base">
                            Click to upload your files
                          </Text>
                          <Text className="font-sans dark:text-muted-dark text-muted">
                            only .pdf and doc accepted
                          </Text>
                        </View>
                      </View>
                    )}
                    <IconButton
                      onPress={() => documents.remove(idx)}
                      name="close-circle-outline"
                      variant="theme"
                      size="lg"
                      className="!h-full"
                      iconSize={25}
                    />
                  </Pressable>
                  {error && (
                    <Text className="mt-2 ml-2 font-medium text-danger italic">
                      {error.message}
                    </Text>
                  )}
                </View>
              )}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Document;
