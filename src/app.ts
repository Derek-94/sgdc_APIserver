import express from 'express';
import router from './routes';
import client from './db/connection';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);
app.use('/login', router);
app.use('/signup', router);
app.use('/users/:id', router);
app.use('/users', router);

client.connect();

app.listen('8080', () => {
  console.log(`
  ################################################
  🛡️  Server listening on port: 8080
  ################################################
`);
});
