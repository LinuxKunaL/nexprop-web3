import { View, Text } from "react-native";
import React, { useState } from "react";
import Button from "@components/buttons/Button";
import Modal from "@components/overlays/Model";
import Icon from "@components/display/Icon";

type Props = {};

const EscrowInit = (props: Props) => {
  const [isRuleModal, setIsRuleModal] = useState(false);

  const escrowRules = [
    {
      id: 1,
      title: "Funds Safety",
      points: [
        "Your payment is LOCKED in a secure escrow smart contract.",
        "The seller CANNOT access your funds yet.",
      ],
    },
    {
      id: 2,
      title: "Document Verification",
      points: [
        "Seller has shared all required legal documents.",
        "You have full access to view and download them.",
        "Verify documents carefully before approval.",
      ],
    },
    {
      id: 3,
      title: "Verification Time Limit",
      points: [
        "You must verify or reject documents within 72 hours (countdown started).",
        "If no action is taken, escrow will auto-cancel.",
      ],
    },
    {
      id: 4,
      title: "Approval Rule",
      points: [
        "If you APPROVE documents:",
        "Funds are released to the seller.",
        "Property ownership is transferred to you.",
        "Escrow is permanently closed.",
      ],
    },
    {
      id: 5,
      title: "Rejection Rule",
      points: [
        "If you REJECT documents:",
        "Funds are refunded to your wallet.",
        "Seller receives nothing.",
        "Escrow is closed.",
      ],
    },
    {
      id: 6,
      title: "No Manual Changes",
      points: [
        "Once escrow is created:",
        "Price cannot be changed.",
        "Seller cannot replace documents.",
        "Terms cannot be modified.",
      ],
    },
    {
      id: 7,
      title: "Automatic Enforcement",
      points: [
        "All rules are enforced by smart contract.",
        "No admin, seller, or third party can interfere.",
      ],
    },
  ];

  const importantNotes = [
    "Approval is FINAL and cannot be reversed.",
    "Always verify documents before approval.",
  ];
  
  return (
    <View className="gap-5">
      <View testID="price">
        <View className="dark:bg-card-dark bg-card p-5 rounded-lg gap-2">
          <Text className="dark:text-muted-dark text-muted font-sans">
            Bid Lock Price
          </Text>
          <View className="flex-row gap-2 items-baseline">
            <Text className="text-3xl font-medium text-primary">23.34 ETH</Text>
            <Text className="dark:text-muted-dark text-muted font-sans">
              ₹12,223,000
            </Text>
          </View>
        </View>
      </View>
      <View testID="note">
        <View className="p-4 gap-4">
          <Text className="dark:text-muted-dark text-muted font-sans">
            Note
          </Text>
          <View className="gap-1">
            <Text className="dark:text-foreground-dark text-foreground font-medium text-base">
              <Icon name="alert" color="#eab308" size={19} /> Your money is safe
              in escrow.
            </Text>
            <Text className="dark:text-foreground-dark text-foreground font-medium text-base">
              <Icon name="alert" color="#eab308" size={19} /> Seller is paid
              only after your approval.
            </Text>
            <Text className="dark:text-foreground-dark text-foreground font-medium text-base">
              <Icon name="alert" color="#eab308" size={19} /> Verify within 24
              hours or the bid will be cancelled.
            </Text>
          </View>
          <Button
            size="md"
            fontSize="lg"
            variant="solid"
            onPress={() => setIsRuleModal(true)}
            icon={{ name: "arrow-top-right", color: "white", size: 21 }}
          >
            Procedure
          </Button>
        </View>
      </View>
      <Modal
        height="h-2/3"
        title="Escrow Rules"
        visible={isRuleModal}
        setVisible={setIsRuleModal}
        subtitle="Please Read CAREFULLY"
      >
        {escrowRules.map((rule) => (
          <View key={rule.id} className="mb-7">
            <Text className="text-primary font-medium text-xl mt-1">
              {rule.id}. {rule.title}
            </Text>
            {rule.points.map((point, index) => (
              <Text
                key={index}
                className="text-foreground mb-1 font-sans dark:text-foreground-dark"
              >
                • {point}
              </Text>
            ))}
          </View>
        ))}
        <Text className="text-yellow-500 font-medium text-lg mt-1">
          ⚠ Important:
        </Text>
        {importantNotes.map((note, index) => (
          <Text key={index} className="mb-2 font-medium text-red-500">
            • {note}
          </Text>
        ))}
        <Button variant="solid" size="md" fontSize="md">
          I Understand & Agree
        </Button>
      </Modal>
    </View>
  );
};

export default EscrowInit;
