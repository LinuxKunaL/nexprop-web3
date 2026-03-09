import { TEscrow } from "@types_/escrow";

export const escrowsData: TEscrow[] = [
  {
    id: "TXN001",
    lockedAmount: 1200,
    verificationTime: "2026-03-08T10:15:00Z",
    status: "pending",
  },
  {
    id: "TXN002",
    lockedAmount: 850,
    verificationTime: "2026-03-08T10:20:00Z",
    status: "success",
  },
  {
    id: "TXN003",
    lockedAmount: 430,
    verificationTime: "2026-03-08T10:25:00Z",
    status: "cancel",
  },
  {
    id: "TXN004",
    lockedAmount: 2200,
    verificationTime: "2026-03-08T10:30:00Z",
    status: "success",
  },
  {
    id: "TXN005",
    lockedAmount: 640,
    verificationTime: "2026-03-08T10:35:00Z",
    status: "pending",
  },
  {
    id: "TXN006",
    lockedAmount: 1500,
    verificationTime: "2026-03-08T10:40:00Z",
    status: "cancel",
  },
];
