import express, { Request, Response, NextFunction } from 'express';
import router from './routes';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);
app.use('/login', router);

app.listen('8000', () => {
  console.log(`
  ################################################
  🛡️  Server listening on port: 8000
  ################################################
`);
});
