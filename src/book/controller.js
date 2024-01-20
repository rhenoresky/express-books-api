import express from 'express';
import {
  getBooks,
  postBook,
  updateBook,
  deleteBook,
  getBookFilters,
} from './service.js';
import {verifyToken} from '../auth/service.js';
const router = express.Router();

router.get('/', async (req, res) => {
  if (Object.keys(req.query).length >= 0) {
    const {title, minYear, maxYear, minPage, maxPage, sortByTitle} = req.query;
    const filter = {where: {}};

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

    const result = await getBookFilters(filter);
    return res.json(result);
  }

  const result = await getBooks(req.body);
  res.json(result);
});

router.post('/', verifyToken, async (req, res) => {
  if (req.body.release_year < 1980 || req.body.release_year > 2021) {
    return res.status(400).json({message: 'wrong release_year'});
  }

  if (req.body.total_page > 0 && req.body.total_page <= 100) {
    req.body.thickness = 'tipis';
  } else if (req.body.total_page >= 101 && req.body.total_page <= 200) {
    req.body.thickness = 'sedang';
  } else if (req.body.total_page >= 201) {
    req.body.thickness = 'tebal';
  } else if (req.body.total_page <= 0) {
    return res.status(400).json({message: 'wrong total_page'});
  }

  await postBook(req.body);

  res.status(201).json({message: 'add book successfully'});
});

router.patch('/:id', verifyToken, async (req, res) => {
  if (req.body.release_year < 1980 || req.body.release_year > 2021) {
    return res.status(400).json({message: 'wrong release_year'});
  }

  if (req.body.total_page > 0 && req.body.total_page <= 100) {
    req.body.thickness = 'tipis';
  } else if (req.body.total_page >= 101 && req.body.total_page <= 200) {
    req.body.thickness = 'sedang';
  } else if (req.body.total_page >= 201) {
    req.body.thickness = 'tebal';
  } else if (req.body.total_page <= 0) {
    return res.status(400).json({message: 'wrong total_page'});
  }

  await updateBook(parseInt(req.params.id), req.body);

  res.json({message: 'edit book successfully'});
});

router.delete('/:id', verifyToken, async (req, res) => {
  await deleteBook(parseInt(req.params.id));

  res.json({message: 'delete book successfully'});
});

export default router;
