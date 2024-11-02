import env from "@/env"
import { PrismaClient } from "@prisma/client"

const prismaSingleton = () => {
  return new PrismaClient()
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma ?? prismaSingleton()

if (env.NODE_ENV === "development") {
  globalForPrisma.prisma = prisma
}

export default prisma