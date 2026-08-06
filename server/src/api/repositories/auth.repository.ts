import { prisma } from "@/config/prisma.ts";
import type { Prisma } from "@/prisma/generated/prisma/client.ts";

class AuthRepository {
  create(data: Prisma.userCreateInput) {
    return prisma.user.create({
      data,
    });
  }
  update(id: number, data: Prisma.userUpdateInput) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }
  findByWalletAddress(address: string) {
    return prisma.user.findFirst({
      where: { address },
    });
  }
}

export default new AuthRepository();
