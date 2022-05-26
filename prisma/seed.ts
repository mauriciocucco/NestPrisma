import { PrismaClient } from '@prisma/client';
import { applications } from './seeds/applications';
import { companies } from './seeds/companies';
import { users } from './seeds/users';

const prisma = new PrismaClient();

const main = async () => {
  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }

  for (const company of companies) {
    await prisma.company.create({
      data: company,
    });
  }

  for (const app of applications) {
    await prisma.application.create({
      data: app,
    });
  }
};

main()
  .catch((err) => {
    console.log(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
