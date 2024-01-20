import express from 'express';
import {
  deleteCategory,
  getBookFiltersByCategoryId,
  getBooksByCategoryId,
  getCategory,
  postCategory,
  updateCategory,
} from './service.js';
import {verifyToken} from '../auth/service.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const result = await getCategory(req.body);

  res.json(result);
});

router.post('/', verifyToken, async (req, res) => {
  await postCategory(req.body);

  res.status(201).json({message: 'add category successfully'});
});

router.patch('/:id', verifyToken, async (req, res) => {
  await updateCategory(parseInt(req.params.id), req.body.name);

  res.json({message: 'edit category successfully'});
});

router.delete('/:id', verifyToken, async (req, res) => {
  await deleteCategory(parseInt(req.params.id));

  res.json({message: 'delete category successfully'});
});

router.get('/:id/books', async (req, res) => {
  if (Object.keys(req.query).length >= 0) {
    const {title, minYear, maxYear, minPage, maxPage, sortByTitle} = req.query;
    const filter = {where: {category_id: parseInt(req.params.id)}};

    if (title) {
      filter.where.title = {
        contains: title.toLowerCase(),
      };
    }

    if (minYear) {
      filter.where.release_year = {
        gte: parseInt(minYear),
      };
    }

    if (maxYear) {
      filter.where.release_year = {
        ...filter.where.release_year,
        lte: parseInt(maxYear),
      };
    }

    if (minPage) {
      filter.where.total_page = {
        gte: parseInt(minPage),
      };
    }

    if (maxPage) {
      filter.where.total_page = {
        ...filter.where.total_page,
        lte: parseInt(maxPage),
      };
    }

    if (sortByTitle) {
      filter.orderBy = {
        title: sortByTitle.toLowerCase() === 'desc' ? 'desc' : 'asc',
      };
    }

    const result = await getBookFiltersByCategoryId(filter);
    return res.json(result);
  }

  const result = await getBooksByCategoryId(parseInt(req.params.id));
  res.json(result);
});

export default router;
