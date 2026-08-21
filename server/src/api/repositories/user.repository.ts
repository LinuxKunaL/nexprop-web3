import { prisma } from "@/config/prisma.ts";
import type { Prisma } from "@/prisma/generated/prisma/client.ts";

class UserRepository {
  getWithBisiness(id: number) {
    return prisma.user.findUnique({
      where: { id },
      include: { business: true },
    });
  }
  update(id: number, data: Prisma.UserUpdateInput) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }
}

export default new UserRepository();
