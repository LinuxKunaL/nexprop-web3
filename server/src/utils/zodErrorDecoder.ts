import { z, type ZodError } from "zod";

const zodErrorDecoder = (error: ZodError):string => {
 return z.prettifyError(error)
};
export { zodErrorDecoder };
