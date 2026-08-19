import { prisma } from "@/config/prisma.ts";

class PropertyRepository {
  getHomeScreenProperty() {}
  getProperty() {
    return prisma.property.findMany();
  }
  getPropertiesByBusinessId() {}
}
