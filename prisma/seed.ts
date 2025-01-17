import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      email: 'dillontodd.dev@gmail.com',
      firstName: 'Dillon',
      lastName: 'Todd',
      role: 'ADMIN',
      isActive: true,
    },
  });

  console.log(user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
