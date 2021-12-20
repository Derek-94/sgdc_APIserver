import { Request, Response, NextFunction } from 'express';
import { tokenVerify } from '.';

export const authProcess = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) return res.status(400).send(false);
  const user = await tokenVerify(token);
  if (user === -3) {
    return res.status(401).send(false);
  } else if (user === -2) {
    return res.status(400).send(false);
  } else {
    console.log(user);
    next();
  }
};

export default authProcess;
