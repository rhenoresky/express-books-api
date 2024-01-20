import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

const getCategory = async () => {
  return await prisma.category.findMany();
};

const postCategory = async ({name}) => {
  await prisma.category.create({
    data: {
      name,
    },
  });
};

const updateCategory = async (...data) => {
  const [id, name] = data;
  await prisma.category.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });
};

const deleteCategory = async (id) => {
  await prisma.category.delete({
    where: {
      id,
    },
  });
};

const getBooksByCategoryId = async (id) => {
  return await prisma.book.findMany({
    where: {
      category_id: id,
    },
  });
};

const getBookFiltersByCategoryId = async (filter) => {
  return await prisma.book.findMany(filter);
};

export {
  getCategory,
  postCategory,
  updateCategory,
  deleteCategory,
  getBooksByCategoryId,
  getBookFiltersByCategoryId,
};
