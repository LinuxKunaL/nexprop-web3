import crypto from "node:crypto";

export const generateEncryptedFileName = () => {
  return `${crypto.randomUUID()}.enc`;
};