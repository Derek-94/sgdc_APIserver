import { Router } from 'express';

import { authProcess } from '../services';
import { home, login, signUp } from '../controllers/user';
import { getAllUser, getUserById } from '../controllers/admin';

const router = Router();

// 홈 화면
router.get('/', home);

// 회원 가입
router.post('/signup', signUp);

// 전체 회원 조회
router.get('/users', authProcess, getAllUser);

// 특정 회원 조회
router.get('/users/:id', authProcess, getUserById);

// 로그인
router.post('/login', login);

export default router;
