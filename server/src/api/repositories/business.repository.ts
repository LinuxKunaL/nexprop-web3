import { prisma } from "@/config/prisma.ts";
import type { Prisma } from "@/prisma/generated/prisma/client.ts";

class BusinessRepository {
  create(data: Prisma.BusinessCreateInput) {
    return prisma.business.create({
      data,
    });
  }
  
  update(id: number, data: Prisma.BusinessUpdateInput) {
    return prisma.business.update({
      where: { id },
      data,
    });
  }
}

export default new BusinessRepository();
