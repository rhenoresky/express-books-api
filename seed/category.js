import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

async function seed() {
  try {
    await prisma.category.createMany({
      data: [
        {
          name: 'Sejarah',
        },
        {
          name: 'Ekonomi',
        },
        {
          name: 'Fiksi',
        },
      ],
    });

    console.log('Seeding category success');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await prisma.$disconnect();
  }
}

export default seed;
