import clsx from "clsx";
import React from "react";
import { View, Text } from "react-native";
import Button from "@components/buttons/Button";
import ScreenHeader from "@components/layout/ScreenHeader";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useForm } from "react-hook-form";
import InputController from "@components/inputs/InputController";
import useBusiness from "../hook/use-business";

export type TBusiness = {
  id?: string;
  businessName: string;
  businessType: string;
  businessAddress: string;
};

export default function BusinessFormScreen() {
  const { id } = useLocalSearchParams();
  const { top } = useSafeAreaInsets();
  const { createBusiness, loading } = useBusiness();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TBusiness>();
  const isEdit = id ? true : false;

  const onSubmit = (data: TBusiness) => createBusiness(data);

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      className={clsx(
        "flex-1 dark:bg-background-dark bg-background",
        isEdit && "px-4",
      )}
      style={isEdit && { paddingTop: top }}
      testID="screen"
    >
      {!isEdit && (
        <View testID="title" className="gap-4 flex flex-col">
          <Text className="font-semibold dark:text-foreground-dark text-foreground text-2xl">
            Business Details
          </Text>
          <Text className="font-sans dark:text-muted-dark text-muted text-lg">
            Securely buy, sell, or bid on verified properties using
            blockchain-powered escrow
          </Text>
        </View>
      )}
      {isEdit && <ScreenHeader title="Edit Business" backButtonVisible />}
      <View className="mt-4 gap-5" testID="form-container">
        <View className="gap-4" testID="form-input">
          <Text className="font-medium dark:text-foreground-dark text-foreground">
            Business name
          </Text>
          <InputController
            isRequired
            control={control}
            errors={errors}
            name="businessName"
            placeholder="Enter business name"
          />
        </View>
        <View className="gap-4" testID="form-input">
          <Text className="font-medium dark:text-foreground-dark text-foreground">
            Business Type
          </Text>
          <InputController
            isRequired
            control={control}
            errors={errors}
            name="businessType"
            placeholder="Enter business Type"
          />
        </View>
        <View className="gap-4" testID="form-input">
          <Text className="font-medium dark:text-foreground-dark text-foreground">
            Business address
          </Text>
          <InputController
            isRequired
            control={control}
            errors={errors}
            name="businessAddress"
            placeholder="Enter business address"
          />
        </View>
        <Button
          size="md"
          fontSize="md"
          className="mt-2"
          variant="solid"
          disabled={loading}
          onPress={handleSubmit(onSubmit)}
        >
          Submit
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
}
