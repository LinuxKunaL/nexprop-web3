import { View, Text, Pressable, ScrollView } from "react-native";
import React, { useContext } from "react";
import Icon from "@components/display/Icon";
import { useThemeStore } from "@stores/theme.store";
import { Controller } from "react-hook-form";
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
  const { control } = useContext(PropertyFormContext);

  const handleOnPick = async (
    index: number,
    onChange: (params: any) => void,
    value: any,
  ) => {
    try {
      const file = await pick({ type: [types.doc, types.pdf, types.docx] });

      const updated: {
        name: string;
        data: string;
        type: string;
      }[] = [...(value || [{}])];

      updated[index].name = file[0]?.name || "";
      updated[index].data = file[0]?.uri;
      updated[index].type = getFileName(file[0]?.nativeType || "");

      onChange(updated);
    } catch (error) {}
  };

  const handleRemoveDocument = (
    index: number,
    onChange: (params: any) => void,
    value: TCreateProperty["documents"],
  ) => {
    if (value.length > 1) {
      const updated = [...value.slice(0, index), ...value.slice(index + 1)];
      onChange(updated);
    }
  };

  const handleAddDocumentField = (
    onChange: (params: any) => void,
    value: TCreateProperty["documents"],
  ) => {
    const documentLenght = value.length;
    if (documentLenght < 6) {
      const updated = [
        ...value,
        {
          data: "",
          name: "",
          type: "",
        },
      ];
      onChange(updated);
    } else {
      toast.warning("Maximum 6 documents allowed");
    }
  };

  return (
    <View className="flex-1 h-full w-full gap-4">
      <Controller
        control={control}
        name="documents"
        rules={{
          validate: (value: any[]) =>
            value.length === 6 && value.filter((itm)=> itm.name)
              ? true
              : "Please upload an document",
              required:""
        }}
        render={({ field: { value, onChange }, formState: { errors } }) => (
          <>
            <View
              className="flex-row w-full items-center justify-between"
              testID="header"
            >
              <Text className="font-medium dark:text-foreground-dark text-foreground text-xl">
                Add Documents
              </Text>
              <Pressable
                onPress={() => handleAddDocumentField(onChange, value)}
                className="flex-row gap-1 items-center"
              >
                <Icon
                  name="plus-circle-outline"
                  size={21}
                  color={colors.primary}
                />
                <Text className="font-medium dark:text-foreground-dark text-foreground text-base">
                  Add More Files
                </Text>
              </Pressable>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View className="gap-4" testID="file-upload-screen">
                {value.map((file, idx) => (
                  <View key={idx}>
                    <Pressable
                      onPress={() => handleOnPick(idx, onChange, value)}
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
                        onPress={() =>
                          handleRemoveDocument(idx, onChange, value)
                        }
                        name="close-circle-outline"
                        variant="theme"
                        size="lg"
                        className="!h-full"
                        iconSize={25}
                      />
                    </Pressable>
                    <Text className="mt-2 ml-2 font-medium text-danger italic">
                      {errors.documents?.message}
                    </Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </>
        )}
      />
    </View>
  );
};

export default Document;
