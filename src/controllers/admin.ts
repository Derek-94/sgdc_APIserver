import { Request, Response } from 'express';
import client from '../db/connection';

export const getAllUser = (req: Request, res: Response) => {
  client.query(`Select * from users`, (err, result) => {
    if (!err) {
      res.send(result.rows);
    }
  });
  client.end;
};

export const getUserById = (req: Request, res: Response) => {
  client.query(`Select * from users where id='${req.params.id}'`, (err, result) => {
    console.log(req.params.id);
    if (!err) {
      res.send(result.rows);
    } else {
      console.log(err);
    }
  });
  client.end;
};
