import userSeed from './user.js';
import categorySeed from './category.js';
import bookSeed from './book.js';

const main = async () => {
  await userSeed();
  await categorySeed();
  await bookSeed();
};

main();
