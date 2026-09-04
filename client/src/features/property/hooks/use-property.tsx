import propertyService from "@services/api/property.service";
import { TCreateProperty } from "../form-context";

export default function useProperty() {
  async function uploadMetadata(data: TCreateProperty) {
    try {
      const formData = new FormData();

      for (const file of data.documents) {
        if (!file) continue;
        formData.append("documents", {
          uri: file.uri,
          name: file.name,
          type: file.type || "application/octet-stream",
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

      const metadata = {
        name: data.title,
        description: data.description,
      };

      formData.append("data", data as any);

      const result = await propertyService.uploadMetadata(data);
      console.log(result);
    } catch (error) {}
  }

  return { uploadMetadata };
}
