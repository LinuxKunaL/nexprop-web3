import clsx from "clsx";
import Hr from "@components/layout/Hr";
import Icon from "@components/display/Icon";
import Modal from "@components/overlays/Model";
import Button from "@components/buttons/Button";
import React, { useState } from "react";
import IconButton from "@components/buttons/IconButton";
import { colors } from "@constants/theme";
import { View, Text } from "react-native";
import splitCamelCase from "@utils/splitCamelCase";

type Props = {};

const EscrowStatus = (props: Props) => {
  const [isViewDocument, setIsViewDocument] = useState(false);

  const details = {
    escrowId: "ESC-01",
    propertyiD: "RE-01",
    lockedAmount: "4.5 ETH",
    verificationTime: "72 Hours",
  };
  return (
    <View className="gap-3">
      <Text className="font-medium text-xl text-foreground dark:text-foreground-dark">
        Escrow Created
      </Text>
      <View className="gap-2">
        {Object.entries(details).map((item, idx) => (
          <View
            key={idx}
            className="p-3 dark:bg-card-dark bg-card rounded-xl flex-row justify-between"
          >
            <Text className="text-foreground dark:text-foreground-dark font-medium capitalize">
              {splitCamelCase(item[0])}:
            </Text>
            <Text
              className={clsx(
                "underline font-medium",
                idx >= 2 ? "dark:text-muted-dark text-muted" : "text-primary",
              )}
            >
              {item[1]}
            </Text>
          </View>
        ))}
      </View>
      <View className="p-5 gap-4">
        <Text className="dark:text-muted-dark text-muted font-sans">
          Status : <Text className="text-yellow-500">Running</Text>
        </Text>
        <View className="gap-3">
          <View className="gap-1 flex-row">
            <Icon name="check-circle" size={19} color={colors.success} />
            <Text className="text-green-500 font-semibold">Funds Locked</Text>
          </View>
          <Hr height="h-[1px]" />
          <View className="gap-1 flex-row">
            <Icon name="close-circle" size={19} color={colors.danger} />
            <Text className="text-red-500 font-semibold">
              Documents Verified
            </Text>
          </View>
          <Hr height="h-[1px]" />
          <View className="gap-1 flex-row">
            <Icon name="close-circle" size={19} color={colors.danger} />
            <Text className="text-red-500 font-semibold">Payment Released</Text>
          </View>
          <Hr height="h-[1px]" />
        </View>
        <Button
          variant="solid"
          size="md"
          fontSize="md"
          onPress={() => setIsViewDocument(!isViewDocument)}
          icon={{ name: "file", color: "white", size: 19 }}
        >
          View Documents
        </Button>
      </View>
      <Modal
        height="h-2/3"
        title="Documents"
        visible={isViewDocument}
        setVisible={setIsViewDocument}
        subtitle="Documents Provided :"
      >
        <View className="flex-col justify-between flex-1">
          <View className="gap-3 flex-col">
            <View className="p-3 dark:bg-card-secondary-dark bg-card rounded-xl flex-row items-center gap-2 justify-between">
              <View className="gap-2 items-center flex-row">
                <Icon name="file-pdf-box" color={colors.primary} />
                <Text className="text-foreground dark:text-foreground-dark">
                  Sale Deed.pdf
                </Text>
              </View>
              <IconButton variant="theme" name="open-in-app" />
            </View>
            <View className="p-3 dark:bg-card-secondary-dark bg-card rounded-xl flex-row items-center gap-2 justify-between">
              <View className="gap-2 items-center flex-row">
                <Icon name="file-pdf-box" color={colors.primary} />
                <Text className="text-foreground dark:text-foreground-dark">
                  Sale Deed.pdf
                </Text>
              </View>
              <IconButton variant="theme" name="open-in-app" />
            </View>
            <View className="p-3 dark:bg-card-secondary-dark bg-card rounded-xl flex-row items-center gap-2 justify-between">
              <View className="gap-2 items-center flex-row">
                <Icon name="file-pdf-box" color={colors.primary} />
                <Text className="text-foreground dark:text-foreground-dark">
                  Sale Deed.pdf
                </Text>
              </View>
              <IconButton variant="theme" name="open-in-app" />
            </View>
          </View>
          <View className="gap-2 flex-col">
            <Button size="md" fontSize="md" variant="solid">
              Verify Documents
            </Button>
            <Button size="md" fontSize="md" variant="danger">
              Reject Documents
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default EscrowStatus;
