import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = 'password1';
  const hashedPassword = await hash(password, 10);

  const dillon = await prisma.user.update({
    where: {
      email: 'dillontodd.dev@gmail.com',
    },
    data: {
      role: 'ADMIN',
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
