import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('welcome!');
});

router.post('/login', (req: Request, res: Response) => {
  const userInfo = req.body;
  console.log(userInfo.id, userInfo.pw);
  res.send('Received!');
});

export default router;
