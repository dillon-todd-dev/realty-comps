import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const dillon = await prisma.user.update({
    where: {
      email: 'dillontodd.dev@gmail.com',
    },
    data: {
      role: 'admin',
    },
  });

  console.log({ dillon });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
