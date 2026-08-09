import { prisma } from "@/config/prisma.ts";
import type { Prisma } from "@/prisma/generated/prisma/client.ts";

class AuthRepository {
  create(data: Prisma.UserCreateInput) {
    return prisma.user.create({
      data,
    });
  }
  update(id: number, data: Prisma.UserUpdateInput) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }
  findByWalletAddress(address: string) {
    return prisma.user.findUnique({
      where: { address },
    });
  }
}

export default new AuthRepository();
