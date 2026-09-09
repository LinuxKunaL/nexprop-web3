import { View, Text } from "react-native";
import React, { useContext } from "react";
import Modal from "@components/overlays/Model";
import { useToast } from "@components/toast";
import Button from "@components/buttons/Button";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import useCryptography from "@hooks/other/use-cryptography";
import InputController from "@components/inputs/InputController";
import { PropertyFormContext } from "@features/property/form-context";

type Props = {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const EncryptDocuments = (props: Props) => {
  const { control, handleSubmit } = useForm<{ password: string }>();
  const propertyForm = useContext(PropertyFormContext);
  const password = useWatch({ control, name: "password" });
  const { handleEncryptFile } = useCryptography();

  const toast = useToast();

  const documents = useFieldArray({
    control: propertyForm.control,
    name: "documents",
  });

  const encrypt = async () => {
    props.setVisible(false);

    const isAlreadyEncrypted = documents.fields.every(
      (doc) => doc.encrypted.algorithm,
    );

    if (isAlreadyEncrypted) {
      toast.error("Documents already encrypted");
      return;
    }

    const encryptedDocuments = await Promise.all(
      documents.fields.map(async ({ document }, index) => {
        if (!document) {
          return documents.fields[index];
        }
        return await toast.promise(handleEncryptFile(document, password), {
          loading: "🔒 Encryption is process..",
          error: "Encryption failed",
          success: "Encryption completed",
        });
      }),
    );

    propertyForm.setValue("documents", encryptedDocuments);
  };

  return (
    <Modal
      visible
      subtitle="Apply password to documents"
      title="Set Password"
      height="h-1/2"
      setVisible={props.setVisible}
    >
      <View className="gap-4">
        <Text className="text-sm font-normal italic text-muted dark:text-muted-dark leading-5">
          This password will be used to encrypt and protect your documents.
          You’ll need it to access your files later, so make sure you choose a
          strong password and remember it.
        </Text>
        <InputController
          className="!bg-primary/10"
          placeholder="Enter password"
          isPassword
          control={control}
          name="password"
        />
        <Button disabled={!password} onPress={handleSubmit(encrypt)}>
          Start Encryption
        </Button>
      </View>
    </Modal>
  );
};

export default EncryptDocuments;
