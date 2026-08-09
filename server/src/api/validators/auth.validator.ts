import { z } from "zod";

const createUserZodSchema = z.object({
  address: z.string(),
  walletName: z.string(),
  name: z.string().nullable(),
});

const verifySignatureZodSchema = z.object({
  address: z.string(),
  signature: z.string(),
});

export type TCreateUser = z.infer<typeof createUserZodSchema>;
export type TVerifySignature = z.infer<typeof verifySignatureZodSchema>;

export const verifySignatureValidator = verifySignatureZodSchema;
export const createUserValidator = createUserZodSchema;
