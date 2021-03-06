import * as jsonwebtoken from 'jsonwebtoken';

const SERCRET_KEY = 'MY-SECRET-KEY';

export const tokenGenerate = (id: string) => {
  const payload = {
    id: id,
  };
  const token = jsonwebtoken.sign(payload, SERCRET_KEY, { algorithm: 'HS256', expiresIn: '20m' });
  return token;
};

export const tokenVerify = async (token: string) => {
  let decode;
  try {
    decode = await jsonwebtoken.verify(token, SERCRET_KEY);
  } catch (err: any) {
    if (err.message === 'jwt expired') {
      console.log('Expired token');
      return -3;
    } else {
      console.log('Invalid token');
      return -2;
    }
  }
  return decode;
};
