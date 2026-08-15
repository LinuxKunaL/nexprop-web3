import { View, Text, Pressable, ScrollView } from "react-native";
import React, { useContext } from "react";
import Icon from "@components/display/Icon";
import { useThemeStore } from "@stores/theme.store";
import { Controller, useFieldArray, useWatch } from "react-hook-form";
import {
  PropertyFormContext,
  TCreateProperty,
} from "@features/property/form-context";
import { pick, types } from "@react-native-documents/picker";
import IconButton from "@components/buttons/IconButton";
import { getFileName } from "@utils/getFileType";
import { useToast } from "@components/toast";

const Document = () => {
  const colors = useThemeStore((st) => st.colors);
  const toast = useToast();
  const { control, setValue } = useContext(PropertyFormContext);
  const documents = useFieldArray({
    control,
    name: "documents",
  });

  const handleOnPick = async (idx: number) => {
    try {
      const file = await pick({
        type: [types.doc, types.pdf, types.docx],
      });
      documents.update(idx, {
        name: file[0]?.name || "",
        data: file[0]?.uri || "",
        type: getFileName(file[0]?.nativeType || ""),
      });
    } catch (error) {}
  };

  const handleAddDocumentField = () => {
    const documentLenght = documents.fields.length;
    if (documentLenght < 6) {
      documents.append({ data: "", name: "", type: "pdf" });
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
                      <View className="flex-row gap-2 items-center">
                        <Icon
                          name={
                            file.type == "pdf" ? "file-pdf-box" : "file-word"
                          }
                          size={24}
                          isThemed
                        />
                        <Text className="font-medium dark:text-foreground-dark text-foreground text-base">
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
