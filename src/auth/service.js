import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {PrismaClient} from '@prisma/client';

dotenv.config();

const prisma = new PrismaClient();

const verifyToken = (req, res, next) => {
  const authorizationHeader = req.header('Authorization');

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'Unauthorized - Missing or invalid token',
    });
  }

  const token = authorizationHeader.substring(7);

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({message: 'Invalid token'});
  }
};

const addUser = async (email, password) => {
  await prisma.user.create({
    data: {
      email,
      password,
    },
  });
};

const checkUser = async (email) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export {verifyToken, addUser, checkUser};
