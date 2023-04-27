import type { NextFunction, Response } from 'express';
import type { Secret } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

import type { ITokenRequest } from '../types/Api.type';

export const isAuthenticated = (req: ITokenRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  const accessTokenSecret: Secret = process.env.ACCESS_TOKEN_SECRET as Secret;
  return jwt.verify(token, accessTokenSecret, (err, email) => {
    if (err) {
      return res.sendStatus(401);
    }

    req.user = email as string;

    return next();
  });
};
