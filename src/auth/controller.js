import express from 'express';
import * as argon from 'argon2';
import {addUser, checkUser} from './service.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/register', async (req, res) => {
  const {email, password} = req.body;
  const user = await checkUser(email);

  if (user) return res.status(400).json({error: 'User already exist'});

  const hashedPassword = await argon.hash(password);

  await addUser(email, hashedPassword);

  res.status(201).json({message: 'User registered successfully'});
});

router.post('/login', async (req, res) => {
  const {email, password} = req.body;

  const user = await checkUser(email);

  if (!user) return res.status(401).json({error: 'Invalid credentials'});

  const passwordMatch = await argon.verify(user.password, password);

  if (!passwordMatch) {
    return res.status(401).json({error: 'Invalid credentials'});
  }

  const token = `Bearer ${jwt.sign({userId: user.id}, process.env.JWT_KEY)}`;

  res.status(200).json({message: 'Login successful', id: user.id, token});
});

export default router;
