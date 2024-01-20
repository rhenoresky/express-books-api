import express from 'express';
import {getBooks, postBook, updateBook, deleteBook} from './service.js';
import {verifyToken} from '../auth/service.js';
const router = express.Router();

router.get('/', async (req, res) => {
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
