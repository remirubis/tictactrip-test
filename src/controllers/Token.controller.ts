import type { Request, Response } from 'express';
import type { Secret } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

export const generateAccessToken = async (req: Request, res: Response) => {
  const {
    body: { email },
  } = req;
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  if (!req.body || !email || !email.match(emailRegex)) {
    return res.status(400).json({ error: 'Malformed request!' });
  }

  const accessToken = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET as Secret, {
    expiresIn: '1800s',
  });

  return res.status(200).json({ accessToken });
};
