export type TEscrow = {
  id: string;
  lockedAmount: number;
  verificationTime: string;
  status: "pending" | "cancel" | "success";
};
