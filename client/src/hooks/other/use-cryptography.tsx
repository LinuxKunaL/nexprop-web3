import { File, Paths } from "expo-file-system";
import { argon2id } from "@sonnetstationsolutions/expo-argon2";
import * as Crypto from "expo-crypto";
import { DocumentPickerResponse } from "@react-native-documents/picker";
import { TDocumentBuffer } from "@features/property/form-context";

const useCryptography = () => {
  const argon2Options = {
    memory: 65536,
    iterations: 3,
    parallelism: 1,
    hashLength: 32,
  };

  const handleEncryptFile = async (
    file: TDocumentBuffer["document"],
    password: string,
  ): Promise<TDocumentBuffer> => {
    if (!file.uri) return {} as TDocumentBuffer;

    const fileBuffer = await new File(file.uri).arrayBuffer();

    const passwordBytes = new TextEncoder().encode(password);

    const salt = Crypto.getRandomValues(new Uint8Array(16));

    const kek = await argon2id({
      password: passwordBytes,
      salt,
      ...argon2Options,
    });

    const key = await Crypto.AESEncryptionKey.import(kek);

    const encryptedResult = await Crypto.aesEncryptAsync(fileBuffer, key);

    const ciphertext = await encryptedResult.ciphertext({
      encoding: "bytes",
      includeTag: true,
    });

    const encryptedTempPdf = new File(Paths.cache, file.name);
    encryptedTempPdf.write(ciphertext);

    const iv = await encryptedResult.iv("bytes");

    return {
      encrypted: {
        version: 1,
        algorithm: "AES-256-GCM",
        kdf: {
          algorithm: "Argon2id",
          salt,
          ...argon2Options,
        },
        uri: encryptedTempPdf.uri,
        iv,
      },
      document: {
        name: file.name,
        type: file.type,
        size: file.size,
      },
    };
  };

  const handleDecryptFile = async (
    file: DocumentPickerResponse,
    password: string,
  ) => {
    // const kek = await argon2id({
    //   password: new TextEncoder().encode(password),
    //   salt: encryptedPackage.kdf.salt as any,
    //   memory: encryptedPackage.kdf.memory,
    //   iterations: encryptedPackage.kdf.iterations,
    //   parallelism: encryptedPackage.kdf.parallelism,
    //   hashLength: 32,
    // });
    // const key = await Crypto.AESEncryptionKey.import(kek);
    // const sealedData = Crypto.AESSealedData.fromParts(
    //   encryptedPackage.iv,
    //   encryptedPackage.ciphertext,
    //   16,
    // );
    // const Decrypt = await Crypto.aesDecryptAsync(sealedData, key, {
    //   output: "bytes",
    // });
  };

  return { handleEncryptFile, handleDecryptFile };
};

export default useCryptography;
