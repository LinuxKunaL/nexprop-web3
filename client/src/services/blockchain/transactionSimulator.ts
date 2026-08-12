import {
  Interface,
  JsonRpcProvider,
  TransactionRequest,
  CallExceptionError,
} from "ethers";
import errorsABI from "@abi/Errors.json";
import { web3provider } from "./web3provider";

const errorsInterface = new Interface(errorsABI);

export const transactionSimulator = async (
  tx: TransactionRequest,
): Promise<{ success: boolean; error?: string }> => {
  try {
    await web3provider.call(tx);

    return { success: true };
  } catch (error) {
    const errorName = decodeError(error as CallExceptionError);

    return { success: false, error: errorName };
  }
};
const decodeError = (error: CallExceptionError): string | undefined => {
  if (error.data == "0x") {
    return "Internal blockchain error";
  }

  if (error.data) {
    const parsedError = errorsInterface.parseError(error.data);
    return parsedError?.name;
  }
};
