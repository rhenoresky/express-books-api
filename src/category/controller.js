import express from 'express';
import {
  deleteCategory,
  getBooksByCategoryId,
  getCategory,
  postCategory,
  updateCategory,
} from './service.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const result = await getCategory(req.body);

  res.json(result);
});

router.post('/', async (req, res) => {
  await postCategory(req.body);

  res.status(201).json({message: 'add category successfully'});
});

router.patch('/:id', async (req, res) => {
  await updateCategory(parseInt(req.params.id), req.body.name);

  res.json({message: 'edit category successfully'});
});

router.delete('/:id', async (req, res) => {
  await deleteCategory(parseInt(req.params.id));

  res.json({message: 'delete category successfully'});
});

router.get('/:id/books', async (req, res) => {
  const result = await getBooksByCategoryId(parseInt(req.params.id));

  res.json(result);
});

export default router;
