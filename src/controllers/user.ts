import { Request, Response } from 'express';
import client from '../db/connection';

import crypto from 'crypto';
import { tokenGenerate } from '../services';

export const home = (req: Request, res: Response) => res.send('welcome!');

export const signUp = (req: Request, res: Response) => {
  const {
    id: newUserId,
    name: newUserName,
    password: newUserPwd,
    gender: newUserGender,
  } = req.body;

  crypto.randomBytes(64, (err, buf) => {
    let salt = buf.toString('base64');

    crypto.pbkdf2(newUserPwd, salt, 10000, 64, 'sha512', (err, key) => {
      let encryptPwd = key.toString('base64');
      let insertQuery = `insert into users(id, name, password, gender, salt) 
                       values('${newUserId}', '${newUserName}', '${encryptPwd}', '${newUserGender}', '${salt}')`;
      client.query(insertQuery, (err, result) => {
        if (!err) {
          res.send(true);
        } else {
          res.send(false);
        }
      });
      client.end;
    });
  });
};

export const login = (req: Request, res: Response) => {
  const { id: loginUserId, password: loginUserPwd } = req.body;

  client.query(`Select * from users where id='${loginUserId}'`, (err, result) => {
    if (!err && result.rows.length) {
      const { password: rightPwd, salt: stdSalt } = result.rows[0];

      crypto.pbkdf2(loginUserPwd, stdSalt, 10000, 64, 'sha512', (err, key) => {
        let correctLogin = key.toString('base64') === rightPwd;
        if (correctLogin) {
          console.log('Existing user tried Login.');
          const token = tokenGenerate(loginUserId);
          return res.status(200).send({ token: token });
        } else {
          return res.status(400).send(false);
        }
      });
    } else {
      console.log('non-existing user tried login.');
      return res.status(400).send();
    }
  });
};
