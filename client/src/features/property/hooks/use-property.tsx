import propertyService from "@services/api/property.service";
import { TCreateProperty } from "../form-context";

export default function useProperty() {
  async function uploadMetadata(data: TCreateProperty) {
    try {
      const formData = new FormData();

      for (const file of data.documents) {
        if (!file) continue;
        formData.append("documents", {
          uri: file.encrypted.uri,
          name: file.document.name,
          type: file.document.type || "application/octet-stream",
        } as any);
      }

      for (const file of data.media) {
        if (!file) continue;
        formData.append("media", {
          uri: file.uri,
          name: file.name,
          type: file.type || "application/octet-stream",
        } as any);
      }
      Object.entries(data).map(([key, value]) => {
        if (!(key.includes("documents") || key.includes("media"))) {
          if (key == "address") {
            formData.append(key, JSON.stringify(value));
          }
          formData.append(key, value as string);
        }
      });
      const result = await propertyService.uploadMetadata(formData);
    } catch (error) {}
  }

  return { uploadMetadata };
}
