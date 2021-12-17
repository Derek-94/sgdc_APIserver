import { Router, Request, Response, NextFunction } from 'express';
import client from '../db/connection';

import crypto from 'crypto';

const router = Router();

// 홈 화면
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('welcome!');
});

// 회원 가입
// FIX me - 중복확인
router.post('/signup', (req: Request, res: Response) => {
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
          // JWT 생성?
          res.send(true);
        } else {
          // 회원 가입 거부. 중복된 id.
          res.send(false);
        }
      });
      client.end;
    });
  });
});

// 전체 회원 조회
router.get('/users', (req: Request, res: Response) => {
  client.query(`Select * from users`, (err, result) => {
    if (!err) {
      res.send(result.rows);
    }
  });
  client.end;
});

// 특정 회원 조회
router.get('/users/:id', (req: Request, res: Response) => {
  client.query(`Select * from users where id='${req.params.id}'`, (err, result) => {
    if (!err) {
      res.send(result.rows);
    } else {
      console.log(err);
    }
  });
  client.end;
});

// 로그인
router.post('/login', (req: Request, res: Response) => {
  const { id: loginUserId, password: loginUserPwd } = req.body;

  client.query(`Select * from users where id='${loginUserId}'`, (err, result) => {
    if (!err) {
      const { password: rightPwd, salt: stdSalt } = result.rows[0];

      crypto.pbkdf2(loginUserPwd, stdSalt, 10000, 64, 'sha512', (err, key) => {
        res.send(key.toString('base64') === rightPwd);
      });
    } else {
      console.log(err);
    }
  });
});

export default router;
