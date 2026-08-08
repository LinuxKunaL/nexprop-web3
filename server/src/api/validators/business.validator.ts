import { z } from "zod";

const createBusinessZodSchema = z.object({
  businessName: z.string(),
  businessType: z.string(),
  businessAddress: z.string(),
});

export type TCreateBusiness = z.infer<typeof createBusinessZodSchema>;

export const createBusinessValidator = createBusinessZodSchema;
