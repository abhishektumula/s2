import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg({
  connectionString: connectionString ?? "",
});

export const client = new PrismaClient({ adapter });
