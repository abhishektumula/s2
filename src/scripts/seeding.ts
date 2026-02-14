import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg({
  connectionString: connectionString,
});

const client = new PrismaClient({ adapter });

async function seeding() {
  await client.users.create({
    data: {
      username: "@abhishektumula18102004@dammmhmmm",
      password: "dammmhmmm@23082004",
      securekey: "G7@kP9#vX2!mQ8$zL5^rT1&bY6*eH3%uN4@cW0!sJ8$dF2^xA7&kR5*",
    },
  });
}

seeding().catch((e) => console.log("error occured during seeding"));
