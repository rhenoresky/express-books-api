import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const getBooks = () => {
  return prisma.book.findMany();
};

const getBookFilters = async (filter) => {
  return await prisma.book.findMany(filter);
};

const postBook = async (body) => {
  await prisma.book.create({
    data: {
      ...body,
    },
  });
};

const updateBook = async (...data) => {
  const [id, body] = data;
  await prisma.book.update({
    where: {
      id,
    },
    data: {
      ...body,
    },
  });
};

const deleteBook = async (id) => {
  await prisma.book.delete({
    where: {
      id,
    },
  });
};

export {getBooks, postBook, updateBook, deleteBook, getBookFilters};
