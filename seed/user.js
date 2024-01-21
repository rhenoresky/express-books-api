import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();
import * as argon from 'argon2';

async function seed() {
  const hashedPassword = await argon.hash('1234');
  try {
    await prisma.user.create({
      data: {
        email: 'fulan@gmail.com',
        password: hashedPassword,
      },
    });

    console.log('Seeding user success');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await prisma.$disconnect();
  }
}

export default seed;
